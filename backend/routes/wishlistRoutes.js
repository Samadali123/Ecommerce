const express = require("express");
const { UserIsLoggedIn } = require("../middlewares/auth.middleware");
const { addToWishList, removeFromWishlist, userWishlist } = require("../controllers/wishlist.controllers");
const router = express.Router();

// /add
 router.put("/add", UserIsLoggedIn, addToWishList)


// /remove
router.put("/remove", UserIsLoggedIn, removeFromWishlist)


// /view
router.get("/view", UserIsLoggedIn,  userWishlist)


<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;







>>>>>>> 7c0e93e00febba9ffe22a2756a329814e09d5ac2
