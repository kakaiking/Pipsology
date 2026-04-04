"use client";

import React, { useState } from "react";
import { LearnSidebar } from "@/components/layout/LearnSidebar";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex bg-[#0a0f0d]">
            <LearnSidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />

            <main className={`flex-1 transition-all duration-300 min-h-screen ${isCollapsed ? "pl-16" : "pl-72"}`}>
                <div className="pb-12 px-4 md:px-8 w-full max-w-[1600px]">
                    {children}
                </div>
            </main>
        </div>
    );
}
