import Image from '../models/Image.js';
import resHandler from '../services/ResHandler.js';
import ImageService from '../services/ImageService.js';
import S3Service from '../services/S3Client.js';

export default class ImageController {
  static #imageService = new ImageService();
  static #s3client = new S3Service();

  static async getImage(req, res) {
    const { name } = await Image.findByPk(req.params.id);
    const url = ImageController.#s3client.getFile(name);
    return res.status(200).send(url);
  }

  static async uploadImage(req, res, next) {
    const file = req.file;
    const imageableId = req.params.imageableId;
    const type = req.query.type;
    const capture = req.query?.capture;
    const image = await ImageController.#imageService.createImageable(
      imageableId,
      type,
      { file, capture },
    );
    return resHandler(201, image, res);
  }

  static async updateUserImg(req, res, next) {
    const file = req.file;
    const userId = req.user.id;

    // Permanently delete or use profile picture
    // await ImageController.#imageService.permDeleteImageable(userId, Image.USER);

    // Create a new user profile picture
    const newImage = await ImageController.#imageService.createImageable(
      userId,
      Image.USER,
      { file },
    );
    return resHandler(201, newImage, res);
  }

  static async deleteImage(req, res, next) {
    const imageableId = req.params.id;
    const imageableType = req.query.type;
    let message;
    if (imageableType === 'ARTICLE') {
      message = await ImageController.#imageService.tempDeleteImageable(
        imageableId,
        imageableType,
      );
    } else if (imageableType === 'USER') {
      message = 'Use the /image/user PUT endpoint to update the user image';
    }

    return resHandler(204, message, res);
  }
}
