import jwt from 'jsonwebtoken';
import ApiError from '../services/ApiError.js';

const authorized = async (req, res, next) => {
  try {
    // Extract the token from the cookies
    const token = req.cookies.accessToken;
    if (!token) {
      throw new ApiError('Unauthorized: No access token found', 401);
    }

    // Verify the token
    const decodedToken = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(new ApiError('Invalid or expired token', 401));
        } else {
          resolve(decoded);
        }
      });
    });

    // Attach the decoded user data to the request object
    req.user = decodedToken.user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authorized;
