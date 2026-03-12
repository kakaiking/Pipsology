import Link from "next/link";
import { BarChart2, Star } from "lucide-react";
import { quizList } from "@/lib/data";
import { QuizWidget } from "@/components/QuizWidget";

export default function QuizzesPage() {
    const featuredQuiz = quizList[0];
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-3">
                        <BarChart2 size={14} />
                        <span>Knowledge Testing</span>
                    </div>
                    <h1 className="text-4xl font-bold font-display mb-2">Forex <span className="text-gradient">Quizzes</span></h1>
                    <p className="text-white/50">Test your knowledge on every topic covered in the School of Pipsology.</p>
                </div>
                <div className="glass rounded-xl px-5 py-3 text-sm text-white/50">
                    🧠 Sign in to save your scores
                </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
                {/* Quiz list */}
                <div className="lg:col-span-3 space-y-3">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-white/30 mb-4">All Quizzes</h2>
                    {quizList.map((quiz) => (
                        <Link key={quiz.slug} href={`/quizzes/${quiz.slug}`} className="flex items-center gap-4 glass rounded-xl p-4 card-hover group">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-lg ${quiz.score !== null ? "bg-green-500/20" : "bg-white/5"}`}>
                                {quiz.score !== null ? "✅" : "🎯"}
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-sm text-white/90 group-hover:text-green-400 transition-colors">{quiz.title}</div>
                                <div className="flex items-center gap-3 mt-0.5 text-xs text-white/35">
                                    <span>{quiz.questions.length || 0} questions</span>
                                    <span className={`px-1.5 py-0.5 rounded text-xs ${quiz.difficulty === "Beginner" ? "badge-green" : quiz.difficulty === "Intermediate" ? "badge-gold" : "badge-purple"}`}>{quiz.difficulty}</span>
                                    <span>{quiz.completions} completed</span>
                                </div>
                            </div>
                            {quiz.score !== null && (
                                <div className="text-right">
                                    <div className="text-sm font-bold text-green-400">{quiz.score}%</div>
                                    <div className="text-xs text-white/30">your score</div>
                                </div>
                            )}
                            <Star size={14} className="text-white/20 group-hover:text-green-400 transition-colors" />
                        </Link>
                    ))}
                </div>

                {/* Live quiz preview */}
                <div className="lg:col-span-2">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-white/30 mb-4">Try It Now</h2>
                    <QuizWidget quiz={featuredQuiz} />
                </div>
            </div>
        </div>
    );
}
