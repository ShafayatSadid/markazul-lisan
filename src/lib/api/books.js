'use server'
// lib/api/books.js
const BASE_URL = process.env.BACKEND_URL;

export async function getAllBooks() {
  try {
    const res = await fetch(`${BASE_URL}/books`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("getAllBooks error:", err.message);
    return [];
  }
}

export async function getBookById(id) {
  try {
    const res = await fetch(`${BASE_URL}/books/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("getBookById error:", err.message);
    return null;
  }
}