module.exports = {
  apps: [
    {
      name: process.env.PM2_NAME,
      script: 'npm',
      args: ['start'],
      env: {
        PORT: process.env.CLIENT_PORT,
      },
    },
  ],
};
