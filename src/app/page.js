// app/page.js
import HeroCarousel from "@/components/home/HeroCarousel";
import StatsBar from "@/components/home/StatsBar";
import FeaturedCourses from "@/components/home/FeaturedCourses";

async function getFeaturedCourses() {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/courses?featured=true`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("getFeaturedCourses error:", err.message);
    return [];
  }
}

export default async function Home() {
  const courses = await getFeaturedCourses();

  return (
    <main>
      <HeroCarousel />
      <StatsBar />
      <FeaturedCourses courses={courses.slice(0, 3)} />
    </main>
  );
}