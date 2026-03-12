"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BookOpen, TrendingUp, BarChart3, Wrench, Users, Bell,
    Crown, Menu, X, ChevronDown, Flame, Star, LogIn
} from "lucide-react";

const navItems = [
    {
        label: "Learn",
        icon: BookOpen,
        children: [
            { label: "School of Pipsology", href: "/learn", desc: "Complete forex curriculum" },
            { label: "School of Crypto", href: "/crypto", desc: "Blockchain & crypto guide" },
            { label: "Learning Paths", href: "/paths", desc: "Personalized curriculum" },
            { label: "Quizzes", href: "/quizzes", desc: "Test your knowledge" },
            { label: "Psychology Hub", href: "/psychology", desc: "Master your trading mind" },
        ],
    },
    {
        label: "Markets",
        icon: TrendingUp,
        children: [
            { label: "Market News", href: "/news", desc: "Breaking forex & crypto news" },
            { label: "Trading Insights", href: "/trading", desc: "Chart art & trade ideas" },
            { label: "Analysis", href: "/analysis", desc: "Deep market research" },
            { label: "Economic Calendar", href: "/calendar", desc: "High-impact events" },
        ],
    },
    {
        label: "Tools",
        icon: Wrench,
        children: [
            { label: "All Tools", href: "/tools", desc: "7 essential calculators" },
            { label: "MarketVision™", href: "/marketvision", desc: "Visual analytics dashboard" },
            { label: "Strategy Backtester", href: "/backtester", desc: "Test on historical data" },
            { label: "Chart Classroom", href: "/charts", desc: "Interactive live charts" },
        ],
    },
    {
        label: "Community",
        icon: Users,
        children: [
            { label: "Social Feed", href: "/social", desc: "Trade ideas & setups" },
            { label: "Forum", href: "/forum", desc: "Discussions & journals" },
            { label: "Webinars", href: "/webinars", desc: "Live market analysis" },
            { label: "Broker Reviews", href: "/brokers", desc: "Find the right broker" },
        ],
    },
    {
        label: "Journal",
        icon: BarChart3,
        href: "/journal",
        children: null,
    },
];

export function Navbar() {
    const [open, setOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0f0d]/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg glow-green-sm">
                        <TrendingUp size={16} className="text-white" />
                    </div>
                    <span className="font-bold text-lg font-display tracking-tight">
                        <span className="text-white/90">Pipsology</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <div
                            key={item.label}
                            className="relative"
                            onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${pathname === item.href
                                        ? "text-green-400 bg-green-400/10"
                                        : "text-white/70 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <item.icon size={15} />
                                    {item.label}
                                </Link>
                            ) : (
                                <button
                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeDropdown === item.label
                                        ? "text-green-400 bg-green-400/10"
                                        : "text-white/70 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <item.icon size={15} />
                                    {item.label}
                                    <ChevronDown size={12} className={`transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`} />
                                </button>
                            )}

                            {/* Dropdown */}
                            {item.children && activeDropdown === item.label && (
                                <div className="absolute top-full left-0 pt-2 w-72 z-[110]">
                                    <div className="glass-dropdown rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-top-2">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group"
                                            >
                                                <span className="text-sm font-medium text-white/90 group-hover:text-green-400 transition-colors">{child.label}</span>
                                                <span className="text-xs text-white/40 mt-0.5">{child.desc}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right side */}
                <div className="hidden md:flex items-center gap-3">
                    {/* XP Streak */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-xs">
                        <span className="flame">🔥</span>
                        <span className="text-green-400 font-bold">7</span>
                        <span className="text-white/40 uppercase tracking-tighter">Day Streak</span>
                    </div>
                    {/* XP */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-full text-xs">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-yellow-400 font-bold">2,450</span>
                        <span className="text-white/40 uppercase tracking-tighter">XP</span>
                    </div>
                    {/* Alerts */}
                    <Link href="/alerts" className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all text-white/60 hover:text-white border border-white/5">
                        <Bell size={18} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0f0d]" />
                    </Link>
                    {/* Premium */}
                    <Link
                        href="/premium"
                        className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:scale-105"
                    >
                        <Crown size={14} className="fill-black" />
                        Pro
                    </Link>
                    <Link href="/account" className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider glass hover:bg-white/8 transition-all text-white/90 border border-white/10">
                        <LogIn size={14} />
                        Sign In
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button onClick={() => setOpen(!open)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg glass text-white/70">
                    {open ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden border-t border-white/5 bg-[#0a0f0d] px-4 py-4 space-y-1">
                    {navItems.map((item) => (
                        <div key={item.label}>
                            {item.href ? (
                                <Link href={item.href} onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5">
                                    <item.icon size={15} />
                                    {item.label}
                                </Link>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white/30 mt-2">
                                        <item.icon size={12} />{item.label}
                                    </div>
                                    {item.children?.map((c) => (
                                        <Link key={c.href} href={c.href} onClick={() => setOpen(false)} className="block px-6 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5">
                                            {c.label}
                                        </Link>
                                    ))}
                                </>
                            )}
                        </div>
                    ))}
                    <div className="pt-3 flex gap-2">
                        <Link href="/premium" className="flex-1 text-center py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-yellow-500 to-amber-500 text-black">Premium</Link>
                        <Link href="/account" className="flex-1 text-center py-2.5 rounded-lg text-sm font-medium glass text-white/80">Sign In</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
