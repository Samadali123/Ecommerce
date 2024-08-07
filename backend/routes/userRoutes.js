const express = require('express');
const { registeraccount, loginaccount, logoutaccount, shopaccount } = require('../controllers/user.controllers');
const IsLoggedIn = require('../middlewares/auth.middleware');
const router = express.Router();

// register account
router.post("/register",   registeraccount)

router.post("/login", loginaccount)

router.get("/logout", logoutaccount)

router.get("/shop", IsLoggedIn, shopaccount);

module.exports = router



