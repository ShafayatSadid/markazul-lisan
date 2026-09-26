// app/admin/page.jsx
import Link from "next/link";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaBlog,
  FaBook,
  FaQuran,
  FaUserGraduate,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";
import { getAllCourses } from "@/lib/api/courses";
import { getAllTeachers } from "@/lib/api/teachers";
import { getAllBlogs } from "@/lib/api/blogs";
import { getAllBooks } from "@/lib/api/books";
import { getAllContent } from "@/lib/api/dailyContent";
import { getAllStudents } from "@/lib/api/students";
import { getAllResults } from "@/lib/api/results";

export const metadata = {
  title: "ড্যাশবোর্ড | Admin",
};

export default async function AdminDashboard() {
  const [courses, teachers, blogs, books, content, students, results] =
    await Promise.all([
      getAllCourses(),
      getAllTeachers(),
      getAllBlogs(),
      getAllBooks(),
      getAllContent(),
      getAllStudents(),
      getAllResults(),
    ]);

  const stats = [
    {
      label: "কোর্স",
      value: courses.length,
      icon: FaBookOpen,
      href: "/admin/courses",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "শিক্ষক",
      value: teachers.length,
      icon: FaChalkboardTeacher,
      href: "/admin/teachers",
      color: "text-secondary",
      bg: "bg-secondary/15",
    },
    {
      label: "ব্লগ",
      value: blogs.length,
      icon: FaBlog,
      href: "/admin/blogs",
      color: "text-info",
      bg: "bg-info/10",
    },
    {
      label: "বই",
      value: books.length,
      icon: FaBook,
      href: "/admin/books",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "দৈনিক কন্টেন্ট",
      value: content.length,
      icon: FaQuran,
      href: "/admin/daily-content",
      color: "text-secondary",
      bg: "bg-secondary/15",
    },
    {
      label: "শিক্ষার্থী",
      value: students.length,
      icon: FaUserGraduate,
      href: "/admin/students",
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "ফলাফল",
      value: results.length,
      icon: FaStar,
      href: "/admin/results",
      color: "text-warning",
      bg: "bg-warning/10",
    },
  ];

  // Recent items (latest 5 blogs + students)
  const recentBlogs = [...blogs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const recentStudents = [...students]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-foreground">
          স্বাগতম, অ্যাডমিন
        </h1>
        <p className="text-sm text-text-muted mt-1">
          মারকাজুল লিসান ম্যানেজমেন্ট ড্যাশবোর্ড
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group flex flex-col gap-3 rounded-2xl bg-surface border border-border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-secondary/50"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bg}`}
                >
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <FaArrowRight className="w-3 h-3 text-text-muted opacity-0 group-hover:opacity-100 transition" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-foreground leading-none mb-1">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-text-muted">
                  {stat.label}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Blogs */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-base font-bold text-foreground">
              সাম্প্রতিক ব্লগ
            </h2>
            <Link
              href="/admin/blogs"
              className="text-xs font-semibold text-secondary hover:text-primary transition"
            >
              সব দেখুন →
            </Link>
          </div>
          {recentBlogs.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-text-muted">কোনো ব্লগ নেই</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {recentBlogs.map((blog) => (
                <li key={blog._id}>
                  <Link
                    href="/admin/blogs"
                    className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-background/50 transition"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground line-clamp-1">
                        {blog.title}
                      </p>
                      {blog.authorName && (
                        <p className="text-xs text-text-muted mt-0.5 truncate">
                          {blog.authorName}
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] text-text-muted shrink-0">
                      {blog.createdAt
                        ? new Date(blog.createdAt)
                            .toISOString()
                            .slice(0, 10)
                        : ""}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Students */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-base font-bold text-foreground">
              সাম্প্রতিক শিক্ষার্থী
            </h2>
            <Link
              href="/admin/students"
              className="text-xs font-semibold text-secondary hover:text-primary transition"
            >
              সব দেখুন →
            </Link>
          </div>
          {recentStudents.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-text-muted">কোনো শিক্ষার্থী নেই</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {recentStudents.map((s) => (
                <li key={s._id}>
                  <Link
                    href="/admin/students"
                    className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-background/50 transition"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {s.name}
                      </p>
                      {s.courseName && (
                        <p className="text-xs text-secondary mt-0.5 truncate">
                          {s.courseName}
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] text-text-muted shrink-0">
                      {s.joinedAt
                        ? new Date(s.joinedAt).toISOString().slice(0, 10)
                        : ""}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}