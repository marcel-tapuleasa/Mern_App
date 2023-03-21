const Hotel = require('../models/hotels');
const ExpressError = require('../utils/ExpressError');
const { authorize } = require('passport');



module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    if (!hotel.author.equals(req.user._id)) {
        return next(new ExpressError('Not authorized to access this route', 401));
    }
    next();
}