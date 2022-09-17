const mongoose = require('mongoose');
const Review = require('./reviews');
const User = require('./user.js');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const HotelSchema = new Schema({
title: {type: String},
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