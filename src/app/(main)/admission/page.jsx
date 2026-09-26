// app/admission/page.js
import { getAllCourses } from "@/lib/api/courses";
import AdmissionContent from "@/components/admission/AdmissionContent";

export const metadata = {
  title: "ভর্তি হন | মারকাজুল লিসান",
  description: "নিচের ফর্ম পূরণ করুন, আমরা আপনার সাথে যোগাযোগ করব",
};

export default async function AdmissionPage() {
  const courses = await getAllCourses();

  return (
    <main>
      <AdmissionContent courses={courses} />
    </main>
  );
}