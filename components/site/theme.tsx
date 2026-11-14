"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider as NextThemes, useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemes attribute="data-theme" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemes>
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={className}
    >
      <span
        className="relative inline-block h-4 w-4 transition-transform duration-700 ease-out-expo"
        style={{ transform: isDark ? "rotate(180deg)" : "rotate(0deg)" }}
        aria-hidden="true"
      >
        <span className="absolute inset-0 rounded-full border border-current" />
        <span className="absolute inset-y-0 right-0 w-1/2 rounded-r-full bg-current" />
      </span>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

/** Reads the current value of CSS custom properties; re-reads when the theme flips. */
export function useCssVars<T extends string>(names: readonly T[]): Record<T, string> {
  const { resolvedTheme } = useTheme();
  const [values, setValues] = useState<Record<T, string>>(
    () => Object.fromEntries(names.map((n) => [n, "#888"])) as Record<T, string>,
  );
  const key = names.join(",");

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues(
      Object.fromEntries(
        key.split(",").map((n) => [n, style.getPropertyValue(`--${n}`).trim() || "#888"]),
      ) as Record<T, string>,
    );
  }, [resolvedTheme, key]);

  return values;
}
