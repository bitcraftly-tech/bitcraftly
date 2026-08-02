import 'dotenv/config';
import { defineConfig } from 'prisma/config';

function resolveDirectUrl(): string {
  const directUrl = process.env.DIRECT_URL?.trim();
  if (directUrl) {
    return directUrl;
  }

  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (databaseUrl) {
    return databaseUrl;
  }

  throw new Error(
    'Missing DIRECT_URL. Set DIRECT_URL (Neon direct connection) in .env for Prisma CLI operations.',
  );
}

const shadowDatabaseUrl = process.env.SHADOW_DATABASE_URL?.trim();

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: resolveDirectUrl(),
    ...(shadowDatabaseUrl ? { shadowDatabaseUrl } : {}),
  },
});
