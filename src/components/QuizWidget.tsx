"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle, XCircle, RotateCcw, ArrowRight } from "lucide-react";

interface Question {
    q: string;
    options: string[];
    answer: number;
    explanation: string;
}

interface Quiz {
    slug: string;
    title: string;
    questions: Question[];
}

export function QuizWidget({ quiz }: { quiz: Quiz }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);

    const q = quiz.questions[current];

    const handleSelect = (i: number) => {
        if (answered) return;
        setSelected(i);
        setAnswered(true);
        if (i === q.answer) setScore(s => s + 1);
    };

    const next = () => {
        if (current < quiz.questions.length - 1) {
            setCurrent(c => c + 1);
            setSelected(null);
            setAnswered(false);
        } else {
            setDone(true);
        }
    };

    const reset = () => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setDone(false); };

    if (done) {
        const pct = Math.round((score / quiz.questions.length) * 100);
        return (
            <div className="glass rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">{pct >= 75 ? "🎉" : pct >= 50 ? "👍" : "📚"}</div>
                <h3 className="text-2xl font-bold font-display mb-2">Quiz Complete!</h3>
                <div className="text-5xl font-bold text-gradient my-4">{pct}%</div>
                <p className="text-white/50 mb-6">{score} of {quiz.questions.length} correct</p>
                <div className="flex items-center justify-center gap-3">
                    <button onClick={reset} className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-sm font-medium text-white/70 hover:text-white transition-all">
                        <RotateCcw size={15} />
                        Try Again
                    </button>
                    <Link href="/learn" className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-black rounded-xl text-sm font-semibold">
                        Continue Learning <ArrowRight size={15} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="glass rounded-2xl overflow-hidden">
            {/* Progress */}
            <div className="px-6 pt-5 pb-3">
                <div className="flex justify-between text-xs text-white/40 mb-2">
                    <span>Question {current + 1} of {quiz.questions.length}</span>
                    <span>{score} correct so far</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${((current) / quiz.questions.length) * 100}%` }} /></div>
            </div>

            <div className="px-6 pb-6">
                <h3 className="text-lg font-semibold text-white mb-5 mt-2">{q.q}</h3>
                <div className="space-y-3 mb-5">
                    {q.options.map((opt, i) => {
                        let cls = "glass border border-white/5 hover:border-white/20 text-white/75 cursor-pointer hover:bg-white/5";
                        if (answered) {
                            if (i === q.answer) cls = "bg-green-500/15 border border-green-500/40 text-green-400";
                            else if (i === selected) cls = "bg-red-500/15 border border-red-500/40 text-red-400";
                            else cls = "glass border border-white/5 text-white/30 cursor-default";
                        }
                        return (
                            <button key={i} onClick={() => handleSelect(i)} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-left text-sm ${cls}`}>
                                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
                                    {answered && i === q.answer ? <CheckCircle size={14} /> : answered && i === selected && i !== q.answer ? <XCircle size={14} /> : String.fromCharCode(65 + i)}
                                </span>
                                {opt}
                            </button>
                        );
                    })}
                </div>
                {answered && (
                    <div className="glass-brand rounded-xl p-4 mb-4 text-sm text-white/70">
                        💡 <strong className="text-green-400">Explanation:</strong> {q.explanation}
                    </div>
                )}
                {answered && (
                    <button onClick={next} className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold text-sm hover:shadow-lg transition-all">
                        {current < quiz.questions.length - 1 ? "Next Question →" : "See Results →"}
                    </button>
                )}
            </div>
        </div>
    );
}
