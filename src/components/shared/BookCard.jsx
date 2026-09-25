// components/shared/BookCard.jsx
import Image from "next/image";
import { FaBookOpen, FaDownload, FaFileAlt, FaHdd } from "react-icons/fa";

export default function BookCard({ book }) {
  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-surface border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Cover */}
      <div className="relative aspect-7/4 w-full bg-secondary/10 flex items-center justify-center overflow-hidden">
        {book.image ? (
          <Image
            src={book.image}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <FaBookOpen className="w-14 h-14 text-secondary/40" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">

        {/* Title */}
        <h3 className="text-base md:text-lg font-bold text-foreground line-clamp-2 mb-1">
          {book.title}
        </h3>

        {/* Author */}
        {book.author && (
          <p className="text-sm text-text-muted mb-3">{book.author}</p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-text-muted mb-4">
          {book.pages && (
            <span className="flex items-center gap-1.5">
              <FaFileAlt className="w-3 h-3 text-secondary" />
              {book.pages} পৃষ্ঠা
            </span>
          )}
          {book.fileSize && (
            <span className="flex items-center gap-1.5">
              <FaHdd className="w-3 h-3 text-secondary" />
              {book.fileSize}
            </span>
          )}
        </div>

        {/* Download button */}
        {book.downloadUrl && (
          <a
            href={book.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center gap-2 border border-secondary text-secondary hover:bg-secondary hover:text-foreground font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200"
          >
            <FaDownload className="w-3.5 h-3.5" />
            ডাউনলোড
          </a>
        )}
      </div>
    </div>
  );
}