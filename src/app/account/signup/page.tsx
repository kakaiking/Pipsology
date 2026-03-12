import Link from "next/link";
import { TrendingUp, LogIn, Mail, Lock, User } from "lucide-react";

export default function SignupPage() {
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
                        <button className="flex items-center justify-center gap-2 py-2.5 glass rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/8 transition-all border border-white/5">
                            <span>🇬</span> Google
                        </button>
                        <button className="flex items-center justify-center gap-2 py-2.5 glass rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/8 transition-all border border-white/5">
                            <span>🇦</span> Apple
                        </button>
                    </div>

                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1 h-px bg-white/8" />
                        <span className="text-xs text-white/25">or sign up with email</span>
                        <div className="flex-1 h-px bg-white/8" />
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs text-white/50 mb-1.5">Username</label>
                            <div className="relative">
                                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                                <input type="text" placeholder="tradingpro42" className="w-full pl-10 pr-4 py-3 glass rounded-xl text-sm text-white placeholder-white/20 border border-white/5 focus:border-green-500/30 focus:outline-none bg-transparent transition-all" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-white/50 mb-1.5">Email Address</label>
                            <div className="relative">
                                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                                <input type="email" placeholder="you@example.com" className="w-full pl-10 pr-4 py-3 glass rounded-xl text-sm text-white placeholder-white/20 border border-white/5 focus:border-green-500/30 focus:outline-none bg-transparent transition-all" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-white/50 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                                <input type="password" placeholder="Min. 8 characters" className="w-full pl-10 pr-4 py-3 glass rounded-xl text-sm text-white placeholder-white/20 border border-white/5 focus:border-green-500/30 focus:outline-none bg-transparent transition-all" />
                            </div>
                        </div>

                        <div className="flex items-start gap-2 pt-1">
                            <input type="checkbox" id="terms" className="w-4 h-4 mt-0.5 rounded accent-green-500" />
                            <label htmlFor="terms" className="text-xs text-white/40 cursor-pointer">
                                I agree to the <a href="/terms" className="text-green-400 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-green-400 hover:underline">Privacy Policy</a>
                            </label>
                        </div>

                        <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-black font-bold text-sm hover:shadow-lg hover:shadow-green-500/20 transition-all mt-2">
                            Create Free Account
                        </button>
                    </div>

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
