const sequelize = require('../config/database');
const DataTypes = require('sequelize');
const Book = require("./book");
const Borrower = require("./borrower");
const BorrowingStatus = require('./borrowingStatus');

const Borrowing = sequelize.define('borrowing', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    book_id: {
        type: DataTypes.BIGINT,
        refrences: { model: Book, key: 'id' },
        allowNull: false
    },
    borrower_id: {
        type: DataTypes.BIGINT,
        refrences: { model: Borrower, key: 'id' },
        allowNull: false
    },
    checkout_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValues: DataTypes.NOW
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    return_date: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: BorrowingStatus.CHECKED_OUT
    }   
    }, 
{
    timestamps: false
});

module.exports = Borrowing;
