
const express = require('express');
const { registeraccount, loginaccount, logoutaccount, adminaccount, loginWithGoogle, forgotPassword, updatePassword, changePassword, currentUser, getUserProfile, checkout } = require('../controllers/user.controllers');
const { UserIsLoggedIn } = require('../middlewares/auth.middleware');
const router = express.Router();

//register account
router.post('/register', registeraccount);

//Login account
router.post('/login', loginaccount);

//google/login
router.post('/google/login', loginWithGoogle);

//logout
router.get("/logout",UserIsLoggedIn , logoutaccount)

// /forgotpassword
router.post('/forgotpassword',  forgotPassword);

// /updatepassword/token
router.put('/updatepassword', updatePassword);

// /resetpassword
router.put("/resetpassword", UserIsLoggedIn, changePassword);

// /currentuser 
router.get("/currentuser", UserIsLoggedIn, currentUser)


///profile
router.get("/profile", UserIsLoggedIn, getUserProfile);


router.get("/checkout", UserIsLoggedIn, checkout);




module.exports = router;