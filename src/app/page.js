// app/page.js
import HeroCarousel from "@/components/home/HeroCarousel";
import StatsBar from "@/components/home/StatsBar";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedTeachers from "@/components/home/FeaturedTeachers";
import DailyContentCarousel from "@/components/home/DailyContentCarousel";

import { getFeaturedCourses } from "@/lib/api/courses";
import { getFeaturedTeachers } from "@/lib/api/teachers";
import { getAllContent } from "@/lib/api/dailyContent";

export default async function Home() {
  const [courses, teachers, contents] = await Promise.all([
    getFeaturedCourses(),
    getFeaturedTeachers(),
    getAllContent(),
  ]);

  return (
    <main>
      <HeroCarousel />
      <StatsBar />
      <FeaturedCourses courses={courses.slice(0, 3)} />
      <WhyChooseUs />
      <FeaturedTeachers teachers={teachers.slice(0, 3)} />
      <DailyContentCarousel contents={contents} />
    </main>
  );
}