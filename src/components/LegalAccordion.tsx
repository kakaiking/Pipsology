"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Section {
    icon: LucideIcon;
    title: string;
    content: string;
}

interface LegalAccordionProps {
    sections: Section[];
}

export default function LegalAccordion({ sections }: LegalAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="grid gap-6">
            {sections.map((section, i) => (
                <div 
                    key={i} 
                    className={`glass rounded-3xl border border-white/10 overflow-hidden transition-all duration-300 ${openIndex === i ? 'border-green-500/30 ring-1 ring-green-500/10' : 'hover:border-white/20'}`}
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full text-left p-8 md:p-10 flex items-start gap-8 group"
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${openIndex === i ? 'bg-green-500/20 border-green-500/30 scale-110' : 'bg-white/5 border-white/10 group-hover:bg-white/10'}`}>
                            <section.icon className={`${openIndex === i ? 'text-green-400' : 'text-white/40 group-hover:text-white/60'}`} size={28} />
                        </div>
                        <div className="flex-1 pt-2">
                            <div className="flex items-center justify-between gap-4">
                                <h2 className={`text-xl md:text-2xl font-bold font-display transition-colors ${openIndex === i ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                                    {section.title}
                                </h2>
                                <ChevronDown 
                                    className={`text-white/20 transition-transform duration-500 ${openIndex === i ? 'rotate-180 text-green-400' : 'group-hover:text-white/40'}`} 
                                    size={24} 
                                />
                            </div>
                        </div>
                    </button>
                    
                    <AnimatePresence>
                        {openIndex === i && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            >
                                <div className="px-8 md:px-10 pb-10 ml-0 md:ml-[88px]">
                                    <div className="h-px bg-white/5 mb-8" />
                                    <div className="text-white/50 leading-relaxed whitespace-pre-line text-lg">
                                        {section.content}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}


