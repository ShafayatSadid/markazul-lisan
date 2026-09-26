// components/admin/AdminLayoutContent.jsx
"use client";

import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminLayoutContent({ children }) {
  const sidebarRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const openSidebar = () => {
    setMobileOpen(true);
    if (sidebarRef.current) {
      sidebarRef.current.style.transform = "translateX(0)";
    }
  };

  const closeSidebar = () => {
    setMobileOpen(false);
    if (sidebarRef.current) {
      sidebarRef.current.style.transform = "translateX(-100%)";
    }
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Desktop sidebar */}
      <div className="hidden md:block fixed left-0 top-0 bottom-0 z-40">
        <AdminSidebar />
      </div>

      {/* Mobile sidebar */}
      <div
        ref={sidebarRef}
        style={{ transform: "translateX(-100%)" }}
        className="md:hidden fixed left-0 top-0 bottom-0 z-50 transition-transform duration-300"
      >
        <AdminSidebar onLinkClick={closeSidebar} />
        <button
          onClick={closeSidebar}
          className="absolute top-6 right-4 text-primary-deep-foreground hover:text-secondary transition cursor-pointer"
          aria-label="Close menu"
        >
          <IoClose className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={closeSidebar}
          className="md:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Main */}
      <div className="md:ml-64 flex flex-col min-h-screen">
        <AdminTopbar onMenuClick={openSidebar} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}