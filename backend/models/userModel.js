const shapeGrid = require('../models/gameModel');
const patterns = require('../models/gamePattern');
const {getFruitCount, getCurrentTrial}  = require('../utils/gameUtils');
const pool = require('../database/database');
const jwt = require('jsonwebtoken');
const path = require("path"); 
const dotenv = require("dotenv");
const envPath = path.join(__dirname, '..','.env');
dotenv.config({ path: envPath });

const registerUser = async (req, res) =>{

    //console.log("register called!");
    try{
       console.log(req.body);
        
        const { age, sex,qualifications, language_proficiency, vision, handedness, country, city, ethnicity,  device_information, disability} = req.body;

// Parse the dob string into a Date object
const parsedAge = parseInt(age);

if (
    !isNaN(parsedAge) &&  parsedAge >= 0 &&  parsedAge <= 150 &&
    sex !== undefined && typeof sex === "string" && sex.trim() !== "" &&
    qualifications !== undefined && typeof qualifications === "string" && qualifications.trim() !== "" &&
    language_proficiency !== undefined && typeof language_proficiency === "string" && language_proficiency.trim() !== "" &&
    vision !== undefined && typeof vision === "string" && vision.trim() !== "" &&
    handedness !== undefined && typeof handedness === "string" && handedness.trim() !== "" &&
    country !== undefined && typeof country === "string" && country.trim() !== "" &&
    city !== undefined && typeof city === "string" && city.trim() !== "" &&
    ethnicity !== undefined && typeof ethnicity === "string" && ethnicity.trim() !== "" &&
    device_information !== undefined && typeof device_information === "string" && device_information.trim() !== "" &&
    disability !== undefined && typeof disability === "string" && disability.trim() !== ""
) {

    console.log("here 0");
    //const { age, sex, qualifications, language_proficiency, vision, handedness, country, city, ethnicity, device_information, disability } = req.body;
    const newUser = await pool.query(
        "INSERT INTO users (age, sex, qualifications, language_proficiency, vision, handedness, country, city, ethnicity, device_information, disability) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
        [parsedAge, sex, qualifications, language_proficiency, vision, handedness, country, city, ethnicity, device_information, disability]
    );

    console.log("here 1");
    
        const user_id = newUser.rows[0].user_id;
      /*  res.json({ message: "user registration succesful", 
                    user_id: user_id });*/
                    console.log("here 2");

        const accessToken = generateAccessToken(user_id);  
        res.json({message: "User registration and auto login succesful", accessToken: accessToken, shapeGrid: shapeGrid, patterns: patterns, fruitCount: getFruitCount(), currentTrial: getCurrentTrial()});

        console.log("here 3");
        } else {
            console.log("here 4");
            res.json({message: "form is not complete!."});
        }


    } catch(err) {
        console.log("catch called in register user model");
        console.error(err.message);
    } 
}


const generateAccessToken = (user_id) =>{

    const accessToken = jwt.sign({user_id}, process.env.ACCESS_TOKEN_SECRET);
    return accessToken;
}

const getMe = (req, res) =>{

}
module.exports = {registerUser, getMe};