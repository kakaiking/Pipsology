import Link from "next/link";
import { Brain, ChevronRight, CheckCircle } from "lucide-react";
import { psychologyModules } from "@/lib/data";

const reflectionPrompts = [
    "Think of your last 3 losing trades. Write down the emotion you felt just before entering each one.",
    "What is your biggest trading fear right now? Where does that fear come from?",
    "When was the last time you broke one of your own rules? What happened as a result?",
];

const emotionalTracker = [
    { day: "Mon", stress: 3, confidence: 7, sleep: 8, trades: 2, wins: 2 },
    { day: "Tue", stress: 6, confidence: 5, sleep: 6, trades: 3, wins: 1 },
    { day: "Wed", stress: 8, confidence: 3, sleep: 5, trades: 4, wins: 1 },
    { day: "Thu", stress: 4, confidence: 8, sleep: 8, trades: 2, wins: 2 },
    { day: "Fri", stress: 5, confidence: 6, sleep: 7, trades: 1, wins: 1 },
];

export default function PsychologyPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-10">
                <div className="flex items-center gap-2 text-pink-400 text-sm font-medium mb-3">
                    <Brain size={14} />
                    <span>The Mindset Edge</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-display mb-3">Trading <span className="text-gradient">Psychology</span></h1>
                <p className="text-white/50 max-w-xl">90% of traders fail not because of strategy — but because of mindset. Master your emotions, master your trading.</p>
            </div>

            {/* Hero insight */}
            <div className="glass-brand rounded-2xl p-7 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 text-8xl opacity-10 select-none">🧠</div>
                <div className="relative z-10">
                    <blockquote className="text-xl md:text-2xl font-medium text-white/85 italic mb-3 leading-relaxed max-w-3xl">
                        &ldquo;The most important thing in trading is to have discipline. Almost no one has it.&rdquo;
                    </blockquote>
                    <cite className="text-sm text-green-400">— Mark Minervini, Stock Market Wizard</cite>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Modules */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-lg font-bold font-display mb-2">Psychology Playbook</h2>
                    {psychologyModules.map((mod) => (
                        <Link key={mod.id} href={`/psychology/${mod.slug}`} className="flex items-center gap-4 glass rounded-xl p-4 card-hover group">
                            <div className="text-3xl shrink-0">{mod.icon}</div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-white/90 group-hover:text-green-400 transition-colors mb-1">{mod.title}</h3>
                                <p className="text-sm text-white/45">{mod.desc}</p>
                                <div className="text-xs text-white/25 mt-1">{mod.lessons} lessons</div>
                            </div>
                            <ChevronRight size={16} className="text-white/20 group-hover:text-green-400 shrink-0 transition-colors" />
                        </Link>
                    ))}

                    {/* Reflection prompts */}
                    <div className="glass rounded-2xl p-5 mt-6">
                        <h3 className="font-semibold text-sm mb-1">📝 Daily Reflection Prompts</h3>
                        <p className="text-xs text-white/40 mb-4">Take 5 minutes to reflect. Consistent reflection is the #1 habit of professional traders.</p>
                        <div className="space-y-3">
                            {reflectionPrompts.map((prompt, i) => (
                                <div key={i} className="glass rounded-xl p-4">
                                    <p className="text-sm text-white/65 mb-3">{prompt}</p>
                                    <textarea rows={2} placeholder="Write your reflection here..." className="w-full px-3 py-2 glass rounded-lg text-xs text-white placeholder-white/20 border border-white/5 focus:border-green-500/30 focus:outline-none bg-transparent resize-none" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pre-trade checklist */}
                    <div className="glass rounded-2xl p-5">
                        <h3 className="font-semibold text-sm mb-1">✅ Pre-Trade Checklist Builder</h3>
                        <p className="text-xs text-white/40 mb-4">Run this checklist before every trade. No trade before all boxes are checked.</p>
                        <div className="space-y-2">
                            {[
                                "My entry matches my strategy rules",
                                "I have defined my stop loss before entering",
                                "This trade has at least 1:1.5 R:R",
                                "I am not trading out of FOMO or revenge",
                                "I am within my daily loss limit",
                            ].map((item, i) => (
                                <label key={i} className="flex items-center gap-3 cursor-pointer py-2 px-3 rounded-lg hover:bg-white/3 transition-all group">
                                    <div className="w-5 h-5 rounded border border-white/20 group-hover:border-green-500/40 flex items-center justify-center shrink-0">
                                        <CheckCircle size={12} className="text-green-400 opacity-0 group-hover:opacity-50 transition-opacity" />
                                    </div>
                                    <span className="text-sm text-white/65">{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-5">
                    {/* Emotional state tracker */}
                    <div className="glass rounded-2xl p-5">
                        <h3 className="font-semibold text-sm mb-1">😤 Emotional State Tracker</h3>
                        <p className="text-xs text-white/35 mb-4">Log your mental state before each session. See the correlation with trading performance.</p>
                        <div className="space-y-2 mb-4">
                            {emotionalTracker.map(d => (
                                <div key={d.day} className="flex items-center gap-2 text-xs">
                                    <span className="text-white/40 w-6">{d.day}</span>
                                    <div className="flex-1 h-4 bg-white/5 rounded overflow-hidden relative">
                                        <div className="absolute inset-y-0 left-0 bg-red-500/40 rounded" style={{ width: `${(d.stress / 10) * 100}%` }} title={`Stress: ${d.stress}/10`} />
                                    </div>
                                    <div className="flex-1 h-4 bg-white/5 rounded overflow-hidden relative">
                                        <div className="absolute inset-y-0 left-0 bg-green-500/40 rounded" style={{ width: `${(d.confidence / 10) * 100}%` }} title={`Confidence: ${d.confidence}/10`} />
                                    </div>
                                    <span className={`font-mono font-bold ${d.wins / d.trades >= 0.5 ? "text-green-400" : "text-red-400"}`}>
                                        {d.wins}/{d.trades}
                                    </span>
                                </div>
                            ))}
                            <div className="flex items-center gap-2 text-xs text-white/20 mt-1">
                                <div className="w-6" />
                                <div className="flex-1 text-center">🔴 Stress</div>
                                <div className="flex-1 text-center">🟢 Confidence</div>
                                <div className="w-6 text-center">W/T</div>
                            </div>
                        </div>
                        <div className="glass-brand rounded-xl p-3 text-xs text-white/60">
                            💡 AI Insight: Your win rate drops to <strong className="text-red-400">25%</strong> on days with stress &gt; 7/10. Consider reducing position size or skipping high-stress days.
                        </div>
                    </div>

                    {/* Trading rules builder */}
                    <div className="glass rounded-xl p-5">
                        <h3 className="font-semibold text-sm mb-3">📋 My Trading Rules</h3>
                        <div className="space-y-2 mb-3">
                            {["Only trade London & NY sessions", "Max 2 trades per day", "Risk max 1% per trade", "No trading during NFP week"].map(rule => (
                                <div key={rule} className="flex items-center gap-2 text-xs">
                                    <CheckCircle size={12} className="text-green-400 shrink-0" />
                                    <span className="text-white/60">{rule}</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-2 glass rounded-lg text-xs text-green-400 hover:bg-green-500/10 transition-all">+ Add Rule</button>
                    </div>

                    {/* Confession booth */}
                    <div className="glass rounded-xl p-5">
                        <h3 className="font-semibold text-sm mb-1">🕵️ Confession Booth</h3>
                        <p className="text-xs text-white/40 mb-3">Post your trading mistakes anonymously. No judgment, only growth.</p>
                        <textarea rows={3} placeholder="I revenge traded after a loss yesterday and blew 3% of my account in one trade..." className="w-full px-3 py-2 glass rounded-lg text-xs text-white placeholder-white/20 border border-white/5 focus:border-green-500/30 focus:outline-none bg-transparent resize-none mb-2" />
                        <button className="w-full py-2 rounded-lg bg-purple-500/15 text-purple-400 text-xs font-medium hover:bg-purple-500/20 transition-all">Post Anonymously</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
