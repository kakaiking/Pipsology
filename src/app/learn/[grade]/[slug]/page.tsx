import Link from "next/link";
import { CheckCircle, Play, BookOpen, ChevronLeft, ChevronRight, Star, Lock } from "lucide-react";
import { courseGrades, preschoolLessons } from "@/lib/data";

export function generateStaticParams() {
    // For now, we only have data for preschool
    return preschoolLessons.map((lesson) => ({
        grade: "preschool",
        slug: lesson.slug,
    }));
}

const lessonContent = `
# What is Forex?

The **foreign exchange market** (forex, FX, or currency market) is the world's largest, most liquid financial market. Currencies are traded against each other as exchange rate pairs — for example, EUR/USD or GBP/JPY.

## The Scale of Forex

The forex market is massive. With a volume of **$7.5 trillion per day** traded, it dwarfs all global stock markets combined. It operates **24 hours a day, 5 days a week** across major financial centers in Sydney, Tokyo, London, and New York.

## Why Does Forex Exist?

All international trade and business requires currency exchange. When a company in the US imports products from Japan, they need to pay in Japanese Yen. To get those yen, they buy them with US Dollars. This is forex in action.

Participants include:
- **Central Banks** — The biggest movers. They manage monetary policy and currency reserves.
- **Commercial Banks** — Handle large international transactions for clients.
- **Hedge Funds** — Speculate on currency movements for profit.
- **Retail Traders** — Individual investors like you, trading through brokers.
- **Corporations** — Multinational companies hedging currency exposure.

## Currency Pairs

In forex, currencies always trade in **pairs**. When you buy €1,000 with US Dollars at a rate of 1.0850, you're simultaneously buying EUR and selling USD.

*  **Major Pairs** — Involve USD and the six most traded currencies: EUR, GBP, JPY, AUD, CAD, CHF.
*  **Minor Pairs** — Cross rates without USD (e.g., EUR/GBP, GBP/JPY).
*  **Exotic Pairs** — One major currency + one from an emerging market (e.g., USD/TRY).

## Key Terms

| Term | Meaning |
|---|---|
| **Base Currency** | The first currency in the pair (e.g., EUR in EUR/USD) |
| **Quote Currency** | The second currency (e.g., USD in EUR/USD) |
| **Bid Price** | The price a broker pays to buy from you |
| **Ask Price** | The price a broker charges you to buy |
| **Spread** | The difference between bid and ask |
| **Pip** | The smallest price move (usually 0.0001) |

Ready to dive deeper? The next lesson covers *exactly how* you place trades in the forex market.
`;

export default async function LessonPage({ params }: { params: Promise<{ grade: string, slug: string }> }) {
    const { grade, slug } = await params;
    const currentGrade = courseGrades.find(g => g.id === grade);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex gap-6">
                {/* Sidebar */}
                <aside className="hidden lg:block w-64 shrink-0">
                    <div className="glass rounded-xl p-4 sticky top-20">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-xs font-medium text-green-400">{currentGrade?.title || grade}</span>
                        </div>
                        <div className="text-xs text-white/40 mb-3">Your Progress — 50%</div>
                        <div className="progress-bar mb-4"><div className="progress-fill" style={{ width: "50%" }} /></div>
                        <nav className="space-y-1">
                            {preschoolLessons.map((lesson) => (
                                <Link
                                    key={lesson.id}
                                    href={`/learn/${grade}/${lesson.slug}`}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${lesson.slug === slug
                                        ? "bg-green-500/15 text-green-400"
                                        : "text-white/50 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {lesson.done ? (
                                        <CheckCircle size={14} className="text-green-400 shrink-0" />
                                    ) : lesson.slug === slug ? (
                                        <Play size={14} className="text-green-400 shrink-0" />
                                    ) : (
                                        <div className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0" />
                                    )}
                                    <span className="truncate">{lesson.title}</span>
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-4 border-t border-white/5 pt-4">
                            <Link href="/quizzes" className="block text-center py-2 rounded-lg glass text-sm text-white/60 hover:text-white transition-all">
                                Take Quiz →
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Lesson content */}
                <article className="flex-1 min-w-0">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
                        <Link href="/learn" className="hover:text-white transition-colors flex items-center gap-1"><BookOpen size={13} /> Learn</Link>
                        <ChevronRight size={13} />
                        <Link href={`/learn/${grade}`} className="hover:text-white transition-colors">{currentGrade?.title || grade}</Link>
                        <ChevronRight size={13} />
                        <span className="text-white/60">{slug.replace(/-/g, ' ')}</span>
                    </div>

                    {/* Lesson header */}
                    <div className="glass rounded-2xl p-6 mb-6">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <span className="badge-green text-xs px-2 py-0.5 rounded-full font-medium">Free Lesson</span>
                                <h1 className="text-2xl md:text-3xl font-bold font-display mt-3 mb-2">{slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h1>
                                <div className="flex items-center gap-4 text-sm text-white/40">
                                    <span>{currentGrade?.title || grade} · Lesson 1 of 6</span>
                                    <span>~8 min read</span>
                                </div>
                            </div>
                            <div className="text-4xl">💱</div>
                        </div>
                    </div>

                    {/* Lesson body */}
                    <div className="glass rounded-2xl p-8 mb-6 prose-custom">
                        <div className="space-y-5 text-white/75 leading-relaxed">
                            {lessonContent.split("\n\n").map((block, i) => {
                                if (block.startsWith("# ")) return <h1 key={i} className="text-2xl font-bold text-white font-display">{block.replace("# ", "")}</h1>;
                                if (block.startsWith("## ")) return <h2 key={i} className="text-xl font-semibold text-white mt-6 mb-3">{block.replace("## ", "")}</h2>;
                                if (block.includes("|---|")) {
                                    const rows = block.split("\n").filter(r => !r.includes("|---|"));
                                    return (
                                        <div key={i} className="overflow-x-auto">
                                            <table className="w-full text-sm border-collapse">
                                                {rows.map((row, ri) => {
                                                    const cells = row.split("|").filter(Boolean).map(c => c.trim());
                                                    return ri === 0
                                                        ? <tr key={ri} className="border-b border-white/10">{cells.map((c, ci) => <th key={ci} className="text-left py-2 pr-4 text-white/50 font-medium text-xs uppercase tracking-wider">{c}</th>)}</tr>
                                                        : <tr key={ri} className="border-b border-white/5">{cells.map((c, ci) => <td key={ci} className={`py-2.5 pr-4 text-sm ${ci === 0 ? "text-white/80 font-semibold" : "text-white/55"}`} dangerouslySetInnerHTML={{ __html: c.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />)}</tr>;
                                                })}
                                            </table>
                                        </div>
                                    );
                                }
                                if (block.startsWith("- ") || block.startsWith("* ")) {
                                    const items = block.split("\n").filter(l => l.startsWith("- ") || l.startsWith("* "));
                                    return <ul key={i} className="space-y-1.5 list-none">{items.map((item, ii) => <li key={ii} className="flex gap-2"><span className="text-green-400 mt-1">▸</span><span dangerouslySetInnerHTML={{ __html: item.replace(/^[-*] /, "").replace(/\*\*(.*?)\*\*/g, "<strong class='text-white/90'>$1</strong>") }} /></li>)}</ul>;
                                }
                                return <p key={i} dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, "<strong class='text-white/90'>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>") }} />;
                            })}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between gap-4">
                        <button className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-sm text-white/50 hover:text-white transition-all">
                            <ChevronLeft size={16} />
                            Previous
                        </button>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-sm font-medium text-green-400 hover:bg-green-500/10 transition-all border border-green-500/20">
                                <CheckCircle size={16} />
                                Mark Complete
                            </button>
                            <Link href="/quizzes" className="flex items-center gap-2 px-5 py-2.5 glass-brand rounded-xl text-sm font-medium text-green-400 hover:bg-green-500/15 transition-all">
                                Take Quiz
                                <Star size={14} />
                            </Link>
                        </div>
                        <Link href={`/learn/${grade}`} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-black rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-green-500/20 transition-all">
                            Next Lesson
                            <ChevronRight size={16} />
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    );
}
