"use client";

import { usePathname } from "next/navigation";

export function MainWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    const isLearn = pathname?.startsWith("/learn");

    return (
        <main className={`min-h-screen relative ${(isAdmin || isLearn) ? "" : "pt-16"}`}>
            {children}
        </main>
    );
}


