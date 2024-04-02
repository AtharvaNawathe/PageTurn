const mongoose = require("mongoose");
require("dotenv").config();


// This function connects to the MongoDB 
async function connectToDatabase() {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

module.exports = connectToDatabase;
