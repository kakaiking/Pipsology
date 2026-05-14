"use client";

import React, { useState } from "react";
import { courseGrades } from "@/lib/data";
import LevelDetailPanel from "@/components/LevelDetailPanel";

export default function LevelStories() {
  const [active, setActive] = useState<string>(courseGrades[0]?.id || "");

  return (
    <section className="mb-10">

      <div className="flex flex-col lg:flex-row lg:gap-12 gap-6 items-start">
        {/* Bubbles - horizontal on small, vertical left column on large */}
        <div className="flex-shrink-0 w-full lg:w-72">
          <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:gap-3">
            {courseGrades.map((g) => (
              <button
                key={g.id}
                onClick={() => setActive(g.id)}
                aria-current={active === g.id}
                className={`flex-shrink-0 flex flex-row items-center gap-3 text-left ${active === g.id ? "scale-105" : "opacity-80 hover:opacity-100 transition-opacity"}`}
              >
                <div className={`w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${g.progress === 100 ? "bg-green-500/20 text-green-400" : "bg-white/5 text-white/60"}`}>
                  {g.title.slice(0, 2).toUpperCase()}
                </div>
                <div className="text-sm font-medium text-white/80 whitespace-nowrap">{g.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right panel: render the selected grade's lessons (inline) */}
        <div className="flex-1 min-w-0">
          <LevelDetailPanel gradeId={active} />
        </div>
      </div>
    </section>
  );
}


