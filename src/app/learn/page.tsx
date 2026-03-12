import Link from "next/link";
import { BookOpen, Lock, CheckCircle, Circle, ChevronRight, Star, Trophy, Zap, BarChart2 } from "lucide-react";
import { courseGrades } from "@/lib/data";

export default function LearnPage() {
    const totalLessons = courseGrades.reduce((s, g) => s + g.lessons, 0);
    const completedLessons = 14;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-3">
                        <BookOpen size={14} />
                        <span>School of Pipsology</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-display mb-3">
                        Your <span className="text-gradient">Forex</span> Education
                    </h1>
                    <p className="text-white/50 max-w-lg">From complete beginner to professional-level trader — {totalLessons} lessons across 11 levels. Completely free to start.</p>
                </div>

                {/* Progress summary */}
                <div className="glass rounded-2xl p-5 min-w-[220px]">
                    <div className="text-xs text-white/40 mb-2">Overall Progress</div>
                    <div className="text-3xl font-bold font-display text-gradient mb-2">{Math.round((completedLessons / totalLessons) * 100)}%</div>
                    <div className="progress-bar mb-2"><div className="progress-fill" style={{ width: `${(completedLessons / totalLessons) * 100}%` }} /></div>
                    <div className="text-xs text-white/40">{completedLessons} of {totalLessons} lessons complete</div>
                    <div className="flex gap-3 mt-3">
                        <div className="text-center">
                            <div className="text-sm font-bold text-orange-400">🔥 7</div>
                            <div className="text-xs text-white/30">streak</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm font-bold text-yellow-400">⭐ 2,450</div>
                            <div className="text-xs text-white/30">XP</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-3 gap-3 mb-10">
                {[
                    { label: "Quizzes", href: "/quizzes", icon: BarChart2, color: "text-blue-400" },
                    { label: "Learning Paths", href: "/paths", icon: Zap, color: "text-purple-400" },
                    { label: "Achievements", href: "/achievements", icon: Trophy, color: "text-yellow-400" },
                ].map(({ label, href, icon: Icon, color }) => (
                    <Link key={href} href={href} className="glass rounded-xl p-3 flex items-center gap-2 hover:bg-white/5 transition-all text-sm font-medium text-white/70 hover:text-white group">
                        <Icon size={14} className={`${color} group-hover:scale-110 transition-transform`} />
                        {label}
                    </Link>
                ))}
            </div>

            {/* Curriculum grades */}
            <div className="space-y-3">
                {courseGrades.map((grade, i) => {
                    const isLocked = !grade.free;
                    const isDone = grade.progress === 100;
                    const isActive = grade.progress > 0 && grade.progress < 100;

                    return (
                        <div key={grade.id} className={`glass rounded-2xl overflow-hidden card-hover transition-all ${isLocked ? "opacity-70" : ""}`}>
                            <div className="flex items-center gap-5 p-5">
                                {/* Level number */}
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${isDone ? "bg-green-500/20 text-green-400" :
                                        isActive ? "bg-green-500/10 text-green-400" :
                                            isLocked ? "bg-white/5 text-white/30" : "bg-white/5 text-white/50"
                                    }`}>
                                    {isDone ? <CheckCircle size={22} className="text-green-400" /> :
                                        isLocked ? <Lock size={18} /> :
                                            <span className="font-display">{i + 1}</span>}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-white/90">{grade.title}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${grade.free ? "badge-green" : "badge-gold"}`}>
                                            {grade.free ? "Free" : "Premium"}
                                        </span>
                                        {isDone && <span className="text-xs badge-green px-2 py-0.5 rounded-full">✓ Done</span>}
                                    </div>
                                    <p className="text-sm text-white/45">{grade.subtitle}</p>
                                    {isActive && (
                                        <div className="mt-2 flex items-center gap-3">
                                            <div className="progress-bar flex-1 max-w-[120px]">
                                                <div className="progress-fill" style={{ width: `${grade.progress}%` }} />
                                            </div>
                                            <span className="text-xs text-white/35">{grade.progress}% complete</span>
                                        </div>
                                    )}
                                </div>

                                {/* Metadata */}
                                <div className="hidden sm:flex items-center gap-5 text-xs text-white/35 shrink-0">
                                    <span>{grade.lessons} lessons</span>
                                </div>

                                {/* CTA */}
                                {isLocked ? (
                                    <Link href="/premium" className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-400 border border-yellow-500/20 hover:from-yellow-500/30 transition-all">
                                        <Star size={12} />
                                        Upgrade
                                    </Link>
                                ) : isDone ? (
                                    <Link href={`/learn/${grade.id}`} className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium glass text-white/60 hover:text-white transition-all">
                                        Review
                                        <ChevronRight size={14} />
                                    </Link>
                                ) : (
                                    <Link href={`/learn/${grade.id}`} className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-black hover:shadow-lg hover:shadow-green-500/20 transition-all">
                                        {isActive ? "Continue" : "Start"}
                                        <ChevronRight size={14} />
                                    </Link>
                                )}
                            </div>

                            {/* Active lesson progress bar */}
                            {isActive && (
                                <div className="h-0.5 bg-[#1e2d24]">
                                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all" style={{ width: `${grade.progress}%` }} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Premium CTA */}
            <div className="mt-8 glass-brand rounded-2xl p-8 text-center">
                <div className="text-3xl mb-3">👑</div>
                <h2 className="text-xl font-bold font-display mb-2">Unlock the Full Curriculum</h2>
                <p className="text-white/50 text-sm mb-5 max-w-md mx-auto">Get access to High School through Graduation — plus AI trade journal, event trading guides, weekly recaps, and unlimited MarketVision™.</p>
                <Link href="/premium" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold text-sm hover:shadow-lg hover:shadow-yellow-500/20 transition-all">
                    <Star size={14} />
                    Get Premium Access
                </Link>
            </div>
        </div>
    );
}
