const Book = require("../models/book");
const { Op } = require('sequelize');

const BookRepository = {
    AddBook: async (book) => {
        return await Book.create(book);
    },

    UpdateBook: async (id, bookInfo) => {
        return await Book.update(bookInfo, {
            where: { id },
            returning: true
        });
    },

    DeleteBook: async (id) => {
        return await Book.destroy({ where: { id } });
    },

    GetAllBooks: async () => {
        return await Book.findAll();
    },

    GetBookByISBN: async (bookISBN) => {
        return await Book.findOne({ where: { isbn: bookISBN } });   
    },

    GetBookById: async (id) => {
        return await Book.findByPk(id);
    },
    
    GetBookBySearch: async (searchTerm) => {
       return await Book.findAll({
           where: {
               [Op.or]: [
                   { title: { [Op.iLike]: `%${searchTerm}%` } },
                   { author: { [Op.iLike]: `%${searchTerm}%` } },
                   { isbn: { [Op.iLike]: `%${searchTerm}%` } },
               ],
           },
       });
    }
};

module.exports = BookRepository;