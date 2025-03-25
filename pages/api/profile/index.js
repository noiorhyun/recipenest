// pages/api/profile/index.js
import { authenticate } from '../../lib/authMiddleware';  // Correct path
import dbConnect from '../../lib/dbConnect';

const handler = async (req, res) => {
  console.log("Request received for profile");
  
  await dbConnect();

  if (!req.user) {
    return res.status(400).json({ message: "User not found in request" });
  }

  res.status(200).json({ user: req.user });
};

// Wrap with authentication middleware
export default authenticate(handler);
