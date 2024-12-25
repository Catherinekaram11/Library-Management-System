const BorrowerRepository = require("../repositories/borrowerRepository")
const BookRepository = require("../repositories/bookRepository");
const BorrowingRepository = require("../repositories/borrowingRepository");
const BorrowingStatus = require ("../models/borrowingStatus")

const BorrowingService = {
    CheckOut: async (borrowingInfo) => {
        const existingBorrowing = await BorrowingRepository.GetBorrowingByBookAndBorrower(borrowingInfo.book_id, borrowingInfo.borrower_id);
        if (existingBorrowing && existingBorrowing.status == BorrowingStatus.CHECKED_OUT)
        {
            throw new Error (`Book ${borrowingInfo.book_id} is already borrowed by borrower.`);
        }
        const borrower = await BorrowerRepository.GetBorrowerById(borrowingInfo.borrower_id);
        if (!borrower){
            throw new Error (`Borrower with Id ${borrowingInfo.borrower_id} doesn't exits`);
        }
        //PLUS: check if borrower has any due books, then don't allow a new borrowing
        const book = await BookRepository.GetBookById(borrowingInfo.book_id);
        if (!book){
            throw new Error (`Book with Id ${borrowingInfo.book_id} doesn't exits`);
        }
            
        if (book.toJSON().available_quantity <= 0) {
            throw new Error (`Book with Id ${borrowingInfo.book_id} is not available now.`);
        }

        //Borrowing Process
        const borrowing = await BorrowingRepository.AddBorrowing({
            book_id: book.id,
            borrower_id: borrower.id,
            checkout_date : new Date(),
            due_date: addDays(14)
        });
        await BookRepository.UpdateBook(book.id, {
            available_quantity : book.available_quantity - 1
        });
        return borrowing;
    },

    ReturnBook: async (borrowingInfo) => {
        const borrowing = await BorrowingRepository.GetBorrowingByBookAndBorrower(borrowingInfo.book_id, borrowingInfo.borrower_id);
        if (!borrowing){
            throw new Error (`Borrowing for book ${borrowingInfo.book_id} and borrower ${borrowingInfo.borrower_id} doesn't exist.`)
        }
        if (borrowing.status == BorrowingStatus.RETURNED){
            throw new Error (`Borrowing already returned.`);
        }
        else{
            //Return process
            const updatedBorrowing = await BorrowingRepository.UpdateBorrowing(borrowing.id, 
                {
                    return_date: new Date(),
                    status: BorrowingStatus.RETURNED
                }
            );
            const ReturnedBook = await BookRepository.GetBookById(borrowingInfo.book_id); 
            await BookRepository.UpdateBook(ReturnedBook.id, 
                {
                    available_quantity: ReturnedBook.available_quantity + 1
                }
            );
            return updatedBorrowing;
        }
    },

    GetBooksForBorrower: async (borrower_id) =>{
        return await BorrowingRepository.GetBooksForBorrower(borrower_id);
    },

    GetOverdueBooks: async () => {
        const date = new Date();
        return await BorrowingRepository.GetOverdueBooks(date);
    }
};

const addDays = (days) =>
{
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}

module.exports = BorrowingService;