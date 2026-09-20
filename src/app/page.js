// app/page.js
import HeroCarousel from "@/components/home/HeroCarousel";
import StatsBar from "@/components/home/StatsBar";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedTeachers from "@/components/home/FeaturedTeachers";
import DailyContentCarousel from "@/components/home/DailyContentCarousel";
import Testimonials from "@/components/home/Testimonials";

import { getFeaturedCourses } from "@/lib/api/courses";
import { getFeaturedTeachers } from "@/lib/api/teachers";
import { getAllContent } from "@/lib/api/dailyContent";
import { getAllResults } from "@/lib/api/results";

export default async function Home() {
  const [courses, teachers, contents, results] = await Promise.all([
    getFeaturedCourses(),
    getFeaturedTeachers(),
    getAllContent(),
    getAllResults(),
  ]);

  return (
    <main>
      <HeroCarousel />
      <StatsBar />
      <FeaturedCourses courses={courses.slice(0, 3)} />
      <WhyChooseUs />
      <FeaturedTeachers teachers={teachers.slice(0, 3)} />
      <DailyContentCarousel contents={contents} />
      <Testimonials results={results} />
    </main>
  );
}