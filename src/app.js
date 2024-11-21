const express = require('express');
const { dbConnection } = require('../config/database');
require('dotenv').config(); // For using env variables in our application

// Import your routes
const userRoutes = require('../routes/userRoutes');

const app = express();

const port = 3000;

// Data from server comes in Readable stream. To read the payload use express.json() in your server
app.use(express.json());

// IIFE for establishing express server and mongodb connection
( async () => {
    try {
        // Establish Mongoose Connection with MongoDB
        await dbConnection();
        // Initialize Express Server
        app.listen(port, () => {
            console.log("SUCCESS > src/app.js > Server Listening at port "+port);
        });
    } catch(err) {
        console.log("ERROR > src/app.js > Server Initialization Failed at port "+port);
    }
})();

// Use your Routes defined in routes folder
app.use("/",userRoutes);