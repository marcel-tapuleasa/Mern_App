const mongoose = require("mongoose");
const url = process.env.MONGO_DB_CONNECTION_STRING;

const connectDB = async() => {
    await mongoose.connect(url)
    console.log("connected to db")
  } 

module.exports = connectDB;  