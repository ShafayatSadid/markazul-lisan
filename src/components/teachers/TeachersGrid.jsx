// components/teachers/TeachersGrid.jsx
"use client";

import { motion } from "motion/react";
import TeacherCard from "@/components/shared/TeacherCard";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

export default function TeachersGrid({ teachers }) {
  return (
    <section className="w-full bg-background py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10 md:mb-14"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-3">
            আমাদের শিক্ষকবৃন্দ
          </h1>
          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto">
            দেশ-বিদেশের অভিজ্ঞ ও নিবেদিত শিক্ষকবৃন্দ
          </p>
        </motion.div>

        {/* Empty state */}
        {teachers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text-muted text-base md:text-lg">
              এখনো কোনো শিক্ষক যোগ করা হয়নি
            </p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {teachers.map((teacher) => (
              <motion.div key={teacher._id} variants={item}>
                <TeacherCard teacher={teacher} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}