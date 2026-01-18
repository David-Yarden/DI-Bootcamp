import pool from '../db';
import { Contributor, User } from '../../types';

export const getContributorsByStory = async (storyId: number): Promise<User[]> => {
  const result = await pool.query(`
    SELECT u.id, u.username, u.email, u.created_at
    FROM contributors c
    JOIN users u ON c.user_id = u.id
    WHERE c.story_id = $1
    ORDER BY u.username
  `, [storyId]);
  return result.rows;
};

export const addContributor = async (
  storyId: number,
  userId: number
): Promise<Contributor | null> => {
  try {
    const result = await pool.query(
      'INSERT INTO contributors (story_id, user_id) VALUES ($1, $2) RETURNING *',
      [storyId, userId]
    );
    return result.rows[0];
  } catch (error: any) {
    // Handle unique constraint violation
    if (error.code === '23505') {
      return null;
    }
    throw error;
  }
};

export const removeContributor = async (id: number): Promise<boolean> => {
  const result = await pool.query('DELETE FROM contributors WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};

export const removeContributorByStoryAndUser = async (
  storyId: number,
  userId: number
): Promise<boolean> => {
  const result = await pool.query(
    'DELETE FROM contributors WHERE story_id = $1 AND user_id = $2',
    [storyId, userId]
  );
  return (result.rowCount ?? 0) > 0;
};

export const getContributorById = async (id: number): Promise<Contributor | null> => {
  const result = await pool.query('SELECT * FROM contributors WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const isContributor = async (storyId: number, userId: number): Promise<boolean> => {
  const result = await pool.query(
    'SELECT id FROM contributors WHERE story_id = $1 AND user_id = $2',
    [storyId, userId]
  );
  return result.rows.length > 0;
};
