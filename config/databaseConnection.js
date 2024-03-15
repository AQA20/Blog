import Sequelize from 'sequelize';
import { env } from 'process';
import configuration from './databaseConfig.js';
import mysql2 from 'mysql2';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const _env = env.NODE_ENV || 'development';
const config = configuration[_env];
const db = {};
const models = {};

// Fix "Please install mysql2 package manually".
if (config.dialect === 'mysql') {
  config.dialectModule = mysql2;
}

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Test connection
try {
  await db.sequelize.authenticate();
  console.log('Database connection has been established successfully.');
} catch (error) {
  const errorMessage = 'Unable to connect to the database';
  console.error(errorMessage);
  throw new Error(errorMessage);
}

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modelFiles = fs.readdirSync(path.join(__dirname, '../models'));

const importModels = async () => {
  for (const file of modelFiles) {
    const modelName = file.split('.')[0];
    const modelPath = await import(path.join(__dirname, `../models/${file}`));
    models[modelName] = modelPath.default;
  }
};

// Associate models
importModels()
  .then(() => {
    Object.keys(models).forEach((model) => {
      if (models[model].associate) {
        models[model].associate(models);
      }
    });
  })
  .catch((error) => console.log('Error importing models', error));

export default db;
