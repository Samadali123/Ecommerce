const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "Username is required"],
        unique: [true, "Username must be unique"],
        minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        // match: [
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
        //     "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character, and be between 6 and 20 characters long."
        // ]
    },
    // address: {
    //     type: String,
    //     required: [true, "Address is required"]
    // },
    // phone: {
    //     type: String,
    //     required: [true, "Phone number is required"],
    //     match: [/^\d{10,15}$/, 'Please provide a valid phone number']
    // },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);