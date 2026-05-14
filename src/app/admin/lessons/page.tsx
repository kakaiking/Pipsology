"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, BookOpen, Search, Filter, ChevronRight, Edit2, Trash2 } from "lucide-react";
import { courseGrades, curricula } from "@/lib/data";

export default function AdminLessonsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleEditClick = (lesson: any, gradeId: string) => {
    router.push(`/admin/lessons/${gradeId}/${lesson.slug}`);
  };

  const handleDeleteLesson = (lesson: any) => {
    if (confirm(`Are you sure you want to delete "${lesson.title}"?`)) {
      console.log("Deleting lesson:", lesson);
      alert(`Lesson "${lesson.title}" deleted.`);
    }
  };

  const handleCreateClick = () => {
    router.push("/admin/lessons/new");
  };

  const filteredGrades = courseGrades.map(grade => ({
    ...grade,
    actualLessons: curricula[grade.id] || []
  })).filter(grade => 
    grade.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grade.actualLessons.some((l: any) => l.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
            Lesson Management
          </h1>
          <p className="text-white/50">Create, edit, and organize curriculum lessons.</p>
        </div>
        <button 
          onClick={handleCreateClick}
          className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] active:scale-95"
        >
          <Plus size={20} />
          Create New Lesson
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input 
            type="text" 
            placeholder="Search lessons by title or grade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Grade Sections */}
      <div className="space-y-6">
        {filteredGrades.map((grade) => (
          <div key={grade.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-4 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center font-bold text-xs border border-green-500/30">
                  {grade.title.slice(0, 2).toUpperCase()}
                </div>
                <h3 className="font-bold text-white">{grade.title} <span className="text-white/30 font-normal ml-2">({grade.actualLessons.length} Lessons)</span></h3>
              </div>
              <ChevronRight size={18} className="text-white/20" />
            </div>
            <div className="p-2 divide-y divide-white/5">
              {grade.actualLessons.map((lesson: any, index: number) => (
                <div key={lesson.id} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors group">
                  <div className="flex items-center gap-4">
                    <span className="text-white/20 font-mono text-sm">{String(index + 1).padStart(2, '0')}</span>
                    <p className="font-medium group-hover:text-green-400 transition-colors">{lesson.title}</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEditClick(lesson, grade.id)}
                      className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteLesson(lesson)}
                      className="p-2 hover:bg-red-500/20 rounded-lg text-white/50 hover:text-red-400 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {grade.actualLessons.length === 0 && (
                <div className="p-8 text-center text-white/30">
                  No lessons found in this grade.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



