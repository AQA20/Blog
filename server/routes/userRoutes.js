import express from 'express';
import authenticate from '../middleware/authenticate.js';
import UserController from '../controllers/UserController.js';
import loginRequest from '../middleware/requests/users/loginRequest.js';
import signupRequest from '../middleware/requests/users/signupRequest.js';
import { handleAsyncApiError } from '../utils/handleErrors.js';

const router = express.Router();

// User signup route
router.post(
  '/signup',
  signupRequest,
  handleAsyncApiError(UserController.signup),
);

// User login route
router.post(
  '/login',
  loginRequest,
  authenticate,
  handleAsyncApiError(UserController.login),
);

export default router;
