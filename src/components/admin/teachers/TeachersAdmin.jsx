// components/admin/teachers/TeachersAdmin.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import ImageUpload from "@/components/shared/ImageUpload";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaChalkboardTeacher,
  FaStar,
  FaSpinner,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {
  adminCreateTeacher,
  adminUpdateTeacher,
  adminDeleteTeacher,
} from "@/lib/adminApi";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const emptyForm = {
  name: "",
  designation: "",
  subject: "",
  description: "",
  image: "",
  experience: "",
  education: "",
  featured: false,
};

export default function TeachersAdmin() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/teachers`, { cache: "no-store" });
      const data = await res.json();
      setTeachers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("শিক্ষক লোড করা যায়নি");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (teacher) => {
    setEditingId(teacher._id);
    setForm({
      name: teacher.name || "",
      designation: teacher.designation || "",
      subject: teacher.subject || "",
      description: teacher.description || "",
      image: teacher.image || "",
      experience: teacher.experience || "",
      education: Array.isArray(teacher.education)
        ? teacher.education.join("\n")
        : "",
      featured: Boolean(teacher.featured),
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("শিক্ষকের নাম আবশ্যক");
      return;
    }

    const payload = {
      name: form.name.trim(),
      designation: form.designation.trim(),
      subject: form.subject.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      experience: form.experience.trim(),
      education: form.education
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      featured: Boolean(form.featured),
    };

    setSubmitting(true);
    try {
      const result = editingId
        ? await adminUpdateTeacher(editingId, payload)
        : await adminCreateTeacher(payload);

      if (result.ok) {
        toast.success(editingId ? "শিক্ষক আপডেট হয়েছে" : "শিক্ষক তৈরি হয়েছে");
        closeForm();
        fetchTeachers();
      } else {
        toast.error(result.data?.message || "সমস্যা হয়েছে");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const result = await adminDeleteTeacher(deleteId);
      if (result.ok) {
        toast.success("শিক্ষক মুছে ফেলা হয়েছে");
        setDeleteId(null);
        fetchTeachers();
      } else {
        toast.error(result.data?.message || "মুছে ফেলা যায়নি");
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            শিক্ষক ম্যানেজমেন্ট
          </h1>
          <p className="text-sm text-text-muted mt-1">
            মোট {teachers.length}জন শিক্ষক
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-4 py-2.5 rounded-full transition cursor-pointer"
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">নতুন শিক্ষক</span>
          <span className="sm:hidden">নতুন</span>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="w-6 h-6 text-primary animate-spin" />
        </div>
      ) : teachers.length === 0 ? (
        <div className="bg-surface border border-border rounded-2xl p-10 text-center">
          <FaChalkboardTeacher className="w-12 h-12 text-text-muted/30 mx-auto mb-3" />
          <p className="text-text-muted">এখনো কোনো শিক্ষক নেই</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-surface border border-border rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                  <th className="px-5 py-3">নাম</th>
                  <th className="px-5 py-3">পদবি</th>
                  <th className="px-5 py-3">বিষয়</th>
                  <th className="px-5 py-3">অভিজ্ঞতা</th>
                  <th className="px-5 py-3">Featured</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {teachers.map((teacher) => (
                  <tr key={teacher._id} className="hover:bg-background/50 transition">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-foreground">
                        {teacher.name}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm text-text-muted">
                      {teacher.designation || "—"}
                    </td>
                    <td className="px-5 py-4 text-sm text-text-muted">
                      {teacher.subject || "—"}
                    </td>
                    <td className="px-5 py-4 text-sm text-text-muted">
                      {teacher.experience || "—"}
                    </td>
                    <td className="px-5 py-4">
                      {teacher.featured ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary/15 text-secondary">
                          <FaStar className="w-3 h-3" />
                          হ্যাঁ
                        </span>
                      ) : (
                        <span className="text-xs text-text-muted">না</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(teacher)}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition cursor-pointer"
                          aria-label="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(teacher._id)}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-error hover:bg-error/10 transition cursor-pointer"
                          aria-label="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden flex flex-col gap-3">
            {teachers.map((teacher) => (
              <div
                key={teacher._id}
                className="bg-surface border border-border rounded-2xl p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {teacher.name}
                    </h3>
                    {teacher.designation && (
                      <p className="text-xs text-secondary mt-0.5">
                        {teacher.designation}
                      </p>
                    )}
                  </div>
                  {teacher.featured && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary/15 text-secondary shrink-0">
                      <FaStar className="w-2.5 h-2.5" />
                      Featured
                    </span>
                  )}
                </div>
                {teacher.subject && (
                  <p className="text-xs text-text-muted mb-3">
                    {teacher.subject}
                  </p>
                )}
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => openEdit(teacher)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-full transition cursor-pointer"
                  >
                    <FaEdit className="w-3 h-3" />
                    এডিট
                  </button>
                  <button
                    onClick={() => setDeleteId(teacher._id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-error hover:bg-error/10 px-3 py-1.5 rounded-full transition cursor-pointer"
                  >
                    <FaTrash className="w-3 h-3" />
                    ডিলিট
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Add/Edit Modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">
                {editingId ? "শিক্ষক এডিট করুন" : "নতুন শিক্ষক"}
              </h2>
              <button
                onClick={closeForm}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-foreground hover:bg-background transition cursor-pointer"
                aria-label="Close"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 flex flex-col gap-4 max-h-[75vh] overflow-y-auto"
            >
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  নাম <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="শিক্ষকের পূর্ণ নাম"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  required
                />
              </div>

              {/* Designation */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  পদবি
                </label>
                <input
                  type="text"
                  value={form.designation}
                  onChange={(e) =>
                    setForm({ ...form, designation: e.target.value })
                  }
                  placeholder="যেমন: Senior Teacher"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  বিষয়
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="যেমন: Arabic Grammar"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  পরিচিতি
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="শিক্ষকের বিস্তারিত পরিচয়"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
                />
              </div>

              {/* Image Upload */}
              <ImageUpload
                label="শিক্ষকের ছবি"
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
              />

              {/* Experience */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  অভিজ্ঞতা
                </label>
                <input
                  type="text"
                  value={form.experience}
                  onChange={(e) =>
                    setForm({ ...form, experience: e.target.value })
                  }
                  placeholder="যেমন: 10 years"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>

              {/* Education */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  শিক্ষাগত যোগ্যতা
                </label>
                <textarea
                  rows={3}
                  value={form.education}
                  onChange={(e) =>
                    setForm({ ...form, education: e.target.value })
                  }
                  placeholder="প্রতি লাইনে একটি&#10;যেমন:&#10;Al-Azhar University&#10;Darul Uloom"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
                />
                <p className="text-xs text-text-muted">
                  প্রতি লাইনে একটি যোগ্যতা লিখুন
                </p>
              </div>

              {/* Featured */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm({ ...form, featured: e.target.checked })
                  }
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
                <span className="text-sm font-medium text-foreground">
                  হোমপেজে featured হিসেবে দেখান
                </span>
              </label>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-border mt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold text-text-muted hover:text-foreground hover:bg-background transition cursor-pointer disabled:opacity-50"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-5 py-2.5 rounded-full transition disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                      সংরক্ষণ হচ্ছে...
                    </>
                  ) : editingId ? (
                    "আপডেট করুন"
                  ) : (
                    "তৈরি করুন"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-foreground mb-2">
              শিক্ষক মুছে ফেলবেন?
            </h3>
            <p className="text-sm text-text-muted mb-6">
              এই কাজটি ফেরানো যাবে না।
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-text-muted hover:text-foreground hover:bg-background transition cursor-pointer disabled:opacity-50"
              >
                বাতিল
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 bg-error hover:bg-error/90 text-white font-semibold px-5 py-2.5 rounded-full transition disabled:opacity-50 cursor-pointer"
              >
                {deleting ? (
                  <>
                    <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                    মুছছে...
                  </>
                ) : (
                  "হ্যাঁ, মুছুন"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}