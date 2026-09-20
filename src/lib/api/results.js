'use server'
// lib/api/results.js
const BASE_URL = process.env.BACKEND_URL;

export async function getAllResults() {
  try {
    const res = await fetch(`${BASE_URL}/results`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("getAllResults error:", err.message);
    return [];
  }
}