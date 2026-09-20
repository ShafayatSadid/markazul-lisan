// components/home/Testimonials.jsx
"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { FaStar } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function Stars({ rating = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <FaStar
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "text-secondary" : "text-text-muted/30"
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials({ results }) {
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

  if (!results || results.length === 0) return null;

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
            <span className="text-primary">শিক্ষার্থীদের</span> মতামত
          </h2>
          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto">
            তাদের অভিজ্ঞতা থেকে জানুন আমাদের কোর্স কেমন
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
              {results.map((r) => {
                const initials =
                  r.studentName?.slice(0, 1).toUpperCase() || "?";

                return (
                  <div
                    key={r._id}
                    className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.3333%] min-w-0 pl-6"
                  >
                    <div className="flex flex-col h-full rounded-2xl bg-surface border border-border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <Stars rating={r.rating || 5} />

                      <p className="mt-5 text-base text-foreground leading-relaxed line-clamp-4 flex-1">
                        {r.comment}
                      </p>

                      <div className="flex items-center gap-3 mt-6">
                        <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center flex-shrink-0">
                          <span className="text-secondary text-sm font-bold">
                            {initials}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-foreground truncate">
                            {r.studentName}
                          </p>
                          {r.courseName && (
                            <p className="text-xs text-secondary truncate">
                              {r.courseName}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Arrows + Dots নিচে */}
        {scrollSnaps.length > 1 && (
          <div className="flex flex-col items-center gap-6 mt-10">
            {/* Arrows */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={scrollPrev}
                aria-label="Previous testimonials"
                className="flex w-11 h-11 items-center justify-center rounded-full bg-background border border-border shadow-md text-foreground hover:bg-secondary transition cursor-pointer"
              >
                <IoChevronBack className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next testimonials"
                className="flex w-11 h-11 items-center justify-center rounded-full bg-background border border-border shadow-md text-foreground hover:bg-secondary transition cursor-pointer"
              >
                <IoChevronForward className="w-5 h-5" />
              </button>
            </div>

            {/* Dots */}
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
      </div>
    </section>
  );
}