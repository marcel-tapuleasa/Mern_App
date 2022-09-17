if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');


const cors = require('cors');
const ExpressError = require('./utils/ExpressError'); 
const hotelRoutes = require('./routes/hotels');
const reviewRoutes = require('./routes/reviews');


connectDB();

const app = express();


app.use(express.json());



// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error("Not allowed by CORS"))
//     }
//   },

//   credentials: true,
// }

app.use(cors());

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.use(cookieParser(process.env.COOKIE_SECRET));


app.use('/hotels', hotelRoutes);
app.use('/hotels/:id/reviews', reviewRoutes);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/private'));

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not Found', 404))
})

app.use(errorHandler)



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`)
})

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged error: ${err.message}`);
  server.close(() => process.exit(1))
})

