// components/admin/AdminSidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaBookOpen,
  FaChalkboardTeacher,
  FaBlog,
  FaBook,
  FaQuran,
  FaUserGraduate,
  FaStar,
  FaArrowLeft,
} from "react-icons/fa";

const navItems = [
  { href: "/admin", label: "ড্যাশবোর্ড", icon: FaTachometerAlt, exact: true },
  { href: "/admin/courses", label: "কোর্স", icon: FaBookOpen },
  { href: "/admin/teachers", label: "শিক্ষক", icon: FaChalkboardTeacher },
  { href: "/admin/blogs", label: "ব্লগ", icon: FaBlog },
  { href: "/admin/books", label: "বই", icon: FaBook },
  { href: "/admin/daily-content", label: "দৈনিক কন্টেন্ট", icon: FaQuran },
  { href: "/admin/students", label: "শিক্ষার্থী", icon: FaUserGraduate },
  { href: "/admin/results", label: "ফলাফল", icon: FaStar },
];

export default function AdminSidebar({ onLinkClick }) {
  const pathname = usePathname();

  const isActive = (item) => {
    if (item.exact) return pathname === item.href;
    return pathname === item.href || pathname.startsWith(item.href + "/");
  };

  return (
    <aside className="w-64 h-full bg-primary-deep text-primary-deep-foreground flex flex-col">
      {/* Logo + Admin label */}
      <div className="px-6 py-6 border-b border-primary-deep-foreground/10">
        <Link href="/admin" className="block">
          <h1 className="text-xl font-extrabold tracking-tight">
            <span className="text-secondary">মারকাজুল </span>
            <span>লিসান</span>
          </h1>
          <p className="text-[10px] tracking-[0.3em] text-primary-deep-foreground/60 mt-1.5 uppercase">
            Admin Panel
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onLinkClick}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                    active
                      ? "bg-secondary/15 text-secondary"
                      : "text-primary-deep-foreground/70 hover:bg-primary-deep-foreground/5 hover:text-primary-deep-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Back to site */}
      <div className="p-3 border-t border-primary-deep-foreground/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-primary-deep-foreground/70 hover:bg-primary-deep-foreground/5 hover:text-primary-deep-foreground transition"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>সাইটে ফিরে যান</span>
        </Link>
      </div>
    </aside>
  );
}