const mongoose = require('mongoose');

// Establish MongoDB Atlas Connection with our application
async function dbConnection() {
    try {
        // MongoDB Atlas Connection String
        const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@shubhamcluster.d74kk.mongodb.net/trackit`;
        // Establish mongoose connection 
        await mongoose.connect(connectionString);
        console.log("SUCCESS > config/database.js > MONGODB CONNECTION SUCCESSFUL");
    } catch(err) {
        console.log("ERROR > config/database.js > UNABLE TO CONNECT TO MONGODB SERVER ");
        let error = {
            statusCode: 400,
            name: err.name,
            message: err.message
        }
        console.table(error);
    }
}

// Export the required functions
module.exports = {
    dbConnection
}