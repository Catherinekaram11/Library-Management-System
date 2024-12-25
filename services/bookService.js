const BookRepository = require("../repositories/bookRepository");

const BookService = {
    AddBook: async (book) => {
        const existingBook = await BookRepository.GetBookByISBN(book.isbn);
 
        if (existingBook) {
            throw new Error(`Book with ISBN ${book.isbn} already exists!`);
        }

        book.title = book.title.trim();
        book.author = book.author.trim();

        await BookRepository.AddBook(book);
        return book;
    },

    UpdateBook: async (id, bookDetails) => {
        //PLUS: check ISBN is unique
        const [Updatedcount, UpdatedBook] = await BookRepository.UpdateBook(id, bookDetails);

        if (Updatedcount == 0) {
            throw new Error(`Book with Id ${id} doesn't exist!`);
        }

        return UpdatedBook;
    },

    DeleteBook: async (id) => {
        const deletedCount = await BookRepository.DeleteBook(id);

        if (deletedCount == 0) {
            throw new Error(`Book with Id ${id} doesn't exist!`);
        }
        return;
    },

    GetAllBooks: async () => {
        const books = await BookRepository.GetAllBooks();
        return books.map(book => book.dataValues);
    },

    GetBookBySearch: async(data) => {
        const books = await BookRepository.GetBookBySearch(data);
        return books.map(book => book.dataValues);
    }
};

module.exports = BookService;