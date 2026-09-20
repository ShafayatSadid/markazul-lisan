// components/home/FeaturedTeachers.jsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa";
import TeacherCard from "./TeacherCard";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function FeaturedTeachers({ teachers }) {
  if (!teachers || teachers.length === 0) return null;

  return (
    <section className="w-full bg-background py-16 md:py-20">
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
            আমাদের <span className="text-primary">শিক্ষকবৃন্দ</span>
          </h2>
          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto">
            অভিজ্ঞ ও নিবেদিত শিক্ষকরা
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {teachers.map((teacher) => (
            <motion.div key={teacher._id} variants={item}>
              <TeacherCard teacher={teacher} />
            </motion.div>
          ))}
        </motion.div>

        {/* See all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center mt-10 md:mt-14"
        >
          <Link
            href="/teachers"
            className="inline-flex items-center gap-2 border-2 border-secondary text-secondary hover:bg-secondary hover:text-foreground font-semibold px-6 py-3 rounded-full transition-all duration-200"
          >
            সব শিক্ষক দেখুন
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}