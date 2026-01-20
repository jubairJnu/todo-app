import 'dotenv/config';

export default {
  port: process.env.PORT,
  database: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
  },
  db_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  jwt: {
    access_token: process.env.ACCESS_TOKEN,
    refresh_token: process.env.REFRESH_TOKEN,
    access_expire: process.env.ACCESS_EXPIREIN,
    refresh_expire: process.env.REFRESH_EXPIREIN,
  },
};
