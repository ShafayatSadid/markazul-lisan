'use server'

// lib/api/dailyContent.js
const BASE_URL = process.env.BACKEND_URL;

export async function getAllContent() {
  try {
    const res = await fetch(`${BASE_URL}/daily-content`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("getAllContent error:", err.message);
    return [];
  }
}