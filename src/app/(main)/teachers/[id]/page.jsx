// app/teachers/[id]/page.js
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaGraduationCap, FaUser } from "react-icons/fa";
import { getTeacherById } from "@/lib/api/teachers";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const teacher = await getTeacherById(id);

  if (!teacher) {
    return { title: "শিক্ষক পাওয়া যায়নি | মারকাজুল লিসান" };
  }

  return {
    title: `${teacher.name} | মারকাজুল লিসান`,
    description: teacher.description || `${teacher.name} - ${teacher.designation}`,
  };
}

export default async function TeacherDetailsPage({ params }) {
  const { id } = await params;
  const teacher = await getTeacherById(id);

  if (!teacher) {
    notFound();
  }

  const initials = teacher.name?.slice(0, 1).toUpperCase() || "?";

  return (
    <section className="w-full bg-background py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Back button */}
        <Link
          href="/teachers"
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-secondary transition mb-8 md:mb-10"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          সব শিক্ষক
        </Link>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Image — left */}
          <div className="lg:col-span-2 flex justify-center lg:justify-start">
            <div className="w-56 h-56 md:w-64 md:h-64 lg:w-full lg:h-auto lg:aspect-square lg:max-w-sm rounded-full overflow-hidden border-4 border-secondary/20 bg-secondary/15 flex items-center justify-center">
              {teacher.image ? (
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                  priority
                />
              ) : (
                <span className="text-secondary text-6xl md:text-7xl font-bold">
                  {initials}
                </span>
              )}
            </div>
          </div>

          {/* Info — right */}
          <div className="lg:col-span-3 flex flex-col">

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2 text-center lg:text-left">
              {teacher.name}
            </h1>

            {/* Designation */}
            {teacher.designation && (
              <p className="text-base md:text-lg font-semibold text-secondary mb-2 text-center lg:text-left">
                {teacher.designation}
              </p>
            )}

            {/* Subject */}
            {teacher.subject && (
              <p className="text-sm md:text-base text-text-muted mb-5 text-center lg:text-left">
                {teacher.subject}
              </p>
            )}

            {/* Experience */}
            {teacher.experience && (
              <div className="flex items-center gap-2 text-sm text-text-muted mb-6 justify-center lg:justify-start">
                <FaGraduationCap className="w-4 h-4 text-secondary" />
                <span>{teacher.experience}</span>
              </div>
            )}

            {/* Description */}
            {teacher.description && (
              <div className="mb-8">
                <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
                  পরিচিতি
                </h2>
                <p className="text-base text-text-muted leading-relaxed">
                  {teacher.description}
                </p>
              </div>
            )}

            {/* Education */}
            {teacher.education && teacher.education.length > 0 && (
              <div>
                <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">
                  শিক্ষাগত যোগ্যতা
                </h2>
                <ul className="space-y-3">
                  {teacher.education.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm md:text-base text-text-muted"
                    >
                      <span className="w-6 h-6 rounded-full bg-secondary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaGraduationCap className="w-3 h-3 text-secondary" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}