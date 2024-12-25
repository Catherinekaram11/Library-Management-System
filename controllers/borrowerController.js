const BorrowerService = require("../services/borrowerService");
const Joi = require('joi');

const BorrowerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
    register_date: Joi.date().optional().allow(null)
});

const BorrowerController = {
    AddBorrower: async (req, res) => {
        try {
            const validation = BorrowerSchema.validate(req.body);
            if (validation.error) {
                return res.status(400).json({ success: false, message: validation.error.details });
            }

            const newBorrower = await BorrowerService.AddBorrower(req.body);
            return res.status(200).json({ success: true, message: 'Borrower added successfully !', data: newBorrower });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to add Borrower.', error: error.message });
        }
    },

    UpdateBorrwer: async (req, res) => {
        try {
            const updatedBorrower = await BorrowerService.UpdateBorrower(req.params.id, req.body);
            return res.status(200).json({ success: true, message: 'Borrower updated successfully !', data: updatedBorrower });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to update Borrower.', error: error.message });
        }
    },

    DeleteBorrower: async (req, res) => {
        try {
            await BorrowerService.DeleteBorrower(req.params.id);
            return res.status(200).json({ success: true, message: 'Borrower deleted successfully !'});
        }
        catch (error)
        {
            return res.status(500).json({ success: false, message: 'Failed to delete Borrower.', error: error.message });
        }
    },
    
    GetAllBorrowers: async (req, res) => {
        try{
            const borrowers = await BorrowerService.GetAllBorrowers();
            return res.status(200).json({ success: true, data: borrowers});
        }
        catch (error)
        {
            return res.status(500).json({ success: false, message: 'Failed to get Borrowers.', error: error.message });
        }
    }
};

module.exports = BorrowerController;