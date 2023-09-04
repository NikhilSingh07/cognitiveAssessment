const express = require('express');
const router = express.Router();
const {initializeItems, getGamePatterns, itemClicked, nextTrial, getGridModel, testing} = require('../controllers/gameController');
const protect = require('../middleware/authMiddleware');


// expecting shapeGrid, patterns, currentTrail, date, fruitCount and timestamp in the reqest body (and TOKEN in the Header)
router.route('/initializeItems').post(protect, initializeItems);
// responding with message, trial_id, click_number, current_trial, shapeGrid and patterns


// expecting patterns and currentTrail in the request body. (and Token in the Header)
router.route('/getPatterns').post(protect, getGamePatterns);

// expecting trial_id, click_number, shapeGrid, patterns, fruitCount, currentTrial, clickedShapeId amd timestamp in the request body.  (and token in the Header)
router.route('/clickedItem').post(protect, itemClicked);
// responding with trial_id, click_number, currentTrial, fruitCount and shapeGrid

// expecting shapeGrid, patterns, fruitCount, trial_id, currentTrial, date and timestamp in the request body (and TOKEN in the header).
router.route('/next-trial').post(protect, nextTrial);
// responding with trial_id(new trial id), shapeGrid, patterns, fruitCount and currentTrial


// THOUGHTS: to ceate a new trial_id (new record) for each trial.
//router.route('/getGridModel').get(protect, getGridModel);

router.route('/testing').get(testing);

module.exports = router;


