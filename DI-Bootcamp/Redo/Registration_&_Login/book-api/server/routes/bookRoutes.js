const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController');

router.get('/api/books', controller.getAllBooks);
router.get('/api/books/:bookId', controller.getBookById);
router.post('/api/books', controller.createBook);
router.put('/api/books/:bookId', controller.updateBook);
router.delete('/api/books/:bookId', controller.deleteBook);

module.exports = router;
