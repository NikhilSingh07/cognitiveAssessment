const express = require('express');
const router = express.Router();
const {registerUser, getMe} = require('../models/userModel');




/*

POST http://localhost:3000/user/register

 EXPECTING: below information in JSON

   1. age
   2. sex,
   3. qualifications,
   4. language_proficiency,
   5. vision,
   6. handedness,
   7. country,
   8. city,
   9. ethnicity,
   10. device_information,
   11. disability


   RETURNING (JSON): 
   1. message
   2. accessToken (to be stored in the headers and sent by client with each API call),
   3. shapeGrid (to be saved in the session storage)
   4. patterns (to be saved in the session storage)
   5. fruitCount (to be saved in the session storage)
   6. currentTrial (to be saved in the session storage)
*/
router.route('/register').post(registerUser);



//router.route('/me').get(getMe);

module.exports = router;