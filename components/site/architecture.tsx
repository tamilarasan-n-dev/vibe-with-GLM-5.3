"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  architectureChecks,
  architectureCopy,
  architectureEdges,
  architectureNodes,
} from "@/lib/content";
import { cn } from "@/lib/utils";
import { EASE, Section } from "./primitives";

const byId = Object.fromEntries(architectureNodes.map((n) => [n.id, n]));

export function ArchitectureSection() {
  const [activeId, setActiveId] = useState("api");
  const [size, setSize] = useState({ w: 0, h: 0 });
  const mapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const narrow = size.w > 0 && size.w < 720;
  const pos = (id: string) => {
    const n = byId[id];
    return narrow
      ? { x: (n.mx / 100) * size.w, y: (n.my / 100) * size.h }
      : { x: (n.x / 100) * size.w, y: (n.y / 100) * size.h };
  };

  const edgePath = (a: string, b: string) => {
    const p = pos(a);
    const q = pos(b);
    if (narrow) {
      const my = (p.y + q.y) / 2;
      return `M ${p.x} ${p.y} C ${p.x} ${my}, ${q.x} ${my}, ${q.x} ${q.y}`;
    }
    const mx = (p.x + q.x) / 2;
    return `M ${p.x} ${p.y} C ${mx} ${p.y}, ${mx} ${q.y}, ${q.x} ${q.y}`;
  };

  const active = byId[activeId];
  const neighbours = architectureEdges
    .filter(([a, b]) => a === activeId || b === activeId)
    .map(([a, b]) => (a === activeId ? b : a));
  const activeIndex = architectureNodes.findIndex((n) => n.id === activeId);

  return (
    <Section id="architecture" name={architectureCopy.eyebrow} title={architectureCopy.title} body={architectureCopy.body}>
        <div className="instrument grid lg:grid-cols-12">
          {/* Map */}
          <div className="border-b border-rule lg:col-span-8 lg:border-b-0 lg:border-r">
            <div className="instrument-bar">
              <span>Topology</span>
              <span className="flex items-center gap-2">
                <span className="live-dot" aria-hidden="true" />
                Requests in flight
              </span>
            </div>
            <div ref={mapRef} className="graph-paper relative h-[640px] md:h-[540px]">
              {size.w > 0 && (
                <svg className="absolute inset-0" width={size.w} height={size.h} aria-hidden="true">
                  {architectureEdges.map(([a, b], i) => {
                    const hot = a === activeId || b === activeId;
                    const d = edgePath(a, b);
                    return (
                      <g key={`${a}-${b}`}>
                        <path
                          d={d}
                          fill="none"
                          stroke={hot ? "var(--accent)" : "var(--rule-strong)"}
                          strokeWidth={hot ? 1.5 : 1}
                          className={cn("transition-[stroke] duration-500", hot && "march")}
                        />
                        {!reduce && (
                          <circle r={hot ? 3.5 : 2.5} fill={hot ? "var(--signal-ink)" : "var(--ink-3)"}>
                            <animateMotion dur={`${2.2 + (i % 3) * 0.5}s`} begin={`-${(i * 0.37).toFixed(2)}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.65 0 0.35 1" />
                          </circle>
                        )}
                      </g>
                    );
                  })}
                </svg>
              )}
              {size.w > 0 &&
                architectureNodes.map((node) => {
                  const p = pos(node.id);
                  const on = node.id === activeId;
                  const near = neighbours.includes(node.id);
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveId(node.id)}
                      aria-pressed={on}
                      className={cn(
                        "absolute w-[8.5rem] -translate-x-1/2 -translate-y-1/2 rounded-[10px] border px-3 py-2.5 text-left lg:w-[7.5rem] xl:w-[8.25rem]",
                        on
                          ? "border-accent bg-accent-fill text-on-accent shadow-[0_8px_24px_-8px_var(--accent)]"
                          : near
                            ? "border-accent bg-surface text-ink"
                            : "border-rule-strong bg-surface text-ink-2 hover:border-accent hover:text-ink",
                      )}
                      style={{ left: p.x, top: p.y, transition: "left 600ms cubic-bezier(0.16,1,0.3,1), top 600ms cubic-bezier(0.16,1,0.3,1), background-color 300ms, border-color 300ms, color 300ms, box-shadow 300ms" }}
                    >
                      <span className={cn("block text-[12px]", on ? "text-on-accent/75" : "text-ink-3")}>
                        {node.subtitle}
                      </span>
                      <span className="mt-1 block text-[15px] font-medium tracking-tight">{node.label}</span>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Inspector */}
          <div className="lg:col-span-4">
            <div className="instrument-bar">
              <span>Component</span>
              <span className="tabular-nums">
                {activeIndex + 1} of {architectureNodes.length}
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="p-5 md:p-6"
                aria-live="polite"
              >
                <div className="text-[14px] text-accent">{active.subtitle}</div>
                <h3 className="display-tight mt-1 text-[52px] uppercase leading-[0.9] tracking-[-0.015em]">{active.label}</h3>
                <p className="mt-5 text-[16px] leading-relaxed text-ink-2">{active.detail}</p>

                <div className="mt-7">
                  <div className="mb-2 text-[13px] text-ink-3">Connects to</div>
                  <div className="flex flex-wrap gap-2">
                    {neighbours.map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setActiveId(id)}
                        className="rounded-full border border-rule-strong px-3 py-1 text-[14px] text-ink-2 transition-colors hover:border-accent hover:text-ink"
                      >
                        {byId[id].label}
                      </button>
                    ))}
                  </div>
                </div>

                <ul className="mt-7 border-t border-rule">
                  {architectureChecks.map((item) => (
                    <li key={item} className="flex items-center justify-between border-b border-rule py-3 text-sm">
                      <span className="text-ink-2">{item}</span>
                      <span className="flex items-center gap-2 text-[13px] text-accent">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-fill" aria-hidden="true" />
                        tracked
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
    </Section>
  );
}
