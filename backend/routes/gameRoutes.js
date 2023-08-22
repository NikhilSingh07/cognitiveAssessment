const express = require('express');
const router = express.Router();
const {initializeItems, getGamePatterns, itemClicked, nextTrial} = require('../controllers/gameController');


router.route('/initializeItems').get(initializeItems);
router.route('/getPatterns').get(getGamePatterns);
router.route('/clickedItem').post(itemClicked);
router.route('/next-trial').get(nextTrial);
//router.route('/submitFormData').post(submitFormData);

module.exports = router;


