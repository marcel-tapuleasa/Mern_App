const Hotel = require('../models/hotels');



module.exports.index = async (req, res)=> {
    const hotels = await Hotel.find({});
    res.send(hotels)
    };

module.exports.createHotel = async (req, res, next)=> { 
    const hotel = new Hotel({...req.body});
    hotel.author = req.user._id;
    await hotel.save();
    res.send(hotel);
   };

module.exports.showHotel = async (req, res) => {
    const hotel = await Hotel.findById(req.params.id).populate({
       path: 'reviews',
       populate: {
           path: 'author'
       }
    }).populate('author');
    res.send(hotel)
    };

module.exports.editHotel = async (req,res)=> {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, {...req.body});
    res.send(hotel);
    };

module.exports.deleteHotel = async (req,res)=> {
    await Hotel.findByIdAndDelete(req.params.id);
    res.send('Cool, you deleted me!')
    };
