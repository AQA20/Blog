import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/cloudfront-signer';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { readFileAsync } from '../utils/fsUtils.js';
import path from 'path';

export default class S3Service {
  // Set up AWS credentials as private property
  #credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  };

  // Create S3 client instance private property
  #s3Client = new S3Client(this.#credentials);

  async uploadImg(imgPath, imgFile) {
    let imgBuffer;
    if (imgPath) {
      const data = await readFileAsync(imgPath, null);
      // Create a buffer from the image data
      imgBuffer = Buffer.from(data);
    } else {
      imgBuffer = imgFile.buffer;
    }
    try {
      const uploadName = `${moment().valueOf()}_${uuidv4()}`;

      // Define parameters for PutObjectCommand
      const params = {
        Bucket: process.env.AWS_FILE_BUCKET,
        Key: uploadName,
        Body: imgBuffer,
        ContentType: imgFile
          ? imgFile.mimetype
          : `image/${path.extname(imgPath).replace('.', '')}`,
      };

      // Create PutObjectCommand instance
      const putObjectCommand = new PutObjectCommand(params);

      await this.#s3Client.send(putObjectCommand);
      return uploadName;
    } catch (error) {
      console.error('Error uploading file to S3', error);
      throw error;
    }
  }

  getFile(fileName) {
    return getSignedUrl({
      url: `${process.env.CLOUDFRONT_BASE_URL}/${fileName}`,
      dateLessThan: moment().add('24', 'hours'),
      privateKey: process.env.CLOUDFRONT_PRIVATE_KEY,
      keyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID,
    });
  }

  async deleteFile(fileName) {
    try {
      const params = {
        Bucket: process.env.AWS_FILE_BUCKET,
        Key: fileName,
      };

      // Create DeleteObjectCommand instance
      const deleteObjectCommand = new DeleteObjectCommand(params);
      return await this.#s3Client.send(deleteObjectCommand);
    } catch (error) {
      console.error('Error delete file from S3', error);
      throw error;
    }
  }
}
