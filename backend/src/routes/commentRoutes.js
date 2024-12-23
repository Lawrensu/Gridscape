const express = require('express');
const { createComment, getComments } = require('../controllers/commentController');
const router = express.Router();

router.post('/', createComment); // Create a new comment
router.get('/', getComments); // Get all comments

module.exports = router;