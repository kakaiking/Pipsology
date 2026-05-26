import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

let prismaInstance: PrismaClient;

if (typeof window === "undefined") {
    // Use the NON-POOLING direct connection for the pg adapter at runtime.
    // The pooled URL (POSTGRES_PRISMA_URL) uses pgBouncer which is incompatible with pg.Pool.
    const connectionString =
        process.env.POSTGRES_URL_NON_POOLING ??
        process.env.DATABASE_URL;

    if (connectionString) {
        const pool = new Pool({ connectionString });
        const adapter = new PrismaPg(pool);

        prismaInstance =
            globalForPrisma.prisma ??
            new PrismaClient({
                adapter,
                log:
                    process.env.NODE_ENV === "development"
                        ? ["query", "error", "warn"]
                        : ["error"],
            });

        if (process.env.NODE_ENV !== "production") {
            globalForPrisma.prisma = prismaInstance;
        }
    } else {
        prismaInstance = null as any;
    }
} else {
    prismaInstance = null as any;
}

export const prisma = prismaInstance;
