// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const bookRouter = require('./routes/bookRouter');  
const borrowerRouter = require('./routes/borrowerRouter');  
const borrowingRouter = require('./routes/borrowingRouter');  

//Startup
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

//Database
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((error) => {
        console.error('Error synchronizing the database:', error);
    });

// Routes
app.use('/api/books', bookRouter); 
app.use('/api/borrowers', borrowerRouter); 
app.use('/api/borrowings', borrowingRouter); 

// Default route
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found!!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
