import { authenticate } from '../../../lib/authMiddleware'; 
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  res.status(200).json({ message: 'Logged out successfully' });
};

export default authenticate(handler);
