#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Load NVM (Node Version Manager) and use the specific Node.js version
source ~/.nvm/nvm.sh
nvm use v22.2.0


# Create the directory if it does not exist
mkdir -p /home/ubuntu/500kalima

# Navigate to the application directory
cd /home/ubuntu/500kalima

# Install project dependencies
~/.nvm/versions/node/v22.2.0/bin/npm install

# Navigate to the server directory and install dependencies
cd server
~/.nvm/versions/node/v22.2.0/bin/npm install

# Run database migrations
~/.nvm/versions/node/v22.2.0/bin/npm run migrate:prod
