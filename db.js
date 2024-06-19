const mongoose = require("mongoose");
require('dotenv').config();
// Define the MongoDB connection URL
//const mongoURL = "mongodb://localhost:27017/hotels";
const mongoURL=process.env.DB_URL;
mongoose.connect(mongoURL, {
useNewUrlParser: true,
   useUnifiedTopology: true,
});

const db = mongoose.connection;

// Define event listeners
db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
  console.log("MongoDB Connection error:", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Export database connection
module.exports = db;
