const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController');

router.get('/', controller.getAllBooks);
router.get('/:bookId', controller.getBookById);
router.post('/', controller.createBook);
router.put('/:bookId', controller.updateBook);
router.delete('/:bookId', controller.deleteBook);

module.exports = router;
