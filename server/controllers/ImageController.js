import Image from '../models/Image.js';
import S3Client from '../services/S3Client.js';

export default class ImageController {
  static s3client = new S3Client();

  static async getImage(req, res) {
    const { name } = await Image.findByPk(req.params.id);
    const url = ImageController.s3client.getFile(name);
    return res.status(200).send(url);
  }
}
