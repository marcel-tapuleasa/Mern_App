const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Hotel = require('./models/hotels');

mongoose.connect('mongodb://localhost:27017/travel');

const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', () => {
    console.log('Database Connected!')
})

const app = express();

app.use(express.json());
app.use(cors());

app.get('/hotelslist', async (req, res)=> {
   const hotels = await Hotel.find({});
   res.send(hotels)
})

app.post('/addhotel', async (req, res)=> {
 const {title, location} = req.body;   
 const hotel = new Hotel({title: title, location: location});
 await hotel.save();
 res.send(hotel);
});


app.put('/hotels/:id/edit', async (req,res)=> {
const hotel = await Hotel.findByIdAndUpdate(req.params.id, {...req.body});
res.send(hotel);
})

app.delete('/hotels/:id', async (req,res)=> {
    await Hotel.findByIdAndDelete(req.params.id);
    res.send('Cool, you deleted me!')
})

app.get('/hotels/:id', async (req, res) => {
    const hotel = await Hotel.findById(req.params.id);
    res.send(hotel)
});







app.listen(5000, () => {
    console.log('Serving on port 5000!')
})