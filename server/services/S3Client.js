import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
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
          : `image/${path.extname(imgPath)}`,
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

  async getFile(fileName) {
    try {
      const params = {
        Bucket: process.env.AWS_FILE_BUCKET,
        Key: fileName,
      };

      // Create GetObjectCommand instance
      const getObjectCommand = new GetObjectCommand(params);

      // return the response
      return await getSignedUrl(this.#s3Client, getObjectCommand, {
        expiresIn: 3600,
      });
    } catch (error) {
      console.error('Error retrieving file from S3', error);
      throw error;
    }
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
