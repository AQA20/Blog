# AI Blog README

Welcome to my blog repository! This is a blog project built with `Next.js`. The production version is live at **https://500kalima.com**. This document provides a guide about how to setup and run the project. Please follow the instructions below:

---

## Prerequisites

Before using the project, make sure to set up the backend server by following the instructions at **https://github.com/AQA20/blog-api**:

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

## Contributing

Feel free to contribute to this project by submitting issues and pull requests. To get started, fork the repository and create a branch for your changes.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.
