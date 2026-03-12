import Link from "next/link";
import { Star, Check, Crown } from "lucide-react";

const plans = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        highlight: false,
        features: [
            "Preschool through Summer School (5 levels)",
            "Full Forexpedia glossary",
            "Economic Calendar",
            "All 7 trading calculators",
            "Social Trade Feed (read-only)",
            "Basic quiz access",
            "Community forum participation",
            "3 journal entries per month",
        ],
        cta: "Get Started Free",
        ctaHref: "/account/signup",
        ctaStyle: "glass border border-white/10 text-white/70 hover:text-white hover:border-white/20",
    },
    {
        name: "Premium",
        price: "$19",
        period: "per month",
        annualNote: "Or $15/mo billed annually — Save 21%",
        highlight: true,
        features: [
            "Everything in Free",
            "High School through Graduation (6 levels)",
            "AI Trade Journal — unlimited entries + AI insights",
            "Strategy Backtester — full historical data",
            "Event Trading Guides",
            "Weekly Market Watchlists & Recaps",
            "Macro Strategy Reviews",
            "Unlimited MarketVision™",
            "Ad-free experience",
            "Priority access to live webinars",
            "Jump to any lesson (non-linear mode)",
            "Private premium forum section",
        ],
        cta: "Start 7-Day Free Trial",
        ctaHref: "/account/signup?plan=premium",
        ctaStyle: "bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-bold hover:shadow-lg hover:shadow-yellow-500/30",
    },
    {
        name: "Teams",
        price: "$49",
        period: "per month",
        annualNote: "Up to 5 members included",
        highlight: false,
        features: [
            "Everything in Premium",
            "5 team member accounts",
            "Shared journal & strategy workspace",
            "Team leaderboard and challenges",
            "Dedicated account manager",
            "API access for custom tools",
            "White-label learning reports",
        ],
        cta: "Contact Us",
        ctaHref: "/contact",
        ctaStyle: "glass border border-white/10 text-white/70 hover:text-white hover:border-white/20",
    },
];

const premiumFeatures = [
    { emoji: "📚", title: "Full 11-Level Curriculum", desc: "Access High School through Graduation with advanced strategy modules" },
    { emoji: "🤖", title: "AI Trade Journal Insights", desc: "Let AI spot patterns in your trading — session biases, emotional triggers, R:R problems" },
    { emoji: "📊", title: "Strategy Backtester", desc: "Full historical data across all major/minor pairs. Test strategies before risking real money" },
    { emoji: "📈", title: "Event Trading Guides", desc: "Color-coded trade setup guides for NFP, FOMC, CPI, and all major events" },
    { emoji: "🎯", title: "Weekly Market Recaps", desc: "Detailed reviews of what moved markets and what setups worked each week" },
    { emoji: "📡", title: "Unlimited MarketVision™", desc: "All currency pairs, all timeframes, all technical metrics at a glance" },
];

export default function PremiumPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-5">
                    <Crown size={13} />
                    PipForge Premium
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                    Trade Better. <span className="text-gradient-gold">Earn More.</span>
                </h1>
                <p className="text-white/50 max-w-xl mx-auto text-lg">Unlock the full platform — advanced curriculum, AI-powered journal, live backtesting, weekly market guides, and more.</p>
            </div>

            {/* Pricing cards */}
            <div className="grid md:grid-cols-3 gap-5 mb-14">
                {plans.map((plan) => (
                    <div key={plan.name} className={`relative rounded-2xl p-6 flex flex-col ${plan.highlight ? "glass-brand border-2 border-yellow-500/25 glow-green" : "glass"}`}>
                        {plan.highlight && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-400 text-black text-xs font-bold px-3 py-0.5 rounded-full">
                                MOST POPULAR
                            </div>
                        )}
                        <div className="mb-5">
                            <div className={`text-sm font-semibold mb-2 ${plan.highlight ? "text-yellow-400" : "text-white/60"}`}>{plan.name}</div>
                            <div className="flex items-end gap-1.5">
                                <span className="text-4xl font-bold font-display text-white">{plan.price}</span>
                                <span className="text-white/40 text-sm pb-1">/{plan.period}</span>
                            </div>
                            {plan.annualNote && <div className="text-xs text-white/35 mt-1">{plan.annualNote}</div>}
                        </div>

                        <ul className="space-y-2.5 flex-1 mb-6">
                            {plan.features.map((f) => (
                                <li key={f} className="flex items-start gap-2 text-sm text-white/65">
                                    <Check size={14} className={`shrink-0 mt-0.5 ${plan.highlight ? "text-yellow-400" : "text-green-400"}`} />
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <Link href={plan.ctaHref} className={`block text-center py-3 rounded-xl text-sm transition-all ${plan.ctaStyle}`}>
                            {plan.cta}
                        </Link>
                    </div>
                ))}
            </div>

            {/* Feature showcase */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold font-display text-center mb-8">What&apos;s Included in Premium</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {premiumFeatures.map((f) => (
                        <div key={f.title} className="glass rounded-xl p-4">
                            <div className="text-2xl mb-2">{f.emoji}</div>
                            <h3 className="font-semibold text-sm text-white/90 mb-1">{f.title}</h3>
                            <p className="text-xs text-white/45 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonials */}
            <div className="mb-10">
                <div className="grid md:grid-cols-3 gap-4">
                    {[
                        { name: "Marcus T.", quote: "The AI journal is a game-changer. It spotted that I was losing 70% of my trades on Fridays — something I never noticed in 2 years.", avatar: "MT" },
                        { name: "Sarah K.", quote: "The Event Guide for NFP alone is worth the subscription. I finally understand how to plan around news releases.", avatar: "SK" },
                        { name: "James O.", quote: "Finished the full curriculum in 3 months. Now trading live with a funded account. The backtester helped me nail my entries.", avatar: "JO" },
                    ].map((t) => (
                        <div key={t.name} className="glass rounded-xl p-4">
                            <div className="flex mb-2.5">{[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}</div>
                            <p className="text-sm text-white/60 italic mb-3 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-400">{t.avatar}</div>
                                <span className="text-sm font-medium text-white/70">{t.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ */}
            <div className="glass rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-5">Frequently Asked Questions</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {[
                        { q: "Can I cancel anytime?", a: "Yes. Cancel instantly from your account settings — no questions asked, no hidden fees." },
                        { q: "Is there a free trial?", a: "Premium includes a 7-day free trial. You won't be charged until the trial ends." },
                        { q: "What payment methods?", a: "Credit/debit card, Google Pay, and Apple Pay via Stripe — all fully secure." },
                        { q: "Is the content updated?", a: "Yes! Our editorial team publishes new Market Recaps, Event Guides, and Analysis every week." },
                    ].map(({ q, a }) => (
                        <div key={q}>
                            <div className="text-sm font-semibold text-white/80 mb-1">{q}</div>
                            <div className="text-xs text-white/45 leading-relaxed">{a}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
