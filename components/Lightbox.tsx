"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/lib/gallery";
import { spring } from "@/lib/motion";

type Props = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
};

export default function Lightbox({ items, index, onClose, onNavigate }: Props) {
  const reduce = useReducedMotion();
  const open = index !== null;
  const item = open ? items[index] : null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onNavigate((index + dir + items.length) % items.length);
    },
    [index, items.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, go]);

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} — enlarged view`}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center border border-bone/20 text-bone transition-colors hover:border-accent hover:text-accent md:top-8 md:right-8"
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous"
            className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center border border-bone/20 text-bone transition-colors hover:border-accent hover:text-accent md:left-8"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next"
            className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center border border-bone/20 text-bone transition-colors hover:border-accent hover:text-accent md:right-8"
          >
            <ChevronRight size={22} />
          </button>

          {/* Frame */}
          <motion.figure
            key={item.id}
            className="relative flex max-h-[88vh] w-[88vw] max-w-5xl flex-col items-center"
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...spring.base }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[78vh] w-auto">
              <Image
                src={item.src}
                alt={item.title}
                width={1400}
                height={1750}
                sizes="88vw"
                className="max-h-[78vh] w-auto object-contain"
                priority
              />
            </div>
            <figcaption className="mt-4 flex items-center gap-3 text-center">
              <span className="font-display text-lg font-light text-white-sharp">
                {item.title}
              </span>
              <span className="text-[10px] tracking-[0.3em] text-accent uppercase">
                {item.category}
              </span>
              <span className="text-xs text-mist">{item.year}</span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
