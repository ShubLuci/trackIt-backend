const mongoose = require('mongoose')

// Create a User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true    // Enforce Uniqueness
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    location: {
        type: String
    },
    gender: {
        type: String
    },
    birthday: {
        type: Date
    },
    streamingServices: {
        type: [String]
    },
    genres: {
        type: [String]
    },
    movieIds: {
        type: [String]
    },
    showIds: {
        type: [String]
    },
},{timestamps: true});

// Export the User model
module.exports = new mongoose.model('users',userSchema);