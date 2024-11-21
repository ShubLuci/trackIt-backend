const express = require('express');
const Users = require('../models/users');
const {signUpValidator} = require('../middleware/validateUserRoutes');
// Define your Routes
const userRoutes = express.Router();


userRoutes.post('/signUp',signUpValidator, async (req,res,next) => {
    try{
        const userData = new Users(req.finalBody);
        const response = await userData.save();
        res.send(response);
    } catch(err) {
        res.status(400).send("Error Occured "+err.message)
    }
});

module.exports = userRoutes;