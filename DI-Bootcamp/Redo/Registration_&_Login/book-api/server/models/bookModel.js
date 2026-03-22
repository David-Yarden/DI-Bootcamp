const db = require('../config/db');

const getAllBooks = () =>
  db('books').select('*').orderBy('id');

const getBookById = (id) =>
  db('books').where({ id }).first();

const createBook = ({ title, author, published_year }) =>
  db('books').insert({ title, author, published_year }).returning('*');

const updateBook = (id, fields) =>
  db('books').where({ id }).update(fields).returning('*');

const deleteBook = (id) =>
  db('books').where({ id }).del();

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
