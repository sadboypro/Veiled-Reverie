"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { spring } from "@/lib/motion";
import { heroImages } from "@/lib/works";

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  // If the preloader already ran this session, don't delay the hero behind it.
  const [seen] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem("vr_seen") === "1",
  );

  // Parallax: the photo drifts slower than the scroll.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.9]);

  // Slow crossfade between hero frames.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % heroImages.length),
      5200,
    );
    return () => clearInterval(id);
  }, [reduce]);

  // Hero content waits for the preloader curtain to lift on first load only.
  const base = reduce || seen ? 0 : 1.7;

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
    >
      {/* Media */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        {heroImages.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === active ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        ))}
        <motion.div
          className="absolute inset-0 bg-void"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-void/60" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            className="mb-6 flex items-center gap-4"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...spring.base, delay: base }}
          >
            <span className="h-px w-12 bg-accent" />
            <span className="text-xs tracking-[0.3em] text-mist uppercase">
              Visual Storyteller
            </span>
          </motion.div>

          <h1 className="font-display text-5xl leading-[0.95] font-light tracking-tight text-white-sharp sm:text-6xl md:text-8xl">
            {["Where Moments", "Become Timeless"].map((line, i) => (
              <span key={line} className="block overflow-hidden py-1">
                <motion.span
                  className="block"
                  initial={reduce ? { y: "0%" } : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ ...spring.soft, delay: base + 0.15 + i * 0.12 }}
                >
                  {i === 1 ? (
                    <span>
                      Become <em className="font-normal text-accent not-italic">Timeless</em>
                    </span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-8 max-w-md text-balance text-base leading-relaxed text-mist md:text-lg"
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.base, delay: base + 0.5 }}
          >
            Crafting visual narratives that unveil the extraordinary within the
            ordinary. Every frame tells a story waiting to be discovered.
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.base, delay: base + 0.65 }}
          >
            <Link
              href="/works"
              className="group mt-10 inline-flex items-center gap-3 border border-ash px-7 py-4 text-sm tracking-wide text-bone transition-colors hover:border-bone"
            >
              <span>Explore the Vision</span>
              <ArrowDownRight
                size={18}
                className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:translate-y-1"
              />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: base + 1, duration: 0.6 }}
      >
        <span className="text-[10px] tracking-[0.3em] text-smoke uppercase">
          Scroll
        </span>
        <motion.span
          className="h-10 w-px bg-gradient-to-b from-smoke to-transparent"
          animate={reduce ? {} : { scaleY: [0.4, 1, 0.4], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Frame indicators */}
      <div className="absolute right-6 bottom-8 z-10 hidden items-center gap-2 md:flex">
        {heroImages.map((_, i) => (
          <button
            key={i}
            aria-label={`View frame ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-px transition-all duration-500 ${
              i === active ? "w-8 bg-bone" : "w-4 bg-ash"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
