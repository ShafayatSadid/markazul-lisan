// app/free-trial/page.js
import { getAllCourses } from "@/lib/api/courses";
import FreeTrialContent from "@/components/freeTrial/FreeTrialContent";

export const metadata = {
  title: "ফ্রি ট্রায়াল ক্লাস | মারকাজুল লিসান",
  description: "সম্পূর্ণ বিনামূল্যে প্রথম ক্লাস করে দেখুন",
};

export default async function FreeTrialPage() {
  const courses = await getAllCourses();

  return (
    <main>
      <FreeTrialContent courses={courses} />
    </main>
  );
}