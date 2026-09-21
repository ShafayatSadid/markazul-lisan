// app/students/page.js
import { getAllStudents } from "@/lib/api/students";
import StudentsGrid from "@/components/students/StudentsGrid";

export const metadata = {
  title: "শিক্ষার্থীবৃন্দ | মারকাজুল লিসান",
  description: "যারা আমাদের সাথে শিখছেন",
};

export default async function StudentsPage() {
  const students = await getAllStudents();

  return (
    <main>
      <StudentsGrid students={students} />
    </main>
  );
}