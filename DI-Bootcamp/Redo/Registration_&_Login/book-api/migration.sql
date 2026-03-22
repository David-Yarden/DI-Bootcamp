-- Run this in your PostgreSQL client to set up the book_db database and table

CREATE DATABASE book_db;

\c book_db

CREATE TABLE IF NOT EXISTS books (
  id            SERIAL PRIMARY KEY,
  title         VARCHAR(255) NOT NULL,
  author        VARCHAR(255) NOT NULL,
  published_year INT
);
