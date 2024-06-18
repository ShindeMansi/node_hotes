const mongoose = require("mongoose");

// Define the MongoDB connection URL
const mongoURL = "mongodb://localhost:27017/hotels";

mongoose.connect(mongoURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
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
