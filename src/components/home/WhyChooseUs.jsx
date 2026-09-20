// components/home/WhyChooseUs.jsx
"use client";

import { motion } from "motion/react";
import {
  FaChalkboardTeacher,
  FaLaptopHouse,
  FaUserGraduate,
} from "react-icons/fa";

const features = [
  {
    icon: FaChalkboardTeacher,
    title: "অভিজ্ঞ শিক্ষক",
    description:
      "দেশ-বিদেশের অভিজ্ঞ ও দক্ষ শিক্ষকরা ক্লাস পরিচালনা করবেন।",
  },
  {
    icon: FaLaptopHouse,
    title: "ঘরে বসে শিখুন",
    description:
      "যেখানেই থাকুন, যেকোনো সময়ে অনলাইনে শিখতে পারবেন।",
  },
  {
    icon: FaUserGraduate,
    title: "এক-এক করে শেখানো",
    description:
      "প্রতিটা শিক্ষার্থীকে আলাদা করে দেখানো হয় — নিজের গতিতে শেখা।",
  },
];

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

export default function WhyChooseUs() {
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
            কেন <span className="text-primary">আমাদের</span> বেছে নেবেন?
          </h2>
          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto">
            যা আমাদের আলাদা করে তোলে
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={item}
                className="flex flex-col items-center text-center gap-4 rounded-2xl bg-background border border-border p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-lg"
              >
                <div className="w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-secondary" />
                </div>

                <h3 className="text-lg md:text-xl font-bold text-foreground">
                  {feature.title}
                </h3>

                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}