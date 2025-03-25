require('dotenv').config();  // Ensure .env is loaded
const mongoose = require('mongoose');

// Try to connect to MongoDB without deprecated options
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });