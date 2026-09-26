// app/courses/[id]/page.js
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  FaClock,
  FaArrowLeft,
  FaWhatsapp,
  FaBookOpen,
  FaCheckCircle,
} from "react-icons/fa";
import { getCourseById } from "@/lib/api/courses";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    return { title: "কোর্স পাওয়া যায়নি | মারকাজুল লিসান" };
  }

  return {
    title: `${course.name} | মারকাজুল লিসান`,
    description: course.description || "কোর্সের বিস্তারিত তথ্য",
  };
}

export default async function CourseDetailsPage({ params }) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappMessage = `আসসালামু আলাইকুম, আমি "${course.name}" কোর্স সম্পর্কে বিস্তারিত জানতে চাই।`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <section className="w-full bg-background py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Back button */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-secondary transition mb-8 md:mb-10"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          সব কোর্স
        </Link>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Image — left */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden bg-secondary/15 flex items-center justify-center border border-border">
              {course.image ? (
                <Image
                  src={course.image}
                  alt={course.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <FaBookOpen className="w-20 h-20 text-secondary/40" />
              )}
            </div>
          </div>

          {/* Info — right */}
          <div className="lg:col-span-3 flex flex-col">

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {course.name}
            </h1>

            {/* Duration */}
            {course.duration && (
              <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
                <FaClock className="w-4 h-4 text-secondary" />
                <span>{course.duration}</span>
              </div>
            )}

            {/* Description */}
            {course.description && (
              <p className="text-base md:text-lg text-text-muted leading-relaxed mb-8">
                {course.description}
              </p>
            )}

            {/* Syllabus */}
            {course.syllabus && course.syllabus.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">
                  যা যা শিখবেন
                </h2>
                <ul className="space-y-2.5">
                  {course.syllabus.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm md:text-base text-text-muted"
                    >
                      <FaCheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4">
              <Link
                href={`/admission?course=${course._id}`}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-200 hover:scale-[1.02]"
              >
                ভর্তি হোন
              </Link>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-secondary text-secondary hover:bg-secondary hover:text-foreground font-semibold px-6 py-3 rounded-full transition-all duration-200"
              >
                <FaWhatsapp className="w-4 h-4" />
                বিস্তারিত জানতে যোগাযোগ করুন
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}