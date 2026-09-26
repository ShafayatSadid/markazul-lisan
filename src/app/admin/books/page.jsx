// app/admin/books/page.jsx
import BooksAdmin from "@/components/admin/books/BooksAdmin";

export const metadata = {
  title: "বই ম্যানেজমেন্ট | Admin",
};

export default function AdminBooksPage() {
  return <BooksAdmin />;
}