const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError'); 
const { reviewSchema } = require('../schemas.js');
const { protect } = require('../middleware/auth');
const { isReviewAuthor } = require('../middleware/review');
const reviews = require('../controllers/reviews');



const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else{next()}
};


router.post('/', validateReview, protect, catchAsync(reviews.createReview));


router.get('/:reviewId/reviewDetails', catchAsync(reviews.showReview));


router.delete('/:reviewId', protect, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;