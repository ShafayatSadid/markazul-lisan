// components/home/StatsBar.jsx
"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";

const stats = [
  { value: 100, label: "শিক্ষার্থী" },
  { value: 10, label: "দেশ" },
  { value: 5, label: "শিক্ষক" },
  { value: 20, label: "কোর্স" },
];

// ০ থেকে target সংখ্যা পর্যন্ত count-up
function CountUp({ to, duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, to, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [isInView, to, duration, count]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>+
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="w-full bg-[#062B1E] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative flex flex-col items-center text-center"
            >
              {i !== 0 && (
                <span className="hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 h-12 w-px bg-white/10" />
              )}
              <p className="text-3xl md:text-4xl font-extrabold text-secondary mb-1">
                <CountUp to={stat.value} />
              </p>
              <p className="text-sm md:text-base text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}