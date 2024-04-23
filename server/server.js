import express from 'express';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import handleError from './middleware/handleError.js';
import cors from 'cors';

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

//? Error handling middleware (Note that it's
//? placed under all other routes and middlewares
//? as express run middlewares by order)
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
