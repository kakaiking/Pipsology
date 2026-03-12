import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
    title: "Pipsology — Master Forex Trading",
    description: "The ultimate forex & crypto trading education platform. Learn, practice, analyze, and grow with AI-powered tools.",
    keywords: ["forex trading", "learn forex", "trading education", "cryptocurrency", "trading journal"],
    openGraph: {
        title: "Pipsology — Master Forex Trading",
        description: "The ultimate forex & crypto trading education platform.",
        type: "website",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
            <body className="bg-[#0a0f0d] text-[#e8f5ef] antialiased">
                <Navbar />
                <main className="min-h-screen">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
