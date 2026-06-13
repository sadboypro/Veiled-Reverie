"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { clipReveal, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { works, type Work } from "@/lib/works";

// Asymmetric magazine spans (12-col grid on desktop).
const spanClass: Record<Work["span"], string> = {
  feature: "md:col-span-7 md:row-span-2 aspect-[4/5] md:aspect-auto",
  tall: "md:col-span-5 md:row-span-2 aspect-[4/5] md:aspect-auto",
  wide: "md:col-span-7 aspect-[16/10]",
  regular: "md:col-span-5 aspect-[4/3]",
};

export default function FeaturedGrid() {
  return (
    <section id="works" className="relative px-6 py-24 md:px-12">
      <motion.div
        className="mx-auto mb-16 flex max-w-7xl items-end justify-between"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div>
          <motion.div variants={fadeUp} className="mb-4 flex items-center gap-4">
            <span className="h-px w-8 bg-accent" />
            <span className="text-xs tracking-[0.3em] text-smoke uppercase">
              Selected Works
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl font-light tracking-tight text-white-sharp md:text-6xl"
          >
            Curated <em className="font-normal text-accent not-italic">Visions</em>
          </motion.h2>
        </div>
        <motion.div variants={fadeUp}>
          <Link
            href="/works"
            className="group hidden items-center gap-2 text-sm tracking-wide text-mist transition-colors hover:text-white-sharp md:flex"
          >
            All works
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>
      </motion.div>

      <div className="mx-auto grid max-w-7xl auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
        {works.map((work, i) => (
          <WorkCard key={work.id} work={work} index={i} />
        ))}
      </div>
    </section>
  );
}

function WorkCard({ work, index }: { work: Work; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className={`group relative overflow-hidden bg-charcoal ${spanClass[work.span]}`}
      variants={clipReveal}
      custom={(index % 3) * 0.08}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <Link href="/works" className="block h-full w-full">
        {/* Image scales + pans gently on hover */}
        <motion.div
          className="absolute inset-0"
          whileHover={reduce ? {} : { scale: 1.06 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <Image
            src={work.image}
            alt={work.title}
            fill
            sizes="(max-width: 768px) 100vw, 58vw"
            className="object-cover"
          />
        </motion.div>

        {/* Cinematic scrim — deepens on hover to surface text */}
        <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Meta */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
          <div>
            <span className="text-[10px] tracking-[0.3em] text-accent uppercase">
              {work.category}
            </span>
            <h3 className="mt-2 font-display text-2xl font-light text-white-sharp md:text-3xl">
              {work.title}
            </h3>

            {/* Hidden narrative line — reveals on hover */}
            <div className="grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr]">
              <p className="min-h-0 max-w-xs translate-y-2 text-sm text-mist opacity-0 transition-all duration-[400ms] group-hover:translate-y-0 group-hover:opacity-100">
                {work.narrative}
              </p>
            </div>
          </div>

          <span className="font-display text-sm text-smoke">{work.year}</span>
        </div>

        {/* Corner action */}
        <div className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center border border-bone/20 text-bone opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 md:top-8 md:right-8">
          <ArrowUpRight size={18} />
        </div>
      </Link>
    </motion.article>
  );
}
