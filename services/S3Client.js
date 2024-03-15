import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import fs from 'fs';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
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

  uploadFile(filePath) {
    const uploadName = `${moment().valueOf()}_${uuidv4()}_${path.basename(filePath)}`;
    fs.readFile(filePath, async (err, data) => {
      // Create a buffer from the image data
      const fileBuffer = Buffer.from(data);
      // Define parameters for PutObjectCommand
      const params = {
        Bucket: process.env.AWS_FILE_BUCKET,
        Key: uploadName,
        Body: fileBuffer,
      };

      // Create PutObjectCommand instance
      const putObjectCommand = new PutObjectCommand(params);

      await this.#s3Client.send(putObjectCommand);
    });
    return uploadName;
  }

  async getFile(fileName) {
    const params = {
      Bucket: process.env.AWS_FILE_BUCKET,
      Key: fileName,
    };

    // Create GetObjectCommand instance
    const getObjectCommand = new GetObjectCommand(params);

    return await this.#s3Client.send(getObjectCommand);
  }

  async deleteFile(fileName) {
    const params = {
      Bucket: process.env.AWS_FILE_BUCKET,
      Key: fileName,
    };

    // Create DeleteObjectCommand instance
    const deleteObjectCommand = new DeleteObjectCommand(params);
    return await this.#s3Client.send(deleteObjectCommand);
  }
}
