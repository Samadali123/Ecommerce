<<<<<<< HEAD
=======

>>>>>>> 7c0e93e00febba9ffe22a2756a329814e09d5ac2
const mongoose = require('mongoose');

// Order schema to keep track of orders
const orderSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending',
    }
});



<<<<<<< HEAD
module.exports = mongoose.model("Order", orderSchema);
=======
module.exports = mongoose.model("Order", orderSchema);
>>>>>>> 7c0e93e00febba9ffe22a2756a329814e09d5ac2
