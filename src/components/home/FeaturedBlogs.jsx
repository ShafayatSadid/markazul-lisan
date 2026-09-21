// components/home/FeaturedBlogs.jsx
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { FaCalendarAlt, FaArrowRight, FaBookOpen } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

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
              {blogs.map((blog) => {
                const date = blog.createdAt
                  ? new Date(blog.createdAt).toISOString().slice(0, 10)
                  : "";

                return (
                  <div
                    key={blog._id}
                    className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.3333%] min-w-0 pl-6"
                  >
                    <Link
                      href={`/blog/${blog._id}`}
                      className="block group h-full"
                    >
                      <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-surface border border-border transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">

                        {/* Image */}
                        <div className="relative aspect-video w-full bg-secondary/10 flex items-center justify-center overflow-hidden">
                          {blog.image ? (
                            <Image
                              src={blog.image}
                              alt={blog.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <FaBookOpen className="w-12 h-12 text-secondary/40" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1 p-6">
                          {date && (
                            <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
                              <FaCalendarAlt className="w-3.5 h-3.5 text-secondary" />
                              <span>{date}</span>
                            </div>
                          )}

                          <h3 className="text-base md:text-lg font-bold text-foreground line-clamp-2 group-hover:text-secondary transition-colors">
                            {blog.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
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