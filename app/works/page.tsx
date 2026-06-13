"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import { spring, fadeUp, viewportOnce } from "@/lib/motion";
import { gallery, categories, type Category } from "@/lib/gallery";

type Filter = "All" | Category;

export default function WorksPage() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<number | null>(null);
  const [cols, setCols] = useState(1);

  // Responsive column count — drives an ordered (round-robin) masonry so the
  // visual reading order matches the DOM order (CSS columns would not).
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setCols(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const items = useMemo(
    () => (filter === "All" ? gallery : gallery.filter((g) => g.category === filter)),
    [filter],
  );

  // Distribute items left-to-right across columns, preserving original index.
  const columns = useMemo(
    () =>
      Array.from({ length: cols }, (_, c) =>
        items
          .map((item, i) => ({ item, i }))
          .filter(({ i }) => i % cols === c),
      ),
    [items, cols],
  );

  const tabs: Filter[] = ["All", ...categories];

  return (
    <>
      <Header />
      <main className="px-6 pt-32 pb-24 md:px-12 md:pt-40">
        {/* Intro */}
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-4 flex items-center gap-4"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.base }}
          >
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs tracking-[0.3em] text-smoke uppercase">
              Portfolio
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-5xl font-light tracking-tight text-white-sharp md:text-8xl"
              initial={reduce ? { y: "0%" } : { y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ ...spring.soft, delay: 0.1 }}
            >
              The Complete <em className="font-normal text-accent not-italic">Works</em>
            </motion.h1>
          </div>

          <motion.p
            className="mt-6 max-w-xl text-balance text-mist"
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.base, delay: 0.3 }}
          >
            A growing archive of frames — portraits, fashion, documentary and
            quiet conceptual studies. Each one a moment held a little longer.
          </motion.p>

          {/* Filters */}
          <motion.div
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-b border-ash/40 pb-6"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...spring.base, delay: 0.45 }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setFilter(tab);
                  setActive(null);
                }}
                className={`relative -my-1 py-3 text-sm tracking-wide transition-colors [touch-action:manipulation] ${
                  filter === tab ? "text-white-sharp" : "text-smoke hover:text-mist"
                }`}
              >
                {tab}
                {filter === tab && (
                  <motion.span
                    layoutId="filter-underline"
                    className="absolute -bottom-[13px] left-0 h-px w-full bg-accent"
                    transition={spring.snappy}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Ordered masonry — reading order matches DOM order */}
        <h2 className="sr-only">{filter === "All" ? "All works" : `${filter} works`}</h2>
        <div key={`${filter}-${cols}`} className="mx-auto mt-10 flex max-w-7xl gap-4">
          {columns.map((col, ci) => (
            <div key={ci} className="flex flex-1 flex-col gap-4">
              {col.map(({ item, i }) => (
                <motion.figure
                  key={item.id}
                  className="group relative block w-full cursor-pointer overflow-hidden bg-charcoal"
                  initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ ...spring.base, delay: reduce ? 0 : (i % 6) * 0.05 }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`View ${item.title} enlarged`}
                    className="absolute inset-0 z-10 cursor-pointer"
                  />
                  <motion.div
                    whileHover={reduce ? {} : { scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={800}
                      height={1000}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="h-auto w-full object-cover"
                    />
                  </motion.div>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/85 via-void/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-5 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <h3 className="font-display text-lg font-light text-white-sharp">
                      {item.title}
                    </h3>
                    <span className="mt-1 flex items-center gap-3">
                      <span className="text-[10px] tracking-[0.3em] text-accent uppercase">
                        {item.category}
                      </span>
                      <span className="text-xs text-mist">{item.year}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <p className="mx-auto mt-16 max-w-7xl text-center text-smoke">
            No frames in this category yet.
          </p>
        )}
      </main>
      <Lightbox items={items} index={active} onClose={() => setActive(null)} onNavigate={setActive} />
      <Footer />
    </>
  );
}
