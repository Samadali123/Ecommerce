const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const secretKey = process.env.JWT_SECRET_KEY;


exports.registeraccount = async function (req, res) {
    try {
        const { username, email, password } = req.body;

        const user = await userModel.findOne({ email: email });

        if(user){
            return res.status(403).json({success : false, message : "User already registered"})
        }
       
       console.log(req.body)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Check if secretKey is defined
        if (!secretKey) {
            throw new Error('JWT_SECRET_KEY environment variable is not set');
        }


        const newUser = await userModel.create({
            username,
            email,
            password : hashedPassword
        });


        const token = jwt.sign({ email: newUser.email, userid: newUser._id },
            secretKey, { algorithm: 'HS256', expiresIn: '1h' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });


        res.status(200).json({success: true, newUser});


    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

};


exports.loginaccount = async(req, res, err) => {
    let { email, password } = req.body

    if(! email || ! password) {
        return res.status(403).json({success : false, message : "Please fill the details"})
    }
    let user = await userModel.findOne({ email })
    if (!user) return res.status(err.status || 500).json({success: false, message : "User not registered, please registered to login account"})

    bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
            res.status(err.status || 500).json({ success: false, message: err.message })
        } else {
            if (result) {
                let token = jwt.sign({ email: user.email, userid: user._id }, secretKey);
                res.cookie("token", token)
                res.status(200).json({success : true, user})

            } else res.status(400).json({success : false, message : "Internal Server Error"})
        }

    });


}


exports.logoutaccount = (req, res) => {
    res.clearCookie("token");
    res.status(201).json({success: true, message : "Logout Account successfully"})

}

exports.shopaccount = (req, res) => {
     try { 
        res.json({success: true, message : "Shop Page"})
     } catch (error) {
           res.status(500).json({success : false , message : "Internal Server Error"})
     }
};





