import User from '../models/User.js';
import S3Client from '../services/S3Client.js';
import resHandler from '../services/ResHandler.js';
import db from '../config/databaseConnection.js';

export default class UserController {
  static s3client = new S3Client();

  static async login(req, res) {
    // Get user from the requested (It attached to the req in the authenticating middleware)
    const user = req.user;
    let userRoles = await user.getUserRoles();
    userRoles = userRoles.map((userRole) => {
      return {
        id: userRole.Role.id,
        name: userRole.Role.name,
        permissions: userRole.Role.Permissions.map((permission) => ({
          id: permission.id,
          name: permission.name,
        })),
      };
    });
    user.setDataValue('userRoles', userRoles);
    return resHandler(200, user, res);
  }

  static async signup(req, res) {
    await db.sequelize.transaction(async (t) => {
      const user = await User.create(req.body);
      return resHandler(201, user, res);
    });
  }
}
