import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        if (!prisma) {
            return NextResponse.json({ message: "Database not connected" }, { status: 500 });
        }

        const grades = await prisma.grade.findMany({
            include: {
                lessons: {
                    select: {
                        id: true,
                        slug: true,
                        title: true
                    }
                }
            },
            orderBy: { createdAt: "asc" }
        });

        return NextResponse.json({ grades });
    } catch (error: any) {
        console.error("Error fetching public grades:", error);
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
}
