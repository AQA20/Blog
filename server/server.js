import express from 'express';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import globalErrorHandler from './middleware/globalErrorHandler.js';
import ApiError from './services/ApiError.js';
import cors from 'cors';

// Handle uncaughtException Exceptions
process.on('uncaughtException', (err) => {
  console.error(err.name, err.message);
  console.log('Uncaught exception has occurred! Shutting down...');
  //Shut down the Node application
  process.exit(1);
});

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());

// A middleware to parse JSON data in the request body
// and make it available in req.body within route handlers.
app.use(express.json());

// Register routers
app.use('/api', userRoutes);
app.use('/api', articleRoutes);
app.use('/api', imageRoutes);

// Handle not found routes
app.all('*', (req, res, next) => {
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
  console.error(err.name, err.message);
  // Avoid immediately aborting current requests which are still running or pending
  // So we only shutdown the node app after the server is closed.
  server.close(() => {
    console.log('Unhandled rejection has occurred! Shutting down...');
    //Shut down the Node application
    process.exit(1);
  });
});
