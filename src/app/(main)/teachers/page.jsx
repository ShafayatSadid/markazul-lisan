// app/teachers/page.js
import { getAllTeachers } from "@/lib/api/teachers";
import TeachersGrid from "@/components/teachers/TeachersGrid";

export const metadata = {
  title: "শিক্ষকবৃন্দ | মারকাজুল লিসান",
  description: "দেশ-বিদেশের অভিজ্ঞ ও নিবেদিত শিক্ষকবৃন্দ",
};

export default async function TeachersPage() {
  const teachers = await getAllTeachers();

  return (
    <main>
      <TeachersGrid teachers={teachers} />
    </main>
  );
}