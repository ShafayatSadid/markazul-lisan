// components/home/CourseCard.jsx
import Link from "next/link";
import Image from "next/image";
import { FaClock, FaBookOpen, FaArrowRight } from "react-icons/fa";

export default function CourseCard({ course }) {
  return (
    <Link href={`/courses/${course._id}`} className="block group">
      <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-surface border border-border transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">

        {/* Image / Placeholder */}
        <div className="relative aspect-video w-full bg-secondary/15 flex items-center justify-center overflow-hidden">
          {course.image ? (
            <Image
              src={course.image}
              alt={course.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <FaBookOpen className="w-12 h-12 text-secondary/50" />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
            {course.name}
          </h3>

          {course.duration && (
            <div className="flex items-center gap-2 text-sm text-text-muted mb-3">
              <FaClock className="w-3.5 h-3.5" />
              <span>{course.duration}</span>
            </div>
          )}

          {course.description && (
            <p className="text-sm text-text-muted leading-relaxed line-clamp-2 mb-4">
              {course.description}
            </p>
          )}

          <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-secondary group-hover:text-primary transition-colors">
            বিস্তারিত দেখুন
            <FaArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}