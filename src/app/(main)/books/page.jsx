// app/books/page.js
import { getAllBooks } from "@/lib/api/books";
import BooksGrid from "@/components/books/BooksGrid";

export const metadata = {
  title: "বইসমূহ | মারকাজুল লিসান",
  description: "ইসলামিক বই ডাউনলোড করে পড়ুন",
};

export default async function BooksPage() {
  const books = await getAllBooks();

  return (
    <main>
      <BooksGrid books={books} />
    </main>
  );
}