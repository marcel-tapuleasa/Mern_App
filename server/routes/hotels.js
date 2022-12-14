const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError'); 
const { hotelSchema } = require('../schemas.js');
const { protect } = require('../middleware/auth');
const { isAuthor } = require('../middleware/hotel')
const hotels = require('../controllers/hotels');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


const validateHotel = (req, res, next) => {
    const { error } = hotelSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else{next()}
};


router.get('/', catchAsync(hotels.index));

router.get('/search', catchAsync(hotels.showHotelsbySearch));
 
//  router.post('/new', validateHotel, protect, catchAsync(hotels.createHotel));

router.post('/new', upload.array('images'), validateHotel, protect, catchAsync(hotels.createHotel))
 
 
router.get('/:id', catchAsync(hotels.showHotel));

router.get('/geometry/:id', hotels.getGeoData);


router.put('/:id/edit', protect, isAuthor, validateHotel,  catchAsync(hotels.editHotel));

 
router.put('/:id/addphotos', upload.array('images'), protect, isAuthor, validateHotel,  catchAsync(hotels.addPhotos));

 
 
 
 router.delete('/:id', protect, isAuthor, catchAsync(hotels.deleteHotel));


 router.put('/:id/deletephotos', protect, isAuthor, catchAsync(hotels.deletePhotos))
 

 module.exports = router;