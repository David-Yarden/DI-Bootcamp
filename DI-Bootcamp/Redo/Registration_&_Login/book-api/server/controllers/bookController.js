const Book = require('../models/bookModel');

// GET /api/books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/books/:bookId
const getBookById = async (req, res) => {
  try {
    const book = await Book.getBookById(req.params.bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/books
const createBook = async (req, res) => {
  try {
    const { title, author, published_year } = req.body;
    if (!title || !author) {
      return res.status(400).json({ error: 'title and author are required' });
    }
    const [book] = await Book.createBook({ title, author, published_year });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/books/:bookId
const updateBook = async (req, res) => {
  try {
    const { title, author, published_year } = req.body;
    const fields = {};
    if (title) fields.title = title;
    if (author) fields.author = author;
    if (published_year) fields.published_year = published_year;

    if (Object.keys(fields).length === 0) {
      return res.status(400).json({ error: 'No fields provided to update' });
    }

    const [book] = await Book.updateBook(req.params.bookId, fields);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/books/:bookId
const deleteBook = async (req, res) => {
  try {
    const count = await Book.deleteBook(req.params.bookId);
    if (count === 0) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
