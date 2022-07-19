const express = require('express');
const router = express.Router();
const { 
    register,
    login,
    forgotpassword,
    resetpassword,
    refreshToken,
    logout
} = require('../controllers/auth');

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/logout').get(logout);

router.route('/refreshtoken').post(refreshToken);

router.route('/forgotpassword').post(forgotpassword);

router.route('/resetpassword/:resetToken').put(resetpassword)


module.exports = router;
