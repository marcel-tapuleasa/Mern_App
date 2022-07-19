
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Session = new Schema({
    refreshToken: {
      type: String,
      default: "",
    },
  });

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username!'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide a email!'],
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email!']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 8,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    refreshToken: {
        type: [Session],
      }
});

UserSchema.set("toJSON", {
    transform: function (doc, ret, options) {
      delete ret.refreshToken
      return ret
    },
  })

UserSchema.pre("save", async function (next) {
if(!this.isModified("password")) {
    next()
}
this.password = await bcrypt.hash(this.password, 12);
next();
})

UserSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(password, this.password)
};

UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
};

UserSchema.methods.getSignedRefreshToken = function() {
    return jwt.sign({id: this._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRE})
};

UserSchema.methods.getResetPasswordToken = function() {
    
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * 60 *1000;
    
    return resetToken;
    
}


module.exports = new mongoose.model('User', UserSchema)