"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
    Landmark, Building2, TrendingUp, User, Globe, DollarSign, ArrowRightLeft, 
    History, MoveHorizontal, MapPin, Briefcase, Building, Scale, Lock, 
    Coins, AlertTriangle, Zap, Headphones, Wallet, Ruler, ClipboardList, 
    Smartphone, Rewind, Trophy, Eye, RefreshCw, Ghost, TrendingDown, BookOpen,
    Play, Heart, Share2, Music, ChevronDown, Volume2, VolumeX,
    Maximize2, Minimize2
} from "lucide-react";

export interface SectionContent {
    id: string;
    title: string;
    text: string[];
    visualType: string;
    inDepth?: string[];
    videoUrl?: string;
}

interface ScrollytellingLessonProps {
    sections: SectionContent[];
    grade: string;
    slug: string;
}

import { generateInDepthContent } from "@/lib/lessonHelpers";

export const ScrollytellingLesson: React.FC<ScrollytellingLessonProps> = ({ sections, grade, slug }) => {
    const [activeSection, setActiveSection] = useState(0);
    const [likedSections, setLikedSections] = useState<Record<string, boolean>>({});
    const [sectionLikes, setSectionLikes] = useState<Record<string, number>>({});
    const [bookmarkedSections, setBookmarkedSections] = useState<Record<string, boolean>>({});
    const [showToast, setShowToast] = useState(false);
    const [activeHearts, setActiveHearts] = useState<Record<string, { id: number; x: number; y: number }[]>>({});
    const [isMuted, setIsMuted] = useState(true);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const [readyVideos, setReadyVideos] = useState<Record<string, boolean>>({});
    const [playingStates, setPlayingStates] = useState<Record<string, boolean>>({});
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Reset playing state to true when active section changes to hide play overlay on snap
    useEffect(() => {
        const activeSecId = sections[activeSection]?.id;
        if (activeSecId) {
            setPlayingStates((prev) => ({ ...prev, [activeSecId]: true }));
        }
    }, [activeSection, sections]);

    const togglePlay = (id: string) => {
        const iframe = document.getElementById(`youtube-iframe-${id}`) as HTMLIFrameElement | null;
        if (!iframe || !iframe.contentWindow) return;

        const currentlyPlaying = playingStates[id] !== false; // defaults to true
        const nextPlaying = !currentlyPlaying;

        setPlayingStates((prev) => ({ ...prev, [id]: nextPlaying }));

        iframe.contentWindow.postMessage(
            JSON.stringify({
                event: "command",
                func: nextPlaying ? "playVideo" : "pauseVideo",
                args: []
            }),
            "*"
        );
    };

    const toggleExpandSection = (secId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [secId]: !prev[secId]
        }));
    };
    
    // Collapse any expanded section when clicking outside the expanded text container
    useEffect(() => {
        const hasExpanded = Object.values(expandedSections).some(Boolean);
        if (!hasExpanded) return;

        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Ignore if click is within the description panel or on the "read more" button
            if (target.closest("[data-description-panel]") || target.closest("[data-read-more-btn]")) {
                return;
            }
            // Collapse all expanded sections
            setExpandedSections({});
        };

        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [expandedSections]);
    
    const containerRef = useRef<HTMLDivElement>(null);

    // Initializing mock likes count for each section
    useEffect(() => {
        const initialLikes: Record<string, number> = {};
        sections.forEach((sec, idx) => {
            initialLikes[sec.id] = 120 + idx * 45 + Math.floor(Math.random() * 20);
        });
        setSectionLikes(initialLikes);
    }, [sections]);

    // Observe active slide during native snap scrolling
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const secIdx = entry.target.getAttribute("data-section-index");
                        if (secIdx !== null) {
                            setActiveSection(parseInt(secIdx));
                        }
                    }
                });
            },
            {
                root: containerRef.current,
                threshold: 0.6, // Fire when 60% of the slide height is visible
            }
        );

        const cards = containerRef.current?.querySelectorAll("[data-section-card]");
        cards?.forEach((card) => observer.observe(card));

        return () => {
            cards?.forEach((card) => observer.unobserve(card));
        };
    }, [sections]);

    // Handle Mute/Unmute state using YouTube postMessage API to avoid reloading/restarting the video
    useEffect(() => {
        const activeSecId = sections[activeSection]?.id;
        if (!activeSecId) return;

        const toggleSound = () => {
            const iframe = document.getElementById(`youtube-iframe-${activeSecId}`) as HTMLIFrameElement | null;
            if (iframe && iframe.contentWindow) {
                if (isMuted) {
                    iframe.contentWindow.postMessage(
                        JSON.stringify({
                            event: "command",
                            func: "mute",
                            args: []
                        }),
                        "*"
                    );
                } else {
                    iframe.contentWindow.postMessage(
                        JSON.stringify({
                            event: "command",
                            func: "unMute",
                            args: []
                        }),
                        "*"
                    );
                    iframe.contentWindow.postMessage(
                        JSON.stringify({
                            event: "command",
                            func: "setVolume",
                            args: [100]
                        }),
                        "*"
                    );
                }
            }
        };

        // Trigger immediately
        toggleSound();

        // Trigger with slight delays to catch iframe initialization when scrolling between sections
        const t1 = setTimeout(toggleSound, 300);
        const t2 = setTimeout(toggleSound, 800);
        const t3 = setTimeout(toggleSound, 1500);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [isMuted, activeSection, sections]);

    // Interaction Handlers
    const handleLikeClick = (secId: string) => {
        const isLiked = likedSections[secId];
        setLikedSections((prev) => ({ ...prev, [secId]: !isLiked }));
        setSectionLikes((prev) => ({
            ...prev,
            [secId]: isLiked ? (prev[secId] || 0) - 1 : (prev[secId] || 0) + 1,
        }));
    };

    const handleBookmarkClick = (secId: string) => {
        setBookmarkedSections((prev) => ({ ...prev, [secId]: !bookmarkedSections[secId] }));
    };

    const handleShareClick = (secId: string) => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(`${window.location.origin}/learn/${grade}/${slug}?sec=${secId}`);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        }
    };

    // Double click to Like + Floating Heart effect
    const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>, secId: string) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newHeart = { id: Date.now() + Math.random(), x, y };
        setActiveHearts((prev) => ({
            ...prev,
            [secId]: [...(prev[secId] || []), newHeart],
        }));

        setTimeout(() => {
            setActiveHearts((prev) => ({
                ...prev,
                [secId]: (prev[secId] || []).filter((h) => h.id !== newHeart.id),
            }));
        }, 800);

        if (!likedSections[secId]) {
            setLikedSections((prev) => ({ ...prev, [secId]: true }));
            setSectionLikes((prev) => ({ ...prev, [secId]: (prev[secId] || 0) + 1 }));
        }
    };

    const scrollToSection = (idx: number) => {
        const cards = containerRef.current?.querySelectorAll("[data-section-card]");
        if (cards && cards[idx]) {
            cards[idx].scrollIntoView({ behavior: "smooth" });
        }
    };

    const extractVideoId = (url?: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <div className="w-full relative flex flex-col items-center">
            {/* Snapping Scroll Area (occupies full container width & height) */}
            <div className="w-full h-[78vh] rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden relative bg-[#040806] flex flex-col">
                <div
                    ref={containerRef}
                    className="flex-1 w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-none"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {sections.map((section, idx) => {
                        const videoId = extractVideoId(section.videoUrl);
                        const isActive = activeSection === idx;
                        
                        return (
                            <div
                                key={section.id}
                                data-section-card
                                data-section-index={idx}
                                className="w-full h-full snap-start snap-always relative overflow-hidden flex flex-col justify-end bg-black"
                                onDoubleClick={(e) => handleDoubleClick(e, section.id)}
                            >
                                {/* Background Layer (Video or interactive visual) */}
                                {videoId ? (
                                    <div className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden bg-black">
                                        {isActive && (
                                            <>
                                                {/* If paused, show the high-quality still thumbnail to hide YouTube's native pause overlay */}
                                                {playingStates[section.id] === false && (
                                                    <img
                                                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                                        alt={section.title}
                                                        className="absolute inset-0 w-full h-full object-cover z-5 opacity-100 animate-fade-in"
                                                    />
                                                )}
                                                <iframe
                                                    id={`youtube-iframe-${section.id}`}
                                                    width="100%"
                                                    height="100%"
                                                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&enablejsapi=1`}
                                                    title={section.title}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    className={`w-full h-full object-cover pointer-events-none scale-[1.3] origin-center transition-opacity duration-300 ${
                                                        playingStates[section.id] !== false
                                                            ? "opacity-100" 
                                                            : "opacity-0 pointer-events-none"
                                                    }`}
                                                ></iframe>
                                            </>
                                        )}
                                        {/* Custom Play Button Overlay Widget */}
                                        {playingStates[section.id] === false && (
                                            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                                <div className="w-16 h-16 bg-black/45 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 scale-100">
                                                    <Play className="text-white fill-white ml-1.5" size={24} />
                                                </div>
                                            </div>
                                        )}
                                        {/* Transparent overlay that shields the iframe from receiving touch/click events, completely preventing pause overlays */}
                                        <div className="absolute inset-0 w-full h-full z-10 pointer-events-auto bg-transparent" />
                                    </div>
                                ) : (
                                    /* Interactive diagram representation inside a stunning glowing card when there is no video */
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-[#08100d] via-[#040806] to-[#0d1c14] z-0 overflow-hidden flex items-center justify-center">
                                        {/* Ambient Glows */}
                                        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
                                        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
                                        
                                        <div className="relative z-10 w-full max-w-xs md:max-w-sm aspect-square flex items-center justify-center bg-white/[0.01] border border-white/5 rounded-[40px] shadow-2xl backdrop-blur-md p-8 select-none">
                                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-[40px] pointer-events-none" />
                                            <div className="scale-90 md:scale-100 transition-transform">
                                                {renderVisual(section.visualType)}
                                            </div>
                                        </div>
                                    </div>
                                )}



                                {/* Transparent touch/click shielding layer that sits on top of the background layer to swallow all interactions and prevent the iframe controls from ever being triggered */}
                                <div 
                                     onClick={() => {
                                         if (expandedSections[section.id]) {
                                             toggleExpandSection(section.id);
                                         } else {
                                             togglePlay(section.id);
                                         }
                                     }}
                                     className="absolute inset-0 w-full h-full z-15 pointer-events-auto bg-transparent cursor-pointer" 
                                 />

                                {/* Sidebar Actions Panel */}
                                <div className="absolute right-6 bottom-8 flex flex-col items-center gap-5 z-20 pointer-events-auto">
                                    {/* Academy Avatar */}
                                    {!isFullscreen && (
                                        <div className="relative mb-1">
                                            <div className="w-11 h-11 rounded-full border-2 border-green-400 bg-green-500/20 flex items-center justify-center font-bold text-xs text-green-400 select-none">
                                                PA
                                            </div>
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-green-400 text-black rounded-full w-4.5 h-4.5 flex items-center justify-center font-extrabold text-[10px] shadow select-none">
                                                ✓
                                            </div>
                                        </div>
                                    )}

                                    {/* Like Button */}
                                    {!isFullscreen && (
                                        <button
                                            onClick={() => handleLikeClick(section.id)}
                                            className="flex flex-col items-center group"
                                        >
                                            <div className={`p-3 rounded-full transition-all duration-300 ${
                                                likedSections[section.id]
                                                    ? "bg-red-500/20 text-red-500 scale-110 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                                                    : "bg-black/50 hover:bg-black/70 text-white border border-white/5"
                                            }`}>
                                                <Heart size={20} fill={likedSections[section.id] ? "currentColor" : "none"} />
                                            </div>
                                            <span className="text-xs font-bold text-white/80 mt-1 select-none">
                                                {sectionLikes[section.id] || 0}
                                            </span>
                                        </button>
                                    )}


                                    {/* Share Button */}
                                    {!isFullscreen && (
                                        <button
                                            onClick={() => handleShareClick(section.id)}
                                            className="flex flex-col items-center group"
                                        >
                                            <div className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all border border-white/5">
                                                <Share2 size={20} />
                                            </div>
                                            <span className="text-xs font-bold text-white/80 mt-1 select-none">Share</span>
                                        </button>
                                    )}

                                    {/* Mute/Unmute Button */}
                                    {!isFullscreen && (
                                        <button
                                            onClick={() => setIsMuted((prev) => !prev)}
                                            className="flex flex-col items-center group"
                                        >
                                            <div className={`p-3 rounded-full transition-all duration-300 ${
                                                !isMuted
                                                    ? "bg-green-500/20 text-green-400 scale-110 shadow-[0_0_15px_rgba(74,222,128,0.2)] border border-green-500/20"
                                                    : "bg-black/50 hover:bg-black/70 text-white border border-white/5"
                                            }`}>
                                                {!isMuted ? <Volume2 size={20} className="animate-pulse" /> : <VolumeX size={20} />}
                                            </div>
                                            <span className="text-xs font-bold text-white/80 mt-1 select-none">
                                                {!isMuted ? "Sound On" : "Mute"}
                                            </span>
                                        </button>
                                    )}

                                    {/* Full Screen Button */}
                                    <button
                                        onClick={() => setIsFullscreen((prev) => !prev)}
                                        className="flex flex-col items-center group"
                                    >
                                        <div className={`p-3 rounded-full transition-all duration-300 ${
                                            isFullscreen
                                                ? "bg-green-500/20 text-green-400 scale-110 shadow-[0_0_15px_rgba(74,222,128,0.2)] border border-green-500/20"
                                                : "bg-black/50 hover:bg-black/70 text-white border border-white/5"
                                        }`}>
                                            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                                        </div>
                                        <span className="text-xs font-bold text-white/80 mt-1 select-none">
                                            {isFullscreen ? "Exit" : "Fullscreen"}
                                        </span>
                                    </button>
                                </div>

                                {/* Bottom Details Panel */}
                                {!isFullscreen && (
                                    <div 
                                        data-description-panel
                                        className={`absolute left-0 bottom-0 pr-6 pl-8 z-20 text-left pointer-events-auto w-fit max-w-[440px] transition-all duration-300 ${
                                            expandedSections[section.id] ? "pb-0" : "pb-[10px]"
                                        }`}
                                    >
                                        {/* Seamless dark gradient anchored to the bottom-left corner with negative offset to bleed off edges and eliminate left/bottom gaps */}
                                        <div className={`absolute -left-16 -bottom-16 right-0 top-0 transition-all duration-300 -z-10 pointer-events-none blur-md ${
                                            expandedSections[section.id]
                                                ? "bg-black/50 backdrop-blur-[3px]"
                                                : "bg-gradient-to-tr from-black/50 via-black/15 to-transparent"
                                        }`} />

                                        
                                        <h4 className="font-bold text-white text-lg md:text-xl leading-snug mb-2">
                                            {section.title}
                                        </h4>
                                        
                                        {/* Elegant scrollable text description panel */}
                                        <div className="max-h-[22vh] overflow-y-auto pr-2 scrollbar-none mb-0 text-white/80 text-xs md:text-sm leading-relaxed space-y-2">
                                            {(() => {
                                                const combinedText = section.text.join(" ");
                                                const isLongText = combinedText.length > 100;
                                                const isExpanded = !!expandedSections[section.id];
                                                
                                                if (isLongText && !isExpanded) {
                                                    return (
                                                        <p>
                                                            {combinedText.slice(0, 100)}...
                                                            <button 
                                                                data-read-more-btn
                                                                onClick={() => toggleExpandSection(section.id)}
                                                                className="text-green-400 hover:text-green-300 font-semibold ml-1 focus:outline-none transition-colors"
                                                            >
                                                                read more
                                                            </button>
                                                        </p>
                                                    );
                                                }
                                                
                                                return section.text.map((paragraph, pIdx) => (
                                                    <p key={pIdx}>
                                                        {paragraph}
                                                        {isLongText && pIdx === section.text.length - 1 && (
                                                            <button 
                                                                onClick={() => toggleExpandSection(section.id)}
                                                                className="text-green-400 hover:text-green-300 font-semibold ml-2 focus:outline-none transition-colors inline-block"
                                                            >
                                                                read less
                                                            </button>
                                                        )}
                                                    </p>
                                                ));
                                            })()}
                                        </div>
                                    </div>
                                )}

                                {/* Double Tap Heart Overlays */}
                                {activeHearts[section.id]?.map((heart) => (
                                    <motion.div
                                        key={heart.id}
                                        initial={{ scale: 0, opacity: 1, y: 0, rotate: Math.random() * 40 - 20 }}
                                        animate={{ scale: [1, 1.7, 1], opacity: [1, 1, 0], y: -90 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="absolute z-30 pointer-events-none text-red-500 text-6xl drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]"
                                        style={{ left: heart.x - 30, top: heart.y - 30 }}
                                    >
                                        ❤️
                                    </motion.div>
                                ))}
                            </div>
                        );
                    })}
                </div>

                {/* Vertical Progress Navigation Dots */}
                {!isFullscreen && (
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20">
                        {sections.map((section, idx) => {
                            const isActive = activeSection === idx;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(idx)}
                                    className={`w-2 rounded-full transition-all duration-300 ${
                                        isActive ? "h-6 bg-green-400" : "h-2 bg-white/30 hover:bg-white/50"
                                    }`}
                                />
                            );
                        })}
                    </div>
                )}

                {/* Swipe Indicator (Helpful UX) */}
                {!isFullscreen && (
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-white/40 text-[10px] flex flex-col items-center gap-1.5 animate-pulse">
                        <span>Scroll down for next topic</span>
                        <ChevronDown size={14} className="animate-bounce" />
                    </div>
                )}

                {/* Link Share Toast */}
                {showToast && (
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-green-500 text-black text-xs font-extrabold px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-1 border border-green-400">
                        🔗 Section link copied to clipboard!
                    </div>
                )}
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


