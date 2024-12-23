// Code for the server
// Importing the required modules
const express = require('express'); // for creating the server
const bodyParser = require('body-parser'); // for parsing incoming request bodies
const cors = require('cors'); // for enabling CORS (Cross-Origin Resource Sharing)
const { PrismaClient } = require('@prisma/client'); // for interacting with the database
const jwt = require('jsonwebtoken'); // for creating and verifying JWTs
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes'); // Import post routes
const commentRoutes = require('./routes/commentRoutes'); // Import comment routes
const authenticateToken = require('./middleware/auth.js'); // for authenticating requests

const app = express(); // create the server
const prisma = new PrismaClient(); // instantiate the Prisma client

app.use(bodyParser.json()); // parse incoming request bodies as JSON
app.use(cors()); // enable CORS


app.use('/api/users', userRoutes); // use the user routes   

app.use('/api/posts', authenticateToken, postRoutes); // Protect the post routes with the authenticateToken middleware
app.use('/api/comments', authenticateToken, commentRoutes); // Protect the comment routes with the authenticateToken middleware


// User Registration
app.post('/register', async (req, res) => { // Route for user registration
    const {email, password, secretCode} = req.body; // Get the email, password, and secret code from the request body
    
    if (secretCode !== process.env.SECRET_CODE) { // Check if the secret code is valid
        return res.status(401).send('Invalid secret code'); // If the secret code is invalid, return 401 (Unauthorized)
    }

    const user = await prisma.user.create({ // Create a new user
        data: { // with the following data
            email, // email
            password // password
        }
    })
    res.json(user); // Return the created user
});


// User Login
// JWT is for authentication and authorization
// JWT is used to create a token that can be used to authenticate requests
// The token is generated when the user logs in
// The token is then sent to the server with every request
// The server verifies the token to authenticate the user
// The token is created using the user ID
// The token is verified using the secret key
// The token is sent in the Authorization header
// The token is verified using the authenticateToken middleware
// The user ID is extracted from the token
// The user ID is used to identify the user
app.post('/login', async (req, res) => { // Route for user login
    const { email, password } = req.body; // Get the email and password from the request body
    const user = await prisma.user.findUnique({ // Find a user with the specified email
        where: { email }
    });

    if (!user) { // If the user does not exist
        return res.status(401).send('Invalid Credentials'); // If the user does not exist, return 401 (Unauthorized)
    }

    const token = jwt.sign({ userId: user_id }, process.env.ACCESS_TOKEN_SECRET); // Create a JWT with the user ID
    res.json({ token }); // Return the JWT
});


// Create a new posts
app.post('/posts', authenticateToken, async (req, res) => { // Route for creating a new post
    const { title, content } = req.body; // Get the title and content from the request body
    const post = await prisma.post.create({ // Create a new post 
        data: {
            title,
            content, // with the title, content
            authorId: req.user.userId // Set the author ID to the user ID
        }})
})


// Get all posts
app.get('/posts', async (req, res) => { // Route for getting all posts
    const posts = await prisma.post.findMany({ // Find all posts
        include: {author: true, comments: true}, // Include the author and comments
    });
    res.json(posts); // Return the posts
});


// Add a comment 
app.post('/comments', authenticateToken, async (req, res) => { // Route for adding a comment
    const { content, postId } = req.body; // Get the content and post ID from the request body
    const comment = await prisma.comment.create({ // Create a new comment
        data: {
            content,
            postId, 
            authorId: req.user.userId,
        },
    });
    req.json(comment);
});


// Delete a comment (for admin)
app.delete('/comments/:id', authenticateToken, async (req, res) => { // Route for deleting a comment
    const { id } = req.params; // Get the comment ID from the request parameters 
    await prisma.comment.delete({ // Delete the comment
        where: { id: parseInt(id) }, // with the specified ID
    });
    res.sendStatus(204); // Return 204 (No Content)
});


// Delete a post (for admin)
app.delete('/comments/:id', authenticateToken, async (req, res) => {
    const { id } = req.params; // Get the post ID from the request parameters
    await prisma.post.delete({ // Delete the post
        where: { id: parseInt(id) }, // with the specified ID
    });
    res.sendStatus(204); // Return 204 (No Content)
});


// Delete a user (for admin)
app.delete('/users/:id', authenticateToken, async (req, res) => { // Route for deleting a user
    const { id } = req.params; // Get the user ID from the request parameters
    await prisma.user.delete({ // Delete the user
        where: { id: parseInt(id) }, // with the specified ID
    });
    res.sendStatus(204); // Return 204 (No Content)
});


// Defining the routes for the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});