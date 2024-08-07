const jwt = require("jsonwebtoken")
const { config } = require('dotenv');
//call the environment varibles set in  env
config();


const secretKey = process.env.JWT_SECRET_KEY;

function IsLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({success : false, message : "Please sign in to continue"})

    }
    
    try {
        const data = jwt.verify(token, secretKey);
        req.user = data;
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(500).json({success : false, message : "Internal Server Error"})
    }
}



module.exports = IsLoggedIn;