import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ConsoleCleaner } from "@/components/ConsoleCleaner";
import { MainWrapper } from "@/components/layout/MainWrapper";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Tradey Markets — New to forex?",
    description: "The ultimate forex & crypto trading education platform. Learn, practice, analyze, and grow with AI-powered tools.",
    keywords: ["forex trading", "learn forex", "trading education", "cryptocurrency", "trading journal"],
    openGraph: {
        title: "Tradey Markets — New to forex?",
        description: "The ultimate forex & crypto trading education platform.",
        type: "website",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`scroll-smooth ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`} data-scroll-behavior="smooth">
            <head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            </head>
            <body className="bg-[#0a0f0d] text-[#e8f5ef] antialiased relative">
                <ConsoleCleaner />
                <Navbar />
                <MainWrapper>{children}</MainWrapper>
                <Footer />
            </body>
        </html>
    );
}


