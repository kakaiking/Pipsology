const { Pool } = require("pg");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
require("dotenv").config();

async function runDiagnostics() {
    // Use the non-pooling direct connection for the pg adapter
    const connectionString =
        process.env.POSTGRES_URL_NON_POOLING ?? process.env.DATABASE_URL;

    console.log("--- DATABASE DIAGNOSTIC START ---");
    console.log("Using POSTGRES_URL_NON_POOLING:", process.env.POSTGRES_URL_NON_POOLING ? "YES" : "NO (falling back to DATABASE_URL)");
    console.log("ConnectionString found:", connectionString ? "YES" : "NO");

    if (!connectionString) {
        console.error("ERROR: No connection string found. Please verify your .env file.");
        return;
    }

    // Test: Prisma Client with direct connection
    console.log("\n[1/1] Testing Prisma Client with direct (non-pooled) connection...");
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    try {
        await prisma.$connect();
        console.log("SUCCESS: Prisma connected!");

        const userCount = await prisma.user.count();
        console.log("SUCCESS: Prisma query executed. Current user count in DB:", userCount);
    } catch (err) {
        console.error("FAILED:", err.message ?? err);
    } finally {
        await prisma.$disconnect();
        await pool.end();
        console.log("\n--- DATABASE DIAGNOSTIC END ---");
    }
}

runDiagnostics();
