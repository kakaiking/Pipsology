'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { courseGrades, preschoolLessons } from '@/lib/data';

// ── Types ─────────────────────────────────────────────────────────────────────
type NodeState = 'completed' | 'active' | 'available' | 'locked';

// ── Map layout (900 × 480 viewBox) ────────────────────────────────────────────
// Preschool starts top-left, path winds down to Graduation at bottom-left
const NODES = [
    { x: 148, y: 62 }, // Preschool
    { x: 362, y: 132 }, // Kindergarten
    { x: 618, y: 160 }, // Elementary
];

// Full trail (top-left → bottom-left, reversed from before)
const TRAIL = 'M 148,62 C 180,84 258,124 362,132 C 448,138 498,160 618,160';

// Green completed trail: Preschool → Kindergarten → (into) Elementary
const TRAIL_DONE = 'M 148,62 C 180,84 258,124 362,132 C 448,138 498,160 618,160';

// Label above/below each node: top nodes (small y) → label BELOW; bottom nodes → label ABOVE
const LABEL_ABOVE = [false, false, false];
const R = 34; // node radius

// ── Decorative candlestick data ───────────────────────────────────────────────
interface Candle { bull: boolean; h: number; wt: number; wb: number }
interface CandleGroup { cx: number; cy: number; s: number; candles: Candle[] }

const CANDLES: CandleGroup[] = [
    { cx: 235, cy: 310, s: 0.8, candles: [{ bull: false, h: 28, wt: 8, wb: 6 }, { bull: true, h: 38, wt: 10, wb: 5 }, { bull: true, h: 22, wt: 6, wb: 8 }, { bull: false, h: 18, wt: 4, wb: 12 }, { bull: true, h: 32, wt: 12, wb: 4 }] },
    { cx: 718, cy: 378, s: 0.7, candles: [{ bull: true, h: 22, wt: 6, wb: 4 }, { bull: true, h: 34, wt: 10, wb: 6 }, { bull: false, h: 26, wt: 8, wb: 8 }, { bull: true, h: 18, wt: 4, wb: 10 }] },
    { cx: 488, cy: 90, s: 0.65, candles: [{ bull: true, h: 20, wt: 5, wb: 4 }, { bull: false, h: 30, wt: 8, wb: 6 }, { bull: true, h: 25, wt: 7, wb: 5 }] },
    { cx: 820, cy: 422, s: 0.6, candles: [{ bull: false, h: 16, wt: 5, wb: 4 }, { bull: true, h: 28, wt: 8, wb: 6 }, { bull: true, h: 20, wt: 6, wb: 8 }] },
    { cx: 46, cy: 232, s: 0.6, candles: [{ bull: true, h: 24, wt: 6, wb: 5 }, { bull: false, h: 18, wt: 4, wb: 8 }, { bull: true, h: 30, wt: 9, wb: 4 }] },
];

function CandleChart({ cx, cy, s, candles }: CandleGroup) {
    const W = 8 * s;
    const GAP = 4 * s;
    const total = candles.length * (W + GAP) - GAP;
    const sx = cx - total / 2;
    return (
        <g opacity="0.3">
            {candles.map((c, i) => {
                const x = sx + i * (W + GAP);
                const bH = c.h * s;
                const wT = c.wt * s;
                const wB = c.wb * s;
                const top = cy - bH / 2;
                const mx = x + W / 2;
                const col = c.bull ? '#22c55e' : '#ef4444';
                return (
                    <g key={i}>
                        <line x1={mx} y1={top - wT} x2={mx} y2={top} stroke={col} strokeWidth={1.5 * s} />
                        <rect x={x} y={top} width={W} height={bH} fill={col} rx={1.5 * s} />
                        <line x1={mx} y1={top + bH} x2={mx} y2={top + bH + wB} stroke={col} strokeWidth={1.5 * s} />
                    </g>
                );
            })}
        </g>
    );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getState(g: typeof courseGrades[0], i: number): NodeState {
    if (g.progress === 100) return 'completed';
    if (g.progress > 0) return 'active';
    if (i === 0 || courseGrades[i - 1].progress === 100) return 'available';
    return 'locked';
}

function getHref(g: typeof courseGrades[0]): string {
    if (g.id === 'preschool') {
        const next = preschoolLessons.find(l => !l.done) ?? preschoolLessons[preschoolLessons.length - 1];
        return `/learn/preschool/${next.slug}`;
    }
    return `/learn/${g.id}`;
}

const ICONS = ['📗', '📘', '📙'];
const LABELS = ['Beginner', 'Novice', 'Intermediate'];

// ── Main Component ────────────────────────────────────────────────────────────
export default function CurriculumMap() {
    const router = useRouter();
    const [tooltip, setTooltip] = useState<string | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);

    function handleClick(g: typeof courseGrades[0], i: number) {
        const state = getState(g, i);
        if (state === 'locked') {
            setTooltip(`Complete ${LABELS[i - 1]} first to unlock this grade`);
            setTimeout(() => setTooltip(null), 2800);
            return;
        }
        router.push(getHref(g));
    }

    return (
        <section id="curriculum" className="relative py-12 px-4 overflow-hidden">
            <style>{`
                @keyframes pulse-ring {
                    0%   { r: 46; opacity: 0.55; }
                    100% { r: 64; opacity: 0; }
                }
                @keyframes trail-draw {
                    from { stroke-dashoffset: 1200; }
                    to   { stroke-dashoffset: 0; }
                }
                @keyframes node-glow {
                    0%,100% { filter: drop-shadow(0 0 6px #f59e0b88); }
                    50%     { filter: drop-shadow(0 0 18px #f59e0b); }
                }
                @keyframes float {
                    0%,100% { transform: translateY(0); }
                    50%     { transform: translateY(-5px); }
                }
                .pulse-ring  { animation: pulse-ring 1.9s ease-out infinite; }
                .active-node { animation: node-glow 2.2s ease-in-out infinite; }
                .trail-done  { stroke-dasharray: 1200; animation: trail-draw 1.8s ease-out forwards; }
                .trail-rem   { stroke-dasharray: 9 7; }
                .float-el    { animation: float 3.2s ease-in-out infinite; }
            `}</style>

            {/* Header */}
            <div className="text-center mb-8">

                <h2 className="text-2xl md:text-3xl font-bold font-display text-white">Your Learning Journey</h2>
                <p className="text-white/40 text-sm mt-1">Complete each grade to unlock the next level</p>
            </div>

            {/* Map */}
            <div className="relative max-w-5xl mx-auto">
                {tooltip && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap px-4 py-2 bg-red-500/15 border border-red-500/30 text-red-400 text-sm rounded-full backdrop-blur-sm">
                        🔒 {tooltip}
                    </div>
                )}

                <svg viewBox="0 0 900 480" className="w-full h-auto" style={{ maxHeight: 520 }}>
                    <defs>
                        <filter id="glow-g" x="-60%" y="-60%" width="220%" height="220%">
                            <feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                        <filter id="glow-a" x="-60%" y="-60%" width="220%" height="220%">
                            <feGaussianBlur stdDeviation="7" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                        <linearGradient id="g-done" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                        <linearGradient id="g-active" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#d97706" />
                        </linearGradient>
                        <linearGradient id="g-locked" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#1f2937" /><stop offset="100%" stopColor="#111827" />
                        </linearGradient>
                        <linearGradient id="g-grad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#6d28d9" />
                        </linearGradient>
                    </defs>

                    {/* Background grid */}
                    <g opacity="0.035" stroke="#22c55e" strokeWidth="0.5">
                        {[0, 1, 2, 3, 4, 5].map(i => <line key={`h${i}`} x1="0" y1={i * 96} x2="900" y2={i * 96} />)}
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => <line key={`v${i}`} x1={i * 112} y1="0" x2={i * 112} y2="480" />)}
                    </g>

                    {/* Soft background trend */}
                    <path d="M 0,460 Q 450,290 900,90" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.05" strokeDasharray="5 10" />

                    {/* Candlestick decorations */}
                    {CANDLES.map((g, i) => <CandleChart key={i} {...g} />)}

                    {/* Floating coin accents */}
                    {[{ x: 52, y: 350 }, { x: 856, y: 118 }, { x: 432, y: 232 }].map((c, i) => (
                        <g key={i} opacity="0.18" className="float-el" style={{ animationDelay: `${i * 0.9}s` }}>
                            <circle cx={c.x} cy={c.y} r="11" fill="#f59e0b" />
                            <text x={c.x} y={c.y + 5} textAnchor="middle" fontSize="11" fill="#000" fontWeight="bold">$</text>
                        </g>
                    ))}

                    {/* Trail — grey remaining */}
                    <path d={TRAIL} fill="none" stroke="#0f1f14" strokeWidth="12" strokeLinecap="round" />
                    <path d={TRAIL} fill="none" stroke="#1f3124" strokeWidth="8" strokeLinecap="round" className="trail-rem" />

                    {/* Trail — green completed (animated) */}
                    <path d={TRAIL_DONE} fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round" className="trail-done" opacity="0.9" />

                    {/* Trail dots on completed section (top-left → elementary) */}
                    {[{ x: 220, y: 88 }, { x: 290, y: 114 }, { x: 450, y: 144 }, { x: 535, y: 157 }, { x: 578, y: 160 }].map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#10b981" opacity="0.55" />
                    ))}

                    {/* Grade Nodes */}
                    {courseGrades.map((grade, idx) => {
                        const nd = NODES[idx];
                        const state = getState(grade, idx);
                        const above = LABEL_ABOVE[idx];
                        const isHov = hovered === grade.id;
                        const isLast = idx === 2;

                        // ── visual config per state
                        const fill = state === 'completed' ? 'url(#g-done)'
                            : state === 'active' ? 'url(#g-active)'
                                : isLast && state !== 'locked' ? 'url(#g-grad)'
                                    : 'url(#g-locked)';
                        const stroke = state === 'completed' ? '#34d399'
                            : state === 'active' ? '#fbbf24'
                                : '#374151';
                        const filt = state === 'completed' ? 'url(#glow-g)'
                            : state === 'active' ? 'url(#glow-a)'
                                : undefined;

                        // label/star positions
                        const starOff = above ? nd.y - R - 18 : nd.y + R + 18;
                        const labelOff = above ? nd.y - R - 38 : nd.y + R + 36;
                        const pillOff = above ? nd.y - R - 56 : nd.y + R + 52;

                        // progress arc
                        const arc = 2 * Math.PI * (R - 6);
                        const dash = `${((grade.progress / 100) * arc).toFixed(1)} ${arc.toFixed(1)}`;

                        return (
                            <g
                                key={grade.id}
                                onClick={() => handleClick(grade, idx)}
                                onMouseEnter={() => setHovered(grade.id)}
                                onMouseLeave={() => setHovered(null)}
                                style={{ cursor: state === 'locked' ? 'not-allowed' : 'pointer' }}
                                transform={isHov && state !== 'locked' ? `translate(${nd.x},${nd.y}) scale(1.08) translate(${-nd.x},${-nd.y})` : undefined}
                            >
                                {/* Pulse ring (active) */}
                                {state === 'active' && (
                                    <circle cx={nd.x} cy={nd.y} r={R + 10} fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.45" className="pulse-ring" />
                                )}
                                {/* Static ring (completed) */}
                                {state === 'completed' && (
                                    <circle cx={nd.x} cy={nd.y} r={R + 8} fill="none" stroke="#10b981" strokeWidth="1" opacity="0.25" />
                                )}

                                {/* Drop shadow */}
                                <circle cx={nd.x + 3} cy={nd.y + 4} r={R} fill="rgba(0,0,0,0.45)" />

                                {/* Main circle */}
                                <circle cx={nd.x} cy={nd.y} r={R} fill={fill} stroke={stroke} strokeWidth="2.5"
                                    filter={filt}
                                    opacity={state === 'locked' ? 0.45 : 1}
                                    className={state === 'active' ? 'active-node' : undefined}
                                />

                                {/* Progress arc */}
                                {state === 'active' && (
                                    <circle cx={nd.x} cy={nd.y} r={R - 6} fill="none" stroke="rgba(255,255,255,0.25)"
                                        strokeWidth="4" strokeDasharray={dash} strokeLinecap="round"
                                        transform={`rotate(-90 ${nd.x} ${nd.y})`}
                                    />
                                )}

                                {/* Icon / symbol */}
                                <text x={nd.x} y={nd.y + 9} textAnchor="middle" fontSize={state === 'locked' ? '20' : '22'}>
                                    {state === 'locked' ? '🔒' : state === 'completed' ? '✅' : ICONS[idx]}
                                </text>

                                {/* Stars (completed) / progress % (active) */}
                                {state === 'completed' && (
                                    <text x={nd.x} y={starOff + 4} textAnchor="middle" fontSize="11">⭐⭐⭐</text>
                                )}
                                {state === 'active' && (
                                    <text x={nd.x} y={starOff + 4} textAnchor="middle" fontSize="10" fill="#fbbf24" fontWeight="700">
                                        {grade.progress}%
                                    </text>
                                )}

                                {/* Grade label */}
                                <text x={nd.x} y={labelOff + 4} textAnchor="middle" fontSize="11"
                                    fill={state === 'locked' ? '#4b5563' : state === 'completed' ? '#d1fae5' : '#fef3c7'}
                                    fontWeight="700" fontFamily="system-ui,sans-serif">
                                    {LABELS[idx]}
                                </text>

                                {/* "Continue" pill for active */}
                                {state === 'active' && (
                                    <g>
                                        <rect x={nd.x - 40} y={pillOff - 2} width="80" height="18" rx="9" fill="#f59e0b" opacity="0.92" />
                                        <text x={nd.x} y={pillOff + 10} textAnchor="middle" fontSize="9" fill="#000" fontWeight="800">
                                            CONTINUE →
                                        </text>
                                    </g>
                                )}

                                {/* Number badge */}
                                <circle cx={nd.x + R - 6} cy={nd.y - R + 6} r="12" fill="#0a0f0d"
                                    stroke={state === 'locked' ? '#374151' : stroke} strokeWidth="1.5" />
                                <text x={nd.x + R - 6} y={nd.y - R + 10} textAnchor="middle" fontSize="9"
                                    fill={state === 'locked' ? '#4b5563' : stroke} fontWeight="800">
                                    {idx + 1}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-3 text-xs text-white/35">
                <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Completed
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> In Progress
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-600 inline-block" /> Locked
                </span>
            </div>
        </section>
    );
}


