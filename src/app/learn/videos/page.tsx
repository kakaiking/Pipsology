"use client";

import { useState } from "react";
import { tradingVideos } from "@/lib/data";
import { VideoModal } from "@/components/VideoModal";
import { Play } from "lucide-react";

export default function VideosPage() {
    const [selectedVideo, setSelectedVideo] = useState<typeof tradingVideos[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleVideoClick = (video: typeof tradingVideos[0]) => {
        setSelectedVideo(video);
        setIsModalOpen(true);
    };

    return (
        <div className="pb-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white mb-2">Video Library</h1>
                <p className="text-white/60">Watch and learn from our curated collection of trading videos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tradingVideos.map((video) => (
                    <div 
                        key={video.id} 
                        onClick={() => handleVideoClick(video)}
                        className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-green-500/30 transition-all group flex flex-col cursor-pointer hover:shadow-2xl hover:shadow-green-500/5"
                    >
                        <div className="aspect-video w-full bg-black relative overflow-hidden">
                            <img 
                                src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`} 
                                alt={video.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)] transform scale-90 group-hover:scale-100 transition-all duration-500 group-hover:rotate-[360deg]">
                                    <Play className="text-black ml-1" fill="currentColor" size={28} />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 flex-1 flex flex-col">
                            <h4 className="text-[15px] font-semibold text-white mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
                                {video.title}
                            </h4>
                            <p className="text-[13px] text-white/50 line-clamp-2 leading-relaxed flex-1">
                                {video.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <VideoModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                video={selectedVideo} 
            />
        </div>
    );
}



