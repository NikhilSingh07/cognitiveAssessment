const express = require('express');
const router = express.Router();
const {registerUser, getMe} = require('../models/userModel');


router.route('/register').post(registerUser);
router.route('/me').get(getMe);

module.exports = router;