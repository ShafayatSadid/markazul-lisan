// lib/api/teachers.js
'use server'
const BASE_URL = process.env.BACKEND_URL;

export async function getFeaturedTeachers() {
  try {
    const res = await fetch(`${BASE_URL}/teachers?featured=true`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("getFeaturedTeachers error:", err.message);
    return [];
  }
}

export async function getAllTeachers() {
  try {
    const res = await fetch(`${BASE_URL}/teachers`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("getAllTeachers error:", err.message);
    return [];
  }
}

export async function getTeacherById(id) {
  try {
    const res = await fetch(`${BASE_URL}/teachers/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("getTeacherById error:", err.message);
    return null;
  }
}