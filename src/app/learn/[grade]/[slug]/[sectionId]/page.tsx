import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen, Clock, Youtube, Sparkles, CheckCircle, Lightbulb } from "lucide-react";
import { generateInDepthContent } from "@/lib/lessonHelpers";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const extractVideoId = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

export default async function SectionPage({ params }: { params: Promise<{ grade: string, slug: string, sectionId: string }> }) {
    const { grade, slug, sectionId } = await params;
    const currentGrade = await prisma.grade.findUnique({
        where: { id: grade }
    });
    
    // Find all lessons for this grade
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

    if (!currentLesson) {
        return (
            <div className="py-20 text-center">
                <h1 className="text-2xl font-bold text-white">Lesson not found</h1>
                <Link href="/learn" className="text-green-400 hover:underline mt-4 inline-block">Back to Curriculum</Link>
            </div>
        );
    }

    const sections = currentLesson.sections || [];

    const sectionIndex = sections.findIndex((s: any) => s.id === sectionId);
    const currentSection = sections[sectionIndex];

    if (!currentSection) {
        return (
            <div className="py-20 text-center">
                <h1 className="text-2xl font-bold text-white">Section not found</h1>
                <Link href={`/learn/${grade}/${slug}`} className="text-green-400 hover:underline mt-4 inline-block">Back to Lesson</Link>
            </div>
        );
    }

    const inDepthContent = currentSection.inDepth || generateInDepthContent(currentSection.title, currentSection.text || []);
    const videoId = extractVideoId(currentSection.videoUrl);

    const prevSection = sectionIndex > 0 ? sections[sectionIndex - 1] : null;
    const nextSection = sectionIndex < sections.length - 1 ? sections[sectionIndex + 1] : null;

    return (
        <div className="pb-16 max-w-7xl mx-auto px-4 md:px-6 relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-20 right-1/4 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

            <div className="relative z-10">
                {/* Back to Lesson & Breadcrumb */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <Link 
                        href={`/learn/${grade}/${slug}`} 
                        className="group flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-all bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/5 hover:border-white/10 w-fit"
                    >
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Lesson: {currentLesson.title}</span>
                    </Link>

                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs md:text-sm text-white/40">
                        <Link href="/learn" className="hover:text-white transition-colors flex items-center gap-1">
                            <BookOpen size={13} /> Learn
                        </Link>
                        <ChevronRight size={12} />
                        <Link href={`/learn/${grade}`} className="hover:text-white transition-colors">
                            {currentGrade?.title || grade}
                        </Link>
                        <ChevronRight size={12} />
                        <Link href={`/learn/${grade}/${slug}`} className="hover:text-white transition-colors max-w-[150px] truncate">
                            {currentLesson.title}
                        </Link>
                        <ChevronRight size={12} />
                        <span className="text-white/60 font-medium max-w-[150px] truncate">{currentSection.title}</span>
                    </div>
                </div>

                {/* Section Header */}
                <div className="glass rounded-3xl p-6 md:p-8 mb-8 border border-white/10 relative overflow-hidden bg-gradient-to-br from-white/[0.04] to-transparent">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="bg-green-500/15 border border-green-500/30 text-green-400 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                                    Deep Dive
                                </span>
                                <span className="text-white/40 text-xs flex items-center gap-1 font-medium">
                                    <Clock size={12} /> ~5 min read
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold font-display bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                                {currentSection.title}
                            </h1>
                            <p className="text-white/50 text-sm md:text-base mt-2 font-medium">
                                Part {sectionIndex + 1} of {sections.length} in this module
                            </p>
                        </div>
                        <div className="text-5xl md:text-6xl p-4 bg-white/5 rounded-2xl border border-white/5 self-start md:self-auto shadow-inner">
                            {sectionIndex === 0 ? "💡" : sectionIndex === 1 ? "🔍" : sectionIndex === 2 ? "📊" : sectionIndex === 3 ? "🎯" : "🏆"}
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Deep Dive Text */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="glass p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent">
                            
                            {/* Accent Glow */}
                            <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />
                            
                            <div className="relative z-10 prose prose-invert max-w-none text-white/80 leading-relaxed text-lg space-y-6">
                                {inDepthContent.map((paragraph: string, index: number) => {
                                    if (index === 0) {
                                        // Premium drop-cap styling for the first letter of the first paragraph
                                        const firstLetter = paragraph.charAt(0);
                                        const restOfParagraph = paragraph.slice(1);
                                        return (
                                            <p key={index} className="text-white/80 leading-relaxed text-lg md:text-xl">
                                                <span className="float-left text-5xl md:text-6xl font-extrabold font-display text-green-400 mr-3 mt-1 line-height-0 select-none bg-gradient-to-br from-green-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                                                    {firstLetter}
                                                </span>
                                                {restOfParagraph}
                                            </p>
                                        );
                                    }
                                    
                                    // Highlight key concepts if the paragraph contains specific terms
                                    const hasKeyTerm = paragraph.includes("Regulation") || paragraph.includes("Technical analysis") || paragraph.includes("Risk management");
                                    if (hasKeyTerm) {
                                        return (
                                            <p key={index} className="border-l-4 border-green-500/50 pl-4 py-1 italic bg-green-500/[0.02] rounded-r-xl my-6 text-white/90">
                                                {paragraph}
                                            </p>
                                        );
                                    }

                                    return (
                                        <p key={index} className="text-white/70 leading-relaxed">
                                            {paragraph}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Navigation Footer Inside Article */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                            {prevSection ? (
                                <Link 
                                    href={`/learn/${grade}/${slug}/${prevSection.id}`} 
                                    className="group w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 glass rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                                >
                                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    <div className="text-left">
                                        <span className="block text-[10px] text-white/40 uppercase tracking-wider font-bold">Previous Topic</span>
                                        <span className="font-semibold max-w-[180px] truncate block">{prevSection.title}</span>
                                    </div>
                                </Link>
                            ) : (
                                <div className="hidden sm:block w-10" />
                            )}

                            <Link 
                                href={`/learn/${grade}/${slug}`}
                                className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-sm font-semibold hover:shadow-lg transition-all text-center"
                            >
                                Lesson Overview
                            </Link>

                            {nextSection ? (
                                <Link 
                                    href={`/learn/${grade}/${slug}/${nextSection.id}`} 
                                    className="group w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-black rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-green-500/20 transition-all"
                                >
                                    <div className="text-right">
                                        <span className="block text-[10px] text-black/50 uppercase tracking-wider font-bold">Next Topic</span>
                                        <span className="font-extrabold max-w-[180px] truncate block">{nextSection.title}</span>
                                    </div>
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            ) : (
                                <Link 
                                    href={`/learn/${grade}/${slug}`} 
                                    className="group w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-black rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-green-500/20 transition-all"
                                >
                                    <div className="text-right">
                                        <span className="block text-[10px] text-black/50 uppercase tracking-wider font-bold">All Done</span>
                                        <span className="font-extrabold block">Finish Lesson</span>
                                    </div>
                                    <CheckCircle size={16} className="group-hover:scale-110 transition-transform" />
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Video & Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* Interactive Video Box */}
                        {videoId && (
                            <div className="glass p-6 rounded-3xl border border-white/10 relative overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent shadow-xl">
                                <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
                                <div className="flex items-center gap-2 text-green-400 font-bold text-xs tracking-wider uppercase mb-3">
                                    <Youtube size={14} className="text-red-500" />
                                    Watch Video Lesson
                                </div>
                                <div className="rounded-2xl overflow-hidden aspect-video border border-white/10 bg-black shadow-2xl relative group">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                                        title={`${currentSection.title} Video`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            </div>
                        )}

                        {/* Lesson Curriculum Outline Widget */}
                        <div className="glass p-6 rounded-3xl border border-white/10 relative overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent shadow-xl">
                            <h3 className="text-sm font-extrabold text-white/90 uppercase tracking-wider mb-4 font-display flex items-center gap-2">
                                <Sparkles size={14} className="text-green-400" />
                                Lesson Curriculum
                            </h3>
                            <div className="space-y-3">
                                {sections.map((sec: any, idx: number) => {
                                    const isCurrent = sec.id === sectionId;
                                    return (
                                        <Link 
                                            key={sec.id}
                                            href={`/learn/${grade}/${slug}/${sec.id}`}
                                            className={`flex items-center gap-3 p-3 rounded-2xl transition-all border ${
                                                isCurrent 
                                                    ? "bg-green-500/10 border-green-500/20 text-white" 
                                                    : "bg-white/[0.02] hover:bg-white/5 border-white/5 text-white/60 hover:text-white"
                                            }`}
                                        >
                                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                                                isCurrent 
                                                    ? "bg-green-500 text-black shadow-lg shadow-green-500/20" 
                                                    : "bg-white/5 text-white/40"
                                            }`}>
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-xs md:text-sm truncate leading-snug">
                                                    {sec.title}
                                                </div>
                                                <div className="text-[10px] text-white/30 font-medium">
                                                    {isCurrent ? "Reading Now" : `${sec.videoUrl ? "Video + " : ""}Read`}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Takeaway Card */}
                        <div className="glass p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-green-500/[0.04] to-emerald-500/[0.01] relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-green-400/5 rounded-full blur-2xl pointer-events-none" />
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-green-500/20 rounded-xl text-green-400 mt-0.5">
                                    <Lightbulb size={16} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-green-400 mb-1">Key Takeaway</h4>
                                    <p className="text-xs text-white/60 leading-relaxed font-medium">
                                        Focus on understanding the mechanical details of {currentSection.title}. This builds the structural framework for consistent, successful trades in the global marketplace.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
