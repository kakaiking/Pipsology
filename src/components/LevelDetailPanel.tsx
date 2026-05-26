"use client";

import Link from "next/link";
import { ChevronRight, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
type Props = { gradeId: string };

export default function LevelDetailPanel({ gradeId }: Props) {
  const [lessons, setLessons] = useState<any[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [progressRes, lessonsRes] = await Promise.all([
          fetch('/api/user/progress'),
          fetch(`/api/lessons?gradeId=${gradeId}`)
        ]);

        if (progressRes.ok) {
          const data = await progressRes.json();
          if (data) {
            setCompletedLessons(data.completedLessons ?? []);
            if (data.progress && data.progress[gradeId] !== undefined) {
              setProgress(data.progress[gradeId]);
            }
          }
        }

        if (lessonsRes.ok) {
          const lessonsData = await lessonsRes.json();
          setLessons(lessonsData.lessons || []);
        }
      } catch (err) {
        console.error("Failed to fetch data in LevelDetailPanel:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [gradeId]);

  return (
    <div className="pb-6">

      {/* Grade Progress Panel */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-white/70">Grade Progress</span>
          <span className="text-sm font-bold text-green-400">
            {loading ? "..." : `${progress}%`}
          </span>
        </div>
        <div className="progress-bar h-2">
          <div 
            className="progress-fill transition-all duration-500" 
            style={{ width: loading ? "0%" : `${progress}%` }} 
          />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white/90">Lessons</h2>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-4 glass rounded-2xl p-4 animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-white/5 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/10 rounded w-2/3" />
                  <div className="h-3 bg-white/5 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : lessons.length === 0 ? (
          <p className="text-sm text-white/50">No lessons published yet.</p>
        ) : (
          lessons.map((lesson: any, i: number) => {
            const isDone = completedLessons.includes(lesson.slug);
            return (
              <Link key={lesson.id} href={`/learn/${gradeId}/${lesson.slug}`} className="flex items-center gap-4 glass rounded-2xl p-4 group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${isDone ? "bg-green-500/20 text-green-400" : "bg-white/5 text-white/40"}`}>
                  {isDone ? <CheckCircle size={18} /> : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white/90 truncate">{lesson.title}</h3>
                    <ChevronRight size={18} className="text-white/20" />
                  </div>
                  <p className="text-xs text-white/40 mt-1">~8 min read</p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
