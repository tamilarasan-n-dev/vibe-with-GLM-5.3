"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  heroDisciplines,
  heroEyebrow,
  heroIntro,
  heroMetrics,
  profile,
  rotatingStatements,
  terminalCommands,
} from "@/lib/content";
import { ArrowLink, EASE, fmt } from "./primitives";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section id="hero" ref={heroRef} className="relative overflow-hidden pt-28 md:pt-36">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-5">
            <motion.p
              className="text-[14px] text-ink-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {heroEyebrow}
            </motion.p>

            <h1 className="display mt-4 text-[clamp(2.75rem,5.4vw,5rem)] leading-[0.95] tracking-[-0.02em]">
              <SplitReveal text={profile.name} />
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
            >
              <p className="mt-4 text-[17px] font-medium text-ink">{heroDisciplines[0]}</p>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Focus areas">
                {heroDisciplines.slice(1).map((d) => (
                  <li key={d} className="rounded-full border border-rule-strong px-3 py-1 text-[13px] text-ink-2">
                    {d}
                  </li>
                ))}
              </ul>

              <p className="mt-8 max-w-[34ch] text-[19px] leading-[1.5] text-ink-2">{heroIntro}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex h-12 items-center rounded-[10px] bg-signal px-5 text-[15px] font-semibold text-on-signal transition-colors duration-300 hover:bg-ink hover:text-paper"
                >
                  View Projects
                </a>
                <a
                  href="/resume"
                  className="inline-flex h-12 items-center gap-2 rounded-[10px] border border-rule-strong px-5 text-[15px] font-medium transition-colors duration-300 hover:border-ink"
                >
                  Download Resume
                  <span className="font-mono text-[11px] text-ink-3">PDF</span>
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
                <ArrowLink href={profile.github} external>GitHub</ArrowLink>
                <ArrowLink href={profile.linkedin} external>LinkedIn</ArrowLink>
                <ArrowLink href="#contact">Contact</ArrowLink>
                <span className="text-[14px] text-ink-3">
                  {profile.location}, <LocalTime />
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: EASE }}
          >
            <TracePanel heroRef={heroRef} />
          </motion.div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-8 border-t border-rule sm:grid-cols-3 lg:grid-cols-6">
          {heroMetrics.map((m) => (
            <div key={m.label} className="flex items-baseline justify-between gap-3 border-b border-rule py-3 lg:block lg:border-b-0 lg:py-4">
              <dt className="text-[14px] text-ink-3">{m.label}</dt>
              <dd className="font-mono text-[15px] tabular-nums text-ink lg:mt-1">
                {fmt(m.value)}
                {m.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <Ticker />
    </section>
  );
}

function SplitReveal({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="block" aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden pb-[0.06em] align-bottom" aria-hidden="true">
          {Array.from(word).map((ch, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.1 + (wi * 6 + ci) * 0.03, ease: EASE }}
            >
              {ch}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span className="inline-block w-[0.18em]" />}
        </span>
      ))}
    </span>
  );
}

/** Full-bleed acid-lime ticker carrying the rotating statements. */
function Ticker() {
  const items = [...rotatingStatements, ...rotatingStatements];
  return (
    <motion.div
      className="ticker relative mt-12 overflow-hidden bg-signal text-on-signal md:mt-16"
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 1.1, delay: 0.8, ease: EASE }}
    >
      <ul className="sr-only">
        {rotatingStatements.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <div className="ticker-track flex w-max items-center py-2.5 md:py-3" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((r, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span className="display-tight whitespace-nowrap px-5 text-[clamp(1.1rem,1.9vw,1.6rem)] uppercase leading-none tracking-[0.005em]">
                  {r.replace(/\.$/, "")}
                </span>
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 md:h-5 md:w-5" aria-hidden="true">
                  <path d="M2 14h5l2.5-7 4 12 3-9 1.5 4H22" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <span className="tabular-nums">
      {time ?? "--:--:--"}&nbsp;IST
    </span>
  );
}

/* ------------------------------------------------------------------
   TracePanel — a live latency oscilloscope.
   Cursor speed over the hero injects load; p95 rises, the autoscaler
   adds workers, latency settles back. Readouts are written straight to
   the DOM so the simulation never triggers React renders.
   ------------------------------------------------------------------ */

const SLO_MS = 50;
const MAX_MS = 140;

function TracePanel({ heroRef }: { heroRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const p95Ref = useRef<HTMLSpanElement>(null);
  const p95LineRef = useRef<HTMLSpanElement>(null);
  const workersRef = useRef<HTMLSpanElement>(null);
  const rpsRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const loadRef = useRef(0);
  const heldRef = useRef(false);
  const [held, setHeld] = useState(false);
  const reduce = useReducedMotion();
  const command = useTypingCommand(terminalCommands, !reduce && !held);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const hero = heroRef.current;
    if (!canvas || !wrap || !hero) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const STEP = 3;
    let samples: number[] = [];

    const resize = () => {
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.ceil(width / STEP) + 2;
      if (samples.length < n) {
        const pad = Array.from({ length: n - samples.length }, (_, i) => 24 + Math.sin(i * 0.7) * 2 + noise(i) * 4);
        samples = pad.concat(samples);
      } else samples = samples.slice(samples.length - n);
    };

    let colors = { ink: "#000", ink3: "#666", accent: "#2b4bff", signal: "#c6ff3d", signalInk: "#c6ff3d", rule: "rgba(0,0,0,.1)" };
    let monoFamily = "ui-monospace, monospace";
    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      monoFamily = `${s.getPropertyValue("--font-plex-mono").trim() || "ui-monospace"}, monospace`;
      colors = {
        ink: s.getPropertyValue("--ink").trim(),
        ink3: s.getPropertyValue("--ink-3").trim(),
        accent: s.getPropertyValue("--accent").trim(),
        signal: s.getPropertyValue("--signal").trim(),
        signalInk: s.getPropertyValue("--signal-ink").trim(),
        rule: s.getPropertyValue("--rule-strong").trim(),
      };
    };

    const yOf = (ms: number) => {
      const pad = 14;
      return height - pad - (Math.min(ms, MAX_MS) / MAX_MS) * (height - pad * 2);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // grid
      ctx.font = `10px ${monoFamily}`;
      ctx.textBaseline = "middle";
      [25, 100, 150].forEach((ms) => {
        const y = Math.round(yOf(ms)) + 0.5;
        ctx.strokeStyle = colors.rule;
        ctx.globalAlpha = 0.45;
        ctx.setLineDash([1, 3]);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.fillStyle = colors.ink3;
        ctx.fillText(`${ms}ms`, 6, y - 7);
      });
      // SLO line
      const sloY = Math.round(yOf(SLO_MS)) + 0.5;
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = colors.signalInk;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, sloY);
      ctx.lineTo(width, sloY);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.setLineDash([]);
      ctx.fillStyle = colors.signalInk;
      ctx.fillText(`SLO ${SLO_MS}ms`, 6, sloY - 7);

      // area under trace
      const start = width - (samples.length - 1) * STEP;
      ctx.beginPath();
      ctx.moveTo(start, height);
      samples.forEach((v, i) => ctx.lineTo(start + i * STEP, yOf(v)));
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = colors.accent;
      ctx.globalAlpha = 0.08;
      ctx.fill();
      // over-budget region lights up in acid lime
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, width, sloY);
      ctx.clip();
      ctx.beginPath();
      ctx.moveTo(start, height);
      samples.forEach((v, i) => ctx.lineTo(start + i * STEP, yOf(v)));
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = colors.signal;
      ctx.globalAlpha = 0.55;
      ctx.fill();
      ctx.restore();
      ctx.globalAlpha = 1;

      // trace, segments over SLO in signal colour
      ctx.lineWidth = 1.5;
      ctx.lineJoin = "round";
      for (let i = 1; i < samples.length; i++) {
        const a = samples[i - 1];
        const b = samples[i];
        ctx.strokeStyle = Math.max(a, b) > SLO_MS ? colors.signalInk : colors.accent;
        ctx.beginPath();
        ctx.moveTo(start + (i - 1) * STEP, yOf(a));
        ctx.lineTo(start + i * STEP, yOf(b));
        ctx.stroke();
      }
      // head
      const last = samples[samples.length - 1];
      ctx.fillStyle = last > SLO_MS ? colors.signalInk : colors.accent;
      ctx.beginPath();
      ctx.arc(width - 1.5, yOf(last), 3, 0, Math.PI * 2);
      ctx.fill();
    };

    readColors();
    resize();

    if (reduce) {
      draw();
      return;
    }

    // simulation state
    let workers = 8;
    let frame = 0;
    let raf = 0;
    let running = false;
    let lastStatus = "";
    let peakWorkers = 8;

    const setStatus = (s: string) => {
      if (s !== lastStatus && statusRef.current) {
        statusRef.current.textContent = s;
        lastStatus = s;
      }
    };

    const loop = () => {
      if (heldRef.current) {
        raf = requestAnimationFrame(loop);
        return;
      }
      frame++;
      const load = loadRef.current;
      const demand = 1 + load * 1.5;
      const target = Math.min(16, Math.max(8, Math.ceil(8 * demand * 0.95)));
      // autoscaler reacts with lag; scales down slowly
      workers += (target - workers) * (target > workers ? 0.018 : 0.006);
      const util = demand / (workers / 8);
      const latency =
        22 + noise(frame) * 5 + Math.max(0, util - 1) * 42 + util * 3 + (Math.random() < 0.01 ? 14 : 0);

      if (frame % 2 === 0) {
        samples.push(latency);
        samples.shift();
      }
      loadRef.current = load * 0.993;

      if (frame % 8 === 0) {
        const recent = samples.slice(-60).sort((x, y) => x - y);
        const p95 = recent[Math.floor(recent.length * 0.95)];
        const p95txt = `${Math.round(p95)}ms`;
        if (p95Ref.current) {
          p95Ref.current.textContent = p95txt;
          p95Ref.current.dataset.hot = p95 > SLO_MS ? "true" : "false";
        }
        if (p95LineRef.current) p95LineRef.current.textContent = p95txt;
        const w = Math.round(workers);
        if (workersRef.current) workersRef.current.textContent = String(w);
        if (rpsRef.current) rpsRef.current.textContent = Math.round(1180 * demand + noise(frame) * 40).toLocaleString("en-US");
        peakWorkers = Math.max(peakWorkers, w);

        if (util > 1.15) setStatus(`load spike: autoscaler → ${target} workers`);
        else if (w > 8) setStatus(`scaled to ${w} workers, p95 within SLO`);
        else if (peakWorkers > 8) {
          setStatus(`recovered: back to 8 workers`);
          if (load < 0.02) peakWorkers = 8;
        } else setStatus("nominal");
      }

      if (frame % 90 === 0) readColors();
      draw();
      raf = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? startLoop() : stopLoop()));
    io.observe(wrap);

    let lx = 0;
    let ly = 0;
    let lt = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const now = performance.now();
      if (lt) {
        const dt = Math.max(8, now - lt);
        const speed = Math.hypot(e.clientX - lx, e.clientY - ly) / dt; // px per ms
        if (speed > 0.6) loadRef.current = Math.min(1.25, loadRef.current + (speed - 0.6) * 0.02);
      }
      lx = e.clientX;
      ly = e.clientY;
      lt = now;
    };
    hero.addEventListener("pointermove", onMove, { passive: true });

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    return () => {
      stopLoop();
      io.disconnect();
      ro.disconnect();
      hero.removeEventListener("pointermove", onMove);
    };
  }, [heroRef, reduce]);

  const spike = () => {
    if (heldRef.current) return;
    loadRef.current = Math.min(1.25, loadRef.current + 0.75);
  };

  const toggleHold = () => {
    heldRef.current = !heldRef.current;
    setHeld(heldRef.current);
  };

  return (
    <figure className="instrument" aria-label="Simulated production latency monitor">
      <div className="instrument-bar">
        <span className="font-mono text-[12px] text-ink-2">prod-ai-platform</span>
        <span className="flex items-center gap-3 font-mono text-[12px]">
          <span className="flex items-center gap-2.5">
            <span className={held ? "inline-block h-1.5 w-1.5 rounded-full bg-ink-3" : "live-dot"} aria-hidden="true" />
            <span>p95</span>
            <span ref={p95Ref} className="tabular-nums text-ink data-[hot=true]:text-signal-ink">
              28ms
            </span>
          </span>
          {!reduce && (
            <button
              type="button"
              onClick={toggleHold}
              aria-pressed={held}
              className="rounded-md border border-rule-strong px-2 py-0.5 font-sans text-[12px] text-ink-2 transition-colors hover:border-ink hover:text-ink aria-pressed:border-accent aria-pressed:text-accent"
            >
              {held ? "Run" : "Hold"}
            </button>
          )}
        </span>
      </div>

      <button
        type="button"
        onClick={spike}
        className="group relative block w-full cursor-crosshair text-left focus-visible:outline-offset-[-4px]"
        aria-label="Send a burst of traffic to the simulated system"
      >
        <div ref={wrapRef} className="graph-paper relative h-48 w-full md:h-56">
          <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
        </div>
        <span className="pointer-events-none absolute bottom-2.5 right-3 rounded-md bg-surface/85 px-2 py-1 text-[12px] text-ink-2 backdrop-blur-sm">
          <span className="[@media(pointer:coarse)]:hidden">Move your cursor fast or click to send traffic</span>
          <span className="hidden [@media(pointer:coarse)]:inline">Tap to send traffic</span>
        </span>
      </button>

      <div className="border-t border-rule px-4 py-4 font-mono text-[12.5px] leading-6 md:px-5 md:text-[13px]">
        <p className="text-ink-3">$ ssh tamil@infra-edge</p>
        <p className="text-ink-3">$ export TRACE_ID=llm-run-42</p>
        <p className="caret min-h-6 truncate text-ink">$ {command}</p>
        <div className="mt-3 grid gap-x-6 text-ink-2 sm:grid-cols-2">
          <p>
            workers: <span ref={workersRef} className="tabular-nums text-ink">8</span> online
          </p>
          <p>queue: drained in 182ms</p>
          <p>cache hit ratio: 94.7%</p>
          <p>
            p95 latency: <span ref={p95LineRef} className="tabular-nums text-ink">28ms</span>
          </p>
        </div>
        <p className="mt-3 flex justify-between gap-4 text-ink-3">
          <span className="min-w-0 truncate">
            <span className="text-accent">#</span> <span ref={statusRef}>nominal</span>
          </span>
          <span className="hidden shrink-0 tabular-nums sm:inline">
            <span ref={rpsRef}>1,180</span> req/s
          </span>
        </p>
      </div>

      <div className="grid grid-cols-3 border-t border-rule">
        {[
          ["API", "healthy"],
          ["LLM", "streaming"],
          ["Redis", "hot"],
        ].map(([label, status], i) => (
          <div key={label} className={`px-4 py-3 md:px-5 ${i < 2 ? "border-r border-rule" : ""}`}>
            <div className="text-[12px] text-ink-3">{label}</div>
            <div className="mt-0.5 flex items-center gap-2 text-[14px]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-fill" aria-hidden="true" />
              {status}
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

function noise(i: number) {
  return (Math.sin(i * 12.9898) * 43758.5453) % 1;
}

function useTypingCommand(commands: string[], enabled: boolean) {
  const [text, setText] = useState(commands[0]);

  useEffect(() => {
    if (!enabled) return;
    let cmd = 0;
    let i = 0;
    let deleting = false;
    let timer = 0;

    const step = () => {
      const full = commands[cmd];
      if (!deleting) {
        i++;
        setText(full.slice(0, i));
        if (i >= full.length) {
          deleting = true;
          timer = window.setTimeout(step, 1800);
          return;
        }
        timer = window.setTimeout(step, 45 + Math.random() * 50);
      } else {
        i--;
        setText(full.slice(0, Math.max(i, 0)));
        if (i <= 0) {
          deleting = false;
          cmd = (cmd + 1) % commands.length;
          timer = window.setTimeout(step, 400);
          return;
        }
        timer = window.setTimeout(step, 22);
      }
    };
    // start by deleting the pre-rendered first command after a pause
    i = commands[0].length;
    deleting = true;
    timer = window.setTimeout(step, 2400);
    return () => window.clearTimeout(timer);
  }, [commands, enabled]);

  return text;
}
