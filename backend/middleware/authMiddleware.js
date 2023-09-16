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

            // Get token from header.
            token = req.headers.authorization.split(' ')[1];

            
            // Verify the token.
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
           // console.log("decoded: "+decoded);
            // Get user_id from the token.
            req.user_id = decoded.user_id;
            next();

        } catch (error) {
            
            console.log(error.message);
            res.status(401);
            throw new Error('Not authorized');
        }
    }

    if(!token) {

        res.status(401);
        throw new Error('Not authorized, no token.');
    }

});


module.exports = protect;