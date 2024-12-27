const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, upload.single('file'), createPost); // Create a new post
router.get('/', getPosts); // Get all posts

module.exports = router;