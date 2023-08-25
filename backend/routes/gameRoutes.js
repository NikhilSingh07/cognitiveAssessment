const express = require('express');
const router = express.Router();
const {initializeItems, getGamePatterns, itemClicked, nextTrial} = require('../controllers/gameController');
const protect = require('../middleware/authMiddleware');

router.route('/initializeItems').get(protect, initializeItems);
router.route('/getPatterns').get(protect, getGamePatterns);
router.route('/clickedItem').post(protect, itemClicked);
router.route('/next-trial').get(protect, nextTrial);

module.exports = router;


