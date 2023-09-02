const express = require('express');
const router = express.Router();
const {initializeItems, getGamePatterns, itemClicked, nextTrial, getGridModel} = require('../controllers/gameController');
const protect = require('../middleware/authMiddleware');


// expecting shapeGrid, patterns, currentTrail, fruitCount and timestamp in the reqest body (and TOKEN in the Header)
router.route('/initializeItems').post(protect, initializeItems);
// responding with message, trial_id, click_number, current_trial, shapeGrid and patterns


// expecting patterns and currentTrail in the request body. (and Token in the Header)
router.route('/getPatterns').post(protect, getGamePatterns);

// expecting trial_id, click_number, shapeGrid, patterns, fruitCount, currentTrial, clickedShapeId amd timestamp in the request body.  (and token in the Header)
router.route('/clickedItem').post(protect, itemClicked);


// expecting shapeGrid, patterns, fruitCount, currentTrial and timestamp in the request body (and TOKEN in the header).
router.route('/next-trial').post(protect, nextTrial);

//router.route('/getGridModel').get(protect, getGridModel);

module.exports = router;


