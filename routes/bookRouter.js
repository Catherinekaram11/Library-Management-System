const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');


router.post('/addBook', BookController.AddBook);
router.put('/updateBook/:id', BookController.UpdateBook);
router.delete('/deleteBook/:id', BookController.DeleteBook);
router.get('/getAllBooks', BookController.GetAllBooks);
router.get('/getBooksBySearch/:keyword', BookController.GetBooksBySearch);

module.exports = router;