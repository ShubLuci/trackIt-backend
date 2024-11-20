const express = require('express');
const { dbConnection } = require('../config/database');
require('dotenv').config(); // For using env variables in our application

const app = express();

const port = 3000;

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