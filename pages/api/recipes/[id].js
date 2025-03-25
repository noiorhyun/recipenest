import { authenticate } from '../../../lib/authMiddleware';
import dbConnect from '../../../lib/dbConnect';
import Recipe from '../../../models/Recipe';

const handler = async (req, res) => {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const recipe = await Recipe.findById(id);
      if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
      return res.status(200).json(recipe);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching recipe', error });
    }
  }

  if (req.method === 'PUT') {
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
      return res.status(200).json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating recipe', error });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deletedRecipe = await Recipe.findByIdAndDelete(id);
      if (!deletedRecipe) return res.status(404).json({ message: 'Recipe not found' });
      return res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting recipe', error });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).json({ message: 'Method Not Allowed' });
};

export default authenticate(handler);