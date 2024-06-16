import fs from 'fs';

const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    migrationStorageTableName: 'migrations',
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    migrationStorageTableName: 'migrations',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    migrationStorageTableName: 'migrations',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    ...(process.env.NODE_ENV === 'production' && {
      dialectOptions: {
        ssl: {
          ca: fs.readFileSync('/etc/mysql/ssl/ca-cert.pem'),
          cert: fs.readFileSync('/etc/mysql/ssl/server-cert.pem'),
          key: fs.readFileSync('/etc/mysql/ssl/server-key.pem'),
        },
      },
    }),
  },
};

export default config;
