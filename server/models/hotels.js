const mongoose = require('mongoose');
const Review = require('./reviews');
const User = require('./user.js');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const opts = { toJSON: { virtuals: true } };


const HotelSchema = new Schema({
title: {type: String},
geometry: {
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
},
location: {type: String},
description: {type: String, min: 20},
price: {type: Number, min: 0},
images: [ImageSchema],
author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
},
reviews: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }
]
}, opts);

HotelSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href='/hotels/${this._id}'>${this.title}</a></strong>
    <p>${this.description.substring(0,25)}...</p>`
});

HotelSchema.virtual('averageRating').get(function() {
    let ratings = [];
    this.reviews?.forEach((review) => ratings.push(review.rating));
    if(ratings.length > 0) {
    return (ratings.reduce((a,b)=>a+b)/ratings.length).toFixed(2);}
    return;
})

HotelSchema.post('findOneAndDelete', async function (doc) {
    if(doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Hotel', HotelSchema);