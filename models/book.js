const sequelize = require('../config/database');
const DataTypes = require('sequelize');
const Borrowing = require('./borrowing');

const Book = sequelize.define('book', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    author: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isbn: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    available_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    shelf_location: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},
    {
        timestamps: false
    }
);
Book.hasMany(Borrowing, { foreignKey: 'book_id' });
Borrowing.belongsTo(Book, { foreignKey: 'book_id' });

module.exports = Book;


