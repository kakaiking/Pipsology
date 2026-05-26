"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Loader2 } from "lucide-react";

interface Props {
    gradeId: string;
    lessonSlug: string;
}

export default function MarkCompleteButton({ gradeId, lessonSlug }: Props) {
    const router = useRouter();
    const [isCompleted, setIsCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        async function checkCompletion() {
            try {
                const res = await fetch("/api/user/progress");
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.completedLessons) {
                        setIsCompleted(data.completedLessons.includes(lessonSlug));
                    }
                }
            } catch (err) {
                console.error("Failed to check lesson completion:", err);
            } finally {
                setLoading(false);
            }
        }
        checkCompletion();
    }, [lessonSlug]);

    async function handleComplete() {
        if (submitting || isCompleted) return;
        setSubmitting(true);
        try {
            const res = await fetch("/api/user/progress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ gradeId, lessonSlug }),
            });
            if (res.ok) {
                setIsCompleted(true);
                // Trigger Next.js router refresh to update all components on the page
                router.refresh();
            } else {
                const data = await res.json();
                console.error("Error marking complete:", data.message || res.statusText);
            }
        } catch (err) {
            console.error("Failed to mark lesson completed:", err);
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return (
            <button disabled className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-sm font-medium text-white/40 cursor-not-allowed">
                <Loader2 className="animate-spin" size={16} />
                Loading...
            </button>
        );
    }

    if (isCompleted) {
        return (
            <button disabled className="flex items-center gap-2 px-5 py-2.5 bg-green-500/20 text-green-400 rounded-xl text-sm font-semibold border border-green-500/30 cursor-not-allowed">
                <CheckCircle size={16} />
                Lesson Completed
            </button>
        );
    }

    return (
        <button
            onClick={handleComplete}
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-sm font-medium text-green-400 hover:bg-green-500/10 active:scale-95 transition-all border border-green-500/20 cursor-pointer"
        >
            {submitting ? (
                <>
                    <Loader2 className="animate-spin" size={16} />
                    Saving...
                </>
            ) : (
                <>
                    <CheckCircle size={16} />
                    Mark Complete
                </>
            )}
        </button>
    );
}
