import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        // Must use the non-pooling direct URL for migrations
        // The pooled URL (pgBouncer) does not support DDL statements
        url: process.env.POSTGRES_URL_NON_POOLING ?? process.env.DATABASE_URL ?? "",
    },
});
