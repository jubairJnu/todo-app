// import 'dotenv/config';
// import { defineConfig, env } from 'prisma/config';

// export default defineConfig({
//   schema: 'prisma/schema.prisma',
//   migrations: {
//     path: 'prisma/migrations',
//   },
//   datasource: {
//     url: env('DATABASE_URL'),
//   },
// });
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';
import config from './config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: config.db_url,
  },
});
