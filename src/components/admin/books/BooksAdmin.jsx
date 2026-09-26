// components/admin/books/BooksAdmin.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBook,
  FaSpinner,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {
  adminCreateBook,
  adminUpdateBook,
  adminDeleteBook,
} from "@/lib/adminApi";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const emptyForm = {
  title: "",
  author: "",
  description: "",
  image: "",
  downloadUrl: "",
  fileSize: "",
  pages: "",
};

export default function BooksAdmin() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/books`, { cache: "no-store" });
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("বই লোড করা যায়নি");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (book) => {
    setEditingId(book._id);
    setForm({
      title: book.title || "",
      author: book.author || "",
      description: book.description || "",
      image: book.image || "",
      downloadUrl: book.downloadUrl || "",
      fileSize: book.fileSize || "",
      pages: book.pages || "",
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
    if (!form.title.trim()) {
      toast.error("বইয়ের নাম আবশ্যক");
      return;
    }

    const payload = {
      title: form.title.trim(),
      author: form.author.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      downloadUrl: form.downloadUrl.trim(),
      fileSize: form.fileSize.trim(),
      pages: form.pages.toString().trim(),
    };

    setSubmitting(true);
    try {
      const result = editingId
        ? await adminUpdateBook(editingId, payload)
        : await adminCreateBook(payload);

      if (result.ok) {
        toast.success(editingId ? "বই আপডেট হয়েছে" : "বই তৈরি হয়েছে");
        closeForm();
        fetchBooks();
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
      const result = await adminDeleteBook(deleteId);
      if (result.ok) {
        toast.success("বই মুছে ফেলা হয়েছে");
        setDeleteId(null);
        fetchBooks();
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
            বই ম্যানেজমেন্ট
          </h1>
          <p className="text-sm text-text-muted mt-1">
            মোট {books.length}টি বই
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-4 py-2.5 rounded-full transition cursor-pointer"
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">নতুন বই</span>
          <span className="sm:hidden">নতুন</span>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="w-6 h-6 text-primary animate-spin" />
        </div>
      ) : books.length === 0 ? (
        <div className="bg-surface border border-border rounded-2xl p-10 text-center">
          <FaBook className="w-12 h-12 text-text-muted/30 mx-auto mb-3" />
          <p className="text-text-muted">এখনো কোনো বই নেই</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-surface border border-border rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                  <th className="px-5 py-3">নাম</th>
                  <th className="px-5 py-3">লেখক</th>
                  <th className="px-5 py-3">পৃষ্ঠা</th>
                  <th className="px-5 py-3">ফাইল সাইজ</th>
                  <th className="px-5 py-3">ডাউনলোড</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {books.map((book) => (
                  <tr key={book._id} className="hover:bg-background/50 transition">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-foreground">
                        {book.title}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm text-text-muted">
                      {book.author || "—"}
                    </td>
                    <td className="px-5 py-4 text-sm text-text-muted">
                      {book.pages || "—"}
                    </td>
                    <td className="px-5 py-4 text-sm text-text-muted">
                      {book.fileSize || "—"}
                    </td>
                    <td className="px-5 py-4">
                      {book.downloadUrl ? (
                        <a
                          href={book.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-primary hover:text-primary-hover transition"
                        >
                          লিংক →
                        </a>
                      ) : (
                        <span className="text-xs text-text-muted">নেই</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(book)}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition cursor-pointer"
                          aria-label="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(book._id)}
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
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-surface border border-border rounded-2xl p-4"
              >
                <h3 className="font-semibold text-foreground mb-1">
                  {book.title}
                </h3>
                {book.author && (
                  <p className="text-xs text-text-muted mb-3">{book.author}</p>
                )}
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => openEdit(book)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-full transition cursor-pointer"
                  >
                    <FaEdit className="w-3 h-3" />
                    এডিট
                  </button>
                  <button
                    onClick={() => setDeleteId(book._id)}
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
                {editingId ? "বই এডিট করুন" : "নতুন বই"}
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
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  বইয়ের নাম <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="যেমন: Riyadus Salihin"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  required
                />
              </div>

              {/* Author */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  লেখক
                </label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="যেমন: Imam Nawawi"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  বিবরণ
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="বইয়ের সংক্ষিপ্ত বিবরণ"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
                />
              </div>

              {/* Image */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  কভার ইমেজ URL
                </label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>

              {/* Download URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  ডাউনলোড লিংক
                </label>
                <input
                  type="text"
                  value={form.downloadUrl}
                  onChange={(e) =>
                    setForm({ ...form, downloadUrl: e.target.value })
                  }
                  placeholder="https://... (PDF লিংক)"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>

              {/* File size + Pages */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foreground">
                    ফাইল সাইজ
                  </label>
                  <input
                    type="text"
                    value={form.fileSize}
                    onChange={(e) =>
                      setForm({ ...form, fileSize: e.target.value })
                    }
                    placeholder="5 MB"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foreground">
                    পৃষ্ঠা সংখ্যা
                  </label>
                  <input
                    type="number"
                    value={form.pages}
                    onChange={(e) => setForm({ ...form, pages: e.target.value })}
                    placeholder="350"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
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
              বই মুছে ফেলবেন?
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