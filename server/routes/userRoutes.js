import express from 'express';
import uploadImage from '../middleware/multerImageUpload.js';
import authenticate from '../middleware/authenticate.js';
import authorized from '../middleware/authorized.js';
import UserController from '../controllers/UserController.js';
import loginRequest from '../middleware/requests/users/loginRequest.js';
import signupRequest from '../middleware/requests/users/signupRequest.js';
import uploadFileRequest from '../middleware/requests/uploadFileRequest.js';

const router = express.Router();

// User signup route
router.post('/signup', signupRequest, UserController.signup);

// User login route
router.post('/login', loginRequest, authenticate, UserController.login);

// Route to upload profile picture
router.post(
  '/upload-profile-picture',
  authorized,
  uploadImage.single('file'),
  uploadFileRequest,
  UserController.uploadProfilePicture
);

// Route to change profile picture
router.post(
  '/change-profile-picture',
  authorized,
  uploadImage.single('file'),
  uploadFileRequest,
  UserController.changeProfilePicture
);

export default router;
