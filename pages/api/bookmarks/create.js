// pages/api/bookmarks/create.js
import { authenticate } from '../../../lib/authMiddleware';
import dbConnect from '../../../lib/dbConnect';
import Bookmark from '../../../models/Bookmark'; // Assuming Bookmark model exists

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await dbConnect();

  try {
    const { recipeId } = req.body; // Assuming recipeId is being sent in the body to bookmark a recipe

    if (!recipeId) {
      return res.status(400).json({ message: 'Recipe ID is required' });
    }

    // Create a new bookmark
    const bookmark = new Bookmark({
      user: req.user.id, // Get the logged-in user's ID from the token
      recipe: recipeId,
    });

    await bookmark.save();

    return res.status(201).json({ message: 'Bookmark created successfully', bookmark });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating bookmark', error: error.message });
  }
};

// Wrap with authentication middleware
export default authenticate(handler);
