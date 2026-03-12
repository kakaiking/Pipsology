import Link from "next/link";
import { Zap, ChevronRight, Clock, Star } from "lucide-react";
import { learningPaths } from "@/lib/data";

const onboardingQuiz = [
    { q: "How long have you been trading?", opts: ["Complete beginner", "< 1 year", "1–3 years", "3+ years"] },
    { q: "What most interests you?", opts: ["Technical Analysis", "Fundamental Analysis", "Both equally", "Not sure yet"] },
    { q: "How much time per day?", opts: ["< 30 mins", "30–60 mins", "1–2 hours", "Full-time"] },
    { q: "Your primary goal?", opts: ["Supplement income", "Full-time trading", "Learn the basics", "Trade professionally"] },
];

export default function PathsPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-10">
                <div className="flex items-center gap-2 text-purple-400 text-sm font-medium mb-3">
                    <Zap size={14} />
                    <span>Personalized Education</span>
                </div>
                <h1 className="text-4xl font-bold font-display mb-3">Your <span className="text-gradient">Learning Path</span></h1>
                <p className="text-white/50 max-w-xl">Stop guessing what to study next. Take the 2-minute assessment and get an AI-generated curriculum built specifically for you.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Onboarding quiz */}
                <div className="lg:col-span-1">
                    <div className="glass rounded-2xl p-5 sticky top-20">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                            <h3 className="font-semibold text-sm">Find My Path</h3>
                        </div>
                        <p className="text-xs text-white/45 mb-5">Answer 4 quick questions to get your personalized curriculum in seconds.</p>
                        <form className="space-y-4">
                            {onboardingQuiz.map((item, i) => (
                                <div key={i}>
                                    <label className="block text-xs font-medium text-white/60 mb-2">{item.q}</label>
                                    <select className="w-full px-3 py-2.5 glass rounded-xl text-sm text-white border border-white/5 focus:border-purple-500/30 focus:outline-none bg-[#0d1411]">
                                        <option value="">Select...</option>
                                        {item.opts.map(o => <option key={o}>{o}</option>)}
                                    </select>
                                </div>
                            ))}
                            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all flex items-center justify-center gap-2">
                                <Zap size={15} />
                                Generate My Path
                            </button>
                        </form>
                    </div>
                </div>

                {/* Preset paths */}
                <div className="lg:col-span-2">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white/30 mb-4">Browse All Paths</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {learningPaths.map((path) => (
                            <Link key={path.id} href={`/paths/${path.id}`} className="glass rounded-2xl p-5 card-hover group relative overflow-hidden">
                                {/* Gradient top accent */}
                                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${path.color}`} />

                                <div className="text-3xl mb-3">{path.icon}</div>
                                <h3 className="font-bold text-white group-hover:text-green-400 transition-colors mb-1">{path.title}</h3>
                                <p className="text-xs text-white/45 mb-4 leading-relaxed">{path.desc}</p>

                                {/* Steps preview */}
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {path.steps.map((step, i) => (
                                        <span key={i} className="text-xs px-2 py-0.5 glass rounded-full text-white/40">{step}</span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-xs text-white/35">
                                        <span className="flex items-center gap-1"><Clock size={10} /> {path.weeks} weeks</span>
                                        <span className={`px-2 py-0.5 rounded-full font-medium text-xs ${path.level === "Beginner" ? "badge-green" : path.level === "Intermediate" ? "badge-blue" : "badge-purple"}`}>{path.level}</span>
                                    </div>
                                    <ChevronRight size={14} className="text-white/20 group-hover:text-green-400 transition-colors" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Current path progress */}
                    <div className="mt-6 glass-brand rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-sm flex items-center gap-2">
                                <span>📊</span> Your Active Path: <span className="text-green-400">Swing Trader</span>
                            </h3>
                            <span className="text-xs text-white/30">40% complete</span>
                        </div>
                        <div className="progress-bar mb-4"><div className="progress-fill" style={{ width: "40%" }} /></div>
                        <div className="flex items-center gap-2 flex-wrap">
                            {["Preschool ✅", "Elementary ✅", "Chart Patterns →", "Fibonacci", "Risk Management"].map((step, i) => (
                                <span key={i} className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1 ${step.includes("✅") ? "badge-green" : step.includes("→") ? "bg-green-500/20 text-green-400 border border-green-500/30" : "glass text-white/30"}`}>
                                    {step}
                                </span>
                            ))}
                        </div>
                        <Link href="/learn" className="mt-4 flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors">
                            <Star size={13} /> Continue: Chart Patterns lesson →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
