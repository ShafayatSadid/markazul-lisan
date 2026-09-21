// components/about/AboutContent.jsx
"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  FaBullseye,
  FaEye,
  FaQuran,
  FaChalkboardTeacher,
  FaHeart,
} from "react-icons/fa";
import ContactInfo from "@/components/shared/ContactInfo";

const values = [
  {
    icon: FaQuran,
    title: "সহীহ ইলম",
    description:
      "কুরআন ও সুন্নাহর বিশুদ্ধ জ্ঞান — যাচাই করা ও নির্ভরযোগ্য সূত্র থেকে।",
  },
  {
    icon: FaChalkboardTeacher,
    title: "আন্তরিক শিক্ষক",
    description:
      "দেশ-বিদেশের অভিজ্ঞ ও নিবেদিত শিক্ষকরা ধৈর্য ধরে প্রতিটা শিক্ষার্থীকে শেখান।",
  },
  {
    icon: FaHeart,
    title: "সাশ্রয়ী মূল্য",
    description:
      "প্রবাসী পরিবারের কথা ভেবে সর্বোচ্চ সাশ্রয়ী খরচে মানসম্মত শিক্ষা।",
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

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="w-full bg-surface py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4"
          >
            আমাদের সম্পর্কে
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-base md:text-lg text-text-muted max-w-2xl mx-auto"
          >
            প্রবাসী বাংলাদেশিদের জন্য একটি অনলাইন ইসলামিক শিক্ষার প্ল্যাটফর্ম
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="w-full bg-background py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary/10 border border-border flex items-center justify-center order-2 lg:order-1"
            >
              <Image
                src="/images/about-story.webp"
                alt="Markazul Lisan story"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground mb-5">
                আমাদের <span className="text-primary">গল্প</span>
              </h2>
              <div className="space-y-4 text-base text-text-muted leading-relaxed">
                <p>
                  প্রবাসে থেকেও মাতৃভাষায় ইসলামিক শিক্ষার সুযোগ পাওয়া কঠিন।
                  এই সমস্যাটি থেকেই <strong className="text-foreground">মারকাজুল লিসান</strong>-এর যাত্রা শুরু।
                </p>
                <p>
                  Europe, America, Middle East — যেখানেই থাকুন, ঘরে বসে
                  অভিজ্ঞ শিক্ষকদের সাথে কুরআন, হাদিস ও ইসলামিক মূলনীতি
                  শেখার সুযোগ করে দিচ্ছি আমরা।
                </p>
                <p>
                  আমাদের লক্ষ্য শুধু জ্ঞান দেওয়া নয় — বরং প্রতিটি পরিবারে
                  ইসলামের আলো পৌঁছে দেওয়া।
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="w-full bg-surface py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Mission */}
            <motion.div
              variants={item}
              className="rounded-2xl bg-background border border-border p-7 md:p-9 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <FaBullseye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                আমাদের লক্ষ্য
              </h3>
              <p className="text-sm md:text-base text-text-muted leading-relaxed">
                প্রবাসী বাংলাদেশিদের জন্য সহজলভ্য, মানসম্মত ও বিশুদ্ধ
                ইসলামিক শিক্ষার ব্যবস্থা করা — যেন ঘরে বসেই তারা
                পরিবার-পরিজন নিয়ে দ্বীন শিখতে পারেন।
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={item}
              className="rounded-2xl bg-background border border-border p-7 md:p-9 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-14 h-14 rounded-full bg-secondary/15 flex items-center justify-center mb-5">
                <FaEye className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                আমাদের স্বপ্ন
              </h3>
              <p className="text-sm md:text-base text-text-muted leading-relaxed">
                বিশ্বের প্রতিটি প্রবাসী বাংলাদেশি পরিবারে কুরআন ও সুন্নাহর
                শিক্ষা পৌঁছে দেওয়া — যেন প্রবাসী প্রজন্ম শিকড় থেকে
                বিচ্ছিন্ন না হয়ে পড়ে।
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full bg-background py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-10 md:mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              আমাদের মূল্যবোধ
            </h2>
            <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto">
              যা আমাদের চালিয়ে যায়
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={item}
                  className="flex flex-col items-center text-center gap-4 rounded-2xl bg-surface border border-border p-7 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-lg"
                >
                  <div className="w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground">
                    {v.title}
                  </h3>
                  <p className="text-sm md:text-base text-text-muted leading-relaxed">
                    {v.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="w-full bg-surface py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-8 md:mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
              যোগাযোগ
            </h2>
            <p className="text-base text-text-muted">
              যেকোনো প্রশ্নে আমাদের সাথে যোগাযোগ করুন
            </p>
          </motion.div>

          <ContactInfo />
        </div>
      </section>
    </>
  );
}