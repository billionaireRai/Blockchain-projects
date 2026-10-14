import "dotenv/config";
import dotenv from 'dotenv';
import { defineConfig , env } from "prisma/config"; // used for defining postgres configurations...

dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: env("DATABASE_URL"),
  },
});