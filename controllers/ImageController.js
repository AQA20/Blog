import Image from '../models/Image.js';
import S3Client from '../services/S3Client.js';
import resHandler from '../services/ResHandler.js';
export default class ImageController {
  static s3client = new S3Client();

  static async getImage(req, res, next) {
    try {
      const { image_url } = await Image.findByPk(req.params.id);
      const data = await ImageController.s3client.getFile(image_url);

      res.setHeader('Content-Type', data.ContentType);
      res.status(200);
      data.Body.pipe(res);
    } catch (error) {
      next(error);
    }
  }
}
