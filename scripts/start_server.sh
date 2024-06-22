#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Navigate to the application directory
cd /home/ubuntu/500kalima

# Load NVM
source ~/.nvm/nvm.sh
nvm use v22.2.0

# Build the project
~/.nvm/versions/node/v22.2.0/bin/npm run build

# Deploy the built project to the server's web directory
sudo rm -rf /var/www/.next
sudo cp -rp ~/500kalima/.next /var/www/.next

# Start client application with PM2
pm2 start npm --name "client" -- start

# Navigate to the server directory and start server application with PM2
cd server
pm2 start npm --name "server" -- start

# Save current PM2 processes to ensure they restart on reboot
pm2 save

# Check if PM2 should start on system boot
pm2 startup

# Reload and restart Nginx to apply new changes
sudo systemctl reload nginx
sudo systemctl restart nginx
