"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, ChevronRight } from "lucide-react";

interface InDepthModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string[];
    videoUrl?: string;
}

const extractVideoId = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

export const InDepthModal: React.FC<InDepthModalProps> = ({ isOpen, onClose, title, content, videoUrl }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center py-8 px-[40px]">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full bg-[#0d1411] border border-white/10 rounded-3xl z-[101] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
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
                        <div className="h-[500px] overflow-y-auto px-6 py-8 custom-scrollbar bg-black/20">
                            <div className="w-full space-y-6 pb-4">
                                {videoUrl && extractVideoId(videoUrl) && (
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-2 text-green-400 font-semibold text-xs tracking-wider uppercase">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            Watch Video Lesson
                                        </div>
                                        <div className="rounded-2xl overflow-hidden aspect-video border border-white/10 bg-black shadow-xl">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={`https://www.youtube.com/embed/${extractVideoId(videoUrl)}?rel=0&modestbranding=1`}
                                                title={`${title} Video`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="w-full h-full"
                                            ></iframe>
                                        </div>
                                    </div>
                                )}

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
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};


