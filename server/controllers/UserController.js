import User from '../models/User.js';
import Image from '../models/Image.js';
import S3Client from '../services/S3Client.js';
import resHandler from '../services/ResHandler.js';

export default class UserController {
  static s3client = new S3Client();

  static async #uploadImage(file, user) {
    const name = await UserController.s3client.uploadFile(file.path);
    const image = await Image.create({
      imageableId: user.id,
      imageableType: Image.USER,
      name,
    });

    return image;
  }

  static async uploadProfilePicture(req, res) {
    const image = await UserController.#uploadImage(req.file, req.user);
    return resHandler(201, image, res);
  }
  static async changeProfilePicture(req, res, next) {
    // Fetch old image from Database
    const oldImage = await Image.findOne({
      where: { imageableType: Image.USER, imageableId: req.user.id },
    });
    // Delete oldImage from amazon s3 via image name/url
    UserController.s3client.deleteFile(oldImage.name);
    // Delete oldImage from database
    await oldImage.destroy();
    // Create and upload the new image
    const image = await UserController.#uploadImage(req.file, req.user);
    return resHandler(201, image, res);
  }

  static async login(req, res, next) {
    // Find user by email
    const user = req.user;
    user.setDataValue('userRoles', await user.getUserRoles());
    return resHandler(200, user, res);
  }

  static async signup(req, res, next) {
    const user = await User.create(req.body);
    return resHandler(201, user, res);
  }
}
