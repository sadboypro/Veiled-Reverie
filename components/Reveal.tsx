"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce } from "@/lib/motion";

/**
 * Small client island so otherwise-static server components can still get the
 * site's signature fade-up reveal without shipping the whole page as client JS.
 *
 * `trigger="mount"` animates immediately (for above-the-fold intros);
 * `trigger="view"` (default) animates when scrolled into view.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  trigger = "view",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  trigger?: "view" | "mount";
}) {
  const reduce = useReducedMotion();

  const triggerProps =
    trigger === "mount"
      ? { initial: reduce ? "visible" : "hidden", animate: "visible" }
      : {
          initial: reduce ? "visible" : "hidden",
          whileInView: "visible",
          viewport: viewportOnce,
        };

  return (
    <motion.div className={className} variants={fadeUp} custom={delay} {...triggerProps}>
      {children}
    </motion.div>
  );
}
