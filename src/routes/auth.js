const authController = require("../controllers/authController");
const express = require('express');
const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router; 