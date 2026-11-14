"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import { cn } from "@/lib/utils";
import { EASE } from "./primitives";
import { ThemeToggle } from "./theme";

const links: { label: string; href: string }[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Architecture", href: "#architecture" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "#contact" },
];

export function Nav({ onHome = true }: { onHome?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view for the nav highlight
  useEffect(() => {
    if (!onHome) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const resolve = (href: string) => (href.startsWith("#") && !onHome ? `/${href}` : href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-b border-rule bg-paper/80 backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <nav className="shell flex h-16 items-center justify-between gap-6" aria-label="Primary">
          <Link href="/" className="group flex items-center gap-2.5" aria-label="TamilArasan N — home">
            <svg viewBox="0 0 32 20" className="h-4 w-6 text-accent" aria-hidden="true">
              <path d="M1 12h5l3-8 4 14 3-10 2 4h13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="display text-[17px] tracking-[-0.01em]">{profile.name}</span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((l) => {
              const isActive = onHome && active && l.href === `#${active}`;
              return (
                <li key={l.label}>
                  <a
                    href={resolve(l.href)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative py-1 text-[14px] transition-colors duration-300",
                      isActive ? "text-ink" : "text-ink-2 hover:text-ink",
                    )}
                  >
                    {l.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded-full bg-signal-ink transition-transform duration-500 ease-out-expo",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1">
            <ThemeToggle className="grid h-9 w-9 place-items-center rounded-[9px] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink" />
            <a
              href="/resume"
              className="hidden h-9 items-center gap-2 rounded-[9px] bg-signal px-3.5 text-[14px] font-semibold text-on-signal transition-colors duration-300 hover:bg-ink hover:text-paper sm:inline-flex"
            >
              Resume
            </a>
            <button
              type="button"
              className="ml-1 grid h-9 w-9 place-items-center lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-500 ease-out-expo",
                    open && "translate-y-[6px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-full bg-ink transition-transform duration-500 ease-out-expo",
                    open && "-translate-y-[5px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
        <motion.div
          aria-hidden="true"
          className="absolute bottom-[-1px] left-0 h-[2px] w-full origin-left bg-signal-ink"
          style={{ scaleX: progress }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-paper pt-16 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="shell flex flex-col pt-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.04 * i, ease: EASE }}
                  className="border-b border-rule"
                >
                  <a
                    href={resolve(l.href)}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className="display text-4xl tracking-[-0.01em]">{l.label}</span>
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex gap-6 pt-8 text-sm text-ink-2"
              >
                <a href="/resume">Resume (PDF)</a>
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
