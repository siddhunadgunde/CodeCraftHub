// Import the Express framework to create a router
const express = require('express');

// Import user controller functions for handling registration and login
const { registerUser, loginUser } = require('../controllers/userController');

// Create a new Express router instance
const router = express.Router();

// Route for user registration
// This endpoint allows new users to register by sending their details
router.post('/register', registerUser);

// Route for user login
// This endpoint allows existing users to log in with their credentials
router.post('/login', loginUser);

// Export the router so it can be used in other parts of the application
module.exports = router;