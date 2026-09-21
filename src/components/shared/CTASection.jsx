// components/shared/CTASection.jsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa";

export default function CTASection() {
  return (
    <section className="w-full bg-primary-deep text-primary-deep-foreground py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4"
        >
          আজই শুরু করুন আপনার যাত্রা
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-base md:text-lg text-primary-deep-foreground/80 max-w-2xl mx-auto mb-8"
        >
          ঘরে বসে ইসলামিক শিক্ষার আলোয় আলোকিত হোন
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <Link
            href="/admission"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-primary-deep font-semibold px-7 py-3.5 rounded-full shadow-md transition-all duration-200 hover:scale-[1.02]"
          >
            ভর্তি হোন
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}