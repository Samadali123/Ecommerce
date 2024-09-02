
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const secretKey = process.env.JWT_SECRET_KEY;
const crypto = require('crypto');

const nodemailer = require('nodemailer');



exports.registeraccount = async (req, res) => {
    try {
        const { username, email, password ,isAdmin} = req.body;

        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(403).json({ success: false, message: "User already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (!secretKey) {
            throw new Error('JWT_SECRET_KEY environment variable is not set');
        }

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false
        });

        const token = jwt.sign({ email: newUser.email, userid: newUser._id, isAdmin: newUser.isAdmin },
            secretKey, { algorithm: 'HS256', expiresIn: '1h' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).json({ success: true, newUser, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



exports.loginaccount = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(403).json({ success: false, message: "Please fill the details" });
    }
    
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not registered, please register to login" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ email: user.email, userid: user._id, isAdmin: user.isAdmin }, secretKey, { expiresIn: '1h' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).json({ success: true, user, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};




exports.loginWithGoogle = async (req, res, next) => {
    try {
        const { username, email } = req.body;

        if (!username) {
            return res.status(403).json({ success: false, message: "Username is not provided" });
        }

        if (!email) {
            return res.status(403).json({ success: false, message: "Email is not provided" });
        }

        // Check if a user exists with the provided email
        let user = await userModel.findOne({ email });
       
        if (!user) {
            // Register new user
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash("dummyPassword", salt); // Use a placeholder password

            user = await userModel.create({
                username,
                email,
                password,
                isAdmin: false
            });

            // Create a token for the new user
            const token = jwt.sign(
                { email: user.email, userid: user._id, isAdmin: user.isAdmin },
                secretKey,
                { expiresIn: '1h' }
            );

            // Set the token in a cookie
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });

            return res.status(200).json({ success: true, user, token });
        } else {
            // If user exists, check if the username matches
            if (user.username === username  && user.email === email) {
                // Create a token for the existing user
                const token = jwt.sign(
                    { email: user.email, userid: user._id, isAdmin: user.isAdmin },
                    secretKey,
                    { expiresIn: '1h' }
                );

                // Set the token in a cookie
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                });

                return res.status(200).json({ success: true, user, token });
            } else {
                return res.status(403).json({ success: false, message: "Username does not match the email" });
            }
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}




exports.logoutaccount = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout successful" });
};



const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});



exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
        return res.status(403).json({ success: false, message: 'Please enter your email address.' });
    }

    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User with this email does not exist.' });
        }

        // Generate reset token and expiration
        const token = crypto.randomBytes(32).toString('hex');
        const expireDate = Date.now() + 5 * 60 * 1000; // 5 minutes from now


        // Save reset token and expiration to user record
        user.resetPasswordToken = token;
        user.resetPasswordExpire = expireDate;
        await user.save();

        // Construct reset link
        const resetLink = `http://localhost:5173/updatepassword/${token}`; // Ensure this URL is correct
         
        // Set up email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Password Reset</title>
                </head>
                <body>
                    <p>Dear User,</p>
                    <p>We received a request to reset your Apnamart password. Please click the link below to reset your password:</p>
                    <p><a href="${resetLink}" style="color: #007bff; text-decoration: none; font-weight: bold;">Reset your password</a></p>
                    <p>This link will expire in 5 minutes. If you did not request this change, please ignore this email.</p>
                    <p>Best regards,<br>Apnamart Support Team</p>
                    <a>${resetLink}</a>
                </body>
                </html>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Password reset link sent to your email.' });
    } catch (error) {
        console.error('Error in forgotPassword controller:', error.message);
        // Ensure only one response is sent
        if (!res.headersSent) {
            return res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });
        }
    }
};



exports.updatePassword = async (req, res) => {

    const { password, confirmPassword, token } = req.body;


    try {
        if(! token){
            return res.status(401).json({success: false, message: 'PLease provide valid token'})

        }
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match.' });
        }

        // Find user by reset token and check token expiration
        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token.' });
        }

        // Hash the new password and update user record
        user.password = await bcrypt.hash(password, 12);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Password updated successfully.' });
    } catch (error) {
        console.error('Error in updatePassword controller:', error);
        res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });
    }
};



exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.userid; // Assuming user ID is attached to req.user

    if (!currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
   
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'New passwords do not match.' });
    }

    try {
        // Find user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Current password is incorrect, forgot your password' });
        }

        // Hash new password and update user record
        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();

        return res.status(200).json({ success: true, message: 'Password updated successfully.' });

    } catch (error) {
        // Log the error details
        console.error('Error in changePassword controller:', error.message);

        // Check if headers have already been sent
        if (!res.headersSent) {
            return res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });
        }
    }
};
exports.currentUser = async (req, res, next)=>{
    try {
         const user = await userModel.findOne({email : req.user.email})
         if(! user) return res.status(403).json({success : false, message : "User not Found! "})
         res.status(200).json({success : true, user})
    } catch (error) {
         res.status(error.status).json({success : false, message : error.message})
    }
}


exports.getUserProfile = async (req, res) => {
    try {
        // Fetch the logged-in user's email from the request object (assuming JWT middleware adds this)
        const loginUserEmail = req.user.email;

        // Find the user by their email, excluding the password field
        const user = await userModel
            .findOne({ email: loginUserEmail })
            .select('-password') // Exclude the password field
            .populate("mycart")
            .populate("wishlist");

        // If the user is not found, return an error
        if (!user) {
            return res.status(404).json({ success: false, message: "Login User not found" });
        }

        // Send back the user's profile details
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};



exports.checkout = async (req, res) => {
    try {
        const loginUserEmail = req.user.email;

        // Find the logged-in user
        const user = await User.findOne({ email: loginUserEmail }).populate("mycart");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Ensure the cart is not empty
        if (user.mycart.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty" });
        }

        // Calculate total amount
        let totalAmount = 0;
        const orderProducts = user.mycart.map(item => {
            totalAmount += item.product.price * item.quantity;
            return { product: item._id, quantity: item.quantity };
        });

        // Create a new order
        const newOrder = new Order({
            products: orderProducts,
            totalAmount: totalAmount
        });

        // Save the order
        const savedOrder = await newOrder.save();

        // Add the order to the user's order history
        user.orders.push(savedOrder._id);

        // Clear the user's cart
        user.mycart = [];

        // Save the user's updated information
        await user.save();

        // Respond with the newly created order
        res.status(200).json({
            success: true,
            message: "Checkout successful",
            order: savedOrder,
            orders: user.orders
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};



