const db = require('../config/db');

const TABLE = 'posts';

const getAllPosts = () => db(TABLE).select('*').orderBy('id');

const getPostById = (id) => db(TABLE).where({ id }).first();

const createPost = ({ title, content }) =>
  db(TABLE).insert({ title, content }).returning('*');

const updatePost = (id, { title, content }) =>
  db(TABLE).where({ id }).update({ title, content }).returning('*');

const deletePost = (id) => db(TABLE).where({ id }).del();

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
