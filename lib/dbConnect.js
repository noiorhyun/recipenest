require('dotenv').config(); // Ensure environment variables are loaded
const mongoose = require('mongoose');

const dbConnect = async () => {
  console.log("MONGO_URI:", process.env.MONGO_URI);  // Check if the URI is being loaded properly
  try {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
};

module.exports = dbConnect;