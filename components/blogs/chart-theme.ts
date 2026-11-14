"use client";

import { useCssVars } from "@/components/site/theme";

const VARS = ["accent", "ink", "ink-2", "ink-3", "rule", "surface", "font-archivo"] as const;

function withAlpha(color: string, alpha: number) {
  const hex = color.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return color;
  const n = parseInt(hex, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/** Chart colours resolved from the site's CSS tokens, so charts follow the theme. */
export function useChartTheme() {
  const v = useCssVars(VARS);
  const steps = [1, 0.78, 0.58, 0.42, 0.28];
  // categorical ramp: cobalt tints first, then ink tints
  const palette = (n: number) =>
    Array.from({ length: n }, (_, i) =>
      i < steps.length ? withAlpha(v.accent, steps[i]) : withAlpha(v["ink-3"], i - steps.length === 0 ? 0.85 : 0.5),
    );

  return {
    palette,
    accent: v.accent,
    ink: v.ink,
    ink2: v["ink-2"],
    ink3: v["ink-3"],
    rule: v.rule,
    surface: v.surface,
    font: { family: v["font-archivo"] || "system-ui", size: 13 },
  };
}
