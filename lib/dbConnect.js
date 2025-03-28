import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

let cachedConnection = null;

async function dbConnect() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    cachedConnection = await mongoose.connect(MONGODB_URI, {
      connectTimeoutMS: 5000,
      socketTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10
    });
    return cachedConnection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default dbConnect;