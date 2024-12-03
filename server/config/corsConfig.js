const allowedOrigins = [
  'https://500kalima.com',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://www.500kalima.com',
  'https://admin.500kalima.com',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

export default corsOptions;
