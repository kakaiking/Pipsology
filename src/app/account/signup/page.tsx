"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TrendingUp, Mail, Lock, User as UserIcon } from "lucide-react";

export default function SignupPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [terms, setTerms] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (!username || !email || !password) {
            setError("All fields are required.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (!terms) {
            setError("You must agree to the Terms of Service and Privacy Policy.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong during signup.");
            }

            // Successfully registered and logged in
            router.push("/");
            setTimeout(() => {
                window.location.reload();
            }, 300);
        } catch (err: any) {
            setError(err.message || "An error occurred.");
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
                    <h1 className="text-2xl font-bold font-display text-white mb-2">Create Your Account</h1>
                    <p className="text-white/45 text-sm">Join 4.2M+ traders learning for free</p>
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
                        <span className="text-xs text-white/25">or sign up with email</span>
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
                            <label className="block text-xs text-white/50 mb-1.5">Username</label>
                            <div className="relative">
                                <UserIcon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                                <input 
                                    type="text" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="tradingpro42" 
                                    className="w-full pl-10 pr-4 py-3 glass rounded-xl text-sm text-white placeholder-white/20 border border-white/5 focus:border-green-500/30 focus:outline-none bg-transparent transition-all" 
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-white/50 mb-1.5">Email Address</label>
                            <div className="relative">
                                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com" 
                                    className="w-full pl-10 pr-4 py-3 glass rounded-xl text-sm text-white placeholder-white/20 border border-white/5 focus:border-green-500/30 focus:outline-none bg-transparent transition-all" 
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-white/50 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Min. 8 characters" 
                                    className="w-full pl-10 pr-4 py-3 glass rounded-xl text-sm text-white placeholder-white/20 border border-white/5 focus:border-green-500/30 focus:outline-none bg-transparent transition-all" 
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-2 pt-1">
                            <input 
                                type="checkbox" 
                                id="terms" 
                                checked={terms}
                                onChange={(e) => setTerms(e.target.checked)}
                                className="w-4 h-4 mt-0.5 rounded accent-green-500" 
                            />
                            <label htmlFor="terms" className="text-xs text-white/40 cursor-pointer select-none">
                                I agree to the <a href="/terms" className="text-green-400 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-green-400 hover:underline">Privacy Policy</a>
                            </label>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-black font-bold text-sm hover:shadow-lg hover:shadow-green-500/20 transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Creating account..." : "Create Free Account"}
                        </button>
                    </form>

                    <div className="text-center mt-5 text-sm text-white/40">
                        Already have an account?{" "}
                        <Link href="/account/signin" className="text-green-400 hover:text-green-300 font-medium">Sign in</Link>
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
