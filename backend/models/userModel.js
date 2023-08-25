const pool = require('../database/database');
const jwt = require('jsonwebtoken');
const path = require("path"); 
const dotenv = require("dotenv");
const envPath = path.join(__dirname, '..','.env');
dotenv.config({ path: envPath });

const registerUser = async (req, res) =>{

    try{
        console.log(req.body);
        
        const { age, sex, ethnicity, highest_qualification, device_information, handedness } = req.body;

        if (
            age !== undefined && typeof age === "number" && age > 0 &&
            sex !== undefined && typeof sex === "string" && sex.trim() !== "" &&
            ethnicity !== undefined && typeof ethnicity === "string" && ethnicity.trim() !== "" &&
            highest_qualification !== undefined && typeof highest_qualification === "string" && highest_qualification.trim() !== "" &&
            device_information !== undefined && typeof device_information === "string" && device_information.trim() !== "" &&
            handedness !== undefined && typeof handedness == "string" && handedness.trim() !== ""
        ) {

            const {age, sex, ethnicity, highest_qualification, device_information, handedness} = req.body;
            const newUser = await pool.query(
                "INSERT INTO users (age, sex, ethnicity, highest_education, device_information, handedness) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                [age, sex, ethnicity, highest_qualification, device_information, handedness]
            );

    
        const user_id = newUser.rows[0].user_id;
      /*  res.json({ message: "user registration succesful", 
                    user_id: user_id });*/

        const accessToken = generateAccessToken(user_id);  
        res.json({message: "User registration and auto Login succesful", accessToken: accessToken});


        } else {

            res.json({message: "form is not complete!."});
        }


    } catch(err) {

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