// app/(auth)/layout.jsx
import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-[calc(100vh-124px)] flex items-center justify-center px-5 py-12 md:py-16 overflow-hidden bg-background">
      {/* Decorative blobs */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-border bg-surface p-7 md:p-8 shadow-2xl shadow-primary/5">
          {/* Brand */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex flex-col leading-none">
              <span className="text-3xl font-extrabold tracking-tight">
                <span className="text-primary">মারকাজুল </span>
                <span className="text-secondary">লিসান</span>
              </span>
              <span className="text-[10px] tracking-[0.35em] text-text-muted mt-1">
                MARKAZUL LISAN
              </span>
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}