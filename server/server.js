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
import helmet from 'helmet';
import corsOptions from './config/corsConfig.js';
import helmetConfig from './config/helmetConfig.js';
import rateLimitConfig from './config/rateLimitConfig.js';

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

// Security middlewares

process.env === 'production' && app.use(rateLimitConfig);
app.use(helmet(helmetConfig)); // Use helmet middleware to prevent some well-known web vulnerabilities.
app.use(cors(corsOptions)); // Use the configured CORS middleware

// Other middlewares
app.use(express.json()); // A middleware to parse JSON payloads
app.use(cookieParser(process.env.COOKIE_SECRET)); // Use cookie-parser middleware

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
