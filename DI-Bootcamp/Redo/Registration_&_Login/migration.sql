-- Run this in your PostgreSQL client to set up the auth_db database and tables

CREATE DATABASE auth_db;

\c auth_db

CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  email      VARCHAR(255) NOT NULL UNIQUE,
  username   VARCHAR(100) NOT NULL UNIQUE,
  first_name VARCHAR(100),
  last_name  VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS hashpwd (
  id       SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE REFERENCES users(username) ON UPDATE CASCADE,
  password VARCHAR(255) NOT NULL
);
