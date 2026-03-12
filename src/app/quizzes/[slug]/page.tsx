import Link from "next/link";
import { ChevronLeft, BarChart2 } from "lucide-react";
import { quizList } from "@/lib/data";
import { QuizWidget } from "@/components/QuizWidget";

export function generateStaticParams() {
    return quizList.map((quiz) => ({
        slug: quiz.slug,
    }));
}

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const quiz = quizList.find(q => q.slug === slug);

    if (!quiz || quiz.questions.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <h1 className="text-2xl font-bold mb-4">Quiz coming soon!</h1>
                <Link href="/quizzes" className="text-green-400 hover:underline">Back to quizzes</Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/quizzes" className="p-2 glass rounded-lg text-white/50 hover:text-white transition-all">
                    <ChevronLeft size={20} />
                </Link>
                <div>
                    <div className="flex items-center gap-2 text-blue-400 text-xs font-medium mb-1">
                        <BarChart2 size={12} />
                        <span>Knowledge Check</span>
                    </div>
                    <h1 className="text-3xl font-bold font-display">{quiz.title}</h1>
                </div>
            </div>

            <div className="max-w-2xl mx-auto">
                <QuizWidget quiz={quiz} />
            </div>
        </div>
    );
}
