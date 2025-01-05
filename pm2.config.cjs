module.exports = {
  apps: [
    {
      name: process.env.PM2_NAME || 'blog-dev',
      script: 'npm',
      args: 'start',
      env: {
        PORT: process.env.CLIENT_PORT || '4000',
      },
      // PM2 specific configurations
      instances: 1, // Limit to 1 instance (since I have a single core)
      exec_mode: 'cluster', // Enable cluster mode, even with 1 worker
      max_memory_restart: '100M', // Restart the app if memory usage exceeds 100MB
      node_args: '--max-old-space-size=256', // Set the maximum heap size for Node.js
      log_date_format: 'YYYY-MM-DD HH:mm:ss', // Specify log date format
      autorestart: true, // Enable automatic restart on failure
      watch: false, // Disable watching for file changes (to reduce CPU usage)
    },
  ],
};
