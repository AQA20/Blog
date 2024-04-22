import User from '../models/User.js';
import Image from '../models/Image.js';
import S3Client from '../services/S3Client.js';
import fs from 'fs';
import resHandler from '../services/ResHandler.js';

export default class UserController {
  static s3client = new S3Client();

  static #deleteLocalTempFile(filepath) {
    // Delete a local file by it's path
    fs.unlink(filepath, (error) => {
      if (error) throw error;
    });
  }

  static async #uploadImage(file, user) {
    const url = UserController.s3client.uploadFile(file.path);
    const image = await Image.create({
      imageable_id: user.id,
      imageable_type: Image.USER,
      image_url: url,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return image;
  }

  static async uploadProfilePicture(req, res, next) {
    try {
      const image = await UserController.#uploadImage(req.file, req.user);
      return resHandler(201, image, res);
    } catch (error) {
      next(error);
    } finally {
      // Delete the created temp image
      UserController.#deleteLocalTempFile(req.file.path);
    }
  }
  static async changeProfilePicture(req, res, next) {
    try {
      // Fetch old image from Database
      const oldImage = await Image.findOne({
        where: { imageable_type: Image.USER, imageable_id: req.user.id },
      });
      // Delete oldImage from amazon s3 via image name/url
      UserController.s3client.deleteFile(oldImage.image_url);
      // Delete oldImage from database
      await oldImage.destroy();
      // Create and upload the new image
      const image = await UserController.#uploadImage(req.file, req.user);
      return resHandler(201, image, res);
    } catch (error) {
      next(error);
    } finally {
      // Delete the created temp image
      UserController.#deleteLocalTempFile(req.file.path);
    }
  }

  static async login(req, res, next) {
    try {
      // Find user by email
      const user = req.user;
      user.setDataValue('userRoles', await user.getUserRoles());
      return resHandler(200, user, res);
    } catch (error) {
      next(error);
    }
  }

  static async signup(req, res, next) {
    try {
      const user = await User.create(req.body);
      return resHandler(201, user, res);
    } catch (error) {
      next(error);
    }
  }
}
