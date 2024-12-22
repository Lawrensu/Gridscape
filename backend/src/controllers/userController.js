// Import the required libraries and the Prisma client
// Create the user registration and login routes
// Use the Prisma client to interact with the database
// Use JWT to create and verify tokens
const { PrismaClient } = require('@prisma/client'); // Import the Prisma client
const prisma = new PrismaClient(); // Instantiate the Prisma client
const jwt = require('jsonwebtoken'); // Import the JWT library  

// User Registration
const registerUser = async (req, res) => { // Route for user registration
    const { email, password, secretCode } = req.body; // Get the email, password, and secret code from the request body

    if (secretCode !== process.env.SECRET_CODE) { // Check if the secret code is valid
        return res.status(401).send('Invalid secret code'); // If the secret code is invalid, return 401 (Unauthorized)
    }

    const user = await prisma.user.create({ // Create a new user
        data: { // with the following data
            email, // email
            password // password
        } 
    });
    res.json(user); // Return the created user
};


// User Login
const loginUser = async (req, res) => { // Route for user login
    const { email, password } = req.body; // Get the email and password from the request body
    const user = await prisma.user.findUnique({ // Find a user with the specified email
        where: { email }
    });

    if (!user) { // If the user does not exist
        return res.status(401).send('Invalid Credentials'); // If the user does not exist, return 401 (Unauthorized)
    }

    const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET); // Create a JWT with the user ID
    res.json({ token }); // Return the JWT
};

module.exports = { registerUser, loginUser }; // Export the functions