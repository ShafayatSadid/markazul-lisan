// components/admin/results/ResultsAdmin.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaStar,
  FaSpinner,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {
  adminCreateResult,
  adminUpdateResult,
  adminDeleteResult,
} from "@/lib/adminApi";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const emptyForm = {
  studentName: "",
  studentImage: "",
  courseName: "",
  comment: "",
  rating: 5,
};

function Stars({ rating = 5, size = "w-4 h-4" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <FaStar
          key={i}
          className={`${size} ${
            i <= rating ? "text-secondary" : "text-text-muted/30"
          }`}
        />
      ))}
    </div>
  );
}

export default function ResultsAdmin() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/results`, { cache: "no-store" });
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("ফলাফল লোড করা যায়নি");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (r) => {
    setEditingId(r._id);
    setForm({
      studentName: r.studentName || "",
      studentImage: r.studentImage || "",
      courseName: r.courseName || "",
      comment: r.comment || "",
      rating: r.rating || 5,
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
    if (!form.studentName.trim()) {
      toast.error("শিক্ষার্থীর নাম আবশ্যক");
      return;
    }

    const payload = {
      studentName: form.studentName.trim(),
      studentImage: form.studentImage.trim(),
      courseName: form.courseName.trim(),
      comment: form.comment.trim(),
      rating: Number(form.rating) || 5,
    };

    setSubmitting(true);
    try {
      const result = editingId
        ? await adminUpdateResult(editingId, payload)
        : await adminCreateResult(payload);

      if (result.ok) {
        toast.success(editingId ? "ফলাফল আপডেট হয়েছে" : "ফলাফল তৈরি হয়েছে");
        closeForm();
        fetchResults();
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
      const result = await adminDeleteResult(deleteId);
      if (result.ok) {
        toast.success("ফলাফল মুছে ফেলা হয়েছে");
        setDeleteId(null);
        fetchResults();
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
            ফলাফল ম্যানেজমেন্ট
          </h1>
          <p className="text-sm text-text-muted mt-1">
            মোট {results.length}টি ফলাফল
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-4 py-2.5 rounded-full transition cursor-pointer"
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">নতুন ফলাফল</span>
          <span className="sm:hidden">নতুন</span>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="w-6 h-6 text-primary animate-spin" />
        </div>
      ) : results.length === 0 ? (
        <div className="bg-surface border border-border rounded-2xl p-10 text-center">
          <FaStar className="w-12 h-12 text-text-muted/30 mx-auto mb-3" />
          <p className="text-text-muted">এখনো কোনো ফলাফল নেই</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-surface border border-border rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                  <th className="px-5 py-3">শিক্ষার্থী</th>
                  <th className="px-5 py-3">কোর্স</th>
                  <th className="px-5 py-3">রেটিং</th>
                  <th className="px-5 py-3">মন্তব্য</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {results.map((r) => (
                  <tr key={r._id} className="hover:bg-background/50 transition">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-foreground">
                        {r.studentName}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm text-text-muted">
                      {r.courseName || "—"}
                    </td>
                    <td className="px-5 py-4">
                      <Stars rating={r.rating || 5} />
                    </td>
                    <td className="px-5 py-4 text-sm text-text-muted max-w-xs">
                      <p className="line-clamp-1">{r.comment || "—"}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(r)}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition cursor-pointer"
                          aria-label="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(r._id)}
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
            {results.map((r) => (
              <div
                key={r._id}
                className="bg-surface border border-border rounded-2xl p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {r.studentName}
                    </h3>
                    {r.courseName && (
                      <p className="text-xs text-secondary mt-0.5">
                        {r.courseName}
                      </p>
                    )}
                  </div>
                  <Stars rating={r.rating || 5} size="w-3 h-3" />
                </div>
                {r.comment && (
                  <p className="text-xs text-text-muted line-clamp-2 mb-3">
                    {r.comment}
                  </p>
                )}
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => openEdit(r)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-full transition cursor-pointer"
                  >
                    <FaEdit className="w-3 h-3" />
                    এডিট
                  </button>
                  <button
                    onClick={() => setDeleteId(r._id)}
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
                {editingId ? "ফলাফল এডিট করুন" : "নতুন ফলাফল"}
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
              {/* Student Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  শিক্ষার্থীর নাম <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={form.studentName}
                  onChange={(e) =>
                    setForm({ ...form, studentName: e.target.value })
                  }
                  placeholder="শিক্ষার্থীর নাম"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  required
                />
              </div>

              {/* Student Image */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  ছবি URL
                </label>
                <input
                  type="text"
                  value={form.studentImage}
                  onChange={(e) =>
                    setForm({ ...form, studentImage: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>

              {/* Course Name */}
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

              {/* Comment */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  মন্তব্য
                </label>
                <textarea
                  rows={4}
                  value={form.comment}
                  onChange={(e) =>
                    setForm({ ...form, comment: e.target.value })
                  }
                  placeholder="শিক্ষার্থীর মতামত"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
                />
              </div>

              {/* Rating */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  রেটিং
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={form.rating}
                    onChange={(e) =>
                      setForm({ ...form, rating: Number(e.target.value) })
                    }
                    className="flex-1 accent-secondary cursor-pointer"
                  />
                  <Stars rating={form.rating} />
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
              ফলাফল মুছে ফেলবেন?
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