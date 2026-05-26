import LevelDetailPanel from "@/components/LevelDetailPanel";

export default async function GradePage({ params }: { params: Promise<{ grade: string }> }) {
    const { grade } = await params;

    return (
        <div className="pb-6">
            <LevelDetailPanel gradeId={grade} />
        </div>
    );
}
