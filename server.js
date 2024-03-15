import express from 'express';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import handleError from './middleware/handleError.js';
import next from 'next';


const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const PORT = process.env.PORT || 8080;
const app = next({ dev, hostname, PORT });
const handle = app.getRequestHandler();


app.prepare().then(() => {
  
  const server = express();


  server.use(express.json());

  // Register routers
  server.use('/api', userRoutes);
  server.use('/api', articleRoutes);
  

  
  //? Error handling middleware (Note that it's
  //? placed under all other routes and middlewares
  //? as express run middlewares by order)
  server.use(handleError);
  

  // Handle Next.js requests
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});