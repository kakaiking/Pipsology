"use client";
import Image from "next/image";
import { Shield, Book, Users, Target, Zap, Globe, Github, Twitter, Linkedin } from "lucide-react";

const stats = [
    { label: "Traders Empowered", value: "50K+" },
    { label: "Pips Analyzed", value: "12M+" },
    { label: "Learning Paths", value: "150+" },
    { label: "Live Webinars", value: "500+" },
];

const values = [
    {
        icon: Shield,
        title: "Uncompromising Transparency",
        description: "We believe in honest data. No fluff, no 'get rich quick' schemes. Just real market insights and proven strategies.",
    },
    {
        icon: Book,
        title: "Education First",
        description: "Our platform is built on the foundation of deep learning. We bridge the gap between theory and live market execution.",
    },
    {
        icon: Target,
        title: "Precision Engineering",
        description: "Our AI-powered tools are designed to catch every pip that matters, providing surgical accuracy in your trading journal.",
    },
];

export default function AboutPage() {
    return (
        <div className="bg-[#0a0f0d] text-[#e8f5ef]">
            {/* ─── HERO SECTION ─── */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-grid">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-500/10 blur-[120px] rounded-full -mr-96 -mt-96 animate-pulse-green pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[100px] rounded-full -ml-72 -mb-72 pointer-events-none" />

                <div className="container-centered relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 text-center lg:text-left">
                            <span className="inline-block px-4 py-1.5 rounded-full badge-green text-xs font-semibold uppercase tracking-wider mb-6">
                                Our Mission
                            </span>
                            <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] mb-8 text-gradient">
                                Redefining <br />
                                Financial Literacy.
                            </h1>
                            <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
                                Tradey Markets was founded with a single goal: to democratize institutional-grade trading education and tools for the retail trader.
                            </p>
                        </div>
                        <div className="flex-1 relative">
                            <div className="relative w-full aspect-square rounded-4xl overflow-hidden glow-green border border-white/10 group">
                                <Image
                                    src="/tradeymarkets/tradeymarkets_about_hero_1777017887435.png"
                                    alt="Tradey Markets Hero"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-transparent to-transparent opacity-60" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── STATS SECTION ─── */}
            <section className="py-20 border-y border-white/5 bg-white/2">
                <div className="container-centered">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl md:text-5xl font-bold font-display text-gradient mb-2">{stat.value}</div>
                                <div className="text-sm text-white/40 font-medium uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── VISION SECTION ─── */}
            <section className="py-32 section-large relative">
                <div className="container-centered">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-bold font-display">Why we exist.</h2>
                            <p className="text-lg text-white/60 leading-relaxed">
                                The world of trading is often shrouded in complexity and misleading promises. We saw a need for a platform that prioritizes the trader's growth over everything else. 
                            </p>
                            <div className="space-y-6">
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0 border border-green-500/20">
                                        <Zap className="text-green-400" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Empowering Independence</h4>
                                        <p className="text-white/50">We don't give you signals; we give you the tools and knowledge to find them yourself.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                                        <Globe className="text-emerald-400" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Global Community</h4>
                                        <p className="text-white/50">A worldwide network of traders sharing insights, backtests, and experiences.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {values.map((value, i) => (
                                <div key={i} className="glass p-8 rounded-3xl border border-white/10 card-hover">
                                    <value.icon className="text-green-500 mb-6" size={32} />
                                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                    <p className="text-white/50 leading-relaxed">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CALL TO ACTION ─── */}
            <section className="py-32 container-centered">
                <div className="relative glass-brand rounded-4xl p-12 md:p-20 overflow-hidden text-center">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]" />
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold font-display mb-8">Ready to start your <br /> trading journey?</h2>
                        <p className="text-xl text-white/70 mb-12">Join thousands of traders who are mastering the markets with Tradey Markets.</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button className="px-10 py-4 rounded-full bg-green-500 text-black font-bold hover:scale-105 transition-transform">
                                Sign Up Free
                            </button>
                            <button className="px-10 py-4 rounded-full glass border border-white/20 font-bold hover:bg-white/10 transition-colors">
                                Browse Courses
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FOOTER SOCIALS ─── */}
            <section className="py-20 border-t border-white/5">
                <div className="container-centered flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-4 text-white/40">
                        <span className="text-sm font-medium">Follow our journey</span>
                        <div className="h-px w-12 bg-white/10" />
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-green-400 transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-green-400 transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="hover:text-green-400 transition-colors"><Github size={20} /></a>
                        </div>
                    </div>
                    <div className="text-white/30 text-sm">
                        &copy; 2026 Tradey Markets Education. All rights reserved.
                    </div>
                </div>
            </section>
        </div>
    );
}


