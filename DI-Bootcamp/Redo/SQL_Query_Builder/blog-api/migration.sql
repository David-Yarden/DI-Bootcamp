-- Run this in your PostgreSQL client to set up the blog_db database and posts table

CREATE DATABASE blog_db;

\c blog_db

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
