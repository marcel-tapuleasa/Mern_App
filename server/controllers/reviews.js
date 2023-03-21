const Hotel = require('../models/hotels');
const Review = require('../models/reviews');
const { authorize } = require ('passport');


module.exports.createReview = async (req, res) => {
    const hotel = await Hotel.findById(req.params.id);
    const review = await new Review({...req.body});
    review.author = req.user._id;
    await hotel.reviews.push(review);
    hotel.populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
     });
    await hotel.save();
    review.populate('author');
    await review.save();
    res.send(review);
    };

module.exports.showReview = async (req, res) => {
    const {reviewId} = req.params;
    const review = await Review.findById(reviewId).populate('author');
    res.send(review)
   }; 
   
module.exports.deleteReview = async (req, res) => {
    const {id, reviewId} = req.params;
    const hotel = await Hotel.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);   
    res.send(hotel);
  };   