module.exports = {
  apps: [
    {
      name: process.env.PM2_NAME || 'blog-dev',
      script: 'npm start',
      env: {
        PORT: process.env.CLIENT_PORT || '4000',
      },
      // PM2 specific configurations
      instances: 1, // Limit to 1 instance (since I have a single core)
      log_date_format: 'YYYY-MM-DD HH:mm:ss', // Specify log date format
      autorestart: true, // Enable automatic restart on failure
      watch: false, // Disable watching for file changes (to reduce CPU usage)
    },
  ],
};
