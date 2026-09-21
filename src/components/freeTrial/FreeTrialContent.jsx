// components/freeTrial/FreeTrialContent.jsx
"use client";

import { motion } from "motion/react";
import FreeTrialForm from "./FreeTrialForm";

export default function FreeTrialContent({ courses }) {
  return (
    <section className="w-full bg-background py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10 md:mb-14"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-3">
            ফ্রি ট্রায়াল ক্লাস
          </h1>
          <p className="text-base md:text-lg text-foreground max-w-2xl mx-auto">
            সম্পূর্ণ বিনামূল্যে প্রথম ক্লাস করে দেখুন — তারপর সিদ্ধান্ত নিন
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="bg-surface border border-border rounded-2xl p-6 md:p-10"
        >
          <FreeTrialForm courses={courses} />
        </motion.div>
      </div>
    </section>
  );
}