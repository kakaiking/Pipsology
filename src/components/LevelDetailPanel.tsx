"use client";

import Link from "next/link";
import { ChevronRight, CheckCircle } from "lucide-react";
import { courseGrades, preschoolLessons } from "@/lib/data";

type Props = { gradeId: string };

export default function LevelDetailPanel({ gradeId }: Props) {
  const grade = courseGrades.find(g => g.id === gradeId) || courseGrades[0];

  // For this prototype, only preschool has a detailed list in data
  const lessons = gradeId === "preschool" ? preschoolLessons : Array.from({ length: grade.lessons || 0 }).map((_, i) => ({ id: i + 1, slug: `lesson-${i + 1}`, title: `${grade.title} Lesson ${i + 1}`, done: false }));

  return (
    <div className="pb-6">

      {/* Title removed so progress appears first */}

      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-white/70">Grade Progress</span>
          <span className="text-sm font-bold text-green-400">{grade.progress}%</span>
        </div>
        <div className="progress-bar h-2"><div className="progress-fill" style={{ width: `${grade.progress}%` }} /></div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white/90">Lessons</h2>
        {lessons.length === 0 && <p className="text-sm text-white/50">No lessons published yet.</p>}
        {lessons.map((lesson: any, i: number) => (
          <Link key={lesson.id} href={`/learn/${gradeId}/${lesson.slug}`} className="flex items-center gap-4 glass rounded-2xl p-4 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${lesson.done ? "bg-green-500/20 text-green-400" : "bg-white/5 text-white/40"}`}>
              {lesson.done ? <CheckCircle size={18} /> : i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white/90 truncate">{lesson.title}</h3>
                <ChevronRight size={18} className="text-white/20" />
              </div>
              <p className="text-xs text-white/40 mt-1">~8 min read</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
