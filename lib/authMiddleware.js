// lib/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const authenticate = (handler) => async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Ensure "Bearer <token>" format

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No Token Provided' });
  }

  try {
    // Verify token and attach user to the request
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // Attach user object to request
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
  }
};