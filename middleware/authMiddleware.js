const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT tokens
const authenticate = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.headers['authorization'];

    // Check if the token is provided
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }

        // If the token is valid, save the decoded user information to the request object
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = { authenticate };