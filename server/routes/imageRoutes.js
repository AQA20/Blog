import express from 'express';

import ImageController from '../controllers/ImageController.js';
import { handleAsyncError } from '../utils/handleErrors.js';

const router = express.Router();

// Get Image
router.get('/image/:id', handleAsyncError(ImageController.getImage));

export default router;
