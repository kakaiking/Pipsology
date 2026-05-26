import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        if (!prisma) {
            return NextResponse.json(
                {
                    status: "error",
                    message: "Prisma client is not initialized. Please verify that your DATABASE_URL or POSTGRES_PRISMA_URL environment variables are configured in your .env file.",
                },
                { status: 500 }
            );
        }

        // 1. Upsert a test user to avoid duplicates on re-runs
        const testUser = await prisma.user.upsert({
            where: { email: "test-trader@pipforge.com" },
            update: {
                totalXP: { increment: 10 },
                currentStreak: { increment: 1 },
                lastActiveAt: new Date(),
            },
            create: {
                username: "test_trader_" + Math.floor(Math.random() * 1000),
                email: "test-trader@pipforge.com",
                totalXP: 100,
                currentStreak: 1,
                lastActiveAt: new Date(),
            },
        });

        // 2. Track educational progress (complete first lesson)
        const progress = await prisma.completedLesson.upsert({
            where: {
                userId_lessonSlug: {
                    userId: testUser.id,
                    lessonSlug: "what-is-forex",
                },
            },
            update: {
                completedAt: new Date(),
            },
            create: {
                userId: testUser.id,
                gradeId: "preschool",
                lessonSlug: "what-is-forex",
            },
        });

        // 3. Track streaks & achievements (earn badge)
        const badge = await prisma.userBadge.upsert({
            where: {
                userId_badgeId: {
                    userId: testUser.id,
                    badgeId: "first-steps",
                },
            },
            update: {
                earnedAt: new Date(),
            },
            create: {
                userId: testUser.id,
                badgeId: "first-steps",
            },
        });

        return NextResponse.json({
            status: "success",
            message: "🚀 Database connection and transactions verified successfully!",
            data: {
                user: testUser,
                completedLesson: progress,
                earnedBadge: badge,
            },
        });
    } catch (error: any) {
        console.error("Database Connection Verification Failure:", error);
        return NextResponse.json(
            {
                status: "error",
                message: "Database connection failed. Please double-check your connection credentials.",
                error: error.message || error,
            },
            { status: 500 }
        );
    }
}
