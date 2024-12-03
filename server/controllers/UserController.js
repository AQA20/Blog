import User from '../models/User.js';
import S3Client from '../services/S3Client.js';
import resHandler from '../services/ResHandler.js';
import db from '../config/databaseConnection.js';
import ApiError from '../services/ApiError.js';
import jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_EXPIRATION_TIME,
  ACCESS_TOKEN_MAX_AGE_MS,
  REFRESH_TOKEN_MAX_AGE_MS,
} from '../utils/constants.js';

export default class UserController {
  static s3client = new S3Client();

  static async #formatUserRoles(userRoles) {
    return userRoles.map((userRole) => {
      return {
        id: userRole.Role.id,
        name: userRole.Role.name,
        permissions: userRole.Role.Permissions.map((permission) => ({
          id: permission.id,
          name: permission.name,
        })),
      };
    });
  }

  static async login(req, res) {
    // Get user from the requested (It attached to the req in the authenticating middleware)
    const user = req.user;
    let userRoles = await user.getUserRoles();
    userRoles = await UserController.#formatUserRoles(userRoles);

    // Only returns the neccacccary data
    return resHandler(
      201,
      {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        userRoles: userRoles,
      },
      res,
    );
  }

  static async refreshAccessToken(req, res) {
    // Get refresh token from the cookie
    const oldRefreshToken = req.cookies.refreshToken;

    // Check if the refresh token exists
    if (!oldRefreshToken) {
      throw new ApiError('Refresh token not found', 401);
    }

    // Verify the refresh token
    const decoded = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);

    console.log(decoded);

    // Generate new tokens
    const { accessToken } = UserController.generateAccessTokens(
      decoded.user.id,
      decoded.user.email,
    );

    // Set new access token in HTTP-only cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: ACCESS_TOKEN_MAX_AGE_MS,
    });

    // If the token is valid, refetch user by it's decoded id
    const user = await UserController.#fetchUserById(decoded.user.id);

    // Return the response
    return resHandler(200, user, res);
  }

  static async logout(req, res) {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    res.status(200).send('Logged out');
  }

  static async signup(req, res) {
    // Use transaction so if something went wrong it rolls back all database
    // operations, note we're automatically pass transactions to all queries in
    // server/config/databaseConnection.js so we don't need to manually pass it
    // to each query.
    await db.sequelize.transaction(async (t) => {
      const user = await User.create(req.body);
      return resHandler(201, user, res);
    });
  }

  static async profile(req, res) {
    // Get the access token from the cookie
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      throw new ApiError('No access token found', 401);
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    // If the token is valid, refetch user by it's decoded id
    const user = await UserController.#fetchUserById(decoded.user.id);
    return resHandler(200, user, res);
  }

  static generateAccessTokens(id, email) {
    // Generate a new access token
    const newAccessToken = jwt.sign(
      { user: { id, email } },
      process.env.JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME },
    );

    // Generate a new refresh token
    const newRefreshToken = jwt.sign(
      {
        user: {
          id,
          email,
        },
        type: 'refresh',
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRATION_TIME },
    );

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  static setHttpOnlyTokenCookies(res, accessToken, refreshToken) {
    // Set new access token in HTTP-only cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: ACCESS_TOKEN_MAX_AGE_MS,
    });

    // Set new refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
      maxAge: REFRESH_TOKEN_MAX_AGE_MS,
    });
  }

  static async #fetchUserById(id) {
    const user = await User.findByPk(id);
    let userRoles = await user.getUserRoles();
    userRoles = await UserController.#formatUserRoles(userRoles);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      userRoles: userRoles,
    };
  }
}
