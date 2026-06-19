"use client";

import React, { useState } from "react";
import { LearnSidebar } from "@/components/layout/LearnSidebar";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex bg-[#0a0f0d] h-screen overflow-hidden">
            <LearnSidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />

            <main className={`flex-1 transition-all duration-300 overflow-hidden relative ${isCollapsed ? "pl-16" : "pl-72"}`}>
                <div className="pt-[40px] px-4 md:px-8 w-full max-w-[1600px]">
                    {children}
                </div>
            </main>
        </div>
    );
}

