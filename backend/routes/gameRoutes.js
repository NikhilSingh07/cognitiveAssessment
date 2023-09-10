const express = require('express');
const router = express.Router();
const {initializeItems, getGamePatterns, itemClicked, nextTrial, getGridModel, testing} = require('../controllers/gameController');
const protect = require('../middleware/authMiddleware');



/*  
    POST http://localhost:3000/assessment/initializeItems

    EXPECTING: TOKEN (in headers) 
               and below information in the JSON's request body.

    1. shapeGrid
    2. patterns
    3. currentTrail
    4. fruitCount
    5. date
    6. timestamp

    RETURNING (JSON): 

    1. message
    2. shapeGrid   (to be updated in the session storage)
    3. patterns    (to be updated in the session storage)
    4. trial_id    (to be stored in the session storage)
    5. currentTrial  (to be updated in the session storage)
    6. click_number (to be stored in the session storage)

*/

router.route('/initializeItems').post(protect, initializeItems);



/*  POST http://localhost:3000/assessment/getPatterns
      
    expecting: TOKEN (in headers) 
               and below information in the JSON's request body.

    1. currentTrial,
    2. patterns,
    
*/

router.route('/getPatterns').post(protect, getGamePatterns);


/*
    POST http://localhost:3000/assessment/clickedItem

    EXPECTING: TOKEN (in headers) 
               and below information in the JSON's request body.

    1. shapeGrid
    2. patterns
    3. trial_id
    4. currentTrial
    5. click_number    
    6. clickedShapeId  
    7. fruitCount
    8. timestamp

    RETURNING (JSON):

    1. trial_id (NO NEED to update in the session storage as trial id will remain same for the current trial. It will change when user enter's the next trial)
    2. currentTrial (NO NEED to update in the session storage)

    3. click_number (to be updated in the session storage)
    4. fruitCount (to be updated in the session storage)
    5. shapeGrid (to be updated in the session storage)

*/

router.route('/clickedItem').post(protect, itemClicked);


/*
    POST http://localhost:3000/assessment/next-trial 

    EXPECTING: TOKEN (in headers) 
               and below information in the JSON's request body.

    1. shapeGrid
    2. patterns
    3. trial_id
    4. currentTrial
    5. fruitCount
    6. date
    7. timestamp  
    
    RETURNING (JSON): 

    1. trial_id (to be updated in the session storage)
    2. currentTrial (to be updated in the session storage)
    2. shapeGrid (to be updated in the session storage)
    3. patterns (to be updated in the session storage)
    4. fruitCount (to be updated in the session storage)
    5. click_number: (to be updated in the session storage)	
*/

router.route('/next-trial').post(protect, nextTrial);


router.route('/testing').get(testing);

module.exports = router;


