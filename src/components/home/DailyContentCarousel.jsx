// components/home/DailyContentCarousel.jsx
"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const typeLabels = {
  quran: { label: "কুরআন", cls: "bg-primary/15 text-primary" },
  hadith: { label: "হাদিস", cls: "bg-secondary/15 text-secondary" },
};

export default function DailyContentCarousel({ contents }) {
  const filtered = (contents || []).filter(
    (c) => c.type === "quran" || c.type === "hadith"
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

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
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  if (filtered.length === 0) return null;

  return (
    <section className="w-full bg-surface py-16 md:py-20 overflow-hidden">
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
            দৈনন্দিন জীবনে ইসলামের আলো
          </h2>
          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto">
            কুরআন ও হাদিস থেকে প্রতিদিনের শিক্ষা
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {filtered.map((item) => {
                const badge = typeLabels[item.type];
                return (
                  <div
                    key={item._id}
                    className="min-w-0 flex-[0_0_100%] px-2 md:px-4"
                  >
                    <div className="max-w-3xl mx-auto rounded-2xl bg-background border border-border p-6 md:p-10 transition-shadow duration-300 hover:shadow-lg">
                      {/* Badge */}
                      <span
                        className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-5 ${badge.cls}`}
                      >
                        {badge.label}
                      </span>

                      {/* Title */}
                      {item.title && (
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                          {item.title}
                        </h3>
                      )}

                      {/* Content */}
                      <p className="text-base md:text-lg text-text-muted leading-relaxed mb-6">
                        {item.content}
                      </p>

                      {/* Reference */}
                      {item.reference && (
                        <div className="border-t border-border pt-4 text-sm text-text-muted italic text-right">
                          — {item.reference}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Arrows — desktop only */}
          <button
            onClick={scrollPrev}
            aria-label="Previous content"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-background border border-border shadow-md text-foreground hover:bg-secondary hover:text-foreground transition cursor-pointer"
          >
            <IoChevronBack className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next content"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-background border border-border shadow-md text-foreground hover:bg-secondary hover:text-foreground transition cursor-pointer"
          >
            <IoChevronForward className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {filtered.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to content ${i + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                selectedIndex === i
                  ? "w-8 h-3 bg-primary"
                  : "w-3 h-3 bg-text-muted/30 hover:bg-text-muted/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}