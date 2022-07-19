const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError'); 
const { hotelSchema } = require('../schemas.js');
const { protect } = require('../middleware/auth');
const { isAuthor } = require('../middleware/hotel')
const hotels = require('../controllers/hotels');

const validateHotel = (req, res, next) => {
    const { error } = hotelSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else{next()}
};


router.get('/', catchAsync(hotels.index))
 
 router.post('/new', validateHotel, protect, catchAsync(hotels.createHotel));
 
 router.get('/:id', catchAsync(hotels.showHotel));
 
 router.put('/:id/edit', protect, isAuthor, validateHotel,  catchAsync(hotels.editHotel));
 
 
 router.delete('/:id', protect, isAuthor, catchAsync(hotels.deleteHotel))

 module.exports = router;