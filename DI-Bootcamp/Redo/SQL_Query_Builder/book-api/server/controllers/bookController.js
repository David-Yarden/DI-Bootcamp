const Book = require('../models/bookModel');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.getBookById(req.params.bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    if (!title || !author || !publishedYear)
      return res.status(400).json({ error: 'title, author, and publishedYear are required' });
    const [book] = await Book.createBook({ title, author, publishedYear });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    const [book] = await Book.updateBook(req.params.bookId, { title, author, publishedYear });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deleted = await Book.deleteBook(req.params.bookId);
    if (!deleted) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
