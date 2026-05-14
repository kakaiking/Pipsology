"use client";
import { FileText, ShieldAlert, Scale, UserCheck, MessageSquare, AlertTriangle, Mail } from "lucide-react";
import LegalAccordion from "@/components/LegalAccordion";

export default function TermsOfService() {
    const lastUpdated = "April 24, 2026";

    const sections = [
        {
            icon: Scale,
            title: "1. Acceptance of Terms",
            content: `By accessing or using Tradey Markets, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.`,
        },
        {
            icon: UserCheck,
            title: "2. Use License",
            content: `Permission is granted to temporarily download one copy of the materials (information or software) on Tradey Markets's website for personal, non-commercial transitory viewing only.
            
            This is the grant of a license, not a transfer of title, and under this license you may not:
            • Modify or copy the materials;
            • Use the materials for any commercial purpose;
            • Attempt to decompile or reverse engineer any software;
            • Remove any copyright or other proprietary notations from the materials.`,
        },
        {
            icon: ShieldAlert,
            title: "3. Disclaimer",
            content: `The materials on Tradey Markets's website are provided on an 'as is' basis. Tradey Markets makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            
            Further, Tradey Markets does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials.`,
        },
        {
            icon: MessageSquare,
            title: "4. User Conduct",
            content: `Users are expected to conduct themselves professionally within our community. Harassment, hate speech, or sharing of misleading financial advice is strictly prohibited and can result in immediate account termination.`,
        },
        {
            icon: AlertTriangle,
            title: "5. Risk Warning",
            content: `Trading Forex and Cryptocurrencies involves significant risk and can result in the loss of your invested capital. You should not invest more than you can afford to lose. The information provided by Tradey Markets is for educational purposes only and does not constitute financial advice.`,
        },
    ];

    return (
        <div className="bg-[#0a0f0d] text-[#e8f5ef] min-height-screen">
            {/* ─── HERO SECTION ─── */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-grid">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-500/10 blur-[120px] rounded-full -mr-96 -mt-96 animate-pulse-green pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[100px] rounded-full -ml-72 -mb-72 pointer-events-none" />

                <div className="container-centered relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full badge-green text-xs font-semibold uppercase tracking-wider mb-6 text-emerald-400">
                        Legal Framework
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] mb-8 text-gradient">
                        Terms of Service
                    </h1>
                    <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
                        Please read these terms carefully before using our platform. They outline your rights and responsibilities as a member of the Tradey Markets community.
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
                        <FileText className="mx-auto text-green-500 mb-8" size={64} />
                        <h2 className="text-4xl font-bold font-display mb-8">Need clarification?</h2>
                        <p className="text-xl text-white/70 mb-12">
                            If you have any questions about these Terms of Service, please don&apos;t hesitate to contact us.
                        </p>
                        <a 
                            href="mailto:legal@Tradey Markets.com" 
                            className="inline-block px-10 py-4 rounded-full bg-green-500 text-black font-bold hover:scale-105 transition-transform"
                        >
                            Contact Legal Team
                        </a>
                    </div>
                </div>
            </section>

            {/* ─── FOOTER SOCIALS ─── */}
            <section className="py-20 border-t border-white/5 bg-white/2">
                <div className="container-centered text-center text-white/30 text-sm">
                    <p className="mb-4">
                        By using Tradey Markets, you acknowledge that you have read and understood these terms.
                    </p>
                    <div>
                        &copy; 2026 Tradey Markets Education. All rights reserved.
                    </div>
                </div>
            </section>
        </div>
    );
}


