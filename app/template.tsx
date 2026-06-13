"use client";

import { motion, useReducedMotion } from "framer-motion";
import { spring } from "@/lib/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring.base }}
    >
      {children}
    </motion.div>
  );
}
