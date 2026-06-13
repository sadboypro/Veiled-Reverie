"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, MessageCircle, Mail } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const socials = [
  { label: "Instagram", href: "https://instagram.com/sadboypro_", Icon: Instagram },
  { label: "Twitter", href: "https://twitter.com/anesheprosper", Icon: Twitter },
  { label: "WhatsApp", href: "https://wa.me/2349011391744", Icon: MessageCircle },
];

export default function Footer() {
  return (
    <footer id="connect" className="relative border-t border-ash/40 px-6 py-24 md:px-12 md:py-32">
      <motion.div
        className="mx-auto max-w-7xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div variants={fadeUp} className="mb-4 flex items-center gap-4">
          <span className="h-px w-8 bg-accent" />
          <span className="text-xs tracking-[0.3em] text-smoke uppercase">
            Let&apos;s Create
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="max-w-3xl font-display text-4xl font-light leading-tight tracking-tight text-white-sharp md:text-7xl"
        >
          Every story deserves to be{" "}
          <em className="font-normal text-accent not-italic">seen</em>.
        </motion.h2>

        <motion.a
          variants={fadeUp}
          href="mailto:desireprosper1315@gmail.com"
          className="group mt-10 inline-flex items-center gap-3 text-lg text-bone transition-colors hover:text-accent md:text-2xl"
        >
          <Mail size={20} />
          desireprosper1315@gmail.com
        </motion.a>

        <motion.div
          variants={fadeUp}
          className="mt-16 flex flex-col gap-8 border-t border-ash/40 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg text-white-sharp">Veiled Reverie</span>
            <span className="mt-1 text-xs text-smoke">
              Visual Storyteller · Where Moments Become Timeless
            </span>
          </div>

          <div className="flex items-center gap-6">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-mist transition-colors hover:text-white-sharp"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 text-xs text-smoke/70">
          © {new Date().getFullYear()} Veiled Reverie. All frames reserved.
        </div>
      </motion.div>
    </footer>
  );
}
