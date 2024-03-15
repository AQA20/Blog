import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { validateImageFile } from '../utils/validations.js';
import { ErrorHandler } from '../services/ErrorHandler.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../tmp/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + uuidv4());
  },
});

// Multer file filter function to accept only images with specific extensions
const imageFilter = function (req, file, cb) {
  if (!validateImageFile(file, ['png', 'jpeg', 'jpg', 'webp'])) {
    cb(new ErrorHandler(400, 'Not allowed format'), false);
  } else {
    cb(null, true);
  }
};

export default multer({ storage, fileFilter: imageFilter });
