// components/admin/students/StudentsAdmin.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUserGraduate,
  FaSpinner,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {
  adminCreateStudent,
  adminUpdateStudent,
  adminDeleteStudent,
} from "@/lib/adminApi";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const statusLabels = {
  active: { label: "সক্রিয়", cls: "bg-success/15 text-success" },
  completed: { label: "সম্পন্ন", cls: "bg-secondary/15 text-secondary" },
  paused: { label: "বিরত", cls: "bg-text-muted/15 text-text-muted" },
};

const emptyForm = {
  name: "",
  image: "",
  country: "",
  courseName: "",
  status: "active",
  joinedAt: "",
};

const toDateInput = (d) => {
  if (!d) return "";
  return new Date(d).toISOString().slice(0, 10);
};

export default function StudentsAdmin() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/students`, { cache: "no-store" });
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("শিক্ষার্থী লোড করা যায়নি");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (s) => {
    setEditingId(s._id);
    setForm({
      name: s.name || "",
      image: s.image || "",
      country: s.country || "",
      courseName: s.courseName || "",
      status: s.status || "active",
      joinedAt: toDateInput(s.joinedAt),
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
      toast.error("নাম আবশ্যক");
      return;
    }

    const payload = {
      name: form.name.trim(),
      image: form.image.trim(),
      country: form.country.trim(),
      courseName: form.courseName.trim(),
      status: form.status,
      joinedAt: form.joinedAt || undefined,
    };

    setSubmitting(true);
    try {
      const result = editingId
        ? await adminUpdateStudent(editingId, payload)
        : await adminCreateStudent(payload);

      if (result.ok) {
        toast.success(editingId ? "আপডেট হয়েছে" : "শিক্ষার্থী তৈরি হয়েছে");
        closeForm();
        fetchStudents();
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
      const result = await adminDeleteStudent(deleteId);
      if (result.ok) {
        toast.success("শিক্ষার্থী মুছে ফেলা হয়েছে");
        setDeleteId(null);
        fetchStudents();
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
            শিক্ষার্থী ম্যানেজমেন্ট
          </h1>
          <p className="text-sm text-text-muted mt-1">
            মোট {students.length}জন শিক্ষার্থী
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-4 py-2.5 rounded-full transition cursor-pointer"
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">নতুন শিক্ষার্থী</span>
          <span className="sm:hidden">নতুন</span>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="w-6 h-6 text-primary animate-spin" />
        </div>
      ) : students.length === 0 ? (
        <div className="bg-surface border border-border rounded-2xl p-10 text-center">
          <FaUserGraduate className="w-12 h-12 text-text-muted/30 mx-auto mb-3" />
          <p className="text-text-muted">এখনো কোনো শিক্ষার্থী নেই</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-surface border border-border rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                  <th className="px-5 py-3">নাম</th>
                  <th className="px-5 py-3">দেশ</th>
                  <th className="px-5 py-3">কোর্স</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Joined</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {students.map((s) => {
                  const badge = statusLabels[s.status] || statusLabels.active;
                  const joined = s.joinedAt
                    ? new Date(s.joinedAt).toISOString().slice(0, 10)
                    : "—";
                  return (
                    <tr key={s._id} className="hover:bg-background/50 transition">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-foreground">
                          {s.name}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-sm text-text-muted">
                        {s.country || "—"}
                      </td>
                      <td className="px-5 py-4 text-sm text-text-muted">
                        {s.courseName || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${badge.cls}`}
                        >
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-text-muted">
                        {joined}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(s)}
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition cursor-pointer"
                            aria-label="Edit"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(s._id)}
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-error hover:bg-error/10 transition cursor-pointer"
                            aria-label="Delete"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden flex flex-col gap-3">
            {students.map((s) => {
              const badge = statusLabels[s.status] || statusLabels.active;
              return (
                <div
                  key={s._id}
                  className="bg-surface border border-border rounded-2xl p-4"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-foreground flex-1">
                      {s.name}
                    </h3>
                    <span
                      className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${badge.cls}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-text-muted mb-3">
                    {s.country && <span>🌍 {s.country}</span>}
                    {s.courseName && <span>📚 {s.courseName}</span>}
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => openEdit(s)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-full transition cursor-pointer"
                    >
                      <FaEdit className="w-3 h-3" />
                      এডিট
                    </button>
                    <button
                      onClick={() => setDeleteId(s._id)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-error hover:bg-error/10 px-3 py-1.5 rounded-full transition cursor-pointer"
                    >
                      <FaTrash className="w-3 h-3" />
                      ডিলিট
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Add/Edit Modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">
                {editingId ? "শিক্ষার্থী এডিট করুন" : "নতুন শিক্ষার্থী"}
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
                  placeholder="শিক্ষার্থীর নাম"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  required
                />
              </div>

              {/* Image */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  ছবি URL
                </label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>

              {/* Country + Course */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foreground">
                    দেশ
                  </label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) =>
                      setForm({ ...form, country: e.target.value })
                    }
                    placeholder="যেমন: Germany"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foreground">
                    কোর্স
                  </label>
                  <input
                    type="text"
                    value={form.courseName}
                    onChange={(e) =>
                      setForm({ ...form, courseName: e.target.value })
                    }
                    placeholder="যেমন: Basic Arabic"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>
              </div>

              {/* Status + Joined At */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foreground">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition cursor-pointer"
                  >
                    <option value="active">সক্রিয়</option>
                    <option value="completed">সম্পন্ন</option>
                    <option value="paused">বিরত</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foreground">
                    ভর্তির তারিখ
                  </label>
                  <input
                    type="date"
                    value={form.joinedAt}
                    onChange={(e) =>
                      setForm({ ...form, joinedAt: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition cursor-pointer"
                  />
                </div>
              </div>

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
              শিক্ষার্থী মুছে ফেলবেন?
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