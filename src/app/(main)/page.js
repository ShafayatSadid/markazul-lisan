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
import FAQ from "@/components/home/FAQ";
import FeaturedBlogs from "@/components/home/FeaturedBlogs";
import { getAllBlogs } from "@/lib/api/blogs";

export default async function Home() {
  const [courses, teachers, contents, results, blogs] = await Promise.all([
    getFeaturedCourses(),
    getFeaturedTeachers(),
    getAllContent(),
    getAllResults(),
    getAllBlogs(),
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
      <FAQ />
      <FeaturedBlogs blogs={blogs.slice(0, 6)} />
    </main>
  );
}