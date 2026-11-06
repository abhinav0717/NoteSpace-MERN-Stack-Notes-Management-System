
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async function protect(req, res, next) {
  try {
    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is missing in .env file');

      return res.status(500).json({
        message: 'Server authentication configuration error.',
      });
    }

    // Get authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Not authorized. Please log in.',
      });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'Authentication token is missing.',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find logged-in user
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        message: 'User no longer exists. Please log in again.',
      });
    }

    // Attach user to request
    req.user = user;

    next();

  } catch (error) {
    console.error('Authentication Error:', error.message);

    return res.status(401).json({
      message: 'Invalid or expired token. Please log in again.',
    });
  }
}
