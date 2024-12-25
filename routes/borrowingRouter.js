const express = require('express');
const router = express.Router();
const BorrowingController = require('../controllers/borrowingController');

router.post('/checkOut', BorrowingController.CheckOut);
router.put('/returnBook', BorrowingController.ReturnBook);
router.get('/getBooks/:id', BorrowingController.GetBooksForBorrower);
router.get('/getOverdueBooks', BorrowingController.GetOverdueBooks);

module.exports = router;