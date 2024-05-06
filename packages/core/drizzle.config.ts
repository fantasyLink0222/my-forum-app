import { defineConfig } from 'drizzle-kit'
import dotenv from 'dotenv'

dotenv.config({
    path: '@my-forum-app/.env',
}

)

export default defineConfig({
 schema: "./src/db/schema/*",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})