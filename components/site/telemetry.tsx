"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  activityData,
  dashboardCopy,
  dashboardStats,
  graphLayers,
  languageData,
  radarData,
  techGraphCopy,
} from "@/lib/content";
import { cn } from "@/lib/utils";
import { EASE, Section } from "./primitives";

/* §05 Engineering dashboard ----------------------------------------- */

export function DashboardSection() {
  return (
    <Section id="dashboard" name={dashboardCopy.eyebrow} title={dashboardCopy.title} body={dashboardCopy.body}>
      <div className="instrument">
        <div className="grid gap-px bg-rule lg:grid-cols-12">
          <Panel title="Coding Activity" className="lg:col-span-5">
            <ActivityChart />
          </Panel>
          <Panel title="Languages" className="lg:col-span-3">
            <LanguageChart />
          </Panel>
          <Panel title="Architecture Skills" className="lg:col-span-4">
            <RadarChart />
          </Panel>
          <div className="grid grid-cols-2 gap-px bg-rule lg:col-span-12 lg:grid-cols-4">
            {dashboardStats.map(([title, value]) => {
              const [num, ...rest] = value.split(" ");
              const numeric = /\d/.test(num);
              return (
                <div key={title} className="bg-surface p-5 md:p-6">
                  <div className="text-[13px] text-ink-3">{title}</div>
                  {numeric ? (
                    <div className="mt-6 flex items-baseline gap-2">
                      <span className="display text-4xl md:text-5xl">{num}</span>
                      <span className="text-sm text-ink-2">{rest.join(" ")}</span>
                    </div>
                  ) : (
                    <div className="display mt-6 text-2xl leading-tight md:text-[28px]">{value}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Panel({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col bg-surface p-5 md:p-6", className)}>
      <h3 className="text-[14px] font-medium text-ink">{title}</h3>
      <div className="mt-5 flex-1">{children}</div>
    </div>
  );
}

function ActivityChart() {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...activityData.map((d) => d.commits));
  const totalCommits = activityData.reduce((s, d) => s + d.commits, 0);
  const totalReviews = activityData.reduce((s, d) => s + d.reviews, 0);
  const shown = hover === null ? null : activityData[hover];

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4" aria-live="polite">
        <div className="flex items-baseline gap-2">
          <span className="display text-4xl tabular-nums">
            {shown ? shown.commits : totalCommits}
          </span>
          <span className="text-sm text-ink-2">{shown ? `commits on ${shown.day}` : "commits this week"}</span>
        </div>
        <span className="font-mono text-[11px] text-ink-3">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-[2px] bg-signal align-middle" aria-hidden="true" />
          {shown ? shown.reviews : totalReviews} reviews
        </span>
      </div>
      <div className="mt-6 flex h-44 items-end gap-2 border-b border-rule-strong" onMouseLeave={() => setHover(null)}>
        {activityData.map((d, i) => (
          <button
            key={d.day}
            type="button"
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className="group relative flex h-full flex-1 items-end justify-center gap-[3px]"
            aria-label={`${d.day}: ${d.commits} commits, ${d.reviews} reviews`}
          >
            <motion.span
              className={cn("w-full max-w-7 origin-bottom rounded-t-[3px] transition-colors duration-300", hover === null || hover === i ? "bg-accent-fill" : "bg-accent/25")}
              style={{ height: `${(d.commits / max) * 100}%` }}
            />
            <motion.span
              className="w-1.5 shrink-0 origin-bottom rounded-t-[2px] bg-signal"
              style={{ height: `${(d.reviews / max) * 100}%` }}
            />
          </button>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        {activityData.map((d, i) => (
          <span key={d.day} className={cn("flex-1 text-center font-mono text-[10px] transition-colors", hover === i ? "text-ink" : "text-ink-3")}>
            {d.day}
          </span>
        ))}
      </div>
    </div>
  );
}

function LanguageChart() {
  const total = languageData.reduce((s, d) => s + d.value, 0);
  const tones = ["bg-accent-fill", "bg-accent/70", "bg-accent/45", "bg-accent/25", "bg-ink-3/40"];
  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden rounded-full">
        {languageData.map((l, i) => (
          <motion.span
            key={l.name}
            className={cn("h-full origin-left border-r-2 border-surface last:border-r-0", tones[i])}
            style={{ width: `${(l.value / total) * 100}%` }}
          />
        ))}
      </div>
      <ul className="mt-6 border-t border-rule">
        {languageData.map((l, i) => (
          <li key={l.name} className="flex items-center gap-3 border-b border-rule py-2.5 text-sm">
            <span className={cn("h-2 w-2 shrink-0 rounded-[2px]", tones[i])} aria-hidden="true" />
            <span className="flex-1">{l.name}</span>
            <span className="font-mono text-xs tabular-nums text-ink-2">{Math.round((l.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RadarChart() {
  const size = 260;
  const c = size / 2;
  const r = 86;
  const n = radarData.length;
  const point = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [c + Math.cos(a) * r * (v / 100), c + Math.sin(a) * r * (v / 100)] as const;
  };
  const ring = (v: number) =>
    radarData.map((_, i) => point(i, v).join(",")).join(" ");
  const shape = radarData.map((d, i) => point(i, d.value).join(",")).join(" ");
  const [hover, setHover] = useState<number | null>(null);

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto block w-full max-w-[300px]" role="img" aria-label={`Architecture skills: ${radarData.map((d) => `${d.skill} ${d.value}`).join(", ")}`}>
      {[20, 40, 60, 80, 100].map((v) => (
        <polygon key={v} points={ring(v)} fill="none" stroke="var(--rule-strong)" strokeWidth={v === 100 ? 1 : 0.6} strokeDasharray={v === 100 ? undefined : "2 3"} />
      ))}
      {radarData.map((_, i) => {
        const [x, y] = point(i, 100);
        return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="var(--rule)" />;
      })}
      <motion.polygon
        points={shape}
        fill="var(--accent-soft)"
        stroke="var(--accent)"
        strokeWidth={1.5}
        strokeLinejoin="round"
        style={{ transformOrigin: `${c}px ${c}px` }}
      />
      {radarData.map((d, i) => {
        const [px, py] = point(i, d.value);
        const [lx, ly] = point(i, 128);
        const on = hover === i;
        return (
          <g key={d.skill} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} className="cursor-default">
            <circle cx={px} cy={py} r={on ? 4 : 2.5} fill="var(--accent)" className="transition-[r]" />
            <text x={lx} y={ly - 5} textAnchor="middle" fontSize="10.5" fill={on ? "var(--ink)" : "var(--ink-2)"} fontFamily="var(--font-archivo)">
              {d.skill}
            </text>
            <text x={lx} y={ly + 8} textAnchor="middle" fontSize="9" fill={on ? "var(--accent)" : "var(--ink-3)"} fontFamily="var(--font-plex-mono)">
              {d.value}
            </text>
            <circle cx={lx} cy={ly} r={18} fill="transparent" />
          </g>
        );
      })}
    </svg>
  );
}

/* §06 Tech stack graph ---------------------------------------------- */

export function TechGraphSection() {
  const [picked, setPicked] = useState<number[]>([0, 0, 1, 1]);
  const [active, setActive] = useState(graphLayers[0].nodes[0]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[][]>(graphLayers.map(() => []));
  const [path, setPath] = useState<string>("");
  const [box, setBox] = useState({ w: 0, h: 0 });

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const base = wrap.getBoundingClientRect();
    const pts = picked.map((col, layer) => {
      const el = nodeRefs.current[layer][col];
      if (!el) return [0, 0, 0] as const;
      const r = el.getBoundingClientRect();
      return [r.left - base.left + r.width / 2, r.top - base.top, r.bottom - base.top] as const;
    });
    let d = `M ${pts[0][0]} ${pts[0][2]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, , b0] = pts[i - 1];
      const [x1, t1] = pts[i];
      const mid = (b0 + t1) / 2;
      d += ` C ${x0} ${mid}, ${x1} ${mid}, ${x1} ${t1}`;
      if (i < pts.length - 1) d += ` M ${x1} ${pts[i][2]}`;
    }
    setPath(d);
    setBox({ w: base.width, h: base.height });
  }, [picked]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [measure]);

  const route = picked.map((col, layer) => graphLayers[layer].nodes[col]);

  return (
    <Section id="tech-graph" name={techGraphCopy.eyebrow} title={techGraphCopy.title} body={techGraphCopy.body}>
        <figure className="instrument">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule px-4 py-4 md:px-6">
            <div>
              <div className="text-[13px] text-ink-3">Active node</div>
              <div className="display mt-0.5 text-[28px] leading-8">{active}</div>
            </div>
            <div className="font-mono text-[12px] text-ink-3" aria-live="polite">
              {route.map((r, i) => (
                <span key={r}>
                  {i > 0 && <span className="mx-1.5 text-signal-ink">→</span>}
                  <span className={r === active ? "text-ink" : undefined}>{r}</span>
                </span>
              ))}
            </div>
          </div>

          <div ref={wrapRef} className="graph-paper relative px-4 py-6 md:px-6 md:py-10">
            <svg className="pointer-events-none absolute inset-0" width={box.w} height={box.h} aria-hidden="true">
              {path && <motion.path
                d={path}
                fill="none"
                stroke="var(--signal-ink)"
                strokeWidth={2}
                className="march"
                initial={false}
                animate={{ d: path }}
                transition={{ duration: 0.6, ease: EASE }}
              />}
            </svg>
            <div className="relative space-y-8 md:space-y-12">
              {graphLayers.map((layer, li) => (
                <div key={layer.name} className="grid gap-3 md:grid-cols-[11rem_1fr] md:items-center md:gap-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[15px] font-medium text-ink">{layer.name.charAt(0).toUpperCase() + layer.name.slice(1)}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    {layer.nodes.map((node, ni) => {
                      const on = picked[li] === ni;
                      return (
                        <button
                          key={node}
                          ref={(el) => {
                            nodeRefs.current[li][ni] = el;
                          }}
                          type="button"
                          aria-pressed={on}
                          onClick={() => {
                            setPicked((p) => p.map((v, i) => (i === li ? ni : v)));
                            setActive(node);
                          }}
                          className={cn(
                            "rounded-[10px] border px-3 py-3 text-left text-[14px] font-medium transition-[background-color,border-color,color] duration-300 md:px-4 md:py-4 md:text-[16px]",
                            on
                              ? "border-accent bg-accent-fill text-on-accent"
                              : "border-rule-strong bg-surface text-ink-2 hover:border-accent hover:text-ink",
                          )}
                        >
                          {node}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <figcaption className="border-t border-rule px-4 py-3 text-[13px] text-ink-3 md:px-6">
            Pick one node in each layer to route a request through the stack.
          </figcaption>
        </figure>
    </Section>
  );
}
