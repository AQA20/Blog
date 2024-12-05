import Image from '../models/Image.js';
import resHandler from '../services/ResHandler.js';
import ImageService from '../services/ImageService.js';
import S3Service from '../services/S3Client.js';
import ApiError from '../services/ApiError.js';

export default class ImageController {
  static #imageService = new ImageService();
  static #s3client = new S3Service();

  // Get image url
  static async getImageUrl(req, res) {
    // Find image by its primary key
    const image = await Image.findByPk(req.params.id);
    if (!image) {
      throw new ApiError('Invalid image id', 404);
    }
    // Retrieve image url from amazon s3
    const url = ImageController.#s3client.getFile(image.name);
    // Return response
    return res.status(200).send(url);
  }

  // Create imageable and upload it to amazon s3
  static async uploadImage(req, res) {
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

  static async updateUserImg(req, res) {
    const file = req.file;
    const userId = req.user.id;

    // Delete old profile picture
    ImageController.#imageService.deleteImageableAndFile(userId, Image.USER);

    // Create a new user profile picture
    const newImage = await ImageController.#imageService.createImageable(
      userId,
      Image.USER,
      { file },
    );
    return resHandler(201, newImage, res);
  }

  static async deleteImage(req, res) {
    const imageableId = req.params.id;
    const imageableType = req.query.type;
    let message;
    if (imageableType === 'ARTICLE') {
      message = ImageController.#imageService.deleteImageable(
        imageableId,
        imageableType,
      );
    } else if (imageableType === 'USER') {
      message = 'Use the /image/user PUT endpoint to update the user image';
    }

    return resHandler(200, message, res);
  }
}
