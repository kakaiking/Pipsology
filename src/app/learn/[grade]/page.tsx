import { courseGrades } from "@/lib/data";
import LevelDetailPanel from "@/components/LevelDetailPanel";

export function generateStaticParams() {
    return courseGrades.map((grade) => ({
        grade: grade.id,
    }));
}

export default async function GradePage({ params }: { params: Promise<{ grade: string }> }) {
    const { grade } = await params;

    return (
        <div className="pb-6">
            <LevelDetailPanel gradeId={grade} />
        </div>
    );
}
