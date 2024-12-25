const Book = require("../models/book");
const Borrowing = require("../models/borrowing");
const BorrowingStatus = require("../models/borrowingStatus");
const { Op } = require('sequelize');


const BorrowingRepository = {
    AddBorrowing: async (borrowing) => {
        return await Borrowing.create(borrowing);
    },

    UpdateBorrowing: async (id, borrowingInfo) => {
        return await Borrowing.update(borrowingInfo, {
            where: { id },
            returning: true
        });
    },

    GetBorrowingByBookAndBorrower: async (book_id, borrower_id) =>{
        return await Borrowing.findOne({where: { book_id, borrower_id}});
    },

    GetBooksForBorrower: async (borrower_id) => {
        return await Borrowing.findAll({
            where: {
                        borrower_id, 
                        status: [BorrowingStatus.CHECKED_OUT, BorrowingStatus.OVERDUE]
                    },
            include: [Book]
        });
    },

    GetOverdueBooks: async (date) => {
        return await Borrowing.findAll({
            where:{
                return_date: null,
                due_date: { [Op.lte] : date}
                  },
            include: [Book]
        });
    }
};

module.exports = BorrowingRepository;