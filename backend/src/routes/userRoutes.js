const express = require('express');
const { registerUser, loginUser, confirmEmail } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/confirm/:token', confirmEmail); 

module.exports = router;