import "dotenv/config";
import { defineConfig , env } from "prisma/config"; // used for defining postgres configurations...

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: env("DATABASE_URL"),
  },
});