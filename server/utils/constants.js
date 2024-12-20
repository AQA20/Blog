export const ACCESS_TOKEN_EXPIRATION_TIME = '15m';
export const REFRESH_TOKEN_EXPIRATION_TIME = '7d';
export const ACCESS_TOKEN_MAX_AGE_MS = 15 * 60 * 1000;
export const REFRESH_TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
let domain;

switch (process.env.NODE_ENV) {
  case 'development':
    domain = '.localhost';
    break;
  case 'production':
    domain = 'admin.500kalima.com';
    break;
  case 'testing':
    domain = 'manage.500kalima.com';
    break;
}

export const DOMAIN = domain;

export const SECURE = process.env.NODE_ENV === 'development' ? false : true;
//For production environments when using cross-site requests over HTTPS.
//'SameSite=None' allows the cookie to be sent in cross-site requests, and
//'Secure=true' ensures the cookie is only sent over HTTPS connections,
//providing security for the cookie. Without 'SameSite=None', the cookie won't
//be sent in cross-site requests, which is necessary for scenarios like
//authentication with third-party services.
export const SAME_SITE =
  process.env.NODE_ENV === 'development' ? 'strict' : 'none';
