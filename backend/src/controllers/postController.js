const { PrismaClient } = require('@prisma/client'); // Import the Prisma client
const prisma = new PrismaClient(); // Instantiate the Prisma client

const createPost = async (req, res) => { // Route for creating a new post
    const { title, content } = req.body; // Get the title and content from the request body
    const post = await prisma.post.create({ // Create a new post
        data: { // with the following data
            title, 
            content,
            authorId: req.user.userId
        }
    });
    res.json(post); // Return the created post
};


const getPosts = async (req, res) => { // Route for getting all posts
    const posts = await prisma.post.findMany(); // Find all posts
    res.json(posts); // Return the posts
};

module.exports = { createPost, getPosts }; // Export the functions

