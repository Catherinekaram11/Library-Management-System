const BookService = require("../services/bookService")
const Joi = require('joi');

const NewBookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().required(),
    available_quantity: Joi.number().optional(),
    shelf_location: Joi.string().required(),
});

const UpdateBookSchema = Joi.object({
    title: Joi.string().optional(),
    author: Joi.string().optional(),
    isbn: Joi.string().optional(),
    available_quantity: Joi.number().optional(),
    shelf_location: Joi.string().optional(),
});

const BookController = {
    AddBook: async (req, res) => {
        try {
            const validation = NewBookSchema.validate(req.body);
            if (validation.error) {
                return res.status(400).json({ success: false, message: validation.error.details });
            }

            const newBook = await BookService.AddBook(req.body);
            return res.status(200).json({ success: true, message: 'Book added successfully !', data: newBook });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to add book.', error: error.message });
        }
    },

    UpdateBook: async (req, res) => {
        try {
            const validation = UpdateBookSchema.validate(req.body);
            if (validation.error) {
                return res.status(400).json({ success: false, message: validation.error.details });
            }
            const updatedBook = await BookService.UpdateBook(req.params.id, req.body);
            return res.status(200).json({ success: true, message: 'Book updated successfully !', data: updatedBook });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to update book.', error: error.message });
        }
    },

    DeleteBook: async (req, res) => {
        try {
            await BookService.DeleteBook(req.params.id);
            return res.status(200).json({ success: true, message: 'Book deleted successfully !'});
        }
        catch (error)
        {
            return res.status(500).json({ success: false, message: 'Failed to delete book.', error: error.message });
        }
    },

    GetAllBooks: async (req, res) => {
        try{
            const books = await BookService.GetAllBooks();
            return res.status(200).json({ success: true, data: books});
        }
        catch (error)
        {
            return res.status(500).json({ success: false, message: 'Failed to get books.', error: error.message });
        }
    },
    
    GetBooksBySearch: async (req, res) => {
        try {
            const books = await BookService.GetBookBySearch(req.params.keyword);
            return res.status(200).json({ success: true, data: books});        
        }
        catch (error)
        {
            return res.status(500).json({ success: false, message: 'Failed to get books.', error: error.message });

        }
    }
};

module.exports = BookController;