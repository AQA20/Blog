import express from 'express';

import ImageController from '../controllers/ImageController.js';

const router = express.Router();

// Get Image
router.get('/image/:id', ImageController.getImage);

export default router;
