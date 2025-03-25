import { authenticate } from '../../../lib/authMiddleware';
import dbConnect from '../../../lib/dbConnect';
import Recipe from '../../../models/Recipe'; 

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await dbConnect();

  try {
    const recipes = await Recipe.find({ user: req.user.id }); 
    return res.status(200).json(recipes);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching recipes', error: error.message });
  }
};

export default authenticate(handler);
