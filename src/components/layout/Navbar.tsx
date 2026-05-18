"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BookOpen, TrendingUp, BarChart3, Wrench, Users, Bell,
    Crown, Menu, X, ChevronDown, Flame, Star, LogIn
} from "lucide-react";

interface NavItem {
    label: string;
    icon: any;
    href?: string;
    children?: {
        label: string;
        href: string;
        desc: string;
    }[];
}

const navItems: NavItem[] = [
    {
        label: "Learn",
        icon: BookOpen,
        children: [
            { label: "Tradey Markets", href: "/learn", desc: "Complete forex curriculum" },
            { label: "Learning Paths", href: "/paths", desc: "Personalized curriculum" },
            { label: "Forexpedia", href: "/forexpedia", desc: "Trading glossary" },
        ],
    },
    {
        label: "Tools",
        icon: Wrench,
        children: [
            { label: "Calendar", href: "/calendar", desc: "Economic & community events" },
            { label: "Live Charts", href: "/charts", desc: "Real-time market analysis" },
            { label: "News Feed", href: "/news", desc: "Latest market updates" },
            { label: "Webinars", href: "/webinars", desc: "Live education sessions" },
        ],
    },
    {
        label: "Community",
        icon: Users,
        children: [
            { label: "Social Feed", href: "/social", desc: "Connect with other traders" },
            { label: "About Us", href: "/about", desc: "Our mission & team" },
        ],
    },
];

export function Navbar() {
    const [open, setOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    // Demo auth state (temporary): null = signed out, { name } = signed in
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [avatarOpen, setAvatarOpen] = useState(false);

    function handleSignIn(e: any) {
        e?.preventDefault?.();
        const name = window.prompt("Enter name for demo sign-in", "Alex");
        if (name && name.trim()) {
            setUser({ name: name.trim() });
        }
    }

    const initial = user?.name?.trim()?.[0]?.toUpperCase() ?? "U";

    if (pathname?.startsWith("/admin")) {
        return null;
    }

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0f0d]/80 backdrop-blur-xl border-b border-white/5"
            >
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg glow-green-sm">
                            <TrendingUp size={16} className="text-white" />
                        </div>
                        <span className="font-bold text-lg font-display tracking-tight">
                            <span className="text-white/90">Tradey Markets</span>
                        </span>
                    </Link>



                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {/* Notifications — always visible */}
                        <Link href="/alerts" className="hidden sm:flex relative w-9 h-9 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all text-white/60 hover:text-white border border-white/5">
                            <Bell size={18} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0f0d]" />
                        </Link>

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setAvatarOpen((s) => !s)}
                                    className="w-9 h-9 rounded-full bg-white/6 flex items-center justify-center text-sm font-bold text-white/90 hover:bg-white/10 transition"
                                    aria-label="Account menu"
                                >
                                    {initial}
                                </button>

                                {avatarOpen && (
                                    <div className="absolute right-0 mt-2 w-64 z-[110]">
                                        <div className="bg-[#111714] border border-white/10 rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center font-bold">{initial}</div>
                                                    <div>
                                                        <div className="text-sm font-bold text-white/90">{user.name}</div>
                                                        <div className="text-xs text-white/40">Member</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="py-2 border-t border-white/5">
                                                <div className="flex items-center gap-3 px-1 py-2">
                                                    <span className="text-xl">🔥</span>
                                                    <div>
                                                        <div className="text-sm font-bold text-green-400">7</div>
                                                        <div className="text-xs text-white/40 uppercase tracking-tighter">Day Streak</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 px-1 py-2">
                                                    <Star size={16} className="text-yellow-400" />
                                                    <div>
                                                        <div className="text-sm font-bold text-yellow-400">2,450</div>
                                                        <div className="text-xs text-white/40">XP</div>
                                                    </div>
                                                </div>

                                                <div className="mt-3 grid gap-2">
                                                    <Link href="/premium" className="py-2 rounded-lg text-sm font-bold text-black bg-gradient-to-r from-yellow-500 to-amber-600 text-center">
                                                        Pro
                                                    </Link>
                                                    <Link href="/account" className="py-2 rounded-lg text-sm glass text-white/80 text-center">
                                                        Account
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={handleSignIn}
                                className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider glass hover:bg-white/8 transition-all text-white/90 border border-white/10"
                            >
                                <LogIn size={14} className="hidden sm:block" />
                                <span className="hidden sm:block">Sign In</span>
                                <span className="sm:hidden text-xs">Login</span>
                            </button>
                        )}

                        {/* Hamburger button (Always visible, triggering off-canvas) */}
                        <button onClick={() => setOpen(!open)} className="w-9 h-9 flex items-center justify-center rounded-lg glass text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                            <Menu size={18} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Offcanvas menu */}
            {open && (
                <>
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] animate-in fade-in transition-all"
                        onClick={() => setOpen(false)}
                    />
                    <div className="fixed top-0 right-0 h-full w-80 bg-[#0a0f0d] border-l border-white/10 z-[210] p-6 overflow-y-auto animate-in slide-in-from-right shadow-2xl">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                            <span className="font-bold text-lg font-display text-white/90 tracking-tight">Navigation</span>
                            <button onClick={() => setOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-lg glass text-white/70 hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-6 pb-20">
                            {navItems.map((item) => (
                                <div key={item.label} className="space-y-3">
                                    {item.href ? (
                                        <Link href={item.href} onClick={() => setOpen(false)} className="flex items-center gap-3 text-base font-semibold text-white/90 hover:text-green-400 transition-colors bg-white/5 p-3 rounded-xl border border-white/5">
                                            <item.icon size={18} className="text-green-400" />
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden transition-all">
                                            <button
                                                onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                                                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                                            >
                                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40">
                                                    <item.icon size={14} />
                                                    {item.label}
                                                </div>
                                                <ChevronDown size={14} className={`text-white/40 transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`} />
                                            </button>

                                            {activeDropdown === item.label && (
                                                <div className="flex flex-col gap-1 px-4 pb-4 animate-in slide-in-from-top-2 fade-in duration-200">
                                                    {item.children?.map((c) => (
                                                        <Link key={c.href} href={c.href} onClick={() => setOpen(false)} className="text-sm font-medium text-white/70 hover:text-green-400 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors">
                                                            {c.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )
            }
        </>
    );
}


