const express = require('express');
const { UserIsLoggedIn } = require('../middlewares/auth.middleware');
const { addToCart, removeFromCart, viewCart} = require('../controllers/cart.controllers');
const router = express.Router();

// /add
router.post("/add", UserIsLoggedIn, addToCart);

// /remove
router.put("/remove", UserIsLoggedIn, removeFromCart);

<<<<<<< HEAD
// /cart/view
router.get("/view", UserIsLoggedIn, viewCart )
=======
///view
router.get("/view",UserIsLoggedIn, viewCart )
>>>>>>> 39d727a262b267ad1d71ae3592eea26130d925c4


module.exports = router