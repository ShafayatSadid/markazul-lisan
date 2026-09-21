// components/home/TeacherCard.jsx
import Link from "next/link";
import Image from "next/image";
import { FaGraduationCap, FaArrowRight } from "react-icons/fa";

export default function TeacherCard({ teacher }) {
  const initials = teacher.name?.slice(0, 1).toUpperCase() || "?";

  return (
    <div className="flex flex-col items-center text-center gap-3 rounded-2xl bg-surface border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-secondary/50">

      {/* Image */}
      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-secondary/20 bg-secondary/15 flex items-center justify-center">
        {teacher.image ? (
          <Image
            src={teacher.image}
            alt={teacher.name}
            width={112}
            height={112}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-secondary text-2xl font-bold">{initials}</span>
        )}
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-foreground">
        {teacher.name}
      </h3>

      {/* Designation */}
      {teacher.designation && (
        <p className="text-sm font-semibold text-secondary">
          {teacher.designation}
        </p>
      )}

      {/* Subject */}
      {teacher.subject && (
        <p className="text-sm text-text-muted">
          {teacher.subject}
        </p>
      )}

      {/* Divider */}
      <div className="border-t border-border w-16 my-1" />

      {/* Experience */}
      {teacher.experience && (
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <FaGraduationCap className="w-3.5 h-3.5 text-secondary" />
          <span>{teacher.experience}</span>
        </div>
      )}

      {/* Profile button */}
      <Link
        href={`/teachers/${teacher._id}`}
        className="mt-3 w-full inline-flex items-center justify-center gap-2 border border-secondary text-secondary hover:bg-secondary hover:text-foreground font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200"
      >
        প্রোফাইল দেখুন
        <FaArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}