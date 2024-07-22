const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        console.log('Extracted Token:', token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Attach the decoded user information to the request object
            console.log("req use", req.user);
            next();
        } catch (error) {
            res.status(400).json({ message: 'Invalid token.' });
        }
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying token"
        });
    }
};