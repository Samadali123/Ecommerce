const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
const userModel = require("../models/user.model")

config();

const secretKey = process.env.JWT_SECRET_KEY;

// Middleware to check if user is logged in
exports.UserIsLoggedIn = (req, res, next) => {
    // Check for token in query, cookies, or authorization header
    const token = req.query.token || req.cookies.token || req.body.token;

    if (!token) {
        return res.status(401).json({ success: false, message: "You don't have a token. Please sign in to continue." });
    }

    try {
        const data = jwt.verify(token, secretKey);
        req.user = data;
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(401).json({ success: false, message: "Invalid token. Please sign in again." });
    }
}

// Middleware to check if admin is logged in
exports.AdminIsLoggedIn = async (req, res, next) => {
    // Check for token in query, cookies, body, or authorization header
    const token = req.query.token || req.cookies.token || req.body.token ;
    if (!token) {
        return res.status(401).json({ success: false, message: "You don't have a token. Please sign in to continue." });
    }

    try {
        const user = await userModel.findOne({email : req.user.email});
        if(! user.isAdmin){
            return res.status(401).json({ success: false, message: "Only Admins can create products." });
        }
        const data = jwt.verify(token, secretKey);
        req.user = data;
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(401).json({ success: false, message: "Invalid token. Please sign in again." });
    }
}
