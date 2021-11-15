const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HotelSchema = new Schema({
title: String,
description: String,
location: String,
price: Number
})

module.exports = mongoose.model('Hotel', HotelSchema);