import { ErrorHandler } from '../services/ErrorHandler.js';
import User from '../models/User.js';

export default async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user.isAdmin()) {
      throw new ErrorHandler(401, 'Unauthorized');
    }
    // Attach is admin property to the user object
    // So we don't retrieve user from database again
    // in next step.
    req.user.isAdmin = user.isAdmin();
    next();
  } catch (error) {
    next(error);
  }
};
