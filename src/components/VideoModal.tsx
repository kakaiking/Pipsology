"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    video: {
        id: string | number;
        videoId: string;
        title: string;
        description: string;
    } | null;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, video }) => {
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

    if (!video) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-5xl bg-[#0d1411] border border-white/10 rounded-[32px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] overflow-y-auto custom-scrollbar max-h-[90vh] z-[101]"
                    >
                        {/* Video Container */}
                        <div className="aspect-video w-full bg-black relative group">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                            
                            {/* Close Button - Floats on top of video, but scrolls with it */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition-all text-white/70 hover:text-white z-[102] border border-white/10 hover:scale-110 active:scale-95"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Info Body */}
                        <div className="p-8 md:p-12 bg-gradient-to-b from-transparent to-black/20">
                            <div className="max-w-4xl">
                                <div className="flex items-center gap-2 mb-4 text-green-400 font-semibold text-sm tracking-widest uppercase">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Trading Education
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-8 leading-tight">
                                    {video.title}
                                </h2>
                                <div className="h-px w-20 bg-green-500/30 mb-8" />
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-white/70 leading-relaxed text-xl md:text-2xl font-light">
                                        {video.description}
                                    </p>
                                </div>
                                
                                <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-4">
                                    <button 
                                        onClick={onClose}
                                        className="px-10 py-4 bg-green-500 hover:bg-green-600 text-black font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20"
                                    >
                                        Back to Library
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            )}
        </AnimatePresence>
    );
};



