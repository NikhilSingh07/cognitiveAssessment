const jwt = require('jsonwebtoken');
const asyncHandler= require('express-async-handler');
const path = require('path');
const dotenv = require("dotenv");
const envPath = path.join(__dirname, '..','.env');
dotenv.config({ path: envPath });


const protect = asyncHandler((req, res, next) =>{

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try {

            // Get token from the request header.
            token = req.headers.authorization.split(' ')[1];

            
            // Verify the token using a secret key.
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            
           // Get the user_id from the decoded token and attach it to the request object.
            req.user_id = decoded.user_id;

            // Call the next middleware or route handler.
            next();

        } catch (error) {      
            console.log(error.message);
            res.status(401);
            throw new Error('Not authorized');
        }
    }
    if(!token) {

        // If there's no token in the header, return an unauthorized response.
        res.status(401);
        throw new Error('Not authorized, no token.');
    }

});


module.exports = protect;