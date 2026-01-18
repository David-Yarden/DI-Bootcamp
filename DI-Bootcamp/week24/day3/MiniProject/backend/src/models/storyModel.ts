import pool from '../db';
import { Story, User } from '../../types';

export const getAllStories = async (): Promise<Story[]> => {
  const result = await pool.query(`
    SELECT s.*,
           u.id as author_id, u.username as author_username, u.email as author_email
    FROM stories s
    JOIN users u ON s.author_id = u.id
    ORDER BY s.updated_at DESC
  `);

  return result.rows.map(row => ({
    id: row.id,
    title: row.title,
    content: row.content,
    author_id: row.author_id,
    author: {
      id: row.author_id,
      username: row.author_username,
      email: row.author_email
    },
    created_at: row.created_at,
    updated_at: row.updated_at
  }));
};

export const getStoriesByAuthor = async (authorId: number): Promise<Story[]> => {
  const result = await pool.query(`
    SELECT s.*,
           u.id as author_id, u.username as author_username, u.email as author_email
    FROM stories s
    JOIN users u ON s.author_id = u.id
    WHERE s.author_id = $1
    ORDER BY s.updated_at DESC
  `, [authorId]);

  return result.rows.map(row => ({
    id: row.id,
    title: row.title,
    content: row.content,
    author_id: row.author_id,
    author: {
      id: row.author_id,
      username: row.author_username,
      email: row.author_email
    },
    created_at: row.created_at,
    updated_at: row.updated_at
  }));
};

export const getStoryById = async (id: number): Promise<Story | null> => {
  const result = await pool.query(`
    SELECT s.*,
           u.id as author_id, u.username as author_username, u.email as author_email
    FROM stories s
    JOIN users u ON s.author_id = u.id
    WHERE s.id = $1
  `, [id]);

  if (result.rows.length === 0) return null;

  const row = result.rows[0];
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    author_id: row.author_id,
    author: {
      id: row.author_id,
      username: row.author_username,
      email: row.author_email
    },
    created_at: row.created_at,
    updated_at: row.updated_at
  };
};

export const createStory = async (
  title: string,
  content: string,
  authorId: number
): Promise<Story> => {
  const result = await pool.query(
    'INSERT INTO stories (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
    [title, content, authorId]
  );
  return result.rows[0];
};

export const updateStory = async (
  id: number,
  title?: string,
  content?: string
): Promise<Story | null> => {
  const updates: string[] = [];
  const values: (string | number)[] = [];
  let paramCount = 1;

  if (title !== undefined) {
    updates.push(`title = $${paramCount}`);
    values.push(title);
    paramCount++;
  }
  if (content !== undefined) {
    updates.push(`content = $${paramCount}`);
    values.push(content);
    paramCount++;
  }

  if (updates.length === 0) return null;

  values.push(id);
  const result = await pool.query(
    `UPDATE stories SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  );
  return result.rows[0] || null;
};

export const deleteStory = async (id: number): Promise<boolean> => {
  const result = await pool.query('DELETE FROM stories WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};

export const isUserAuthorOrContributor = async (
  storyId: number,
  userId: number
): Promise<boolean> => {
  // Check if user is author
  const authorCheck = await pool.query(
    'SELECT id FROM stories WHERE id = $1 AND author_id = $2',
    [storyId, userId]
  );
  if (authorCheck.rows.length > 0) return true;

  // Check if user is contributor
  const contributorCheck = await pool.query(
    'SELECT id FROM contributors WHERE story_id = $1 AND user_id = $2',
    [storyId, userId]
  );
  return contributorCheck.rows.length > 0;
};

export const isUserAuthor = async (storyId: number, userId: number): Promise<boolean> => {
  const result = await pool.query(
    'SELECT id FROM stories WHERE id = $1 AND author_id = $2',
    [storyId, userId]
  );
  return result.rows.length > 0;
};
