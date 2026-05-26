const { Pool } = require("pg");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
require("dotenv").config();

async function seed() {
    const connectionString =
        process.env.POSTGRES_URL_NON_POOLING ?? process.env.DATABASE_URL;

    if (!connectionString) {
        console.error("❌ ERROR: Connection string not found in environment.");
        process.exit(1);
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    console.log("🧹 Starting database cleaning...");

    try {
        await prisma.$connect();
        console.log("Connected to DB.");

        // Clear existing lessons to start clean
        console.log("Clearing all existing lessons...");
        await prisma.lesson.deleteMany({});
        console.log("✅ Cleared all existing lessons from the database.");

        console.log("✨ Seeding process completed successfully (database is empty and ready for dynamic input!).");
    } catch (err) {
        console.error("❌ Cleaning failed:", err);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

seed();
