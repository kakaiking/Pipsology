"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, ChevronRight } from "lucide-react";

interface InDepthModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string[];
}

export const InDepthModal: React.FC<InDepthModalProps> = ({ isOpen, onClose, title, content }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-8"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-[#0d1411] border border-white/10 rounded-3xl z-[101] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/10 rounded-lg">
                                    <BookOpen className="text-green-400" size={20} />
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold font-display text-white">
                                    Deep Dive: {title}
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content Body (Fixed Height Scrollable) */}
                        <div className="h-[500px] overflow-y-auto p-8 custom-scrollbar bg-black/20">
                            <div className="max-w-2xl mx-auto space-y-6 pb-4">
                                {content && content.length > 0 ? (
                                    content.map((p, i) => (
                                        <p key={i} className="text-white/70 leading-relaxed text-lg">
                                            {p}
                                        </p>
                                    ))
                                ) : (
                                    <div className="py-12 text-center text-white/30 italic">
                                        No in-depth content available for this section yet.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/5 bg-white/2 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-xl transition-all shadow-lg shadow-green-500/20 flex items-center gap-2"
                            >
                                Got it
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};


