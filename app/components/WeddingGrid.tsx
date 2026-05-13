"use client";

import gridItemOne from "@/app/assets/wedding-grid.png";
import gridItemTwo from "@/app/assets/wedding-grid-2.png";
import gridItemThree from "@/app/assets/wedding-grid-3.png";
import gridItemFour from "@/app/assets/wedding-grid-4.png";
import gridItemFive from "@/app/assets/wedding-grid-5.png";

import Image, { StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type WeddingImage = {
  src: StaticImageData;
  alt: string;
};

const images: WeddingImage[] = [
  { src: gridItemOne, alt: "Michael" },
  { src: gridItemTwo, alt: "Ifeoma" },
  { src: gridItemThree, alt: "Ifeoma" },
  { src: gridItemFour, alt: "Michael" },
  { src: gridItemFive, alt: "Ifeoma and Michael" },
];

const WeddingGrid = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  const closeLightbox = () => setActiveIndex(null);

  const showPrevious = () => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === 0 ? images.length - 1 : current - 1;
    });
  };

  const showNext = () => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === images.length - 1 ? 0 : current + 1;
    });
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  const imageClassName =
    "object-cover transition duration-500 group-hover:scale-105";

  return (
    <>
      <section className="w-full my-18 max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid gap-2 md:gap-3 grid-cols-[1fr_1.5fr] h-[420px] md:h-[670px]">
          <div className="flex flex-col gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => setActiveIndex(0)}
              className="group relative flex-1 rounded-2xl overflow-hidden"
            >
              <Image
                src={gridItemOne}
                alt="Michael"
                fill
                className={imageClassName}
                placeholder="blur"
              />
            </button>

            <button
              type="button"
              onClick={() => setActiveIndex(1)}
              className="group relative flex-1 rounded-2xl overflow-hidden"
            >
              <Image
                src={gridItemTwo}
                alt="Ifeoma"
                fill
                className={imageClassName}
                placeholder="blur"
              />
            </button>
          </div>

          <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex gap-2 md:gap-3 flex-[3]">
              <button
                type="button"
                onClick={() => setActiveIndex(2)}
                className="group relative flex-1 rounded-2xl overflow-hidden"
              >
                <Image
                  src={gridItemThree}
                  alt="Ifeoma"
                  fill
                  className={imageClassName}
                  placeholder="blur"
                />
              </button>

              <button
                type="button"
                onClick={() => setActiveIndex(3)}
                className="group relative flex-1 rounded-2xl overflow-hidden"
              >
                <Image
                  src={gridItemFour}
                  alt="Michael"
                  fill
                  className={imageClassName}
                  placeholder="blur"
                />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setActiveIndex(4)}
              className="group relative flex-[2] rounded-2xl overflow-hidden"
            >
              <Image
                src={gridItemFive}
                alt="Ifeoma and Michael"
                fill
                className={imageClassName}
                placeholder="blur"
              />
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-5 top-5 z-50 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/20"
              aria-label="Close lightbox"
            >
              <X size={22} />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              className="absolute left-4 md:left-8 z-50 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            <motion.div
              key={activeIndex}
              className="relative h-[75vh] w-full max-w-5xl overflow-hidden rounded-3xl"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-contain"
                placeholder="blur"
                priority
              />
            </motion.div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="absolute right-4 md:right-8 z-50 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/20"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WeddingGrid;
