const validator = require('validator');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const {checkGenres,checkStreamingServices} = require('../utils/data')

async function signUpValidator(req,res,next) {
    try{
        const {username,email,password,location,gender,birthday,streamingServices,genres,movieIds,showIds} = req.body;
        
        // Check if email exists in database.
        const response = await User.findOne({email:email},{_id:false,username:true});

        // If email exists, return error 
        if(response) {
            console.log("ERROR > middleware/validateUserRoutes > signUpValidator > Duplicate Email Id");
            res.status(403).send({
                status: "ERROR",
                message:`${email} already exists with username as ${response.username}. Please enter a new email id`
            });
        }
        // Check if email is a valid email. if not return error
        else if(!validator.isEmail(email)){
            console.log(`ERROR > middleware/validateUserRoutes > signUpValidator > Email ${email} is invalid`);
            res.status(403).send({
                status: "ERROR",
                message: `Email ${email} is invalid`
            });
        } 
        // Check if password is a strong password
        else if(!validator.isStrongPassword(password)) {
            console.log('ERROR > middleware/validateUserRoutes > signUpValidator > Not a Strong Password. Re-enter a new password');
            res.status(403).send({
                status: "ERROR",
                message: 'Not a Strong Password. Re-enter a new password',
                passwordRules: { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}
            });
        }
        // Check if the genders are either male, female or trans
        else if(!["male","female","trans"].includes(gender.toLowerCase())) {
            console.log('ERROR > middleware/validateUserRoutes > signUpValidator > Not a valid gender. Gender should be either Male, Female or Trans');
            res.status(403).send({
                status: "ERROR",
                message: 'Not a valid gender. Gender should be either Male, Female or Trans'
            });
        }
        // Check if the entered genres are valid genres are not. Refer utils file
        else if(!checkGenres(genres)){
            console.log('ERROR > middleware/validateUserRoutes > signUpValidator > Invalid genres have been entered. Please enter valid genres');
            res.status(403).send({
                status: "ERROR",
                message: 'Invalid Genres have been entered. Please enter valid genres'
            });
        }
        else if(!checkStreamingServices(streamingServices)){
            console.log('ERROR > middleware/validateUserRoutes > signUpValidator > Invalid Streaming Services entered. Please enter valid Streaming Services');
            res.status(403).send({
                status: "ERROR",
                message: 'Invalid Streaming Services entered. Please enter valid Streaming Services'
            });
        }
        // If all good, proceed to next middleware
        else{
            // Hash the password using bcrypt library
            const hashedPassword = await bcrypt.hash(password,10);
            req.finalBody = {
                username: username,
                email: email,
                password: hashedPassword,
                location: location,
                gender: gender,
                birthday: birthday,
                streamingServices: streamingServices,
                genres: genres,
                movieIds: movieIds,
                showIds: showIds
            }
            console.log("SUCCESS > middleware/validateUserRoutes > signUpValidator > All Validation have been passed.")
            next();  
        }
    } catch (err) {
        console.log("ERROR > middleware/validateUserRoutes > signUpValidator > "+err.message);
        res.status(403).send({
            status: "ERROR",
            message: "middleware/validateUserRoutes > signUpValidator > "+err.message
        });
    }
}

module.exports = {
    signUpValidator
}