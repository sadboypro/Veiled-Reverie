import type { Variants, Transition } from "framer-motion";

/* ------------------------------------------------------------------ *
 * Spring physics — the signature of the redesign.
 * We avoid linear/easeInOut tweens in favor of springs that feel
 * weighted and filmic.
 * ------------------------------------------------------------------ */
export const spring = {
  /** Gentle, heavy reveal — for large hero/headline elements. */
  soft: { type: "spring", stiffness: 90, damping: 20, mass: 1 } as Transition,
  /** Standard content reveal. */
  base: { type: "spring", stiffness: 140, damping: 22, mass: 0.9 } as Transition,
  /** Snappy, responsive — for hover / interactive feedback. */
  snappy: { type: "spring", stiffness: 300, damping: 26, mass: 0.6 } as Transition,
  /** Slow cinematic drift — for parallax/scale on imagery. */
  drift: { type: "spring", stiffness: 60, damping: 18, mass: 1.2 } as Transition,
};

/* ------------------------------------------------------------------ *
 * Reveal variants — text & blocks stagger into view on scroll.
 * `custom` carries a per-element delay (seconds).
 * ------------------------------------------------------------------ */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(6px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...spring.base, delay },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { ...spring.soft, delay },
  }),
};

/* Masked line reveal — words/headlines rise out of an overflow-hidden clip. */
export const lineRise: Variants = {
  hidden: { y: "110%" },
  visible: (delay: number = 0) => ({
    y: "0%",
    transition: { ...spring.soft, delay },
  }),
};

/* Image clip-reveal — wipes upward to expose the photo. */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: (delay: number = 0) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { ...spring.drift, delay },
  }),
};

/* ------------------------------------------------------------------ *
 * Stagger containers — pace children into view.
 * ------------------------------------------------------------------ */
export const staggerContainer: Variants = {
  hidden: {},
  visible: (stagger: number = 0.08) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.1 },
  }),
};

/* Shared viewport config for whileInView reveals. */
export const viewportOnce = { once: true, amount: 0.3, margin: "0px 0px -10% 0px" };
