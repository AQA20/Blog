# AI Blog README

Welcome to my blog repository! This is a blog project which contains both client `Next.js` and server `Node.js`, `Express.js`. The production version is live at **https://500kalima.com**. This document provides a guide about how to setup and run the project as well as an overview of the available commands and their descriptions for managing migrations, seeders, and bundling/transpiling client and server code. Please follow the instructions below:

---

## Prerequisites

Before you start using the project, ensure the following:

**1**. Setup a MySql database.

**2**. Ensure all necessary environment variables are set up. Refer to the `.env.example` file in the root directory (Client environment) and the server directory for guidance. **Note**: You do not need to configure AWS-related environment variables if you do not plan to use AWS.

---

## Optional

If you plan to use AWS as I do, set up or create an AWS account and configure the following services: an S3 bucket,AWS CloudFront, EC2 instance, Route 53 and IAM. Ensure the correct permissions are in place.

---

### Configuring External Image Sources

To ensure that images from external sources are properly optimized in your Next.js project, you need to update your `next.config.mjs` file. Follow the steps below:

**1**. Open your `next.config.mjs` file located at the root of your project.

**2**. Add the following code under the `images` configuration, replacing `'YOUR_CLOUDFRONT_CDN_ENDPOINT'` or any other with your corresponding CloudFront CDN endpoint.

```js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'YOUR_CLOUDFRONT_CDN_ENDPOINT',
      pathname: '**',
    },
  ],
}
```

---

### Clone the repository

```bash
git clone git@github.com:AQA20/500kalima.git
cd 500kalima
```

---

## Setup Client

### To install dependencies, run:

```bash
npm run install
```

### To install dev dependencies, run:

```bash
npm install -D
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

---

## Other client available commands

## Format Code

To format code using eslint:

```bash
npm run lint
```

### Format code using prettier

```bash
npm run fix
```

### Auto Fix ESLint Issues

To automatically fix eslint issues:

```bash
npm run lint:fix
```

---

## Setup Server

### To install dependencies, `cd` into `server` folder and run:

```bash
npm run install
```

### To install dev dependencies, run:

```bash
npm install -D
```

### Migrate All Migrations

To migrate all migrations:

```bash
npm run migrate
```

### Run Seeders

To run seeders:

```bash
npm run seed
```

### Run the app

To start app in development mode:

```bash
npm run dev
```

### Bundle and Transpile Client and Server Code for production

To bundle and transpile client and server code:

```bash
npm run build
```

### Run the app in production

To run app in production mode:

```bash
npm run start
```

---

## Other server available commands

### Format Code

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

---

## Note

Ensure that you exercise caution, especially when executing commands that affect migrations, seeders, and deployment environments. Always review changes before applying them to production databases.

---

## Contributing

Feel free to contribute to this project by submitting issues and pull requests. To get started, fork the repository and create a branch for your changes.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.
