import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../services/ErrorHandler.js';

export default (req, res, next) => {
  try {
    // Extract token from request headers
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new ErrorHandler(401, 'Unauthorized');
    }
    const token = authorization.split(' ')[1];
    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken.user;
    next();
  } catch (error) {
    next(error);
  }
};
