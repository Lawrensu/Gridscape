const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const router = express.Router();

router.post('/create', createPost); // Create a new post
router.get('/', getPosts); // Get all posts

module.exports = router;