const Joi = require ('joi');

module.exports.hotelSchema = Joi.object({
 title: Joi.string().required(),
 location: Joi.string().required(),
 description: Joi.string().required().min(20),
 price: Joi.number().required().min(0),
 deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required()
})

