const req = require("express/lib/request");
const BorrowingService = require("../services/borrowingService");
const Joi = require('joi');

const BorrowingSchema = Joi.object({
    book_id: Joi.number().required(),
    borrower_id: Joi.number().required()
});

const BorrowingController = {
    CheckOut: async (req,res) => {
        try {
            const validation = BorrowingSchema.validate(req.body);
            if (validation.error) {
                return res.status(400).json({ success: false, message: validation.error.details});
            }

            const newBorrowing = await BorrowingService.CheckOut(req.body);
            return res.status(200).json({ success: true, message: 'Book borrowed successfully !', data: newBorrowing });
        }
        catch (error)
        {
            return res.status(500).json({ success: false, message: 'Failed to checkout book.', error: error.message });
        }
    },

    ReturnBook: async (req, res) => {
        try {
            const validation = BorrowingSchema.validate(req.body);
            if (validation.error){
                return res.status(400).json({ success: false, message: validation.error.details});
            }

            const updatedBorrowing = await BorrowingService.ReturnBook(req.body);
            return res.status(200).json({ success: true, message: 'Book returned successfully !', data: updatedBorrowing });
        }
        catch (error)
        {
            return res.status(500).json({ success: false, message: 'Failed to return book.', error: error.message });
        }
    },

    GetBooksForBorrower: async (req, res) => {
        try {
            const books = await BorrowingService.GetBooksForBorrower(req.params.id);
            return res.status(200).json({ success: true, data: books });
        }
        catch (error)
        {
            return res.status(500).json({ success: false, message: 'Failed to get books.', error: error.message });
        }
    },
    
    GetOverdueBooks: async (req, res) => {
        try {
            const books = await BorrowingService.GetOverdueBooks();
            return res.status(200).json({ success: true, data: books });
        }
        catch (error){
            return res.status(500).json({ success: false, message: 'Failed to get books.', error: error.message });
        }
    }
};

module.exports = BorrowingController;