import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromSession } from "@/lib/auth";


export async function GET() {
    try {
        const user = await getUserFromSession();
        if (!user) {
            // Default 0 progress for anonymous / logged out
            return NextResponse.json({
                completedLessons: [],
                progress: {
                    preschool: 0,
                    kindergarten: 0,
                    elementary: 0,
                }
            });
        }

        if (!prisma) {
            return NextResponse.json(
                { message: "Database not connected" },
                { status: 500 }
            );
        }

        const [completed, lessonsFromDb] = await Promise.all([
            prisma.completedLesson.findMany({
                where: { userId: user.id },
                select: { lessonSlug: true, gradeId: true }
            }),
            prisma.lesson.findMany({
                select: { slug: true, gradeId: true }
            })
        ]);

        const completedSlugs = completed.map(c => c.lessonSlug);

        const lessonsByGrade: Record<string, string[]> = {};
        lessonsFromDb.forEach(l => {
            if (!lessonsByGrade[l.gradeId]) {
                lessonsByGrade[l.gradeId] = [];
            }
            lessonsByGrade[l.gradeId].push(l.slug);
        });

        // Calculate progress for each grade dynamically
        const progress: Record<string, number> = {};
        for (const [gradeId, slugs] of Object.entries(lessonsByGrade)) {
            const total = slugs.length;
            if (total === 0) {
                progress[gradeId] = 0;
                continue;
            }
            const completedCount = slugs.filter(slug => completedSlugs.includes(slug)).length;
            progress[gradeId] = Math.round((completedCount / total) * 100);
        }


        return NextResponse.json({
            completedLessons: completedSlugs,
            progress
        });
    } catch (error: any) {
        console.error("Error fetching user progress:", error);
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const user = await getUserFromSession();
        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized. Please sign in to save your progress." },
                { status: 401 }
            );
        }

        if (!prisma) {
            return NextResponse.json(
                { message: "Database not connected" },
                { status: 500 }
            );
        }

        const { gradeId, lessonSlug } = await req.json();
        if (!gradeId || !lessonSlug) {
            return NextResponse.json(
                { message: "Missing gradeId or lessonSlug" },
                { status: 400 }
            );
        }

        // 1. Mark lesson completed in DB
        await prisma.completedLesson.upsert({
            where: {
                userId_lessonSlug: {
                    userId: user.id,
                    lessonSlug,
                }
            },
            update: {}, // Nothing to update
            create: {
                userId: user.id,
                gradeId,
                lessonSlug
            }
        });

        // 2. Award XP (50 XP) to the user
        await prisma.user.update({
            where: { id: user.id },
            data: {
                totalXP: { increment: 50 }
            }
        });

        // Fetch all completed lessons to calculate new progress
        const completed = await prisma.completedLesson.findMany({
            where: { userId: user.id },
            select: { lessonSlug: true }
        });

        const completedSlugs = completed.map(c => c.lessonSlug);

        const lessonsFromDb = await prisma.lesson.findMany({
            select: { slug: true, gradeId: true }
        });

        const lessonsByGrade: Record<string, string[]> = {};
        lessonsFromDb.forEach(l => {
            if (!lessonsByGrade[l.gradeId]) {
                lessonsByGrade[l.gradeId] = [];
            }
            lessonsByGrade[l.gradeId].push(l.slug);
        });

        // Calculate progress for each grade dynamically
        const progress: Record<string, number> = {};
        for (const [gId, slugs] of Object.entries(lessonsByGrade)) {
            const total = slugs.length;
            if (total === 0) {
                progress[gId] = 0;
                continue;
            }
            const completedCount = slugs.filter(slug => completedSlugs.includes(slug)).length;
            progress[gId] = Math.round((completedCount / total) * 100);
        }


        return NextResponse.json({
            message: "Lesson marked completed!",
            completedLessons: completedSlugs,
            progress
        });
    } catch (error: any) {
        console.error("Error saving lesson completion:", error);
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}
