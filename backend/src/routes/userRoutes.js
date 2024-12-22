// Initialize express router
const express = require('express'); // Import the express library
const { registerUser, loginUser } = require('../controllers/userController'); // Import the user controller
const router = express.Router(); // Create a new router

router.post('/register', registerUser); // Route for user registration
router.post('/login', loginUser); // Route for user login

module.exports = router;