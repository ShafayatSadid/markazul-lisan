// components/home/HeroCarousel.jsx
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Button } from "@heroui/react";

const slides = [
  {
    image: "/images/slide-1.webp",
    title: "বাংলাভাষী প্রবাসীদের জন্য ইসলামিক শিক্ষা",
    subtitle: "Europe, America, Middle East যেখানেই থাকুন",
    ctaText: "কোর্স দেখুন",
    ctaHref: "/courses",
  },
  {
    image: "/images/slide-2.webp",
    title: "কুরআন শিখুন ঘরে বসে",
    subtitle: "অভিজ্ঞ শিক্ষকদের সাথে এক-এক করে",
    ctaText: "ফ্রি ট্রায়াল ক্লাস",
    ctaHref: "/free-trial",
  },
  {
    image: "/images/slide-3.webp",
    title: "১০০+ শিক্ষার্থী সফলভাবে শিখছে",
    subtitle: "আলহামদুলিল্লাহ",
    ctaText: "শিক্ষার্থীদের দেখুন",
    ctaHref: "/students",
  },
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

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

  return (
    <section className="relative w-full h-[500px] md:h-screen overflow-hidden">
      {/* Viewport */}
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="relative min-w-0 flex-[0_0_100%] h-full"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={i === 0}
                className="object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 text-center md:text-left text-white">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-base md:text-xl mb-6 md:mb-8 max-w-xl mx-auto md:mx-0 text-white/90">
                    {slide.subtitle}
                  </p>
                  <Link href={slide.ctaHref}>
                    <Button className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-200 hover:scale-105">
                      {slide.ctaText}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows — desktop only */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition cursor-pointer"
      >
        <IoChevronBack className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition cursor-pointer"
      >
        <IoChevronForward className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              selectedIndex === i
                ? "w-8 h-3 bg-primary"
                : "w-3 h-3 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}