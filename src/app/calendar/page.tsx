import { useState } from "react";
import { Calendar, Filter, Globe, Users, Info, Plus } from "lucide-react";
import { calendarEvents, communityEvents } from "@/lib/data";

const currencies = ["All", "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "NZD"];
const impacts = ["All", "high", "medium", "low"];
const dateFilters = ["Today", "Tomorrow", "This Week", "Next Week"];

const allEvents = [
    ...calendarEvents,
    { id: 6, time: "09:00", currency: "GBP", event: "Industrial Production m/m", impact: "medium", forecast: "0.2%", previous: "-0.1%", actual: "" },
    { id: 7, time: "10:30", currency: "EUR", event: "German CPI m/m", impact: "high", forecast: "0.3%", previous: "0.4%", actual: "" },
    { id: 8, time: "13:00", currency: "USD", event: "30-Year Bond Auction", impact: "low", forecast: "—", previous: "4.68|2.4", actual: "" },
];

const impactStyles: Record<string, string> = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
};

const flagMap: Record<string, string> = { USD: "🇺🇸", EUR: "🇪🇺", GBP: "🇬🇧", JPY: "🇯🇵", AUD: "🇦🇺", CAD: "🇨🇦", CHF: "🇨🇭", NZD: "🇳🇿" };

export default function CalendarPage() {
    const [view, setView] = useState<"economic" | "community">("economic");
    const [activeCurrency, setActiveCurrency] = useState("All");
    const [activeImpact, setActiveImpact] = useState("All");
    const [activeDateFilter, setActiveDateFilter] = useState("Today");

    const filtered = allEvents.filter(e =>
        (activeCurrency === "All" || e.currency === activeCurrency) &&
        (activeImpact === "All" || e.impact === activeImpact)
    );

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium mb-3">
                    <Calendar size={14} />
                    <span>{view === "economic" ? "Real-Time Market Events" : "Tradey Markets Events"}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold font-display mb-2">
                            {view === "economic" ? (
                                <>Economic <span className="text-gradient">Calendar</span></>
                            ) : (
                                <>Scheduled <span className="text-gradient">Events</span></>
                            )}
                        </h1>
                        <p className="text-white/50 text-sm">
                            {view === "economic" 
                                ? "Track high-impact events that move forex & crypto markets. Auto-updates on release."
                                : "Join live sessions, webinars, and community meetups to level up your trading."
                            }
                        </p>
                    </div>
                    
                    {/* View Switcher */}
                    <div className="flex p-1 bg-white/5 rounded-xl border border-white/5 self-start">
                        <button 
                            onClick={() => setView("economic")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === "economic" ? "bg-green-500 text-black shadow-lg" : "text-white/50 hover:text-white"}`}
                        >
                            <Globe size={16} />
                            Economic
                        </button>
                        <button 
                            onClick={() => setView("community")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === "community" ? "bg-green-500 text-black shadow-lg" : "text-white/50 hover:text-white"}`}
                        >
                            <Users size={16} />
                            Community
                        </button>
                    </div>
                </div>
            </div>

            {view === "economic" ? (
                <>
                    {/* Date filter */}
                    <div className="flex gap-2 mb-5 overflow-x-auto">
                        {dateFilters.map(d => (
                            <button key={d} onClick={() => setActiveDateFilter(d)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeDateFilter === d ? "bg-green-500/20 text-green-400 border border-green-500/30" : "glass text-white/50 hover:text-white"}`}>
                                {d}
                            </button>
                        ))}
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <div className="flex items-center gap-2">
                            <Filter size={13} className="text-white/40" />
                            <span className="text-xs text-white/40">Impact:</span>
                            {impacts.map(i => (
                                <button key={i} onClick={() => setActiveImpact(i)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${activeImpact === i ? "bg-white/15 text-white" : "glass text-white/40 hover:text-white"}`}>
                                    {i === "high" ? "🔴 High" : i === "medium" ? "🟡 Medium" : i === "low" ? "🟢 Low" : "All"}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe size={13} className="text-white/40" />
                            <span className="text-xs text-white/40">Currency:</span>
                            <div className="flex flex-wrap gap-1">
                                {currencies.map(c => (
                                    <button key={c} onClick={() => setActiveCurrency(c)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${activeCurrency === c ? "bg-green-500/20 text-green-400 border border-green-500/30" : "glass text-white/40 hover:text-white"}`}>
                                        {c !== "All" && flagMap[c]} {c}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Calendar table */}
                    <div className="glass rounded-2xl overflow-hidden">
                        {/* Table header */}
                        <div className="grid grid-cols-12 gap-2 px-5 py-3 border-b border-white/5 text-xs font-semibold uppercase tracking-wider text-white/30">
                            <div className="col-span-1">Time</div>
                            <div className="col-span-1">CCY</div>
                            <div className="col-span-1 text-center">Impact</div>
                            <div className="col-span-4">Event</div>
                            <div className="col-span-2 text-right">Forecast</div>
                            <div className="col-span-2 text-right">Previous</div>
                            <div className="col-span-1 text-right">Actual</div>
                        </div>

                        {/* Rows */}
                        {filtered.map((ev) => (
                            <div key={ev.id} className={`grid grid-cols-12 gap-2 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/2 transition-all group ${ev.impact === "high" ? "border-l-2 border-l-red-500/30" : ev.impact === "medium" ? "border-l-2 border-l-yellow-500/30" : "border-l-2 border-l-transparent"}`}>
                                <div className="col-span-1 font-mono text-xs text-white/50 self-center">{ev.time}</div>
                                <div className="col-span-1 self-center">
                                    <span className="flex items-center gap-1 text-xs font-semibold text-white/70">
                                        <span>{flagMap[ev.currency] || "🌍"}</span>
                                        {ev.currency}
                                    </span>
                                </div>
                                <div className="col-span-1 flex items-center justify-center">
                                    <span className={`w-2.5 h-2.5 rounded-full ${impactStyles[ev.impact]}`} title={ev.impact} />
                                </div>
                                <div className="col-span-4 self-center">
                                    <span className="text-sm text-white/85 group-hover:text-white transition-colors font-medium">{ev.event}</span>
                                </div>
                                <div className="col-span-2 text-right self-center font-mono text-xs text-white/45">{ev.forecast}</div>
                                <div className="col-span-2 text-right self-center font-mono text-xs text-white/35">{ev.previous}</div>
                                <div className="col-span-1 text-right self-center">
                                    {ev.actual ? (
                                        <span className="font-mono text-xs font-bold text-green-400">{ev.actual}</span>
                                    ) : (
                                        <span className="text-xs text-white/20">—</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Legend & Tips */}
                    <div className="mt-6 glass rounded-xl p-5">
                        <h3 className="font-semibold text-sm mb-3">📘 How to Use the Economic Calendar</h3>
                        <div className="grid sm:grid-cols-3 gap-4 text-xs text-white/50">
                            <div className="flex items-start gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 mt-0.5" />
                                <div><strong className="text-white/70">High Impact</strong> — Major market-moving events (NFP, CPI, central bank decisions). Expect significant volatility and wide spreads.</div>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shrink-0 mt-0.5" />
                                <div><strong className="text-white/70">Medium Impact</strong> — Notable data releases that may cause moderate market movement. Keep an eye on these.</div>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0 mt-0.5" />
                                <div><strong className="text-white/70">Low Impact</strong> — Minor releases with typically limited market reaction. Usually safe to trade around.</div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="grid gap-6">
                    {/* Community Events View */}
                    <div className="grid md:grid-cols-7 gap-6">
                        {/* Calendar Sidebar */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="glass-brand p-5 rounded-2xl border border-white/5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold">May 2026</h3>
                                    <div className="flex gap-1">
                                        <button className="p-1 hover:bg-white/5 rounded">←</button>
                                        <button className="p-1 hover:bg-white/5 rounded">→</button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-white/30 uppercase mb-2">
                                    <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                    {Array.from({ length: 31 }).map((_, i) => {
                                        const day = i + 1;
                                        const hasEvent = communityEvents.some(e => e.date.endsWith(`-${day < 10 ? '0' + day : day}`));
                                        return (
                                            <div key={i} className={`py-1.5 rounded-lg cursor-pointer transition-all ${hasEvent ? "bg-green-500/20 text-green-400 font-bold border border-green-500/30" : "hover:bg-white/5 text-white/50"}`}>
                                                {day}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="glass-brand p-5 rounded-2xl border border-white/5">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <Info size={16} className="text-green-500" />
                                    About Events
                                </h3>
                                <p className="text-xs text-white/50 leading-relaxed">
                                    Community events are scheduled by the Tradey Markets team to help you navigate the markets together. Registered users get notifications 15 minutes before the start.
                                </p>
                            </div>
                        </div>

                        {/* Events List */}
                        <div className="md:col-span-5 space-y-4">
                            {communityEvents.map((event) => (
                                <div key={event.id} className="glass-brand p-6 rounded-2xl border border-white/5 hover:border-green-500/30 transition-all group">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                                    event.impact === "high" ? "bg-red-500/20 text-red-400" : 
                                                    event.impact === "medium" ? "bg-yellow-500/20 text-yellow-400" : 
                                                    "bg-green-500/20 text-green-400"
                                                }`}>
                                                    {event.type}
                                                </span>
                                                <span className="text-xs text-white/30">•</span>
                                                <div className="flex items-center gap-1.5 text-xs text-white/50">
                                                    <Clock size={12} className="text-green-500" />
                                                    {event.time}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors mb-1">{event.title}</h3>
                                                <p className="text-sm text-white/50">{event.description}</p>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs font-medium text-white/30">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar size={12} />
                                                    {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </div>
                                        </div>
                                        <button className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-black font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(34,197,94,0.2)] whitespace-nowrap">
                                            Add to Calendar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


