
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "username is required"],
        unique: [true, "username must be unique"],
        minLength: [3, "username must be at least 3 characters"],
    },
    profile : {
         type : String,
         default :  `default.jpg`
    },

    email: {
        type: String,
        lowercase: true,
        required: [true, "email is required "],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [3, "password must be at least 3 characters"],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    mycart :[{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    orders: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Order'
    }],
    resetPasswordToken: String,
    resetPasswordExpire: Date

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);