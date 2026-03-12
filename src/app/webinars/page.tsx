import Link from "next/link";
import { Video, Star, Calendar, Clock, Users } from "lucide-react";
import { webinars } from "@/lib/data";

export default function WebinarsPage() {
    const upcoming = webinars.filter(w => w.status === "upcoming");
    const replays = webinars.filter(w => w.status === "replay");

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-8">
                <div className="flex items-center gap-2 text-red-400 text-sm font-medium mb-3">
                    <Video size={14} />
                    <span>Live Education</span>
                </div>
                <h1 className="text-4xl font-bold font-display mb-2">Live <span className="text-gradient">Webinars</span></h1>
                <p className="text-white/50">Weekly live sessions with professional traders. Register, watch live, ask questions, or catch the replay.</p>
            </div>

            {/* Next live session hero */}
            <div className="glass-brand rounded-2xl p-7 mb-8 flex items-center gap-6 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-red-400 bg-red-400/10 px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                            NEXT LIVE · Mon, Mar 9
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold font-display text-white mb-2">Weekly Market Outlook: NFP Week Special</h2>
                    <p className="text-sm text-white/55 mb-3">Hosted by <strong className="text-white/80">Alex Rivera</strong> · 09:00 EST · 60 min</p>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-xs text-white/40"><Users size={11} /> 847 registered</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-red-500/20 transition-all">
                        🔔 Register Free
                    </button>
                    <span className="text-xs text-white/30 text-center">Free for all members</span>
                </div>
            </div>

            {/* Upcoming */}
            <section className="mb-10">
                <h2 className="text-lg font-bold font-display mb-4 flex items-center gap-2">
                    <Calendar size={16} className="text-green-400" /> Upcoming Sessions
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcoming.map(w => (
                        <div key={w.id} className="glass rounded-xl overflow-hidden card-hover">
                            <div className="h-32 bg-gradient-to-br from-[#1e2d24] to-[#0d1411] flex items-center justify-center">
                                <div className="text-center">
                                    <Video size={28} className="text-green-400/30 mx-auto mb-1" />
                                    <span className="text-xs text-white/20">{w.category}</span>
                                </div>
                            </div>
                            <div className="p-4">
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium mb-2 inline-block ${w.category === "AMA" ? "badge-purple" : w.category === "Live Trade" ? "badge-red" : "badge-green"}`}>{w.category}</span>
                                <h3 className="font-semibold text-sm text-white/90 mb-2 line-clamp-2">{w.title}</h3>
                                <div className="flex items-center gap-3 text-xs text-white/35 mb-3">
                                    <span>{w.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={10} />{w.time}</span>
                                    <span className="flex items-center gap-1"><Users size={10} />{w.registered}</span>
                                </div>
                                <div className="text-xs text-white/40 mb-3">Hosted by <strong className="text-white/60">{w.host}</strong></div>
                                <button className="w-full py-2 rounded-lg bg-green-500/10 text-green-400 text-xs font-medium hover:bg-green-500/15 transition-all border border-green-500/15">
                                    Register →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Replays */}
            <section>
                <h2 className="text-lg font-bold font-display mb-4 flex items-center gap-2">
                    <Video size={16} className="text-blue-400" /> Replay Library
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    {replays.map(w => (
                        <div key={w.id} className="glass rounded-xl overflow-hidden card-hover flex">
                            <div className="w-28 h-24 bg-gradient-to-br from-[#1e2d24] to-[#111a16] flex items-center justify-center shrink-0">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <Video size={16} className="text-white/30 ml-0.5" />
                                </div>
                            </div>
                            <div className="p-4 flex-1">
                                <span className="badge-blue text-xs px-2 py-0.5 rounded-full">Replay</span>
                                <h3 className="font-semibold text-xs text-white/80 mt-2 mb-1 line-clamp-2">{w.title}</h3>
                                <div className="text-xs text-white/35">{w.host} · {w.date} · {w.registered.toLocaleString()} viewers</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Premium webinars CTA */}
            <div className="mt-8 glass rounded-2xl p-6 flex items-center gap-5 flex-wrap">
                <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">👑 Premium Members Get More</h3>
                    <p className="text-sm text-white/50">Exclusive weekly expert masterclasses, strategy deep-dives, and priority Q&A queue. Premium members get to ask questions live!</p>
                </div>
                <Link href="/premium" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold text-sm hover:shadow-lg hover:shadow-yellow-500/20 transition-all shrink-0">
                    <Star size={14} />
                    Upgrade to Premium
                </Link>
            </div>
        </div>
    );
}
