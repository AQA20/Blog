import Image from '../models/Image.js';
import S3Service from './S3Client.js';

export default class ImageService {
  #s3Service = new S3Service();

  // Get image from database using the imgId or imageableId.
  async #getImageable(imgId, imageableId, options = { attributes: ['name'] }) {
    // Destructure values
    const { type, attributes } = options;
    let imageableModel;
    // If imgId provided
    if (imgId) {
      // Find image by primary key
      imageableModel = await Image.findByPk(imgId, {
        where: { imageableType: type },
        attributes,
      });
    } else {
      // Find image by imageableId
      imageableModel = await Image.findOne({
        where: { imageableId, imageableType: type },
        attributes,
      });
    }

    return imageableModel;
  }

  // Create new imageable/image
  async createImageable(imageableId, type, options) {
    const { file, imgLinkProperty = 'imgUrl' } = options;

    // Throw an error if the file wasn't provided
    if (!file) {
      throw new Error('The file option is required');
    }
    // Throw an error if the imageableId wasn't provided
    if (!imageableId) {
      throw new Error('The imageableId argument is required');
    }
    // Throw an error if the type wasn't provided
    if (!type) {
      throw new Error('The type argument is required');
    }

    // Upload image to aws s3
    const name = await this.#s3Service.uploadFile(file.buffer, file.mimetype);
    // Create new imageable
    const imageableModel = await Image.create({
      imageableId,
      imageableType: type,
      name,
    });
    // Fetch the actual image url from s3
    const imgUrl = this.#s3Service.getFile(name);
    // Append the image url to the imageable model;
    imageableModel.setDataValue(imgLinkProperty, imgUrl);
    return imageableModel;
  }

  // Get image from database and append the s3 actual url
  async getImageableWithImgUrl(imgId, imageableId, options) {
    const { type, imgLinkProperty = 'imgUrl', attributes = ['name'] } = options;

    // Throw an error if the imageableType wasn't provided
    if (!type) {
      throw new Error('the type option is required');
    }

    // Throw an error if imgId and imageableId wasn't provided
    if (!imgId && !imageableId) {
      throw new Error('Either image id or imageableId must be provided');
    }

    let imageableModel;
    // If imgId provided
    if (imgId) {
      // Find image by primary key
      imageableModel = await this.#getImageable(imgId, null, {
        type,
        attributes,
      });
    } else {
      // Find image by imageableId
      imageableModel = await this.#getImageable(null, imageableId, {
        type,
        attributes,
      });
    }

    // Get image url from aws s3
    const imgUrl = this.#s3Service.getFile(imageableModel.name);
    // Append the image url value to the imageableModel
    imageableModel.setDataValue(imgLinkProperty, imgUrl);
    return imageableModel;
  }

  // Fetch image url from s3 by name and append it the the imageable model
  async addImageableImgUrl(
    imageableModel,
    name,
    type,
    options = { imgLinkProperty: 'imgUrl' },
  ) {
    const { imgLinkProperty } = options;

    if (!imageableModel) {
      throw new Error('imageableModel is required');
    }
    if (!type) {
      throw new Error('type is required');
    }
    if (!name) {
      throw new Error('Name is required');
    }

    // Get image url from aws s3
    const imgUrl = this.#s3Service.getFile(name);
    // Append the image url value to the imageableModel
    imageableModel.setDataValue(imgLinkProperty, imgUrl);
    return imageableModel;
  }

  // Soft delete
  async tempDeleteImageable(imageableId, imageableType) {
    // Delete image from database
    await Image.destroy({ where: { imageableId, imageableType } });
    return 'Image was successfully deleted!';
  }

  // Permanently delete
  async permDeleteImageable(imageableId, type) {
    const image = await this.#getImageable(null, imageableId, {
      type,
      attributes: ['id', 'name'],
    });
    // Delete image from amazon s3
    await this.#s3Service.deleteFile(image.name);
    // Delete image from database
    await image.destroy();
    return `${type} image was successfully deleted!`;
  }
}
