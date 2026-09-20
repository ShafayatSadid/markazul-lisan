// components/home/FAQ.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { FaPlus, FaArrowRight } from "react-icons/fa";

const faqs = [
  {
    q: "ক্লাস কীভাবে হয়?",
    a: "অনলাইনে Zoom অথবা Google Meet-এ ক্লাস হয়। ইন্টারনেট সংযোগ থাকলেই যেকোনো ডিভাইস থেকে ক্লাসে অংশ নিতে পারবেন।",
  },
  {
    q: "ক্লাসের সময় কেমন?",
    a: "আপনার সুবিধামতো সময়ে ক্লাস হয়। শিক্ষক এবং শিক্ষার্থীর মধ্যে সমন্বয় করে সময় নির্ধারণ করা হয় — যাতে আপনার দেশের সময় অঞ্চল অনুযায়ী সুবিধা হয়।",
  },
  {
    q: "ভর্তি ফি কত?",
    a: "ফি কোর্সের উপর নির্ভর করে। বিস্তারিত জানতে যোগাযোগ করুন — আমাদের টিম আপনাকে ফি, সময়সূচী, এবং অন্যান্য তথ্য জানিয়ে দেবে।",
  },
  {
    q: "ক্লাস মিস হলে কী হবে?",
    a: "ক্লাসের রেকর্ডিং দেওয়া হয়, যাতে আপনি পরে দেখে নিতে পারেন। প্রয়োজনে শিক্ষকের সাথে সমন্বয় করে makeup class-ও নেওয়া যায়।",
  },
  {
    q: "কোন দেশ থেকে শেখা যাবে?",
    a: "Europe, America, Middle East — যে কোনো দেশে থাকুন, অনলাইনে ঘরে বসে শিখতে পারবেন।",
  },
  {
    q: "শিক্ষক কারা?",
    a: "দেশ-বিদেশের অভিজ্ঞ ও যোগ্য শিক্ষকরা ক্লাস পরিচালনা করেন। প্রতিটি শিক্ষককে যোগ্যতা অনুযায়ী নির্বাচন করা হয়।",
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-colors duration-300 ${
        isOpen
          ? "border-secondary/50 bg-background"
          : "border-border bg-background hover:border-secondary/30"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 text-left p-5 md:p-6 cursor-pointer"
      >
        <span className="text-base md:text-lg font-semibold text-foreground">
          {faq.q}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-secondary text-foreground rotate-45"
              : "bg-secondary/15 text-secondary"
          }`}
        >
          <FaPlus className="w-3.5 h-3.5" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 text-sm md:text-base text-text-muted leading-relaxed">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (i) => {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  };

  return (
    <section className="w-full bg-surface py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            সাধারণ <span className="text-primary">জিজ্ঞাসা</span>
          </h2>
          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto">
            আপনার প্রশ্নের উত্তর
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto flex flex-col gap-3 md:gap-4"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.q}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-center mt-10 md:mt-14"
        >
          <p className="text-sm md:text-base text-text-muted mb-4">
            আরও প্রশ্ন আছে?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-secondary text-secondary hover:bg-secondary hover:text-foreground font-semibold px-6 py-3 rounded-full transition-all duration-200"
          >
            যোগাযোগ করুন
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}