// app/blog/page.js
import { getAllBlogs } from "@/lib/api/blogs";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata = {
  title: "ব্লগ | মারকাজুল লিসান",
  description: "ইসলামিক জ্ঞান ও শিক্ষামূলক লেখা",
};

export default async function BlogPage() {
  const blogs = await getAllBlogs();

  return (
    <main>
      <BlogGrid blogs={blogs} />
    </main>
  );
}