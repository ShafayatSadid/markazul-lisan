// lib/adminApi.js
"use client";

import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function adminFetch(path, options = {}) {
  try {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;

    if (!token) {
      return {
        ok: false,
        data: { message: "No token — login required" },
      };
    }

    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
      cache: "no-store",
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("adminFetch error:", err);
    return { ok: false, data: { message: "Network error" } };
  }
}

// ==================== Courses ====================
export async function adminCreateCourse(payload) {
  return adminFetch("/courses", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function adminUpdateCourse(id, payload) {
  return adminFetch(`/courses/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function adminDeleteCourse(id) {
  return adminFetch(`/courses/${id}`, { method: "DELETE" });
}

// ==================== Teachers ====================
export async function adminCreateTeacher(payload) {
  return adminFetch("/teachers", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function adminUpdateTeacher(id, payload) {
  return adminFetch(`/teachers/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function adminDeleteTeacher(id) {
  return adminFetch(`/teachers/${id}`, { method: "DELETE" });
}

// ==================== Blogs ====================
export async function adminCreateBlog(payload) {
  return adminFetch("/blogs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function adminUpdateBlog(id, payload) {
  return adminFetch(`/blogs/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function adminDeleteBlog(id) {
  return adminFetch(`/blogs/${id}`, { method: "DELETE" });
}

// ==================== Books ====================
export async function adminCreateBook(payload) {
  return adminFetch("/books", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function adminUpdateBook(id, payload) {
  return adminFetch(`/books/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function adminDeleteBook(id) {
  return adminFetch(`/books/${id}`, { method: "DELETE" });
}

// ==================== Daily Content ====================
export async function adminCreateContent(payload) {
  return adminFetch("/daily-content", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function adminUpdateContent(id, payload) {
  return adminFetch(`/daily-content/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function adminDeleteContent(id) {
  return adminFetch(`/daily-content/${id}`, { method: "DELETE" });
}

// ==================== Students ====================
export async function adminCreateStudent(payload) {
  return adminFetch("/students", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function adminUpdateStudent(id, payload) {
  return adminFetch(`/students/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function adminDeleteStudent(id) {
  return adminFetch(`/students/${id}`, { method: "DELETE" });
}

// ==================== Results ====================
export async function adminCreateResult(payload) {
  return adminFetch("/results", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function adminUpdateResult(id, payload) {
  return adminFetch(`/results/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function adminDeleteResult(id) {
  return adminFetch(`/results/${id}`, { method: "DELETE" });
}