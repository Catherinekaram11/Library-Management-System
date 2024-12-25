const BorrowerRepository = require("../repositories/borrowerRepository")

const BorrowerService = {
    AddBorrower: async (borrower) => {
        const exstingBorrower = await BorrowerRepository.GetBorrowerByEmail(borrower.email);

        if (exstingBorrower){
            throw new Error(`Borrower with email ${borrower.email} already exists!`);
        }

        await BorrowerRepository.AddBorrower(borrower);
        return borrower;
    },

    UpdateBorrower: async (id, borrowerDetails) => {
    //PLUS: check email is unique
    const [Updatedcount, UpdatedBorrower] = await BorrowerRepository.UpdateBorrower(id, borrowerDetails);

    if (Updatedcount == 0) {
        throw new Error(`Borrower with Id ${id} doesn't exist!`);
    }
    return UpdatedBorrower;
    },

    DeleteBorrower: async (id) => {
        const deletedCount = await BorrowerRepository.DeleteBorrower(id);

        if (deletedCount == 0) {
            throw new Error(`Borrower with Id ${id} doesn't exist!`);
        }
    },

    GetAllBorrowers: async () => {
        const borrowers = await BorrowerRepository.GetAllBorrowers();
        return borrowers.map(borrower => borrower.dataValues);
    }
};

module.exports = BorrowerService;