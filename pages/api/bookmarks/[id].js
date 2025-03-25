// pages/api/bookmarks/index.js

import { authenticate } from '../../../lib/authMiddleware'; // your auth middleware
import dbConnect from '../../../lib/dbConnect';
import Bookmark from '../../../models/Bookmark';

const handler = async (req, res) => {
  await dbConnect();

  if (req.method === 'GET') {
    // Retrieve all bookmarks for the user
    const bookmarks = await Bookmark.find({ user: req.user.id }); // Assuming you store userId in JWT
    res.status(200).json(bookmarks);
  } else if (req.method === 'POST') {
    // Create a new bookmark
    const { recipeId } = req.body;
    const newBookmark = new Bookmark({
      recipeId,
      user: req.user.id,
    });
    await newBookmark.save();
    res.status(201).json({ message: 'Bookmark created successfully', bookmark: newBookmark });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

// Wrap with authentication middleware
export default authenticate(handler);
