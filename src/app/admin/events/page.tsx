"use client";

import React, { useState } from "react";
import { Plus, Trash2, Calendar as CalendarIcon, Clock, Tag, FileText, ChevronRight } from "lucide-react";
import { communityEvents as initialEvents } from "@/lib/data";

export default function AdminEventsPage() {
    const [events, setEvents] = useState(initialEvents);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: "",
        date: "",
        time: "",
        type: "Webinar",
        description: "",
        impact: "medium"
    });

    const handleAddEvent = (e: React.FormEvent) => {
        e.preventDefault();
        const id = events.length + 1;
        setEvents([...events, { ...newEvent, id }]);
        setIsModalOpen(false);
        setNewEvent({
            title: "",
            date: "",
            time: "",
            type: "Webinar",
            description: "",
            impact: "medium"
        });
    };

    const handleDeleteEvent = (id: number) => {
        setEvents(events.filter(event => event.id !== id));
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Events <span className="text-green-500">Management</span></h1>
                    <p className="text-white/50">Schedule and manage community events, webinars, and meetups.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                >
                    <Plus size={20} />
                    <span>Create Event</span>
                </button>
            </div>

            <div className="grid gap-4">
                {events.map((event) => (
                    <div key={event.id} className="glass-brand p-5 rounded-2xl border border-white/5 hover:border-green-500/30 transition-all group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-green-500 shrink-0">
                                    <CalendarIcon size={24} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">{event.title}</h3>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            event.impact === "high" ? "bg-red-500/20 text-red-400" : 
                                            event.impact === "medium" ? "bg-yellow-500/20 text-yellow-400" : 
                                            "bg-green-500/20 text-green-400"
                                        }`}>
                                            {event.impact} Impact
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm text-white/50">
                                        <div className="flex items-center gap-1.5">
                                            <CalendarIcon size={14} className="text-green-500" />
                                            {event.date}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={14} className="text-green-500" />
                                            {event.time}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Tag size={14} className="text-green-500" />
                                            {event.type}
                                        </div>
                                    </div>
                                    <p className="mt-2 text-white/40 text-sm line-clamp-1">{event.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 self-end md:self-center">
                                <button 
                                    onClick={() => handleDeleteEvent(event.id)}
                                    className="p-2.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Event Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#0a0f0d]/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="relative w-full max-w-lg glass-brand p-8 rounded-3xl border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <CalendarIcon className="text-green-500" />
                            Create New Event
                        </h2>
                        
                        <form onSubmit={handleAddEvent} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1">Event Title</label>
                                <div className="relative">
                                    <FileText size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                    <input 
                                        type="text" 
                                        required
                                        value={newEvent.title}
                                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-green-500/50 focus:outline-none transition-all"
                                        placeholder="e.g., Weekly Market Outlook"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1">Date</label>
                                    <input 
                                        type="date" 
                                        required
                                        value={newEvent.date}
                                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-green-500/50 focus:outline-none transition-all text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1">Time</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={newEvent.time}
                                        onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-green-500/50 focus:outline-none transition-all"
                                        placeholder="e.g., 10:00 AM EST"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1">Event Type</label>
                                    <select 
                                        value={newEvent.type}
                                        onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                                        className="w-full bg-[#1a2220] border border-white/10 rounded-xl py-3 px-4 focus:border-green-500/50 focus:outline-none transition-all text-white"
                                    >
                                        <option value="Webinar">Webinar</option>
                                        <option value="Live Stream">Live Stream</option>
                                        <option value="Networking">Networking</option>
                                        <option value="Workshop">Workshop</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1">Impact Level</label>
                                    <select 
                                        value={newEvent.impact}
                                        onChange={(e) => setNewEvent({...newEvent, impact: e.target.value})}
                                        className="w-full bg-[#1a2220] border border-white/10 rounded-xl py-3 px-4 focus:border-green-500/50 focus:outline-none transition-all text-white"
                                    >
                                        <option value="low">Low Impact</option>
                                        <option value="medium">Medium Impact</option>
                                        <option value="high">High Impact</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1">Description</label>
                                <textarea 
                                    rows={3}
                                    value={newEvent.description}
                                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-green-500/50 focus:outline-none transition-all"
                                    placeholder="Describe the event..."
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                                >
                                    Create Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
