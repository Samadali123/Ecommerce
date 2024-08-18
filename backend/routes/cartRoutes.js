const express = require('express');
const { UserIsLoggedIn } = require('../middlewares/auth.middleware');
const { addToCart, removeFromCart} = require('../controllers/cart.controllers');
const router = express.Router();


// /add
router.post("/add", UserIsLoggedIn, addToCart);

// /remove
router.put("/remove", UserIsLoggedIn, removeFromCart);


module.exports = router