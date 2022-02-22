const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Hotel = require('./models/hotels');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError'); 
const { hotelSchema, reviewSchema } = require('./schemas.js');
const Review = require('./models/reviews');

mongoose.connect('mongodb://localhost:27017/travel');

const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', () => {
    console.log('Database Connected!')
})


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

const validateHotel = (req, res, next) => {
    const { error } = hotelSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else{next()}
};

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else{next()}
};


// HOTELS

app.get('/hotelslist', catchAsync(async (req, res)=> {
   const hotels = await Hotel.find({});
   res.send(hotels)
}))

app.post('/addhotel', validateHotel, catchAsync(async (req, res, next)=> { 
 const hotel = new Hotel({...req.body});
 await hotel.save();
 res.send(hotel);
}));

app.get('/hotels/:id', catchAsync(async (req, res) => {
    const hotel = await Hotel.findById(req.params.id).populate('reviews');
    res.send(hotel)
}));

app.put('/hotels/:id/edit', validateHotel, catchAsync(async (req,res)=> {
const hotel = await Hotel.findByIdAndUpdate(req.params.id, {...req.body});
res.send(hotel);
}))




app.delete('/hotels/:id', catchAsync(async (req,res)=> {
    await Hotel.findByIdAndDelete(req.params.id);
    res.send('Cool, you deleted me!')
}))



// REVIEWS


app.post('/hotels/:id/reviews', validateReview, catchAsync(async (req, res) => {
const hotel = await Hotel.findById(req.params.id);
const review = await new Review({...req.body});
await hotel.reviews.push(review);
hotel.populate('reviews');
await hotel.save();
await review.save();
res.send(hotel.reviews);
}));

app.delete('/hotels/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const {id, reviewId} = req.params;
    await Hotel.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    console.log(req.params)    
    res.send('Deleted');
}))


app.all('*', (req, res, next) => {
    next(new ExpressError('Page not Found', 404))
})

app.use((err, req, res, next) => {
    const {statusCode = 500, message = 'Something went wrong'} = err;
    res.status(statusCode).send(message);
})



app.listen(5000, () => {
    console.log('Serving on port 5000!')
})