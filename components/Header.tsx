"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { spring, staggerContainer } from "@/lib/motion";

const links = [
  { label: "Home", href: "/", index: "01" },
  { label: "Works", href: "/works", index: "02" },
  { label: "Story", href: "/story", index: "03" },
  { label: "Connect", href: "/connect", index: "04" },
];

export default function Header({ revealDelay = 0 }: { revealDelay?: number }) {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // If the preloader already ran this session, reveal the nav immediately.
  const [seen] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem("vr_seen") === "1",
  );
  const delay = reduce || seen ? 0 : revealDelay;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-12"
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring.base, delay }}
      >
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-lg font-medium tracking-wide text-white-sharp">
            Veiled
          </span>
          <span className="font-display text-xs tracking-[0.35em] text-smoke uppercase">
            Reverie
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`group relative text-sm tracking-wide transition-colors ${
                isActive(l.href) ? "text-white-sharp" : "text-mist hover:text-white-sharp"
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive(l.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-bone transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span className={`h-px w-6 bg-bone transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-px w-6 bg-bone transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 md:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ ...spring.soft }}
          >
            <motion.nav
              className="flex flex-col gap-2"
              variants={staggerContainer}
              custom={0.07}
              initial="hidden"
              animate="visible"
            >
              {links.map((l) => (
                <motion.div
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: spring.base },
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-2"
                  >
                    <span className="font-display text-xs text-smoke">{l.index}</span>
                    <span
                      className={`font-display text-4xl transition-colors group-hover:text-accent ${
                        isActive(l.href) ? "text-accent" : "text-bone"
                      }`}
                    >
                      {l.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <div className="mt-16 flex flex-col gap-1 text-sm text-smoke">
              <a href="mailto:desireprosper1315@gmail.com" className="hover:text-bone">
                desireprosper1315@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
