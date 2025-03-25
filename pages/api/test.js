// pages/api/test.js
import dbConnect from '../../lib/dbConnect';

export default async function handler(req, res) {
  try {
    // Attempt to connect to MongoDB
    await dbConnect();

    // If connection is successful
    res.status(200).json({ message: 'MongoDB connected successfully' });
  } catch (error) {
    // If there's an error during connection
    res.status(500).json({ message: 'Error connecting to MongoDB', error: error.message });
  }
}