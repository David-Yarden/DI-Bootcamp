import pool from '../db';
import { User, UserWithPassword } from '../../types';

export const findUserByEmail = async (email: string): Promise<UserWithPassword | null> => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query(
    'SELECT id, username, email, created_at FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
};

export const findUserByUsername = async (username: string): Promise<User | null> => {
  const result = await pool.query(
    'SELECT id, username, email, created_at FROM users WHERE username = $1',
    [username]
  );
  return result.rows[0] || null;
};

export const createUser = async (
  username: string,
  email: string,
  passwordHash: string
): Promise<User> => {
  const result = await pool.query(
    'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
    [username, email, passwordHash]
  );
  return result.rows[0];
};

export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query(
    'SELECT id, username, email, created_at FROM users ORDER BY username'
  );
  return result.rows;
};

export const searchUsers = async (query: string): Promise<User[]> => {
  const result = await pool.query(
    'SELECT id, username, email, created_at FROM users WHERE username ILIKE $1 OR email ILIKE $1 ORDER BY username LIMIT 10',
    [`%${query}%`]
  );
  return result.rows;
};
