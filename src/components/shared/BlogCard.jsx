// components/shared/BlogCard.jsx
import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt, FaBookOpen } from "react-icons/fa";

export default function BlogCard({ blog }) {
  const date = blog.createdAt
    ? new Date(blog.createdAt).toISOString().slice(0, 10)
    : "";

  return (
    <Link href={`/blog/${blog._id}`} className="block group h-full">
      <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-surface border border-border transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">

        {/* Image */}
        <div className="relative aspect-video w-full bg-secondary/10 flex items-center justify-center overflow-hidden">
          {blog.image ? (
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <FaBookOpen className="w-12 h-12 text-secondary/40" />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          {date && (
            <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
              <FaCalendarAlt className="w-3.5 h-3.5 text-secondary" />
              <span>{date}</span>
            </div>
          )}

          <h3 className="text-base md:text-lg font-bold text-foreground line-clamp-2 group-hover:text-secondary transition-colors">
            {blog.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}