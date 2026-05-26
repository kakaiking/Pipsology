"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TrendingUp, Mail, Lock } from "lucide-react";

export default function SigninPage() {
    const router = useRouter();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!identifier || !password) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ identifier, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Invalid credentials. Please try again.");
            }

            // Successfully authenticated
            // Trigger home/learn navigation and full page refresh to sync state
            router.push("/");
            setTimeout(() => {
                window.location.reload();
            }, 300);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-16">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg glow-green-sm">
                            <TrendingUp size={18} className="text-white" />
                        </div>
                        <span className="font-bold text-xl font-display"><span className="text-gradient">Pip</span><span className="text-white/90">Forge</span></span>
                    </Link>
                    <h1 className="text-2xl font-bold font-display text-white mb-2">Welcome Back</h1>
                    <p className="text-white/45 text-sm">Sign in to continue your trading journey</p>
                </div>

                <div className="glass rounded-2xl p-7">
                    {/* Social login */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                        <button 
                            type="button"
                            onClick={() => alert("Social login is coming soon!")}
                            className="flex items-center justify-center gap-2 py-2.5 glass rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/8 transition-all border border-white/5"
                        >
                            <span>🇬</span> Google
                        </button>
                        <button 
                            type="button"
                            onClick={() => alert("Social login is coming soon!")}
                            className="flex items-center justify-center gap-2 py-2.5 glass rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/8 transition-all border border-white/5"
                        >
                            <span>🇦</span> Apple
                        </button>
                    </div>

                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1 h-px bg-white/8" />
                        <span className="text-xs text-white/25">or sign in with email</span>
                        <div className="flex-1 h-px bg-white/8" />
                    </div>

                    {/* Error display */}
                    {error && (
                        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 text-center">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs text-white/50 mb-1.5">Email or Username</label>
                            <div className="relative">
                                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                                <input 
                                    type="text" 
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    placeholder="you@example.com" 
                                    className="w-full pl-10 pr-4 py-3 glass rounded-xl text-sm text-white placeholder-white/20 border border-white/5 focus:border-green-500/30 focus:outline-none bg-transparent transition-all" 
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-xs text-white/50">Password</label>
                                <a href="#" onClick={(e) => { e.preventDefault(); alert("Password reset is coming soon!"); }} className="text-xs text-green-400 hover:underline">Forgot?</a>
                            </div>
                            <div className="relative">
                                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••" 
                                    className="w-full pl-10 pr-4 py-3 glass rounded-xl text-sm text-white placeholder-white/20 border border-white/5 focus:border-green-500/30 focus:outline-none bg-transparent transition-all" 
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-black font-bold text-sm hover:shadow-lg hover:shadow-green-500/20 transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <div className="text-center mt-5 text-sm text-white/40">
                        Don't have an account?{" "}
                        <Link href="/account/signup" className="text-green-400 hover:text-green-300 font-medium">Create Account</Link>
                    </div>
                </div>

                {/* Benefits reminder */}
                <div className="mt-5 grid grid-cols-3 gap-2">
                    {[
                        { emoji: "📚", text: "Free courses" },
                        { emoji: "🔥", text: "Streaks & XP" },
                        { emoji: "🤖", text: "AI insights" },
                    ].map(({ emoji, text }) => (
                        <div key={text} className="glass rounded-xl p-2 text-center">
                            <div className="text-lg">{emoji}</div>
                            <div className="text-xs text-white/40 mt-0.5">{text}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
