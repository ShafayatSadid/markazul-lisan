// components/admin/blogs/BlogsAdmin.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import ImageUpload from "@/components/shared/ImageUpload";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBlog,
  FaSpinner,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {
  adminCreateBlog,
  adminUpdateBlog,
  adminDeleteBlog,
} from "@/lib/adminApi";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const emptyForm = {
  title: "",
  description: "",
  content: "",
  image: "",
  authorName: "",
  authorRole: "",
};

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/blogs`, { cache: "no-store" });
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("ব্লগ লোড করা যায়নি");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title || "",
      description: blog.description || "",
      content: blog.content || "",
      image: blog.image || "",
      authorName: blog.authorName || "",
      authorRole: blog.authorRole || "",
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
      toast.error("ব্লগের শিরোনাম আবশ্যক");
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      content: form.content.trim(),
      image: form.image.trim(),
      authorName: form.authorName.trim(),
      authorRole: form.authorRole.trim(),
    };

    setSubmitting(true);
    try {
      const result = editingId
        ? await adminUpdateBlog(editingId, payload)
        : await adminCreateBlog(payload);

      if (result.ok) {
        toast.success(editingId ? "ব্লগ আপডেট হয়েছে" : "ব্লগ তৈরি হয়েছে");
        closeForm();
        fetchBlogs();
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
      const result = await adminDeleteBlog(deleteId);
      if (result.ok) {
        toast.success("ব্লগ মুছে ফেলা হয়েছে");
        setDeleteId(null);
        fetchBlogs();
      } else {
        toast.error(result.data?.message || "মুছে ফেলা যায়নি");
      }
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (date) =>
    date ? new Date(date).toISOString().slice(0, 10) : "—";

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            ব্লগ ম্যানেজমেন্ট
          </h1>
          <p className="text-sm text-text-muted mt-1">
            মোট {blogs.length}টি ব্লগ
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-4 py-2.5 rounded-full transition cursor-pointer"
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">নতুন ব্লগ</span>
          <span className="sm:hidden">নতুন</span>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="w-6 h-6 text-primary animate-spin" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="bg-surface border border-border rounded-2xl p-10 text-center">
          <FaBlog className="w-12 h-12 text-text-muted/30 mx-auto mb-3" />
          <p className="text-text-muted">এখনো কোনো ব্লগ নেই</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-surface border border-border rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                  <th className="px-5 py-3">শিরোনাম</th>
                  <th className="px-5 py-3">লেখক</th>
                  <th className="px-5 py-3">তারিখ</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-background/50 transition">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-foreground line-clamp-1">
                        {blog.title}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm text-text-muted">
                      {blog.authorName || "—"}
                    </td>
                    <td className="px-5 py-4 text-sm text-text-muted">
                      {formatDate(blog.createdAt)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(blog)}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition cursor-pointer"
                          aria-label="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(blog._id)}
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
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-surface border border-border rounded-2xl p-4"
              >
                <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                  {blog.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-text-muted mb-3">
                  <span>{blog.authorName || "—"}</span>
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => openEdit(blog)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-full transition cursor-pointer"
                  >
                    <FaEdit className="w-3 h-3" />
                    এডিট
                  </button>
                  <button
                    onClick={() => setDeleteId(blog._id)}
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
                {editingId ? "ব্লগ এডিট করুন" : "নতুন ব্লগ"}
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
                  শিরোনাম <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="ব্লগের শিরোনাম"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  required
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  সংক্ষিপ্ত বিবরণ
                </label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="কার্ডে দেখানোর জন্য সংক্ষিপ্ত বিবরণ"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  সম্পূর্ণ কন্টেন্ট
                </label>
                <textarea
                  rows={8}
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  placeholder="ব্লগের সম্পূর্ণ টেক্সট"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
                />
              </div>

              {/* Image Upload */}
              <ImageUpload
                label="কভার ইমেজ"
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
              />

              {/* Author Name + Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foreground">
                    লেখকের নাম
                  </label>
                  <input
                    type="text"
                    value={form.authorName}
                    onChange={(e) =>
                      setForm({ ...form, authorName: e.target.value })
                    }
                    placeholder="যেমন: Shafayat Sadid"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foreground">
                    পদবি
                  </label>
                  <input
                    type="text"
                    value={form.authorRole}
                    onChange={(e) =>
                      setForm({ ...form, authorRole: e.target.value })
                    }
                    placeholder="যেমন: Senior Teacher"
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
              ব্লগ মুছে ফেলবেন?
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