const Review = require('../models/reviews');
const ExpressError = require('../utils/ExpressError');
const { authorize } = require('passport');



module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        return next(new ExpressError('Not authorized to access this route', 401));
    }
    next();
}