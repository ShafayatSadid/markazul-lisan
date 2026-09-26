// components/admin/dailyContent/DailyContentAdmin.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaQuran,
  FaSpinner,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {
  adminCreateContent,
  adminUpdateContent,
  adminDeleteContent,
} from "@/lib/adminApi";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const typeLabels = {
  quran: { label: "কুরআন", cls: "bg-primary/15 text-primary" },
  hadith: { label: "হাদিস", cls: "bg-secondary/15 text-secondary" },
  mulniti: { label: "মূলনীতি", cls: "bg-info/15 text-info" },
};

const emptyForm = {
  type: "quran",
  title: "",
  content: "",
  reference: "",
};

export default function DailyContentAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/daily-content`, {
        cache: "no-store",
      });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("কন্টেন্ট লোড করা যায়নি");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item._id);
    setForm({
      type: item.type || "quran",
      title: item.title || "",
      content: item.content || "",
      reference: item.reference || "",
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
    if (!form.content.trim()) {
      toast.error("কন্টেন্ট আবশ্যক");
      return;
    }

    const payload = {
      type: form.type,
      title: form.title.trim(),
      content: form.content.trim(),
      reference: form.reference.trim(),
    };

    setSubmitting(true);
    try {
      const result = editingId
        ? await adminUpdateContent(editingId, payload)
        : await adminCreateContent(payload);

      if (result.ok) {
        toast.success(editingId ? "কন্টেন্ট আপডেট হয়েছে" : "কন্টেন্ট তৈরি হয়েছে");
        closeForm();
        fetchItems();
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
      const result = await adminDeleteContent(deleteId);
      if (result.ok) {
        toast.success("কন্টেন্ট মুছে ফেলা হয়েছে");
        setDeleteId(null);
        fetchItems();
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
            দৈনিক কন্টেন্ট
          </h1>
          <p className="text-sm text-text-muted mt-1">
            মোট {items.length}টি কন্টেন্ট
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-4 py-2.5 rounded-full transition cursor-pointer"
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">নতুন কন্টেন্ট</span>
          <span className="sm:hidden">নতুন</span>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="w-6 h-6 text-primary animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-surface border border-border rounded-2xl p-10 text-center">
          <FaQuran className="w-12 h-12 text-text-muted/30 mx-auto mb-3" />
          <p className="text-text-muted">এখনো কোনো কন্টেন্ট নেই</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-surface border border-border rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                  <th className="px-5 py-3">টাইপ</th>
                  <th className="px-5 py-3">শিরোনাম</th>
                  <th className="px-5 py-3">রেফারেন্স</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((item) => {
                  const badge = typeLabels[item.type] || {
                    label: item.type,
                    cls: "bg-border text-text-muted",
                  };
                  return (
                    <tr key={item._id} className="hover:bg-background/50 transition">
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${badge.cls}`}
                        >
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-foreground line-clamp-1">
                          {item.title || "—"}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-sm text-text-muted line-clamp-1">
                        {item.reference || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(item)}
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition cursor-pointer"
                            aria-label="Edit"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(item._id)}
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
            {items.map((item) => {
              const badge = typeLabels[item.type] || {
                label: item.type,
                cls: "bg-border text-text-muted",
              };
              return (
                <div
                  key={item._id}
                  className="bg-surface border border-border rounded-2xl p-4"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span
                      className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${badge.cls}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                    {item.title || "—"}
                  </h3>
                  {item.reference && (
                    <p className="text-xs text-text-muted mb-3">
                      {item.reference}
                    </p>
                  )}
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => openEdit(item)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-full transition cursor-pointer"
                    >
                      <FaEdit className="w-3 h-3" />
                      এডিট
                    </button>
                    <button
                      onClick={() => setDeleteId(item._id)}
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
                {editingId ? "কন্টেন্ট এডিট করুন" : "নতুন কন্টেন্ট"}
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
              {/* Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  টাইপ <span className="text-error">*</span>
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition cursor-pointer"
                >
                  <option value="quran">কুরআন</option>
                  <option value="hadith">হাদিস</option>
                  <option value="mulniti">মূলনীতি</option>
                </select>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  শিরোনাম
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="যেমন: Surah Al-Fatiha"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  কন্টেন্ট <span className="text-error">*</span>
                </label>
                <textarea
                  rows={5}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="বাংলায় কন্টেন্ট"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
                  required
                />
              </div>

              {/* Reference */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  রেফারেন্স
                </label>
                <input
                  type="text"
                  value={form.reference}
                  onChange={(e) =>
                    setForm({ ...form, reference: e.target.value })
                  }
                  placeholder="যেমন: Surah Al-Fatiha 1:2"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
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
              কন্টেন্ট মুছে ফেলবেন?
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