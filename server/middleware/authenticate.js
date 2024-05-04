import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import ApiError from '../services/ApiError.js';

// Route for user login
const authenticate = async (req, res, next) => {
  try {
    // Find user by email
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    // Check if user exists
    if (!user) {
      throw new ApiError('User not found', 400);
    }
    // Verify password
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.dataValues.password,
    );

    // Handle invalid password
    if (!isPasswordValid) {
      throw new ApiError('Invalid email or password', 400);
    }

    // Generate JWT token
    const token = jwt.sign(
      { user: { id: user.id, email: user.email } },
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
    );
    user.setDataValue('token', token);
    user.setDataValue('password', null);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
