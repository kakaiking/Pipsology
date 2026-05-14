"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
    Landmark, Building2, TrendingUp, User, Globe, DollarSign, ArrowRightLeft, 
    History, MoveHorizontal, MapPin, Briefcase, Building, Scale, Lock, 
    Coins, AlertTriangle, Zap, Headphones, Wallet, Ruler, ClipboardList, 
    Smartphone, Rewind, Trophy, Eye, RefreshCw, Ghost, TrendingDown, BookOpen
} from "lucide-react";
import { InDepthModal } from "./InDepthModal";

export interface SectionContent {
    id: string;
    title: string;
    text: string[];
    visualType: string;
    inDepth?: string[];
}

interface ScrollytellingLessonProps {
    sections: SectionContent[];
}

export const ScrollytellingLesson: React.FC<ScrollytellingLessonProps> = ({ sections }) => {
    const [activeSection, setActiveSection] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<{title: string, content: string[]}>({title: "", content: []});
    const containerRef = useRef<HTMLDivElement>(null);

    const openModal = (title: string, content?: string[], text?: string[]) => {
        const finalContent = (content && content.length >= 5) 
            ? content 
            : generateInDepthContent(title, text || []);
        
        setModalContent({ title, content: finalContent });
        setIsModalOpen(true);
    };

    const generateInDepthContent = (title: string, context: string[]): string[] => {
        const lowerTitle = title.toLowerCase();
        
        if (lowerTitle.includes("broker") || lowerTitle.includes("platform")) {
            return [
                `Choosing the right ${title} is one of the most critical decisions in your trading career. A broker or platform isn't just a piece of software; it's your primary gateway to the global financial markets. The infrastructure provided by these entities dictates everything from your execution speed and slippage to the security of your deposited capital.`,
                `Regulation is the cornerstone of a safe trading environment. ${context[0] || 'As discussed'}, authorities such as the FCA in the UK, ASIC in Australia, and the NFA/CFTC in the United States set rigorous standards for transparency and capital adequacy. Trading with an unregulated entity is essentially gambling with your principal, as there are no legal protections if the firm disappears or engages in unethical practices.`,
                `Technological capabilities vary significantly between different providers. A professional platform should offer not just basic charting, but advanced order types like OCO (One Cancels the Other) and trailing stops. Furthermore, the underlying technology—whether it's ECN (Electronic Communication Network) or STP (Straight Through Processing)—impacts the spreads and commissions you pay on every single trade.`,
                `Customer support and educational resources are often overlooked until they are desperately needed. Because the forex market operates 24/5, your support team should be available around the clock. High-quality brokers also provide deep liquidity pools, ensuring that even during high-volatility news events, you can enter and exit positions with minimal deviation from your desired price.`,
                `Finally, the ease of deposits and withdrawals is a litmus test for a broker's integrity. While most firms make it incredibly easy to deposit funds, the true measure of a professional firm is how quickly and transparently they process withdrawal requests. Always research a firm's reputation regarding payouts before committing significant capital.`,
                `In conclusion, take your time when evaluating ${title}. Use demo accounts to test the platform's stability and the broker's execution quality. By selecting a partner that aligns with your trading style and provides a secure, low-latency environment, you lay the necessary foundation for long-term profitability and peace of mind.`
            ];
        }

        if (lowerTitle.includes("analysis") || lowerTitle.includes("technical") || lowerTitle.includes("fundamental")) {
            return [
                `The study of ${title} is what separates speculative gambling from professional trading. It is the process of extracting meaning from the chaos of market data to identify high-probability opportunities. Whether you focus on price action, economic indicators, or market sentiment, the goal remains the same: building a consistent edge over the competition.`,
                `Technical analysis, which often falls under the umbrella of ${title}, is based on the premise that all relevant information is already reflected in the price. By studying historical patterns, we look for recurring behaviors in the market's collective psychology. This approach assumes that human reactions to fear and greed are consistent across time and markets.`,
                `Fundamental analysis, on the other hand, looks at the "why" behind the move. ${context[0] || 'This involves'}, analyzing interest rates, GDP growth, and geopolitical stability. For example, a central bank's decision to raise interest rates usually strengthens its currency because it attracts foreign investment. Understanding these macro drivers allows you to position yourself for multi-week or multi-month trends.`,
                `The most successful traders often use a "top-down" approach that combines multiple layers of analysis. They might start with the fundamental outlook to determine a directional bias, then use technical levels to identify precise entry and exit points. This synergy between different schools of thought provides a much higher level of confidence in your trade setups.`,
                `However, no amount of ${title} can eliminate risk entirely. The market is a game of probabilities, not certainties. Even the most perfect fundamental and technical alignment can be disrupted by a surprise news event or a shift in sentiment. This is why every analysis-based decision must be accompanied by a robust risk management plan.`,
                `Ultimately, mastering ${title} requires practice and screen time. You must learn to filter out the noise and focus on the signals that actually move the needle. As you refine your approach, you will develop a unique perspective on the markets that allows you to remain calm and objective even in the midst of high volatility.`
            ];
        }

        return [
            `The concept of ${title} is fundamental to understanding the broader dynamics of the financial markets. While basic definitions provide a starting point, a truly professional perspective requires looking at the underlying structural forces. In this deep dive, we explore how ${title} functions within the complex ecosystem of global currency exchange and why it remains a critical focus for institutional and retail traders alike.`,
            `Historically, ${title} has evolved significantly. ${context[0] || 'As mentioned in the lesson'}, this area represents a key junction between economic policy and market sentiment. When we look at the historical data, we see that the most successful participants are those who don't just react to price movements, but understand the "why" behind them. This involves analyzing macro-economic indicators and geopolitical stability.`,
            `From a technical standpoint, ${title} interacts with other market components in subtle ways. For instance, the relationship between volume and price action often dictates the reliability of signals in this category. Professional traders often look for confluence—where multiple indicators or analysis types align—to confirm their hypotheses about ${title}. This multi-layered approach reduces risk and increases the probability of capturing significant moves.`,
            `Psychology also plays a massive role. The market is, at its heart, a collection of human decisions. Because so many traders are focused on ${title}, it can become a self-fulfilling prophecy. When a critical threshold is reached, the collective reaction of thousands of market participants can lead to explosive movements. Understanding this herd behavior allows you to anticipate turns rather than just following the crowd.`,
            `Risk management is the final, and perhaps most important, piece of the puzzle. No matter how deep your understanding of ${title}, the market can always behave unexpectedly. Professionals use strictly defined parameters to protect their capital, ensuring that no single event related to ${title} can jeopardize their long-term survival. Consistency in applying these rules is what separates the veterans from the amateurs.`,
            `In conclusion, mastering ${title} is a journey of continuous learning. As you gain more experience, you'll start to see patterns and relationships that aren't visible on the surface. By combining the foundational knowledge from this lesson with the advanced insights in this deep dive, you are well on your way to developing the "trader's intuition" that defines the world's most successful market participants.`
        ];
    };

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const sectionCount = sections.length;
            const index = Math.min(
                Math.floor(latest * sectionCount),
                sectionCount - 1
            );
            setActiveSection(index);
        });
        return () => unsubscribe();
    }, [scrollYProgress, sections]);

    return (
        <div ref={containerRef} className="relative flex flex-col lg:flex-row gap-8" style={{ position: 'relative' }}>
            {/* Text Side */}
            <div className="flex-1">
                {sections.map((section, index) => (
                    <motion.section
                        key={`${section.id}-${index}`}
                        initial={{ opacity: 0.2, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ margin: "-20% 0px -40% 0px" }}
                        className={`glass p-8 rounded-2xl relative z-10 flex flex-col justify-center min-h-[85vh] ${
                            index === sections.length - 1 ? "mb-0" : "mb-[30vh]"
                        }`}
                    >
                        <h3 className="text-2xl font-bold text-white mb-4 font-display">
                            {section.title}
                        </h3>
                        <div className="space-y-4 text-white/70 leading-relaxed text-lg">
                            {section.text.map((t, i) => (
                                <p key={i}>{t}</p>
                            ))}
                        </div>

                        {/* Read More Button */}
                        <div className="mt-8 flex justify-end">
                            <button 
                                onClick={() => openModal(section.title, section.inDepth, section.text)}
                                className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-white/60 hover:text-white transition-all"
                            >
                                <span>Read More</span>
                                <div className="p-1 bg-green-500/20 group-hover:bg-green-500/40 rounded-lg transition-colors">
                                    <BookOpen size={14} className="text-green-400" />
                                </div>
                            </button>
                        </div>
                    </motion.section>
                ))}
            </div>

            {/* In-depth Modal */}
            <InDepthModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title={modalContent.title} 
                content={modalContent.content} 
            />

            {/* Visual Side (Sticky) */}
            <div className="hidden lg:block w-[400px] sticky top-24 h-[70vh] rounded-3xl overflow-hidden glass-brand border border-white/10 shadow-2xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={sections[activeSection]?.id || "empty"}
                        initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 1.1, rotateY: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full h-full flex items-center justify-center p-8 text-center"
                    >
                        {sections[activeSection] && renderVisual(sections[activeSection].visualType)}
                    </motion.div>
                </AnimatePresence>

                {/* Progress Indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {sections.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 rounded-full transition-all duration-300 ${
                                i === activeSection ? "w-8 bg-green-400" : "w-2 bg-white/20"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const renderVisual = (type: string) => {
    switch (type) {
        // Preschool L1
        case "l1-intro":
            return (
                <div className="relative">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-48 h-48 border-2 border-dashed border-green-500/30 rounded-full flex items-center justify-center">
                        <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                            <Globe className="text-green-400" size={80} />
                        </motion.div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="absolute -right-4 -top-4 bg-black/80 p-3 rounded-xl border border-white/10 shadow-xl">
                        <div className="text-xs text-white/50 uppercase tracking-widest font-bold">Volume</div>
                        <div className="text-xl font-bold text-green-400">High</div>
                    </motion.div>
                </div>
            );
        case "l1-scale":
            return (
                <div className="space-y-6 text-center">
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-6xl font-black bg-gradient-to-br from-white to-white/20 bg-clip-text text-transparent">
                        $7.5T
                    </motion.div>
                    <div className="text-sm text-green-400 font-medium uppercase tracking-[0.2em]">Traded per day</div>
                    <div className="flex gap-2 justify-center">
                        {[...Array(5)].map((_, i) => (
                            <motion.div key={i} initial={{ height: 10 }} animate={{ height: [10, 40, 15, 30, 10] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-2 bg-green-500/40 rounded-full" />
                        ))}
                    </div>
                </div>
            );
        case "l1-participants":
            return (
                <div className="grid grid-cols-2 gap-4">
                    {[{ icon: Landmark, label: "Central Banks" }, { icon: Building2, label: "Banks" }, { icon: TrendingUp, label: "Hedge Funds" }, { icon: User, label: "You" }].map((item, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col items-center gap-2">
                            <item.icon className="text-green-400" size={24} />
                            <div className="text-[10px] text-white/60 font-bold uppercase">{item.label}</div>
                        </motion.div>
                    ))}
                </div>
            );
        case "l1-pairs":
            return (
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-2xl">🇪🇺</div>
                        <div className="text-xs font-bold">EUR</div>
                    </div>
                    <ArrowRightLeft className="text-white/20" size={32} />
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-2xl">🇺🇸</div>
                        <div className="text-xs font-bold">USD</div>
                    </div>
                </div>
            );

        // Preschool L2
        case "l2-how-intro":
            return (
                <div className="relative w-40 h-40">
                    <motion.div animate={{ rotate: [0, 180, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-full h-full border-4 border-dashed border-white/20 rounded-full" />
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">🔄</div>
                </div>
            );
        case "l2-buy-sell":
            return (
                <div className="flex gap-8">
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center text-3xl font-bold">▲</div>
                        <span className="text-green-400 font-bold">BUY</span>
                    </motion.div>
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center text-3xl font-bold">▼</div>
                        <span className="text-red-400 font-bold">SELL</span>
                    </motion.div>
                </div>
            );
        case "l2-pips-lots":
            return (
                <div className="text-center font-mono text-4xl tracking-widest">
                    1.10<motion.span animate={{ color: ["#ffffff", "#4ade80", "#ffffff"] }} transition={{ duration: 2, repeat: Infinity }} className="font-bold">4</motion.span>2
                    <div className="text-sm font-sans text-green-400 mt-2 uppercase tracking-normal">The Pip</div>
                </div>
            );

        // Preschool L3
        case "l3-sessions":
            return (
                <div className="relative w-48 h-48 border-4 border-white/10 rounded-full flex items-center justify-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute w-1 h-20 bg-green-500 origin-bottom rounded-full" style={{ bottom: "50%" }} />
                    <div className="w-3 h-3 bg-white rounded-full z-10" />
                </div>
            );
        case "l3-overlap":
            return (
                <div className="flex -space-x-8">
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }} className="w-24 h-24 rounded-full bg-blue-500/40 mix-blend-screen flex items-center justify-center text-xs font-bold">London</motion.div>
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }} className="w-24 h-24 rounded-full bg-green-500/40 mix-blend-screen flex items-center justify-center text-xs font-bold">NY</motion.div>
                </div>
            );

        // Preschool L4
        case "l4-major-players":
            return (
                <div className="relative">
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }}>
                        <Building2 size={80} className="text-blue-500" />
                    </motion.div>
                    <div className="text-center text-xs text-white/50 font-bold mt-2 uppercase">Institutional</div>
                </div>
            );
        case "l4-retail":
            return (
                <div className="relative">
                    <motion.div animate={{ x: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }}>
                        <User size={64} className="text-green-400" />
                    </motion.div>
                    <div className="text-center text-xs text-white/50 font-bold mt-2 uppercase">Retail</div>
                </div>
            );

        // Preschool L5
        case "l5-liquidity":
            return (
                <div className="flex gap-1 overflow-hidden h-24 items-end">
                    {[...Array(12)].map((_, i) => (
                        <motion.div key={i} animate={{ height: ["20%", "100%", "20%"] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }} className="w-4 bg-blue-500/50 rounded-t-sm" />
                    ))}
                </div>
            );
        case "l5-low-costs":
            return (
                <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }} className="bg-green-500/20 border border-green-500 p-6 rounded-2xl">
                    <div className="text-3xl font-bold text-green-400">0%</div>
                    <div className="text-xs uppercase font-bold text-green-400/70 mt-1">Commission</div>
                </motion.div>
            );

        // Preschool L6
        case "l6-leverage":
            return (
                <div className="flex items-center gap-4">
                    <div className="text-xl font-bold">$1</div>
                    <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div animate={{ width: ["0%", "100%", "0%"] }} transition={{ duration: 3, repeat: Infinity }} className="h-full bg-green-500" />
                    </div>
                    <div className="text-3xl font-bold text-green-400">$50</div>
                </div>
            );
        case "l6-margin-call":
            return (
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-6xl text-red-500">
                    ⚠️
                </motion.div>
            );

        // Kindergarten L1
        case "k1-broker-intro":
            return (
                <div className="flex items-center gap-4 text-4xl">
                    <div className="opacity-50">👤</div>
                    <motion.div animate={{ x: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }} className="text-blue-400">↔️</motion.div>
                    <div className="opacity-50">🏦</div>
                </div>
            );
        case "k1-regulation":
            return (
                <motion.div animate={{ rotateY: [0, 360] }} transition={{ duration: 3, repeat: Infinity }} className="w-24 h-24 bg-yellow-500/20 border-2 border-yellow-500 rounded-full flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                    ⭐
                </motion.div>
            );

        // Kindergarten L2
        case "k2-platform":
            return (
                <div className="w-48 h-32 bg-white/10 rounded-lg border border-white/20 p-2 relative overflow-hidden">
                    <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 w-full h-0.5 bg-green-500/50" />
                    <div className="w-full h-full bg-black/40 rounded flex items-center justify-center">💻</div>
                </div>
            );

        // Kindergarten L3
        case "k3-technical":
            return (
                <div className="w-full h-32 flex items-end gap-1 px-4 relative">
                    <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.path 
                            initial={{ d: "M 0 50 Q 25 20 50 50 Q 75 80 100 30" }}
                            animate={{ d: ["M 0 50 Q 25 20 50 50 Q 75 80 100 30", "M 0 30 Q 25 60 50 30 Q 75 0 100 50", "M 0 50 Q 25 20 50 50 Q 75 80 100 30"] }} 
                            fill="none" 
                            stroke="#4ade80" 
                            strokeWidth="2" 
                            transition={{ duration: 4, repeat: Infinity }} 
                        />
                    </motion.svg>
                </div>
            );
        case "k3-fundamental":
            return (
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-6xl">
                    📰
                </motion.div>
            );

        // Elementary L1
        case "e1-support":
            return (
                <div className="relative w-full h-40 flex flex-col items-center justify-end pb-4">
                    <motion.div animate={{ y: [-80, 0, -80] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-8 h-8 bg-green-400 rounded-full mb-2 shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
                    <div className="w-3/4 h-2 bg-white/20 rounded-full" />
                </div>
            );
        case "e1-resistance":
            return (
                <div className="relative w-full h-40 flex flex-col items-center justify-start pt-4">
                    <div className="w-3/4 h-2 bg-white/20 rounded-full" />
                    <motion.div animate={{ y: [80, 0, 80] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-8 h-8 bg-red-400 rounded-full mt-2 shadow-[0_0_15px_rgba(248,113,113,0.5)]" />
                </div>
            );

        // Elementary L2
        case "e2-candle":
            return (
                <div className="flex flex-col items-center">
                    <div className="w-1 h-8 bg-green-500" />
                    <motion.div animate={{ height: [40, 60, 40] }} transition={{ duration: 2, repeat: Infinity }} className="w-8 bg-green-500 rounded-sm" />
                    <div className="w-1 h-12 bg-green-500" />
                </div>
            );

        case "l1-history":
            return (
                <div className="relative">
                    <History size={64} className="text-blue-400" />
                    <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="w-1 h-8 bg-white/40 rounded-full origin-bottom" style={{ transform: 'translateY(-50%)' }} />
                    </motion.div>
                </div>
            );
        case "l2-bull-bear":
            return (
                <div className="flex gap-12">
                    <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        <TrendingUp size={64} className="text-green-500" />
                    </motion.div>
                    <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
                        <TrendingDown size={64} className="text-red-500" />
                    </motion.div>
                </div>
            );
        case "l2-spread":
            return (
                <motion.div animate={{ scaleX: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <MoveHorizontal size={80} className="text-blue-400" />
                </motion.div>
            );
        case "l3-tokyo":
        case "l3-london":
        case "l3-new-york":
            return (
                <div className="relative w-48 h-32 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                    <Globe size={120} className="text-white/5 absolute -bottom-10 -right-10" />
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        <MapPin size={48} className="text-red-500 fill-red-500/20" />
                    </motion.div>
                    <div className="absolute bottom-2 text-[10px] font-bold uppercase tracking-tighter opacity-50">
                        {type.split('-')[1]} Session
                    </div>
                </div>
            );
        case "l4-hedge-funds":
            return (
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Briefcase size={80} className="text-blue-400" />
                </motion.div>
            );
        case "l4-corporations":
            return (
                <div className="relative">
                    <Building size={80} className="text-indigo-400" />
                    <motion.div 
                        animate={{ opacity: [0, 1, 0], x: [-20, 20] }} 
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-1/2 left-full text-blue-400"
                    >
                        <DollarSign size={24} />
                    </motion.div>
                </div>
            );
        case "l4-governments":
            return (
                <div className="relative">
                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}>
                        <Landmark size={80} className="text-yellow-500" />
                    </motion.div>
                </div>
            );
        case "l5-no-middlemen":
            return (
                <div className="relative w-48 h-2 flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/20 rounded-full" />
                    <motion.div 
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        className="absolute h-full bg-red-500 rounded-full"
                    />
                    <div className="flex gap-16 absolute -top-8">
                        <User size={32} className="text-white/40" />
                        <Building2 size={32} className="text-white/40" />
                    </div>
                </div>
            );
        case "l5-24-hour":
            return (
                <div className="relative">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                        <Globe size={80} className="text-blue-400" />
                    </motion.div>
                </div>
            );
        case "l5-no-manipulation":
            return (
                <motion.div animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                    <Scale size={80} className="text-white/80" />
                </motion.div>
            );
        case "l6-margin-used":
            return (
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Lock size={80} className="text-yellow-500" />
                </motion.div>
            );
        case "l6-equity":
            return (
                <div className="flex flex-col items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2, duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                        >
                            <Coins size={32} className="text-yellow-500" />
                        </motion.div>
                    ))}
                </div>
            );
        case "l6-stop-out":
            return (
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }} 
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    <AlertTriangle size={80} className="text-red-500" />
                </motion.div>
            );
        case "k1-execution":
            return (
                <div className="relative">
                    <Zap size={80} className="text-yellow-400 fill-yellow-400/20" />
                    <motion.div 
                        animate={{ scale: [1, 1.5], opacity: [1, 0] }} 
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0"
                    >
                        <Zap size={80} className="text-yellow-400" />
                    </motion.div>
                </div>
            );
        case "k1-customer-service":
            return (
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Headphones size={80} className="text-blue-400" />
                </motion.div>
            );
        case "k1-deposit-withdraw":
            return (
                <div className="relative">
                    <Wallet size={80} className="text-green-500" />
                    <motion.div 
                        animate={{ y: [-20, 20], opacity: [0, 1, 0] }} 
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -right-8 top-0"
                    >
                        <DollarSign size={32} className="text-green-400" />
                    </motion.div>
                </div>
            );
        case "k2-charting-tools":
            return (
                <div className="relative w-48 h-32 border border-white/10 rounded-lg overflow-hidden">
                    <motion.div 
                        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="p-4"
                    >
                        <Ruler size={48} className="text-blue-400" />
                    </motion.div>
                </div>
            );
        case "k2-order-types":
            return (
                <div className="relative">
                    <ClipboardList size={80} className="text-white/60" />
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -right-2 -bottom-2 bg-green-500 rounded-full p-1"
                    >
                        <Zap size={16} className="text-white" />
                    </motion.div>
                </div>
            );
        case "k2-mobile":
            return (
                <div className="relative">
                    <Smartphone size={80} className="text-white/40" />
                    <motion.div 
                        animate={{ height: ["20%", "60%", "20%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-4 left-1/2 -translate-x-1/2 w-8 bg-green-500/40 rounded-sm"
                    />
                </div>
            );
        case "k2-backtesting":
            return (
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                    <Rewind size={80} className="text-purple-400" />
                </motion.div>
            );
        case "k3-sentiment":
            return (
                <div className="flex gap-4">
                    <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                        <User size={48} className="text-green-400" />
                    </motion.div>
                    <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity }}>
                        <User size={48} className="text-red-400" />
                    </motion.div>
                </div>
            );
        case "k3-which-is-best":
            return (
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }} 
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <Trophy size={80} className="text-yellow-500" />
                </motion.div>
            );
        case "k3-self-fulfilling":
            return (
                <div className="relative">
                    <Eye size={80} className="text-blue-400" />
                    {[...Array(3)].map((_, i) => (
                        <motion.div 
                            key={i}
                            animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                            transition={{ duration: 2, delay: i * 0.6, repeat: Infinity }}
                            className="absolute inset-0 border-2 border-blue-400/30 rounded-full"
                        />
                    ))}
                </div>
            );
        case "e1-breakout":
            return (
                <div className="relative w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "circIn" }}
                        className="w-12 h-full bg-green-400 shadow-[0_0_20px_#4ade80]"
                    />
                </div>
            );
        case "e1-role-reversal":
            return (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                    <RefreshCw size={80} className="text-blue-400" />
                </motion.div>
            );
        case "e1-fakeout":
            return (
                <motion.div 
                    animate={{ y: [0, -20, 0], opacity: [0.2, 1, 0.2] }} 
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <Ghost size={80} className="text-white/40" />
                </motion.div>
            );
        case "e2-wicks":
            return (
                <div className="flex flex-col items-center">
                    <motion.div animate={{ height: [20, 40, 20] }} transition={{ duration: 2, repeat: Infinity }} className="w-0.5 bg-white/40" />
                    <div className="w-6 h-12 border border-white/40" />
                    <motion.div animate={{ height: [40, 20, 40] }} transition={{ duration: 2, repeat: Infinity }} className="w-0.5 bg-white/40" />
                </div>
            );
        case "e2-bullish-candle":
            return (
                <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-green-500" />
                    <motion.div 
                        initial={{ height: 10 }}
                        animate={{ height: 60 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-8 bg-green-500 rounded-sm"
                    />
                    <div className="w-0.5 h-6 bg-green-500" />
                </div>
            );
        case "e2-bearish-candle":
            return (
                <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 bg-red-500" />
                    <motion.div 
                        initial={{ height: 60 }}
                        animate={{ height: 10 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-8 bg-red-500 rounded-sm"
                    />
                    <div className="w-0.5 h-4 bg-red-500" />
                </div>
            );
        case "e2-doji":
            return (
                <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute w-full h-0.5 bg-white" />
                    <div className="absolute h-full w-0.5 bg-white" />
                </div>
            );

        default:
            return <div className="text-8xl">📊</div>;
    }
};


