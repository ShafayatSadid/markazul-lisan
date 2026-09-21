// app/about/page.jsx
import AboutContent from "@/components/about/AboutContent";

export const metadata = {
  title: "আমাদের সম্পর্কে | মারকাজুল লিসান",
  description:
    "প্রবাসী বাংলাদেশিদের জন্য ইসলামিক শিক্ষার প্ল্যাটফর্ম — মারকাজুল লিসান",
};

export default function AboutPage() {
  return (
    <main>
      <AboutContent />
    </main>
  );
}