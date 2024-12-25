const Borrower = require("../models/borrower")

const BorrowerRepository = {
    AddBorrower: async (borrower) => {
        return await Borrower.create(borrower);
    },

    UpdateBorrower: async (id, borrowerInfo) => {
        return await Borrower.update(borrowerInfo, { 
            where: { id },
            returning: true
         })
    },

    DeleteBorrower: async (id) => {
        return await Borrower.destroy({ where: { id } });
    },

    GetAllBorrowers: async () => {
        return await Borrower.findAll();
    },

    GetBorrowerByEmail: async (email) => {
        return await Borrower.findOne({ where: { email}});
    },
    
    GetBorrowerById: async (id) => {
        return await Borrower.findByPk(id);
    }
};

module.exports = BorrowerRepository;