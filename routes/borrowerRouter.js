const express = require('express');
const router = express.Router();
const BorrowerController = require('../controllers/borrowerController');


router.post('/addBorrower', BorrowerController.AddBorrower);
router.put('/updateBorrower/:id', BorrowerController.UpdateBorrwer);
router.delete('/deleteBorrower/:id', BorrowerController.DeleteBorrower);
router.get('/getAllBorrowers', BorrowerController.GetAllBorrowers);


module.exports = router;