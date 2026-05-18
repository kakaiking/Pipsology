import Link from "next/link";
import { CheckCircle, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { courseGrades, preschoolLessons, curricula } from "@/lib/data";
import { ScrollytellingLesson, SectionContent } from "@/components/ScrollytellingLesson";

export function generateStaticParams() {
    const params: { grade: string; slug: string }[] = [];

    courseGrades.forEach((grade) => {
        const lessons = curricula[grade.id] || [];
        
        lessons.forEach((lesson: any) => {
            params.push({
                grade: grade.id,
                slug: lesson.slug,
            });
        });
    });

    return params;
}

export default async function LessonPage({ params }: { params: Promise<{ grade: string, slug: string }> }) {
    const { grade, slug } = await params;
    const currentGrade = courseGrades.find(g => g.id === grade);
    
    // Find lessons for this grade
    const lessons = curricula[grade] || [];
    const currentIndex = lessons.findIndex((l: any) => l.slug === slug);
    const currentLesson = lessons[currentIndex] as any;
    
    const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
    const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;

    // Default content if not found
    const defaultSections: SectionContent[] = [
        {
            id: "intro",
            title: currentLesson?.title || slug.replace(/-/g, ' '),
            text: ["Welcome to this lesson. In this module, we will explore key concepts related to forex trading."],
            visualType: "intro"
        }
    ];

    const sections = (currentLesson as any)?.content || defaultSections;

    return (
        <div className="pb-8 relative">
            <div className="flex gap-6 relative">

                {/* Lesson content */}
                <article className="flex-1 min-w-0 relative">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
                        <Link href="/learn" className="hover:text-white transition-colors flex items-center gap-1"><BookOpen size={13} /> Learn</Link>
                        <ChevronRight size={13} />
                        <Link href={`/learn/${grade}`} className="hover:text-white transition-colors">{currentGrade?.title || grade}</Link>
                        <ChevronRight size={13} />
                        <span className="text-white/60">{currentLesson?.title || slug.replace(/-/g, ' ')}</span>
                    </div>


                    {/* Lesson body with Scrollytelling */}
                    <div className="mb-6 relative" style={{ position: 'relative' }}>
                        <ScrollytellingLesson sections={sections} grade={grade} slug={slug} />
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between gap-4">
                        {prevLesson ? (
                            <Link href={`/learn/${grade}/${prevLesson.slug}`} className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-sm text-white/50 hover:text-white transition-all">
                                <ChevronLeft size={16} />
                                Previous
                            </Link>
                        ) : (
                            <button disabled className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-sm text-white/20 cursor-not-allowed">
                                <ChevronLeft size={16} />
                                Previous
                            </button>
                        )}
                        
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-sm font-medium text-green-400 hover:bg-green-500/10 transition-all border border-green-500/20">
                                <CheckCircle size={16} />
                                Mark Complete
                            </button>
                        </div>

                        {nextLesson ? (
                            <Link href={`/learn/${grade}/${nextLesson.slug}`} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-black rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-green-500/20 transition-all">
                                Next Lesson
                                <ChevronRight size={16} />
                            </Link>
                        ) : (
                            <Link href={`/learn/${grade}`} className="flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white rounded-xl text-sm font-semibold hover:bg-white/20 transition-all">
                                Back to Curriculum
                                <BookOpen size={16} />
                            </Link>
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
}
