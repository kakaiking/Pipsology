import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const gradeId = searchParams.get("gradeId");

        if (!prisma) {
            return NextResponse.json({ message: "Database not connected" }, { status: 500 });
        }

        const lessons = await prisma.lesson.findMany({
            where: gradeId ? { gradeId } : {},
            select: {
                id: true,
                slug: true,
                title: true,
                gradeId: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: { createdAt: "asc" }
        });

        return NextResponse.json({ lessons });
    } catch (error: any) {
        console.error("Error fetching lessons:", error);
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
}
