// pages/api/bookmarks/index.js
import { authenticate } from '../../../lib/authMiddleware';
import dbConnect from '../../../lib/dbConnect';
import Bookmark from '../../../models/Bookmark'; // Assuming Bookmark model exists

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await dbConnect();

  try {
    // Find all bookmarks for the authenticated user
    const bookmarks = await Bookmark.find({ user: req.user.id }).populate('recipe', 'title description'); // Populate recipe details if needed

    return res.status(200).json(bookmarks);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching bookmarks', error: error.message });
  }
};

// Wrap with authentication middleware
export default authenticate(handler);
