if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
// const helmet = require("helmet");



// const cors = require('cors');
const ExpressError = require('./utils/ExpressError'); 
const hotelRoutes = require('./routes/hotels');
const reviewRoutes = require('./routes/reviews');


connectDB();

const app = express();


app.use(express.json());



// const corsOptions = {
//   origin: 'https://hotelstips.netlify.app',
//   // Access-Control-Allow-Origin: https://hotelstips.netlify.app,
//   methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Access-Control-Allow-Origin'],
//   exposedHeaders: ['Set-Cookie'],
//   credentials: true
// }

// app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://hotelstips.netlify.app");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  mongoSanitize({
    replaceWith: '_',
  }),
);

// app.use(helmet());


// const scriptSrcUrls = [
//     "https://api.tiles.mapbox.com/",
//     "https://api.mapbox.com/",
//     "https://kit.fontawesome.com/",
//     "https://cdnjs.cloudflare.com/",
//     "https://cdn.jsdelivr.net",
// ];
// const styleSrcUrls = [
//     "https://kit-free.fontawesome.com/",
//     "https://stackpath.bootstrapcdn.com/",
//     "https://api.mapbox.com/",
//     "https://api.tiles.mapbox.com/",
//     "https://fonts.googleapis.com/",
//     "https://use.fontawesome.com/",
// ];
// const connectSrcUrls = [
//     "https://api.mapbox.com/",
//     "https://a.tiles.mapbox.com/",
//     "https://b.tiles.mapbox.com/",
//     "https://events.mapbox.com/",
// ];
// const fontSrcUrls = [];
// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: [],
//             connectSrc: ["'self'", ...connectSrcUrls],
//             scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
//             styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//             workerSrc: ["'self'", "blob:"],
//             objectSrc: [],
//             imgSrc: [
//                 "'self'",
//                 "blob:",
//                 "data:",
//                 "https://res.cloudinary.com/marceltapuleasa/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
//                 "https://images.unsplash.com/",
//             ],
//             fontSrc: ["'self'", ...fontSrcUrls],
//         },
//     })
// );


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

