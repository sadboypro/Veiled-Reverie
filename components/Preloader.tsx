"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { spring } from "@/lib/motion";

const NAME = "VEILED";

export default function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  // Lock scroll while the curtain is up.
  useEffect(() => {
    if (!done) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  // Animate a faux load, then lift the curtain.
  useEffect(() => {
    const finish = () => {
      try {
        sessionStorage.setItem("vr_seen", "1");
      } catch {}
      setDone(true);
    };

    // Already shown this session — don't gate the user again.
    if (typeof window !== "undefined" && sessionStorage.getItem("vr_seen") === "1") {
      setProgress(100);
      setDone(true);
      return;
    }

    if (reduce) {
      setProgress(100);
      const t = setTimeout(finish, 200);
      return () => clearTimeout(t);
    }
    let frame: number;
    let finished = false;
    const start = performance.now();
    const DURATION = 700;
    const settle = () => {
      if (finished) return;
      finished = true;
      finish();
    };
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      // ease-out cubic for a decelerating counter
      setProgress(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(settle, 120);
      }
    };
    frame = requestAnimationFrame(tick);
    // Safety net: rAF is throttled in background/hidden tabs, so the curtain
    // would otherwise never lift. This guarantees it always does.
    const guard = setTimeout(() => {
      setProgress(100);
      settle();
    }, DURATION + 350);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(guard);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label={`Loading, ${progress} percent`}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          initial={{ opacity: 1 }}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.2 } }
              : { clipPath: "inset(0% 0% 100% 0%)", transition: { ...spring.soft } }
          }
          style={{ willChange: "clip-path, opacity" }}
        >
          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-[15vw] leading-none font-light tracking-[0.18em] text-white-sharp md:text-[10vw]"
              initial={reduce ? { y: 0 } : { y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ ...spring.soft, delay: 0.1 }}
            >
              {NAME.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ...spring.base, delay: 0.2 + i * 0.05 }}
                >
                  {ch}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <div className="mt-8 flex w-[min(72vw,420px)] items-center gap-4">
            <div className="h-px flex-1 overflow-hidden bg-ash/60">
              <motion.div
                className="h-full bg-bone"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                style={{ originX: 0 }}
                transition={{ ...spring.snappy }}
              />
            </div>
            <span className="font-display text-sm tabular-nums text-mist">
              {String(progress).padStart(3, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
