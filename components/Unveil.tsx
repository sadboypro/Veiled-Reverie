"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { spring, fadeUp, viewportOnce } from "@/lib/motion";

/**
 * The Veil — the site's signature interaction.
 * A shrouded photograph (darkened, blurred, grain) that the visitor reveals
 * by moving a soft "lens" of clarity. Embodies the brand: revealing what is felt.
 *
 * - Fine pointer (mouse): the veil parts under the cursor.
 * - Coarse pointer (touch): the veil lifts on tap, and auto-hints once in view.
 * - Reduced motion: the photograph is shown clear, no veil.
 */
export default function Unveil() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);

  // Pointer capability + reveal state.
  const [finePointer, setFinePointer] = useState(true);
  const [lensActive, setLensActive] = useState(false);
  const [touchRevealed, setTouchRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    const set = () => setFinePointer(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const moveLens = useCallback((clientX: number, clientY: number) => {
    const el = frameRef.current;
    if (!el) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    });
  }, []);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduce || !finePointer) return;
    setLensActive(true);
    moveLens(e.clientX, e.clientY);
  };

  // The veil's opacity: fully gone when reduced-motion or touch-revealed.
  const veilHidden = reduce || touchRevealed;

  // Radius of the clarity lens (0 when veil should fully cover via mask logic).
  // When lensActive and fine pointer: a soft hole follows the cursor.
  // Otherwise: no hole (full veil) unless veilHidden.
  const lensRadius = finePointer && lensActive ? 130 : 0;

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-24 md:px-12 md:py-32"
      aria-label="Featured photograph — interactive reveal"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-10 flex items-center gap-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="h-px w-10 bg-accent" />
          <span className="text-xs tracking-[0.3em] text-smoke uppercase">
            The Veil
          </span>
        </motion.div>

        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-12">
          <motion.div
            className="md:col-span-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="font-display text-3xl font-light leading-[1.05] tracking-tight text-white-sharp md:text-5xl">
              Look <em className="font-normal text-accent not-italic">closer</em>.
            </h2>
            <p className="mt-5 max-w-xs text-balance text-mist">
              Some stories only surface when you stop to find them.{" "}
              <span className="text-bone">
                {reduce
                  ? "Here, in full."
                  : finePointer
                    ? "Move across the frame to unveil it."
                    : "Tap the frame to unveil it."}
              </span>
            </p>
          </motion.div>

          <motion.div
            className="md:col-span-8"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ ...spring.base }}
          >
            <div
              ref={frameRef}
              onPointerMove={onPointerMove}
              onPointerLeave={() => setLensActive(false)}
              onClick={() => !finePointer && setTouchRevealed((v) => !v)}
              role={!finePointer && !reduce ? "button" : undefined}
              tabIndex={!finePointer && !reduce ? 0 : undefined}
              onKeyDown={(e) => {
                if (!finePointer && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  setTouchRevealed((v) => !v);
                }
              }}
              aria-label={
                !finePointer && !reduce ? "Tap to unveil the photograph" : undefined
              }
              className="group relative aspect-[16/10] w-full cursor-crosshair overflow-hidden bg-charcoal"
              style={
                {
                  "--mx": "50%",
                  "--my": "50%",
                } as React.CSSProperties
              }
            >
              {/* Sharp photograph underneath */}
              <Image
                src="/images/a_1.jpg"
                alt="Reverie — a veiled figure revealed"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover"
              />

              {/* The veil: darkened + blurred copy that the lens parts */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-700"
                style={{
                  opacity: veilHidden ? 0 : 1,
                  WebkitMaskImage:
                    lensRadius > 0
                      ? `radial-gradient(circle ${lensRadius}px at var(--mx) var(--my), transparent 0%, transparent 35%, black 78%)`
                      : "none",
                  maskImage:
                    lensRadius > 0
                      ? `radial-gradient(circle ${lensRadius}px at var(--mx) var(--my), transparent 0%, transparent 35%, black 78%)`
                      : "none",
                }}
              >
                <Image
                  src="/images/a_1.jpg"
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="scale-105 object-cover blur-xl brightness-[0.35] saturate-50"
                />
                <div className="absolute inset-0 bg-void/40" />
              </div>

              {/* Faint frame + hint ring */}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-bone/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
