# AI Blog README

Welcome to our blog repository! This document provides an overview of the available commands and their descriptions for managing migrations, seeders, and bundling/transpiling client and server code. Please follow the instructions below to utilize the commands effectively.

## Important

First you need to setup mysql database, AWS s3 bucket as well as AWS cloudfront
Then ensure to have all of the necessary environment variables set up.
Please refer to the .env.example file for guidance.

#### Setup Client

## To install dependencies, run:

```bash
npm run install
```

## To install dev dependencies, run:

```bash
npm install -D
```

## Format Code

To format code using eslint:

```bash
npm run lint
```

### Auto Fix ESLint Issues

To automatically fix eslint issues:

```bash
npm run lint:fix
```

### Start app in dev mode

```bash
npm run dev
```

### Build the app

To build the next app run:

```bash
npm run build
```

### Start the built app

```bash
npm run start
```

#### Setup Server

## To install dependencies, run:

```bash
npm run install
```

## To install dev dependencies, run:

```bash
npm install -D
```

## Format Code

To format code using eslint:

```bash
npm run lint
```

### Auto Fix ESLint Issues

To automatically fix eslint issues:

```bash
npm run lint:fix
```

### Create a New Migration

To create a new migration:

```bash
npm run migration:create migration-name
```

### Migrate All Migrations

To migrate all migrations:

```bash
npm run migrate
```

### Rollback Migrations One Step Backward

To rollback migrations one step backward:

```bash
npm run migrate:rollback
```

### Rollback All Migrations

To rollback all migrations (Use with caution and never use on deployment database):

```bash
npm run migrate:rollback:all
```

### Run Seeders

To run seeders:

```bash
npm run seed
```

### Create a New Seeder

To create a new seeder:

```bash
npm run seed:create seed_name
```

### Rollback a Seeder One Step Backward

To rollback a seeder one step backward:

```bash
npm run seed:rollback
```

### To rollback All Seeders

To rollback all seeders (Use with caution and never use on deployment database):

```bash
npm run seed:rollback:all
```

### Bundle and Transpile Client and Server Code for production

To bundle and transpile client and server code:

```bash
npm run build
```

### Run the app

To start app in development mode:

```bash
npm run dev
```

### Run the app in production

To run app in production mode:

```bash
npm run start
```

## Note

Ensure that you exercise caution, especially when executing commands that affect migrations, seeders, and deployment environments. Always review changes before applying them to production databases.
