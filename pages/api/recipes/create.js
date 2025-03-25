import { authenticate } from '../../../lib/authMiddleware';
import dbConnect from '../../../lib/dbConnect';
import Recipe from '../../../models/Recipe';

const handler = async (req, res) => {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.setHeader('Allow', ['POST']).status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { title, description, ingredients, instructions } = req.body;

    if (!title || !description || !ingredients || !instructions) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      user: req.user.id, 
    });

    await newRecipe.save();
    return res.status(201).json({ message: 'Recipe created successfully', recipe: newRecipe });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating recipe', error: error.message });
  }
};

export default authenticate(handler);
