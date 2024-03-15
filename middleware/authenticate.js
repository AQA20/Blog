import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { ErrorHandler } from '../services/ErrorHandler.js';

// Route for user login
export default async (req, res, next) => {
  try {
    // Find user by email
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    // Check if user exists
    if (!user) {
      throw new ErrorHandler(400, 'User not found');
    }
    // Verify password
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.dataValues.password
    );

    // Handle invalid password
    if (!isPasswordValid) {
      throw new ErrorHandler(400, 'Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { user: { id: user.id, email: user.email } },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    user.setDataValue('token', token);
    user.setDataValue('password', null);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
