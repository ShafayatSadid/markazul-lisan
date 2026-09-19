'use server'
// lib/api/blogs.js
const BASE_URL = process.env.BACKEND_URL;

export async function getAllBlogs() {
  try {
    const res = await fetch(`${BASE_URL}/blogs`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("getAllBlogs error:", err.message);
    return [];
  }
}

export async function getBlogById(id) {
  try {
    const res = await fetch(`${BASE_URL}/blogs/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("getBlogById error:", err.message);
    return null;
  }
}