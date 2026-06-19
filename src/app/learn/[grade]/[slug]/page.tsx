import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";
import { ScrollytellingLesson, SectionContent } from "@/components/ScrollytellingLesson";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: { params: Promise<{ grade: string, slug: string }> }) {
    const { grade, slug } = await params;
    const currentGrade = await prisma.grade.findUnique({
        where: { id: grade }
    });
    
    const lessons = await prisma.lesson.findMany({
        where: { gradeId: grade },
        orderBy: { createdAt: "asc" },
        include: {
            sections: {
                orderBy: { order: "asc" }
            }
        }
    });
    
    const currentIndex = lessons.findIndex((l: any) => l.slug === slug);
    const currentLesson = lessons[currentIndex] as any;

    const defaultSections: SectionContent[] = [
        {
            id: "intro",
            title: currentLesson?.title || slug.replace(/-/g, ' '),
            text: ["Welcome to this lesson. In this module, we will explore key concepts related to forex trading."],
            visualType: "intro"
        }
    ];

    const sections = currentLesson?.sections || defaultSections;

    return (
        <div style={{ height: "calc(100vh - 40px)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/40 mb-3 flex-shrink-0">
                <Link href="/learn" className="hover:text-white transition-colors flex items-center gap-1"><BookOpen size={13} /> Learn</Link>
                <ChevronRight size={13} />
                <Link href={`/learn/${grade}`} className="hover:text-white transition-colors">{currentGrade?.title || grade}</Link>
                <ChevronRight size={13} />
                <span className="text-white/60">{currentLesson?.title || slug.replace(/-/g, ' ')}</span>
            </div>

            {/* Video fills remaining space */}
            <div style={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
                <ScrollytellingLesson sections={sections} grade={grade} slug={slug} />
            </div>
        </div>
    );
}
