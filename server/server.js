import express from 'express';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
import articleTagRoutes from './routes/articleTagRoutes.js';
import globalErrorHandler from './middleware/globalErrorHandler.js';
import ApiError from './services/ApiError.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';
import helmet from 'helmet';

// Todo finish adding security headers and middlewares
// Todo handle security in a separate file
// Todo implement unit & integration tests

// Handle uncaughtException Exceptions
process.on('uncaughtException', (err) => {
  console.error(err);
  console.log('Uncaught exception has occurred! Shutting down...');
  //Shut down the Node application
  process.exit(1);
});

const PORT = process.env.PORT || 8080;

const app = express();

// Define the rate limit rule
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 70, // Limit each IP to 70 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers to ensure that only the newer, standardized headers are used.
  message: 'Too many requests, please try again later', // Custom message
});

if (process.env.NODE_ENV !== 'development') {
  // Use the limiter middleware
  app.use(limiter);
}

// Generate a random nonce value for each request
// const generateNonce = crypto.randomBytes(16).toString('base64');

// Use helmet middleware to prevent some well-known web vulnerabilities
app.use(helmet());
//Helps prevent a variety of attacks like Cross-Site Scripting (XSS) and data injection attacks.
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: [
//         "'self'",
//         'http://localhost:3000/',
//         'http://localhost:8080/',
//       ], // Only allow resources from the same origin
//       scriptSrc: [
//         "'self'",
//         'http://localhost:3000/',
//         'http://localhost:8080/',
//         `'nonce-${generateNonce}'`,
//       ], // Allow only scripts with the correct nonce to be executed,
//       styleSrc: ["'self'", 'http://localhost:3000/', 'http://localhost:8080/'],
//       imgSrc: ["'self'", 'http://localhost:3000/', 'http://localhost:8080/'],
//       connectSrc: [
//         "'self'",
//         'http://localhost:3000/',
//         'http://localhost:8080/',
//       ],
//       fontSrc: ["'self'", 'http://localhost:3000/', 'http://localhost:8080/'],
//       objectSrc: ["'none'"],
//       upgradeInsecureRequests: [],
//     },
//   }),
// );

// Todo configure cors settings for better security
// Use cors middleware
app.use(
  cors({
    origin: [
      'http://34.201.174.231:3000',
      'http://34.201.174.231/',
      'http://34.201.174.231:3000/',
      'http://localhost:3000',
    ], // Allow requests from these origins
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  }),
);

// A middleware to parse JSON payloads
app.use(express.json());

// Todo configure cookieParser settings for better security
// Use cookie-parser middleware
app.use(cookieParser());

// Register routers
app.use('/api', userRoutes);
app.use('/api', articleRoutes);
app.use('/api', imageRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);
app.use('/api', articleTagRoutes);

// Handle not found routes
app.all('*', (req, res, next) => {
  // Create new api error
  const err = new ApiError(`Can't find ${req.originalUrl} on the server!`, 404);
  next(err);
});

// Error handling middleware (Note that it's
// placed under all other routes and middlewares
// as express run middlewares by order)
app.use(globalErrorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Catch unhandled Promise rejections
process.on('unhandledRejection', (err) => {
  console.error(err);
  // Avoid immediately aborting current requests which are still running or pending
  // So we only shutdown the node app after the server is closed.
  server.close(() => {
    console.log('Unhandled rejection has occurred! Shutting down...');
    //Shut down the Node application
    process.exit(1);
  });
});
