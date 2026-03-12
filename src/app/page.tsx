import Link from "next/link";
import { ArrowRight, BookOpen, TrendingUp, Wrench, Users, BarChart3, Star, Clock, MessageSquare, Eye, ChevronRight, Zap, Shield, Brain, FlameIcon as Flame } from "lucide-react";
import { latestArticles, calendarEvents, forumPosts, courseGrades } from "@/lib/data";

const tagColors: Record<string, string> = {
    "chart-art": "badge-blue",
    "event-guide": "badge-purple",
    "crypto": "badge-orange",
    "watchlist": "badge-gold",
    "macro": "badge-red",
    "psychology": "badge-green",
};

const impactDot: Record<string, string> = { high: "bg-red-500", medium: "bg-yellow-500", low: "bg-green-500" };

const stats = [
    { label: "Traders Educated", value: "4.2M+", icon: Users },
    { label: "Lessons Available", value: "300+", icon: BookOpen },
    { label: "Quizzes Completed", value: "18M+", icon: Brain },
    { label: "Trades Logged", value: "850K+", icon: BarChart3 },
];

export default function HomePage() {
    return (
        <div className="bg-[#0a0f0d] pt-16">
            {/* ─── HERO ─── */}
            <section className="relative overflow-hidden bg-grid">
                {/* Glow blob */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-green-500/8 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 pt-20 pb-24 text-center relative z-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-brand rounded-full text-sm text-green-400 font-medium mb-6">
                        <Zap size={13} className="fill-green-400" />
                        Trusted by 4.2M+ traders worldwide
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight leading-tight mb-6">
                        <span className="text-white">Master Forex</span>
                        <br />
                        <span className="text-gradient">From Zero to Pro</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Free structured courses, AI-powered trade journal, live strategy backtester, real-time market analysis, and a 4-million strong community — all in one platform.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link href="/learn" className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-black font-bold text-lg hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all hover:scale-105 active:scale-95">
                            <BookOpen size={20} />
                            Start Learning Free
                            <ArrowRight size={18} />
                        </Link>
                        <Link href="/paths" className="inline-flex items-center gap-2 px-10 py-4 rounded-full glass font-bold text-lg hover:bg-white/8 transition-all text-white border border-white/10">
                            Find My Learning Path
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {stats.map(({ label, value, icon: Icon }) => (
                            <div key={label} className="glass rounded-xl p-4 text-center card-hover">
                                <Icon size={16} className="text-green-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold font-display text-gradient">{value}</div>
                                <div className="text-xs text-white/40 mt-1">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── QUICK LINKS ─── */}
            <section className="max-w-7xl mx-auto px-4 py-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { label: "Course Index", href: "/learn", icon: BookOpen, color: "text-green-400", bg: "bg-green-400/10" },
                        { label: "Trade Journal", href: "/journal", icon: BarChart3, color: "text-blue-400", bg: "bg-blue-400/10" },
                        { label: "Backtester", href: "/backtester", icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-400/10" },
                        { label: "Community", href: "/social", icon: Users, color: "text-orange-400", bg: "bg-orange-400/10" },
                    ].map((c) => (
                        <Link key={c.href} href={c.href} className="glass rounded-xl p-4 flex items-center gap-3 card-hover group">
                            <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                                <c.icon size={16} className={c.color} />
                            </div>
                            <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{c.label}</span>
                            <ChevronRight size={14} className={`ml-auto ${c.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                        </Link>
                    ))}
                </div>
            </section>

            {/* ─── LATEST CONTENT ─── */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Article feed */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold font-display">Latest from the Markets</h2>
                            <Link href="/news" className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1">View all <ArrowRight size={13} /></Link>
                        </div>
                        <div className="grid gap-4">
                            {latestArticles.map((a) => (
                                <Link key={a.id} href={`/${a.category === "Analysis" ? "analysis" : "news"}/${a.slug}`} className="flex items-center gap-5 glass rounded-2xl p-5 card-hover group border border-white/5">
                                    <div className="w-32 h-20 rounded-xl bg-surface-700 shrink-0 flex items-center justify-center overflow-hidden relative border border-white/5">
                                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <TrendingUp size={24} className="text-green-400/20 group-hover:text-green-400/40 transition-colors" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md font-bold ${tagColors[a.tag] || "badge-green"}`}>{a.category}</span>
                                            <span className="text-xs text-white/40 font-medium">{a.date} · {a.readTime}</span>
                                        </div>
                                        <h3 className="text-base font-bold text-white/95 group-hover:text-green-400 transition-colors line-clamp-2 leading-snug">{a.title}</h3>
                                        <p className="text-sm text-white/40 mt-1 line-clamp-1 font-medium italic">{a.excerpt}</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-green-500 group-hover:text-black transition-all">
                                        <ChevronRight size={16} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        {/* Economic Calendar */}
                        <div className="glass rounded-xl p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-sm">Today&apos;s Calendar</h3>
                                <Link href="/calendar" className="text-xs text-green-400">Full calendar →</Link>
                            </div>
                            <div className="space-y-2.5">
                                {calendarEvents.slice(0, 4).map((ev) => (
                                    <div key={ev.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                                        <div className={`w-2 h-2 rounded-full shrink-0 ${impactDot[ev.impact]}`} />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-medium text-white/80 truncate">{ev.event}</div>
                                            <div className="text-xs text-white/35">{ev.currency} · {ev.time}</div>
                                        </div>
                                        {ev.actual ? (
                                            <span className="text-xs font-mono font-semibold text-green-400">{ev.actual}</span>
                                        ) : (
                                            <span className="text-xs text-white/30 font-mono">{ev.forecast}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Forum Activity */}
                        <div className="glass rounded-xl p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-sm">Forum Buzz</h3>
                                <Link href="/forum" className="text-xs text-green-400">Join →</Link>
                            </div>
                            <div className="space-y-3">
                                {forumPosts.map((p) => (
                                    <Link key={p.id} href="/forum" className="block group">
                                        <div className="text-xs font-medium text-white/80 group-hover:text-green-400 transition-colors line-clamp-2 mb-1">{p.title}</div>
                                        <div className="flex items-center gap-3 text-xs text-white/30">
                                            <span className="flex items-center gap-1"><MessageSquare size={10} />{p.replies}</span>
                                            <span className="flex items-center gap-1"><Eye size={10} />{p.views}</span>
                                            <span className="flex items-center gap-1"><Clock size={10} />{p.timeAgo}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Your Progress */}
                        <div className="glass-brand rounded-xl p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <Flame size={16} className="text-orange-400" />
                                <h3 className="font-semibold text-sm">Your Progress</h3>
                            </div>
                            <div className="mb-3">
                                <div className="flex justify-between text-xs text-white/60 mb-1.5">
                                    <span>Elementary — Grade 3: Fibonacci</span>
                                    <span>60%</span>
                                </div>
                                <div className="progress-bar"><div className="progress-fill" style={{ width: "60%" }} /></div>
                            </div>
                            <div className="flex items-center gap-3 text-sm mb-4">
                                <div className="text-center">
                                    <div className="font-bold text-green-400">7</div>
                                    <div className="text-xs text-white/40">Streak 🔥</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-yellow-400">2,450</div>
                                    <div className="text-xs text-white/40">XP ⭐</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-white/80">4/11</div>
                                    <div className="text-xs text-white/40">Levels done</div>
                                </div>
                            </div>
                            <Link href="/learn" className="block text-center py-2 rounded-lg bg-green-500/20 text-green-400 text-sm font-medium hover:bg-green-500/30 transition-all">
                                Continue Learning →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FEATURES SHOWCASE ─── */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                        Everything a Trader <span className="text-gradient">Actually Needs</span>
                    </h2>
                    <p className="text-white/50 max-w-xl mx-auto">Not just a course — a complete trading ecosystem built for how traders actually learn and grow.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { icon: BookOpen, title: "300+ Free Lessons", desc: "Structured curriculum from absolute beginner to professional level with quizzes and progress tracking.", color: "text-green-400", bg: "bg-green-400/10", href: "/learn" },
                        { icon: BarChart3, title: "AI Trade Journal", desc: "Log every trade and let AI surface winning patterns, emotional triggers, and areas for improvement.", color: "text-blue-400", bg: "bg-blue-400/10", href: "/journal" },
                        { icon: TrendingUp, title: "Strategy Backtester", desc: "Replay historical market data, place simulated trades, and validate your strategy before risking real money.", color: "text-purple-400", bg: "bg-purple-400/10", href: "/backtester" },
                        { icon: Users, title: "Social Trade Ideas", desc: "Follow top traders, post your setups, track idea outcomes, and build your reputation on the leaderboard.", color: "text-orange-400", bg: "bg-orange-400/10", href: "/social" },
                        { icon: Brain, title: "Trading Psychology", desc: "Dedicated curriculum on emotions, discipline, and mental frameworks. Includes an emotional state tracker.", color: "text-pink-400", bg: "bg-pink-400/10", href: "/psychology" },
                        { icon: Shield, title: "Risk-First Education", desc: "Every lesson and tool is anchored in real risk management — position sizing, stop losses, and capital preservation.", color: "text-yellow-400", bg: "bg-yellow-400/10", href: "/tools" },
                    ].map((feature) => (
                        <Link key={feature.href} href={feature.href} className="glass rounded-[2rem] p-8 card-hover group border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/2 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-green-500/10 transition-colors" />
                            <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 shadow-inner ring-1 ring-white/10`}>
                                <feature.icon size={28} className={feature.color} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">{feature.title}</h3>
                            <p className="text-base text-white/50 leading-relaxed font-medium">{feature.desc}</p>
                            <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 group-hover:text-green-400 transition-colors">
                                Explore Feature <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ─── FEATURED LESSONS ─── */}
            <section className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold font-display">Featured Lessons</h2>
                    <Link href="/learn" className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1">All courses <ArrowRight size={13} /></Link>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {courseGrades.slice(0, 4).map((g) => (
                        <Link key={g.id} href={`/learn/${g.id}`} className="glass rounded-xl p-5 card-hover group">
                            <div className="flex items-center justify-between mb-3">
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${g.free ? "badge-green" : "badge-gold"}`}>
                                    {g.free ? "Free" : "Premium"}
                                </span>
                                <span className="text-xs text-white/30">{g.lessons} lessons</span>
                            </div>
                            <h3 className="font-semibold text-sm text-white group-hover:text-green-400 transition-colors mb-1">{g.title}</h3>
                            <p className="text-xs text-white/40 mb-3">{g.subtitle}</p>
                            {g.progress > 0 && (
                                <div className="progress-bar"><div className="progress-fill" style={{ width: `${g.progress}%` }} /></div>
                            )}
                        </Link>
                    ))}
                </div>
            </section>

            {/* ─── CTA BANNER ─── */}
            <section className="max-w-7xl mx-auto px-4 pb-20">
                <div className="relative overflow-hidden glass-brand rounded-3xl p-10 text-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-emerald-500/5" />
                    <div className="relative z-10">
                        <div className="text-4xl mb-4">🚀</div>
                        <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">
                            Start Your Trading Journey <span className="text-gradient">Today</span>
                        </h2>
                        <p className="text-white/50 mb-8 max-w-md mx-auto">Completely free to start. No credit card required. Join 4.2M+ traders already learning on Pipsology.</p>
                        <Link href="/account/signup" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-black font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all hover:scale-105">
                            <Star size={16} />
                            Create Free Account
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
