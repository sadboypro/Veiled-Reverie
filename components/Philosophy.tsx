"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const WORDS =
  "Photography is not about capturing what is seen, but revealing what is felt. Every frame holds a secret, every shadow tells a story waiting to be discovered.".split(
    " ",
  );

export default function Philosophy() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"],
  });
  // Map scroll progress to the number of "lit" words.
  const lit = useTransform(scrollYProgress, [0, 1], [0, WORDS.length]);

  return (
    <section id="story" className="relative px-6 py-32 md:px-12 md:py-48">
      <div ref={ref} className="mx-auto max-w-4xl">
        <motion.div
          className="mb-10 flex items-center gap-4"
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="h-px w-8 bg-accent" />
          <span className="text-xs tracking-[0.3em] text-smoke uppercase">
            The Philosophy
          </span>
        </motion.div>

        {/* Scroll-driven word illumination */}
        <p className="font-display text-2xl leading-snug font-light tracking-tight text-balance sm:text-3xl md:text-5xl md:leading-[1.15]">
          {WORDS.map((word, i) => (
            <Word key={i} index={i} lit={lit} reduce={!!reduce}>
              {word}
            </Word>
          ))}
        </p>

        <motion.div
          className="mt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.span
            variants={fadeUp}
            className="text-sm tracking-wide text-smoke"
          >
            — Prosper Mayaki
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

function Word({
  children,
  index,
  lit,
  reduce,
}: {
  children: string;
  index: number;
  lit: ReturnType<typeof useTransform<number, number>>;
  reduce: boolean;
}) {
  const opacity = useTransform(lit, (v) => {
    if (reduce) return 1;
    const d = v - index;
    return d > 0 ? Math.min(1, 0.2 + d) : 0.2;
  });
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}
