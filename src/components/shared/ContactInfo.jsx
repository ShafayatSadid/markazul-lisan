// components/shared/ContactInfo.jsx
"use client";

import { motion } from "motion/react";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ContactInfo() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto"
    >
      <motion.a
        variants={item}
        href="mailto:info@markazullisan.com"
        className="flex flex-col items-center text-center gap-2 rounded-2xl bg-background border border-border p-6 hover:border-secondary/50 hover:-translate-y-1 transition"
      >
        <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center">
          <FaEnvelope className="w-5 h-5 text-secondary" />
        </div>
        <span className="text-xs text-text-muted">ইমেইল</span>
        <span className="text-sm font-semibold text-foreground">
          info@markazullisan.com
        </span>
      </motion.a>

      <motion.a
        variants={item}
        href="tel:+8801000000000"
        className="flex flex-col items-center text-center gap-2 rounded-2xl bg-background border border-border p-6 hover:border-secondary/50 hover:-translate-y-1 transition"
      >
        <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center">
          <FaPhone className="w-5 h-5 text-secondary" />
        </div>
        <span className="text-xs text-text-muted">ফোন</span>
        <span className="text-sm font-semibold text-foreground">
          +880 1000-000000
        </span>
      </motion.a>

      <motion.a
        variants={item}
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center text-center gap-2 rounded-2xl bg-background border border-border p-6 hover:border-secondary/50 hover:-translate-y-1 transition"
      >
        <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center">
          <FaWhatsapp className="w-5 h-5 text-secondary" />
        </div>
        <span className="text-xs text-text-muted">হোয়াটসঅ্যাপ</span>
        <span className="text-sm font-semibold text-foreground">
          চ্যাট করুন
        </span>
      </motion.a>
    </motion.div>
  );
}