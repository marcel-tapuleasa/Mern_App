const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Hotel = require('../models/hotels');
const ExpressError = require('../utils/ExpressError');
const sendEmail = require('../utils/sendEmail');
const protect = require('../middleware/auth');

const { cloudinary } = require('../cloudinary');
const multer = require('multer');
const { storage } = require('../cloudinary');
// const hotels = require('../models/hotels');
const { authorize } = require('passport');
const upload = multer({ storage });


exports.register = async (req, res, next) => {
    const {username, email, password} = req.body;
    try {
        const user = await User.create({
            username, email, password
        })
        sendToken(user, 201, res)
    } catch (error) {
        next(error)
        
    }
};


exports.login = async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return next(new ExpressError('Please provide an email and password!', 400))
    }
    try {
    const user = await User.findOne({email}).select("+password");
    if(!user) {
        return next(new ExpressError('Invalid Credentials!', 401))
    } 
    const isMatch = await user.matchPasswords(password);

    if(!isMatch) {
        return next(new ExpressError('Invalid Credentials!', 401))
    }
    sendToken(user, 200, res)
        
    } catch (error) {
        next(error)
    }
};



exports.refreshToken = (req, res, next) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies
    // console.log(`This is the refreshToken in cookie: ${refreshToken}`);

    if(refreshToken) {

        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const userId = payload.id;
            User.findOne({_id: userId }).then(
                user => {
                    if(user) {
                        const tokenIndex = user.refreshToken.findIndex(
                            item => item.refreshToken === refreshToken
                        ); 
                        

                        if(tokenIndex === -1) {
                        return next(new ExpressError('Unauthorized', 401)) 
                        }
                        else {
                            const token = user.getSignedJwtToken({_id: userId}); 
                            // console.log(`This is the generated token ${token}`)
                            const newRefreshToken = user.getSignedRefreshToken({_id: userId}); 
                            // console.log(`This is the new refreshToken ${newRefreshToken}`)
                            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }

                            user.save((err, user) => {
                                if(err) {
                                    return next(new ExpressError('Something went wrong', 500))
                                }
                                else {
                                    res.cookie('refreshToken', newRefreshToken, {
                                        httpOnly: true,
                                        signed: true,
                                        maxAge: 60 * 60 * 24 * 30 * 1000
                                    })
                                    res.status(200).json({
                                        succes: true,
                                        token
                                    })
                                }
                            })
                        }
                    } else {
                        return next(new ExpressError('Unauthorized', 401))
                    }
                }
            , err => next(err))
        } catch(err) {
            return next(new ExpressError('Unauthorized', 401))
        }
    } else {
        return next(new ExpressError('Unauthorized', 401))
    }
}

exports.logout =  (protect, (req, res, next) => {
    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies;

    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const userId = payload.id;


    User.findById(userId).then(
      user => {
        const tokenIndex = user.refreshToken.findIndex(
          item => item.refreshToken === refreshToken
        )
  
        if (tokenIndex !== -1) {
          user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
        }
  
        user.save((err, user) => {
          if (err) {
            return next(new ExpressError(err, 500))
          } else {
            res.clearCookie("refreshToken")
            res.send({ success: true })
          }
        })
      },
      err => next(err)
    )
  })

  



exports.forgotpassword = async (req, res, next) => {
    const {email} = req.body;

    try {
      const user = await User.findOne({email});
      if(!user) {
          return next(new ExpressError('Email could not be sent', 404))
      } 
      const resetToken = user.getResetPasswordToken();
      user.save();
      
      const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;

      const message = `
      <h2>You have requested a password reset</h2>
      <p>Please go to this link to reset your password</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `
      try {
          sendEmail({
              to: user.email,
              subject: "Password reset request",
              text: message
            })
          res.status(200).json({success: true, data: 'Email has been sent'})    
          
      } catch (error) {
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;

          await user.save();
          return next(new ExpressError('Email could not be sent', 500))
      }
    } catch (error) {
        next(error)
    }
};


exports.resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest('hex')
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now()}
        });
        if(!user) {
            return next(new ExpressError('Invalid Token', 400))
        }
        
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
        success: true,
        data: 'Password Updated Successfully',
        newToken: user.getSignedJwtToken(),
      });

    } catch (error) {
        next(error)
    }
};

// ==============================================================================================================

exports.uploadAvatar = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);
    if(user.avatarImage.filename) {
        await cloudinary.uploader.destroy(user.avatarImage.filename)
    }
    user.avatarImage.url = req.file.path;
    user.avatarImage.filename = req.file.filename;
    await user.save();
    res.send(user);
}


exports.getUserHotels = async (req, res) => {
 const {id} = req.params;
 const userHotels = await Hotel.find({author : id});                          
 res.send(userHotels);
};

// ===================================================================================================================

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken({ _id: user._id });
    const refreshToken = user.getSignedRefreshToken({ _id: user._id });
    user.refreshToken.push({refreshToken});
    user.save();
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        signed: true, 
        maxAge: 60 * 60 * 24 * 30 * 1000
        
    })
    res.status(statusCode).json({
        succes: true,
        token, user
    })
}


