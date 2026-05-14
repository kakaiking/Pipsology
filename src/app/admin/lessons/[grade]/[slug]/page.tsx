import { courseGrades, curricula } from "@/lib/data";
import EditLessonForm from "./EditLessonForm";

export function generateStaticParams() {
  const params: any[] = [];
  
  courseGrades.forEach(grade => {
    const lessons = curricula[grade.id] || [];
    lessons.forEach((lesson: any) => {
      params.push({
        grade: grade.id,
        slug: lesson.slug
      });
    });
  });

  return params;
}

export default function Page() {
  return <EditLessonForm />;
}
