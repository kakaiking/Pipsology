import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        if (!prisma) {
            return NextResponse.json({ lessons: [] });
        }

        const recentLessons = await prisma.lesson.findMany({
            take: 5,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                grade: true
            }
        });

        return NextResponse.json({ lessons: recentLessons });
    } catch (error: any) {
        console.error("Error fetching notification lessons:", error);
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
}
