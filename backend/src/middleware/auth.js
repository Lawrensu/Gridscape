// Desc: Middleware to authenticate the user
// Auth: Jayeola Abass
const jwt = require('jsonwebtoken'); // for creating and verifying JWTs

const authenticateToken = (req, res, next) => { // Middleware to authenticate the user
    const token = req.headers['authorization']; // Get the token from the request headers
    if (!token) return res.sendStatus(401); // If there is no token, return 401 (Unauthorized)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { // Verify the token
        if (err) return res.sendStatus(403); // If the token is invalid, return 403 (Forbidden)
        req.user = user; // Set the user in the request object
        next(); // Call the next middleware
    });
}

module.exports = authenticateToken; // Export the middleware