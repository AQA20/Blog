module.exports = {
  apps: [
    {
      name: process.env.PM2_NAME || 'blog-dev',
      script: 'npm start',
      env: {
        PORT: process.env.CLIENT_PORT || '4000',
      },
    },
  ],
};
