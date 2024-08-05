const express = require('express');
const router = express.Router();

const authController = require('../controllers/authControllers');
const { body } = require('express-validator');

router.post('/api/create-user', [
    body('EmailId', 'Invalid Email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })
], authController.createUser);

router.post('/api/login-user', [
    body('EmailId', 'Invalid Email').isEmail(),
    body('password', 'Invalid password').isLength({ min: 5 })
], authController.loginUser);

module.exports = router;