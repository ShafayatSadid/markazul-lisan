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
import {
  FaUserGraduate,
  FaGlobe,
  FaChalkboardTeacher,
  FaBookOpen,
} from "react-icons/fa";

const stats = [
  { value: 100, label: "শিক্ষার্থী", icon: FaUserGraduate },
  { value: 10, label: "দেশ", icon: FaGlobe },
  { value: 5, label: "শিক্ষক", icon: FaChalkboardTeacher },
  { value: 20, label: "কোর্স", icon: FaBookOpen },
];

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
    <section className="w-full bg-surface py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center gap-3 rounded-2xl bg-secondary/20 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl md:text-4xl font-extrabold text-primary leading-none">
                  <CountUp to={stat.value} />
                </p>
                <p className="text-sm md:text-base text-primary/80">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}