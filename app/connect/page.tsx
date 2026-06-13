"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Instagram, Twitter, MessageCircle, Mail, ArrowUpRight, AlertCircle, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { spring, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const EMAIL = "desireprosper1315@gmail.com";

const socials = [
  { label: "Instagram", handle: "@sadboypro_", href: "https://instagram.com/sadboypro_", Icon: Instagram },
  { label: "Twitter", handle: "@anesheprosper", href: "https://twitter.com/anesheprosper", Icon: Twitter },
  { label: "WhatsApp", handle: "+234 901 139 1744", href: "https://wa.me/2349011391744", Icon: MessageCircle },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function ConnectPage() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <>
      <Header />
      <main className="px-6 pt-32 pb-24 md:px-12 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-4 flex items-center gap-4"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.base }}
          >
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs tracking-[0.3em] text-smoke uppercase">
              Connect
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-5xl font-light leading-[0.95] tracking-tight text-white-sharp md:text-8xl"
              initial={reduce ? { y: "0%" } : { y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ ...spring.soft, delay: 0.1 }}
            >
              Let&apos;s create something{" "}
              <em className="font-normal text-accent not-italic">timeless</em>
            </motion.h1>
          </div>

          <div className="mt-16 grid gap-16 md:grid-cols-12 md:gap-10">
            {/* Details */}
            <motion.div
              className="md:col-span-5"
              variants={staggerContainer}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <motion.a
                variants={fadeUp}
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-3 text-xl text-bone transition-colors hover:text-accent md:text-2xl"
              >
                <Mail size={22} />
                {EMAIL}
              </motion.a>

              <motion.div variants={fadeUp} className="mt-12 flex flex-col gap-px">
                {socials.map(({ label, handle, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-t border-ash/40 py-5 last:border-b"
                  >
                    <span className="flex items-center gap-4">
                      <Icon size={18} className="text-smoke" />
                      <span className="text-bone">{label}</span>
                      <span className="text-sm text-smoke">{handle}</span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-smoke transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-bone"
                    />
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={onSubmit}
              className="flex flex-col gap-6 md:col-span-7"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <Field
                label="Name"
                value={form.name}
                disabled={status === "sending"}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                disabled={status === "sending"}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              />
              <Field
                label="Tell me about your story"
                textarea
                value={form.message}
                disabled={status === "sending"}
                onChange={(v) => setForm((f) => ({ ...f, message: v }))}
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="group mt-2 inline-flex w-fit items-center gap-3 border border-bone px-8 py-4 text-sm tracking-wide text-void transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: "var(--color-bone)" }}
              >
                <span>{status === "sending" ? "Sending…" : "Send the message"}</span>
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>

              <div aria-live="polite" className="min-h-[1.25rem]">
                {status === "sent" && (
                  <p className="flex items-center gap-2 text-xs text-accent">
                    <Check size={14} className="shrink-0" />
                    <span>Message sent — thank you. I&apos;ll be in touch soon.</span>
                  </p>
                )}
                {status === "error" && (
                  <p className="flex items-start gap-2 text-xs text-red-400">
                    <AlertCircle size={14} className="mt-0.5 shrink-0" />
                    <span>
                      {error}{" "}
                      <a href={`mailto:${EMAIL}`} className="underline hover:text-bone">
                        Or email directly
                      </a>
                      .
                    </span>
                  </p>
                )}
                {(status === "idle" || status === "sending") && (
                  <p className="text-xs text-smoke">
                    I read every message personally — expect a reply within a few days.
                  </p>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
  disabled?: boolean;
}) {
  const shared =
    "w-full border-b border-ash bg-transparent py-3 text-bone outline-none transition-colors placeholder:text-smoke focus:border-accent disabled:opacity-50";
  return (
    <label className="block">
      <span className="mb-2 block text-xs tracking-[0.2em] text-smoke uppercase">
        {label}
      </span>
      {textarea ? (
        <textarea
          required
          rows={4}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`${shared} resize-none`}
        />
      ) : (
        <input
          required
          type={type}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      )}
    </label>
  );
}
