"use client";
import Link from "next/link";
import { ChevronDown, BookOpen, TrendingUp, Users, BarChart3, ChevronRight } from "lucide-react";
import CurriculumMap from "@/components/CurriculumMap";



export default function HomePage() {
    return (
        <div className="bg-[#0a0f0d]">
            {/* ─── HERO ─── */}
            <section className="relative overflow-hidden bg-grid min-h-[calc(100vh-4rem)] flex flex-col justify-center">
                <div className="absolute inset-0 pointer-events-none muted-surface" />

                <div className="container-centered text-center relative z-10 flex flex-col items-center">

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight leading-tight mb-6 text-gradient">
                        New to forex?
                    </h1>

                    <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Free courses, an AI-powered journal, a live backtester, and real-time market insights — everything focused to help you learn and act.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link href="/learn" className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold text-base shadow-sm hover:shadow-lg transition-transform hover:scale-102">
                            <BookOpen size={18} />
                            Start Learning
                        </Link>
                        <Link href="/paths" className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/8 text-white/65 font-medium bg-white/3 hover:bg-white/5 transition-colors">
                            Create custom curriculum
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                    <button
                        onClick={() => {
                            window.dispatchEvent(new CustomEvent("hide-navbar"));
                            document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex items-center justify-center text-white/40 hover:text-green-400 transition-all cursor-pointer bg-transparent border-none"
                    >
                        <ChevronDown size={40} strokeWidth={3} />
                    </button>
                </div>
            </section>



            {/* ─── CURRICULUM MAP ─── */}
            <CurriculumMap />

        </div>
    );
}
