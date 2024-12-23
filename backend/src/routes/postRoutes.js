const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const router = express.Router();

router.post('/', createPost); // Create a new post
router.get('/', getPosts); // Get all posts

module.exports = router;