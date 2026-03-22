const db = require('../config/db');

const getAllPosts = () =>
  db('posts').select('*').orderBy('id');

const getPostById = (id) =>
  db('posts').where({ id }).first();

const createPost = ({ title, content }) =>
  db('posts').insert({ title, content }).returning('*');

const updatePost = (id, fields) =>
  db('posts').where({ id }).update(fields).returning('*');

const deletePost = (id) =>
  db('posts').where({ id }).del();

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
