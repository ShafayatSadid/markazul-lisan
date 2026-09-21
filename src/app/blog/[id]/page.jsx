// app/blog/[id]/page.js
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaCalendarAlt, FaBookOpen } from "react-icons/fa";
import { getBlogById } from "@/lib/api/blogs";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    return { title: "ব্লগ পাওয়া যায়নি | মারকাজুল লিসান" };
  }

  return {
    title: `${blog.title} | মারকাজুল লিসান`,
    description: blog.description || "ইসলামিক জ্ঞান ও শিক্ষামূলক লেখা",
  };
}

export default async function BlogDetailsPage({ params }) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  const date = blog.createdAt
    ? new Date(blog.createdAt).toISOString().slice(0, 10)
    : "";
  const initials = blog.authorName?.slice(0, 1).toUpperCase() || "?";

  return (
    <section className="w-full bg-background py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        {/* Back button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-secondary transition mb-8"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          সব ব্লগ
        </Link>

        {/* Cover image */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-secondary/10 flex items-center justify-center border border-border mb-6">
          {blog.image ? (
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          ) : (
            <FaBookOpen className="w-16 h-16 text-secondary/40" />
          )}
        </div>

        {/* Date */}
        {date && (
          <div className="flex items-center gap-2 text-xs text-text-muted mb-4">
            <FaCalendarAlt className="w-3.5 h-3.5 text-secondary" />
            <span>{date}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight mb-6">
          {blog.title}
        </h1>

        {/* Author */}
        {blog.authorName && (
          <div className="flex items-center gap-3 pb-6 mb-8 border-b border-border">
            <div className="w-11 h-11 rounded-full bg-secondary/15 flex items-center justify-center flex-shrink-0">
              <span className="text-secondary text-sm font-bold">
                {initials}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground truncate">
                {blog.authorName}
              </p>
              {blog.authorRole && (
                <p className="text-xs text-secondary truncate">
                  {blog.authorRole}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        {blog.content && (
          <div className="text-base md:text-lg text-text-muted leading-relaxed whitespace-pre-line">
            {blog.content}
          </div>
        )}
      </div>
    </section>
  );
}