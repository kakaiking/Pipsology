import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { courseGrades, preschoolLessons } from "@/lib/data";

export function generateStaticParams() {
    return courseGrades.map((grade) => ({
        grade: grade.id,
    }));
}

export default async function GradePage({ params }: { params: Promise<{ grade: string }> }) {
    const { grade } = await params;
    const currentGrade = courseGrades.find(g => g.id === grade);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/learn" className="p-2 glass rounded-lg text-white/50 hover:text-white transition-all">
                    <ChevronLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold font-display">{currentGrade?.title || grade}</h1>
                    <p className="text-white/50">{currentGrade?.subtitle}</p>
                </div>
            </div>

            {/* Progress */}
            <div className="glass rounded-2xl p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-white/70">Grade Progress</span>
                    <span className="text-sm font-bold text-green-400">{currentGrade?.progress || 0}%</span>
                </div>
                <div className="progress-bar h-2"><div className="progress-fill" style={{ width: `${currentGrade?.progress || 0}%` }} /></div>
            </div>

            {/* Lesson List */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white/90 mb-4">Lessons</h2>
                {preschoolLessons.map((lesson, i) => (
                    <Link
                        key={lesson.id}
                        href={`/learn/${grade}/${lesson.slug}`}
                        className="flex items-center gap-4 glass rounded-2xl p-5 card-hover group"
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${lesson.done ? "bg-green-500/20 text-green-400" : "bg-white/5 text-white/40"}`}>
                            {lesson.done ? <CheckCircle size={20} /> : i + 1}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-white/90 group-hover:text-green-400 transition-colors">{lesson.title}</h3>
                            <p className="text-xs text-white/40 mt-1">~8 min read</p>
                        </div>
                        <ChevronRight size={18} className="text-white/20 group-hover:text-green-400 transition-colors" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
