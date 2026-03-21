const db = require('../config/db');

const TABLE = 'books';

const getAllBooks = () => db(TABLE).select('*').orderBy('id');

const getBookById = (id) => db(TABLE).where({ id }).first();

const createBook = ({ title, author, publishedYear }) =>
  db(TABLE).insert({ title, author, published_year: publishedYear }).returning('*');

const updateBook = (id, { title, author, publishedYear }) =>
  db(TABLE).where({ id }).update({ title, author, published_year: publishedYear }).returning('*');

const deleteBook = (id) => db(TABLE).where({ id }).del();

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
