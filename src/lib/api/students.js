'use server'
// lib/api/students.js
const BASE_URL = process.env.BACKEND_URL;

export async function getAllStudents() {
  try {
    const res = await fetch(`${BASE_URL}/students`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("getAllStudents error:", err.message);
    return [];
  }
}