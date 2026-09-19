// lib/api/courses.js
'use server'
const BASE_URL = process.env.BACKEND_URL;

export async function getFeaturedCourses() {
  try {
    const res = await fetch(`${BASE_URL}/courses?featured=true`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("getFeaturedCourses error:", err.message);
    return [];
  }
}

export async function getAllCourses() {
  try {
    const res = await fetch(`${BASE_URL}/courses`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("getAllCourses error:", err.message);
    return [];
  }
}

export async function getCourseById(id) {
  try {
    const res = await fetch(`${BASE_URL}/courses/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("getCourseById error:", err.message);
    return null;
  }
}