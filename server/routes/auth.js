const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');

const { 
    register,
    login,
    forgotpassword,
    resetpassword,
    refreshToken,
    logout, uploadAvatar, getUserHotels
} = require('../controllers/auth');

const { cloudinary } = require('../cloudinary');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/logout').get(logout);

router.route('/refreshtoken').post(refreshToken);

router.route('/forgotpassword').post(forgotpassword);

router.route('/resetpassword/:resetToken').put(resetpassword)

router.route('/useravatarimage/:id').put(upload.single('avatarImage'), uploadAvatar);

router.route('/userhotels/:id').get(getUserHotels);


module.exports = router;
