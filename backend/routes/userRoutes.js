
const express = require('express');
<<<<<<< HEAD
const { registeraccount, loginaccount, logoutaccount, adminaccount, loginWithGoogle, forgotPassword, updatePassword, changePassword, currentUser, getUserProfile } = require('../controllers/user.controllers');
=======
const { registeraccount, loginaccount, logoutaccount, adminaccount, loginWithGoogle, forgotPassword, updatePassword, changePassword, currentUser, getUserProfile, checkout } = require('../controllers/user.controllers');
>>>>>>> 7c0e93e00febba9ffe22a2756a329814e09d5ac2
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

<<<<<<< HEAD
=======
// /currentuser 
>>>>>>> 7c0e93e00febba9ffe22a2756a329814e09d5ac2
router.get("/currentuser", UserIsLoggedIn, currentUser)


///profile
router.get("/profile", UserIsLoggedIn, getUserProfile);

<<<<<<< HEAD
=======

router.get("/checkout", UserIsLoggedIn, checkout);




>>>>>>> 7c0e93e00febba9ffe22a2756a329814e09d5ac2
module.exports = router;