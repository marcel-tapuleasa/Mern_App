const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ExpressError = require('../utils/ExpressError');

const { authorize } = require('passport');


exports.protect = async (req, res, next) => {

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token) {
        return next(new ExpressError('No token authorized to access this route', 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if(!user) {
            return next(new ExpressError('No user found', 404))
        }
        req.user = user;
        next();
    } catch (error) {
        return next(new ExpressError('Not authorized to access this route', 401))
    }
 };


