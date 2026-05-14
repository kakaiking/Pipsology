"use client";
import { Shield, Lock, Eye, FileText, Globe, Bell, Mail, Info } from "lucide-react";
import LegalAccordion from "@/components/LegalAccordion";

export default function PrivacyPolicy() {
    const lastUpdated = "April 24, 2026";

    const sections = [
        {
            icon: Shield,
            title: "1. Information We Collect",
            content: `We collect information to provide better services to all our users. The types of personal information we collect include:
            
            • Personal identifiers (such as name, email address, and account credentials)
            • Trading data (such as journal entries, strategy backtests, and performance metrics)
            • Technical data (such as IP address, browser type, and device information)
            • Usage data (how you interact with our educational content and tools)`,
        },
        {
            icon: Lock,
            title: "2. How We Use Your Information",
            content: `Tradey Markets uses the collected data for various purposes:
            
            • To provide and maintain our Service
            • To notify you about changes to our Service
            • To provide customer support
            • To gather analysis or valuable information so that we can improve our Service
            • To monitor the usage of our Service
            • To detect, prevent and address technical issues`,
        },
        {
            icon: Eye,
            title: "3. Data Sharing and Disclosure",
            content: `We do not sell your personal data. We may share your information only in the following circumstances:
            
            • With service providers to monitor and analyze the use of our Service (e.g., Google Analytics)
            • To comply with legal obligations
            • To protect and defend the rights or property of Tradey Markets
            • With your explicit consent`,
        },
        {
            icon: Globe,
            title: "4. Cookies and Tracking",
            content: `We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
            
            Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.`,
        },
        {
            icon: Bell,
            title: "5. Your Data Rights",
            content: `Depending on your location, you may have the following rights regarding your personal data:
            
            • The right to access, update or delete the information we have on you
            • The right of rectification
            • The right to object
            • The right of restriction
            • The right to data portability
            • The right to withdraw consent`,
        },
        {
            icon: Info,
            title: "6. Security of Data",
            content: `The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. 
            
            While we strive to use commercially acceptable means to protect your Personal Data (including SSL encryption and regular security audits), we cannot guarantee its absolute security.`,
        },
    ];

    return (
        <div className="bg-[#0a0f0d] text-[#e8f5ef] min-height-screen">
            {/* ─── HERO SECTION ─── */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-grid">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-500/10 blur-[120px] rounded-full -mr-96 -mt-96 animate-pulse-green pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[100px] rounded-full -ml-72 -mb-72 pointer-events-none" />

                <div className="container-centered relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full badge-green text-xs font-semibold uppercase tracking-wider mb-6">
                        Legal & Compliance
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] mb-8 text-gradient">
                        Privacy Policy
                    </h1>
                    <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
                        Your trust is our most valuable asset. Learn how we protect your data and respect your privacy at Tradey Markets.
                    </p>
                    <div className="mt-8 text-sm text-white/30 font-medium">
                        Last Updated: {lastUpdated}
                    </div>
                </div>
            </section>

            {/* ─── CONTENT SECTION ─── */}
            <section className="py-20 relative">
                <div className="container-centered">
                    <LegalAccordion sections={sections} />
                </div>
            </section>

            {/* ─── CONTACT SECTION ─── */}
            <section className="py-32 container-centered">
                <div className="relative glass-brand rounded-4xl p-12 md:p-20 overflow-hidden text-center">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]" />
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <Mail className="mx-auto text-green-500 mb-8" size={64} />
                        <h2 className="text-4xl font-bold font-display mb-8">Questions about <br /> your privacy?</h2>
                        <p className="text-xl text-white/70 mb-12">
                            If you have any questions about this Privacy Policy, please reach out to our Data Protection Officer.
                        </p>
                        <a 
                            href="mailto:privacy@Tradey Markets.com" 
                            className="inline-block px-10 py-4 rounded-full bg-green-500 text-black font-bold hover:scale-105 transition-transform"
                        >
                            Contact Privacy Team
                        </a>
                    </div>
                </div>
            </section>

            {/* ─── FOOTER SOCIALS ─── */}
            <section className="py-20 border-t border-white/5 bg-white/2">
                <div className="container-centered text-center text-white/30 text-sm">
                    <p className="mb-4">
                        This policy is effective as of April 24, 2026. <br />
                        We reserve the right to update this policy at any time.
                    </p>
                    <div>
                        &copy; 2026 Tradey Markets Education. All rights reserved.
                    </div>
                </div>
            </section>
        </div>
    );
}


