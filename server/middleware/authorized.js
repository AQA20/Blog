import jwt from 'jsonwebtoken';
import ApiError from '../services/ApiError.js';

const authorized = (req, res, next) => {
  try {
    // Extract token from request headers
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new ApiError('Unauthorized', 401);
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

export default authorized;
