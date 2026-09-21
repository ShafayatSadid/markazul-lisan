// components/home/FeaturedBlogs.jsx
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import BlogCard from "@/components/shared/BlogCard";

export default function FeaturedBlogs({ blogs }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (i) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onInit = () => setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onInit);
    onInit();
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onInit);
    };
  }, [emblaApi]);

  if (!blogs || blogs.length === 0) return null;

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
            সাম্প্রতিক <span className="text-primary">ব্লগ</span>
          </h2>
          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto">
            ইসলামিক জ্ঞান ও শিক্ষামূলক লেখা
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex -ml-6">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.3333%] min-w-0 pl-6"
                >
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Arrows + Dots */}
        {scrollSnaps.length > 1 && (
          <div className="flex flex-col items-center gap-6 mt-10">
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={scrollPrev}
                aria-label="Previous blogs"
                className="flex w-11 h-11 items-center justify-center rounded-full bg-background border border-border shadow-md text-foreground hover:bg-secondary transition cursor-pointer"
              >
                <IoChevronBack className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next blogs"
                className="flex w-11 h-11 items-center justify-center rounded-full bg-background border border-border shadow-md text-foreground hover:bg-secondary transition cursor-pointer"
              >
                <IoChevronForward className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to position ${i + 1}`}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    selectedIndex === i
                      ? "w-8 h-3 bg-primary"
                      : "w-3 h-3 bg-text-muted/30 hover:bg-text-muted/60"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* See all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center mt-10 md:mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border-2 border-secondary text-secondary hover:bg-secondary hover:text-foreground font-semibold px-6 py-3 rounded-full transition-all duration-200"
          >
            সব ব্লগ দেখুন
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}