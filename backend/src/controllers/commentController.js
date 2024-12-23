const { PrismaClient } = require('@prisma/client'); // Import the Prisma client
const prisma = new PrismaClient(); // Instantiate the Prisma client

const createComment = async (req, res) => { // Route for creating a new comment
    const { content, postId } = req.body; // Get the content and post ID from the request body
    const comment = await prisma.comment.create({
        data: {
            content,
            postId,
            authorId: req.user.userId,
        }
    });
    res.json(comment); // Return the created comment    
};

const getComments = async (req, res) => { // Route for getting all comments
    const comments = await prisma.comment.findMany();
    res.json(comments); // Return the comments
};

module.exports = { createComment, getComments }; // Export the functions