// app/courses/page.js
import { getAllCourses } from "@/lib/api/courses";
import CoursesGrid from "@/components/courses/CoursesGrid";

export const metadata = {
  title: "কোর্সসমূহ | মারকাজুল লিসান",
  description: "অভিজ্ঞ শিক্ষকদের সাথে ঘরে বসে ইসলামিক শিক্ষা",
};

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <main>
      <CoursesGrid courses={courses} />
    </main>
  );
}