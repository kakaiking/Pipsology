"use client";

import React, { useState } from "react";
import { Plus, Video, Link as LinkIcon, FileText, Type } from "lucide-react";

export default function AdminVideosPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [previewId, setPreviewId] = useState<string | null>(null);

    const extractVideoId = (inputUrl: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = inputUrl.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        setUrl(newUrl);
        const id = extractVideoId(newUrl);
        setPreviewId(id);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!title || !description || !url) {
            setStatus("error");
            return;
        }

        const videoId = extractVideoId(url);
        if (!videoId) {
            setStatus("error");
            return;
        }

        // In a real app, this would be an API call to save to a database.
        // For now, we simulate success.
        console.log("New Video to Add:", {
            id: `v${Date.now()}`,
            title,
            description,
            videoId,
        });

        setStatus("success");
        setTimeout(() => {
            setTitle("");
            setDescription("");
            setUrl("");
            setPreviewId(null);
            setStatus("idle");
        }, 3000);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
                        Video Management
                    </h1>
                    <p className="text-white/50">Add and manage YouTube videos for the library.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">YouTube URL</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LinkIcon size={18} className="text-white/40" />
                                </div>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={handleUrlChange}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">Video Title</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Type size={18} className="text-white/40" />
                                </div>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Advanced Price Action Strategies"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">Description</label>
                            <div className="relative">
                                <div className="absolute top-3 left-3 pointer-events-none">
                                    <FileText size={18} className="text-white/40" />
                                </div>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Provide a brief description of the video content..."
                                    rows={4}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all resize-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
                        >
                            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                            Add Video to Library
                        </button>

                        {status === "success" && (
                            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm text-center">
                                Video successfully added to the library!
                            </div>
                        )}
                        {status === "error" && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                                Please fill in all fields with a valid YouTube URL.
                            </div>
                        )}
                    </form>
                </div>

                {/* Preview Section */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-sm font-medium text-white/70 uppercase tracking-widest flex items-center gap-2">
                        <Video size={16} /> Live Preview
                    </h3>
                    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group">
                        <div className="aspect-video w-full bg-black relative flex items-center justify-center">
                            {previewId ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${previewId}`}
                                    title={title || "Video Preview"}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0"
                                ></iframe>
                            ) : (
                                <div className="text-white/20 flex flex-col items-center gap-2">
                                    <Video size={48} />
                                    <span className="text-sm">No Video Selected</span>
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <h4 className="text-[15px] font-semibold text-white mb-2 line-clamp-2">
                                {title || "Video Title Preview"}
                            </h4>
                            <p className="text-[13px] text-white/50 line-clamp-3 leading-relaxed">
                                {description || "The video description will appear here once you start typing. Make it engaging for the students."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


