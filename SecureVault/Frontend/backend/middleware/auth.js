const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Token:", token);

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use decoded
        req.user = { username: decoded.username }; // Assign username from decoded token
        console.log('User:', req.user);
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        console.error('Invalid token:', err);
        return res.status(400).send('Invalid token.'); // Send a response and exit
    }
};

module.exports = authMiddleware;
