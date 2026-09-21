// components/shared/StudentCard.jsx
import Image from "next/image";
import { FaGlobe, FaCalendarAlt } from "react-icons/fa";

const statusStyles = {
  active: "bg-success/15 text-success",
  completed: "bg-secondary/15 text-secondary",
  paused: "bg-text-muted/15 text-text-muted",
};

const statusLabels = {
  active: "সক্রিয়",
  completed: "সম্পন্ন",
  paused: "বিরত",
};

export default function StudentCard({ student }) {
  const initials = student.name?.slice(0, 1).toUpperCase() || "?";
  const status = student.status || "active";
  const statusClass = statusStyles[status] || statusStyles.active;
  const statusLabel = statusLabels[status] || "সক্রিয়";

  const joinedDate = student.joinedAt
    ? new Date(student.joinedAt).toISOString().slice(0, 10)
    : "";

  return (
    <div className="flex flex-col items-center text-center gap-3 rounded-2xl bg-surface border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Avatar */}
      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-secondary/20 bg-secondary/15 flex items-center justify-center">
        {student.image ? (
          <Image
            src={student.image}
            alt={student.name}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-secondary text-2xl font-bold">{initials}</span>
        )}
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-foreground">
        {student.name}
      </h3>

      {/* Country */}
      {student.country && (
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <FaGlobe className="w-3.5 h-3.5 text-secondary" />
          <span>{student.country}</span>
        </div>
      )}

      {/* Course */}
      {student.courseName && (
        <p className="text-sm font-semibold text-secondary">
          {student.courseName}
        </p>
      )}

      {/* Divider */}
      <div className="border-t border-border w-full my-1" />

      {/* Status + Joined Date */}
      <div className="flex items-center justify-between w-full">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${statusClass}`}
        >
          {statusLabel}
        </span>

        {joinedDate && (
          <span className="flex items-center gap-1.5 text-xs text-text-muted">
            <FaCalendarAlt className="w-3 h-3" />
            {joinedDate}
          </span>
        )}
      </div>
    </div>
  );
}