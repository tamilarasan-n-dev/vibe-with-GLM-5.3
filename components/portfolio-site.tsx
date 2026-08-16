"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Briefcase,
  Cloud,
  Code2,
  Container,
  Cpu,
  Database,
  Download,
  FileText,
  Gauge,
  GitBranch,
  Globe2,
  HardDrive,
  Layers3,
  Mail,
  MapPin,
  Network,
  Rocket,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import CountUp from "react-countup";
import { useForm } from "react-hook-form";
import Balancer from "react-wrap-balancer";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import * as THREE from "three";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

let scrollLenis: Lenis | null = null;

type Skill = {
  name: string;
  category: string;
  experience: string;
  detail: string;
  tools: string[];
  angle: string;
  radius: string;
};

type Project = {
  title: string;
  eyebrow: string;
  problem: string;
  architecture: string[];
  challenges: string[];
  metrics: { label: string; value: string }[];
  tech: string[];
  icon: LucideIcon;
};

type ArchitectureNode = {
  id: string;
  label: string;
  subtitle: string;
  x: string;
  y: string;
  icon: LucideIcon;
  detail: string;
};

const profile = {
  name: "TamilArasan N",
  title: "Backend Software Engineer",
  email: "tamilarasan.n.dev@gmail.com",
  github: "https://github.com/tamilarasan-n-dev/",
  linkedin: "https://www.linkedin.com/in/tamil-dev/",
  location: "India",
};

const rotatingStatements = [
  "Building AI Systems.",
  "Scaling Distributed Infrastructure.",
  "Designing High Performance Backends.",
  "Engineering Reliable Platforms.",
  "Optimizing at Scale.",
];

const terminalCommands = [
  "docker compose up --scale worker=8",
  "cargo run --release --bin audio-server",
  "redis-cli --latency-history",
  "kubectl get pods -n ai-platform",
  "pnpm build && git push origin main",
  "duckdb analytics.parquet",
];

const heroMetrics = [
  { label: "Experience", value: 2, suffix: "+ yrs" },
  { label: "Projects", value: 18, suffix: "+" },
  { label: "GitHub Repos", value: 42, suffix: "+" },
  { label: "LeetCode", value: 320, suffix: "+" },
  { label: "Years Coding", value: 5, suffix: "+" },
  { label: "Coffee", value: 1200, suffix: "+ cups" },
];

const achievements = [
  { value: 100, suffix: "K+", label: "Production users" },
  { value: 300, suffix: "M", label: "Records processed" },
  { value: 1.5, suffix: "TB", label: "Data pipeline scale", decimals: 1 },
  { value: 16, suffix: "x", label: "Compression wins" },
  { value: 40, suffix: "%", label: "Token savings" },
  { value: 10, suffix: "x", label: "Query performance" },
  { value: 0.68, suffix: "ms", label: "Latency target", decimals: 2 },
];

const timeline = [
  {
    year: "Now",
    title: "Software Engineer",
    company: "Highbrow Technology",
    points: [
      "Building AI interview systems with resume ranking, speech pipelines, TTS, analytics, and LLM orchestration.",
      "Shipping LangChain and LangGraph workflows with Redis-backed coordination and AWS deployment paths.",
      "Optimizing backend throughput, token usage, database access patterns, and operational reliability.",
    ],
    stack: ["Node.js", "MongoDB", "Redis", "AWS", "LangChain", "LangGraph"],
  },
  {
    year: "Systems",
    title: "Backend Architecture",
    company: "Production platforms",
    points: [
      "Designing APIs, queues, workers, caching paths, and data models that remain predictable under load.",
      "Working close to Linux, Docker, VPS operations, observability, CI/CD, and deployment automation.",
    ],
    stack: ["Linux", "Docker", "Nginx", "Queues", "Monitoring"],
  },
  {
    year: "R&D",
    title: "Performance Engineering",
    company: "Data and networking",
    points: [
      "Exploring Rust, streaming file formats, socket behavior, compression, Parquet conversion, and fast query engines.",
      "Treating measurements, profiling, and failure modes as core design inputs rather than afterthoughts.",
    ],
    stack: ["Rust", "DuckDB", "Parquet", "Sockets", "Profiling"],
  },
];

const skills: Skill[] = [
  {
    name: "TypeScript",
    category: "Languages",
    experience: "Production",
    detail: "Backend services, API contracts, workflow orchestration, and type-safe product code.",
    tools: ["Node.js", "Express", "Next.js"],
    angle: "8deg",
    radius: "8.5rem",
  },
  {
    name: "Python",
    category: "AI",
    experience: "Applied",
    detail: "LLM integration, data utilities, ranking workflows, scripting, and pipeline experiments.",
    tools: ["LangChain", "LangGraph", "Data tools"],
    angle: "52deg",
    radius: "10rem",
  },
  {
    name: "Node.js",
    category: "Backend",
    experience: "Production",
    detail: "APIs, streaming, queues, authentication, evented workloads, and platform glue.",
    tools: ["Express", "WebSockets", "Workers"],
    angle: "98deg",
    radius: "8.8rem",
  },
  {
    name: "Redis",
    category: "Infrastructure",
    experience: "Production",
    detail: "Caching, queues, coordination, latency-sensitive paths, and session primitives.",
    tools: ["BullMQ", "Streams", "Rate limits"],
    angle: "144deg",
    radius: "10.2rem",
  },
  {
    name: "MongoDB",
    category: "Databases",
    experience: "Production",
    detail: "Schema design, indexes, aggregation flows, agent memory, and ranked retrieval support.",
    tools: ["Indexes", "Aggregation", "Atlas"],
    angle: "191deg",
    radius: "8.7rem",
  },
  {
    name: "PostgreSQL",
    category: "Databases",
    experience: "Strong",
    detail: "Relational modeling, query planning, joins, transactions, and durable system state.",
    tools: ["SQL", "Indexes", "Migrations"],
    angle: "232deg",
    radius: "10.1rem",
  },
  {
    name: "AWS",
    category: "Cloud",
    experience: "Production",
    detail: "Deployments, storage, compute, secrets, and environment design for AI-backed products.",
    tools: ["EC2", "S3", "Lambda"],
    angle: "279deg",
    radius: "8.9rem",
  },
  {
    name: "Docker",
    category: "DevOps",
    experience: "Daily",
    detail: "Repeatable environments, multi-service systems, local production mirrors, and VPS deployment.",
    tools: ["Compose", "Images", "Nginx"],
    angle: "323deg",
    radius: "10.3rem",
  },
  {
    name: "Rust",
    category: "Languages",
    experience: "Experimenting",
    detail: "High-performance services, systems-level thinking, streaming, networking, and safe concurrency.",
    tools: ["Tokio", "Cargo", "Profiling"],
    angle: "18deg",
    radius: "13.2rem",
  },
  {
    name: "Core CS",
    category: "Core CS",
    experience: "Practiced",
    detail: "Data structures, algorithms, operating systems, networking, databases, and system design.",
    tools: ["DSA", "OS", "Networks"],
    angle: "169deg",
    radius: "13.1rem",
  },
  {
    name: "LLM Systems",
    category: "AI",
    experience: "Production",
    detail: "Prompt pipelines, evaluation loops, token budgets, retrieval, agents, and observability.",
    tools: ["LangGraph", "RAG", "Eval"],
    angle: "251deg",
    radius: "13.4rem",
  },
  {
    name: "Linux",
    category: "Infrastructure",
    experience: "Daily",
    detail: "Shell workflows, VPS operations, services, networking, logs, permissions, and hardening.",
    tools: ["systemd", "Nginx", "SSH"],
    angle: "307deg",
    radius: "13rem",
  },
];

const projects: Project[] = [
  {
    title: "AI Interview Platform",
    eyebrow: "LLM product architecture",
    problem:
      "A production interview workflow needed to rank resumes, conduct spoken AI interviews, synthesize speech, and surface analytics without turning the backend into a fragile chain of one-off calls.",
    architecture: ["Resume parser", "Ranking model", "LLM graph", "Speech", "TTS", "Analytics"],
    challenges: [
      "Deterministic orchestration around non-deterministic LLM responses.",
      "Token budget control across ranking, interview, and feedback stages.",
      "Low-latency state flow between user sessions, Redis, and persistent stores.",
    ],
    metrics: [
      { label: "Token savings", value: "40%" },
      { label: "Pipeline stages", value: "6" },
      { label: "Realtime flows", value: "3" },
    ],
    tech: ["TypeScript", "LangChain", "LangGraph", "MongoDB", "Redis", "AWS"],
    icon: BrainCircuit,
  },
  {
    title: "1.5TB NDJSON -> Parquet Engine",
    eyebrow: "Data pipeline performance",
    problem:
      "A huge newline-delimited JSON dataset needed to become queryable without loading everything into memory or waiting on serial conversion work.",
    architecture: ["NDJSON stream", "Workers", "Compression", "Parquet", "DuckDB"],
    challenges: [
      "Streaming 300M records with bounded memory.",
      "Parallel conversion without corrupting row groups or starving I/O.",
      "Keeping the final dataset compact and fast to query.",
    ],
    metrics: [
      { label: "Records", value: "300M" },
      { label: "Input", value: "1.5TB" },
      { label: "Compression", value: "16x" },
    ],
    tech: ["Python", "Parquet", "DuckDB", "Workers", "Compression"],
    icon: HardDrive,
  },
  {
    title: "High Performance HTTP Audio Server",
    eyebrow: "Network and latency engineering",
    problem:
      "Audio workloads needed predictable request handling, socket-level control, and tight latency under concurrent traffic.",
    architecture: ["Clients", "HTTP server", "Socket layer", "Audio stream", "Metrics"],
    challenges: [
      "Reducing latency spikes from connection churn.",
      "Keeping throughput stable under concurrent streams.",
      "Measuring the server as a system rather than isolated handlers.",
    ],
    metrics: [
      { label: "Latency", value: "0.68ms" },
      { label: "Streams", value: "Realtime" },
      { label: "Profiled", value: "Yes" },
    ],
    tech: ["Rust", "HTTP", "Sockets", "Profiling", "Linux"],
    icon: Gauge,
  },
  {
    title: "Infrastructure and VPS Platform",
    eyebrow: "Cloud operations",
    problem:
      "Projects needed reliable deployment paths, repeatable environments, monitoring, and fast operational recovery on pragmatic infrastructure.",
    architecture: ["GitHub", "CI/CD", "Docker", "VPS", "Nginx", "Monitoring"],
    challenges: [
      "Making deploys reproducible across local and remote environments.",
      "Hardening Linux services without overcomplicating the stack.",
      "Keeping logs, metrics, and rollback paths close to the developer loop.",
    ],
    metrics: [
      { label: "Deployments", value: "Automated" },
      { label: "Runtime", value: "Docker" },
      { label: "Ops", value: "Linux" },
    ],
    tech: ["Docker", "Linux", "Nginx", "GitHub Actions", "AWS"],
    icon: Server,
  },
];

const graphNodes = [
  "TypeScript",
  "Node.js",
  "Express",
  "Redis",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Linux",
  "LLM",
  "LangGraph",
  "Pipecat",
];

const architectureNodes: ArchitectureNode[] = [
  {
    id: "users",
    label: "Users",
    subtitle: "Web clients",
    x: "8%",
    y: "42%",
    icon: Globe2,
    detail: "Authenticated browser sessions, realtime interview flows, dashboards, and API clients.",
  },
  {
    id: "gateway",
    label: "API Gateway",
    subtitle: "Ingress",
    x: "24%",
    y: "42%",
    icon: Network,
    detail: "Rate limits, auth checks, routing, observability headers, and request shaping.",
  },
  {
    id: "api",
    label: "Backend API",
    subtitle: "Node services",
    x: "42%",
    y: "28%",
    icon: Server,
    detail: "Core business rules, workflow state, validation, integrations, and product-facing APIs.",
  },
  {
    id: "redis",
    label: "Redis",
    subtitle: "Cache and queue",
    x: "42%",
    y: "58%",
    icon: Database,
    detail: "Hot data, job coordination, retry buffers, rate limiting, and session state.",
  },
  {
    id: "workers",
    label: "Workers",
    subtitle: "Async compute",
    x: "62%",
    y: "28%",
    icon: Cpu,
    detail: "Resume scoring, audio processing, embeddings, pipeline stages, and background tasks.",
  },
  {
    id: "llm",
    label: "LLM Graph",
    subtitle: "Agents",
    x: "62%",
    y: "58%",
    icon: BrainCircuit,
    detail: "LangGraph orchestration, guardrails, context compression, tool calls, and eval loops.",
  },
  {
    id: "storage",
    label: "Storage",
    subtitle: "DB plus object store",
    x: "82%",
    y: "42%",
    icon: HardDrive,
    detail: "MongoDB, PostgreSQL, S3-like storage, analytics tables, audit trails, and query paths.",
  },
];

const activityData = [
  { day: "Mon", commits: 8, reviews: 3 },
  { day: "Tue", commits: 14, reviews: 5 },
  { day: "Wed", commits: 11, reviews: 7 },
  { day: "Thu", commits: 18, reviews: 6 },
  { day: "Fri", commits: 16, reviews: 8 },
  { day: "Sat", commits: 7, reviews: 2 },
  { day: "Sun", commits: 10, reviews: 4 },
];

const languageData = [
  { name: "TS", value: 38 },
  { name: "Python", value: 24 },
  { name: "Rust", value: 14 },
  { name: "SQL", value: 12 },
  { name: "Shell", value: 12 },
];

const radarData = [
  { skill: "APIs", value: 94 },
  { skill: "Data", value: 88 },
  { skill: "AI", value: 91 },
  { skill: "Ops", value: 86 },
  { skill: "Perf", value: 90 },
  { skill: "Design", value: 82 },
];

const blogPosts = [
  {
    title: "Processing 1.5TB of NDJSON on a Potato Laptop with Rust",
    tag: "Performance",
    summary:
      "Streaming conversion, compression tradeoffs, worker pools, Parquet, and DuckDB query paths on low-end hardware.",
    href: "/blogs/0x1",
  },
];

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(12, "Add a little more context"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function PortfolioSite() {
  const prefersReducedMotion = useReducedMotion();
  const cursor = useCursor();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });
    scrollLenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      scrollLenis = null;
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 42, filter: "blur(14px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
            },
          },
        );
      });

      gsap.to("[data-hero-visual]", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-matte text-ink">
      <div className="noise-layer" aria-hidden="true" />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-grid opacity-[0.13]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(9,9,11,0.96) 0%, rgba(9,9,11,0.76) 43%, rgba(9,9,11,0.92) 100%)",
        }}
        aria-hidden="true"
      />
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none fixed z-10 hidden h-72 w-72 rounded-full bg-cyanline/10 blur-3xl md:block"
          style={{ x: cursor.x - 144, y: cursor.y - 144 }}
          transition={{ type: "spring", stiffness: 120, damping: 30 }}
          aria-hidden="true"
        />
      )}
      <Navigation />
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <SkillsGalaxy />
      <ProjectsSection />
      <DashboardSection />
      <TechGraphSection />
      <ArchitecturePlayground />
      <BlogSection />
      <AchievementsSection />
      <ContactSection />
    </main>
  );
}

function Navigation() {
  const links = [
    ["About", "#about"],
    ["Experience", "#experience"],
    ["Projects", "#projects"],
    ["Blogs", "/blogs"],
    ["Architecture", "#architecture"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-lg border border-white/10 bg-matte/72 px-3 py-2 shadow-2xl shadow-black/30 backdrop-blur-2xl">
        <a href="#hero" className="flex items-center gap-2 px-2">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-cyanline/30 bg-cyanline/10 text-cyanline">
            <Terminal className="h-4 w-4" />
          </span>
          <span className="hidden font-display text-sm font-semibold text-white sm:inline">
            TamilArasan N
          </span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={(e) => {
                if (href.startsWith("#") && scrollLenis) {
                  e.preventDefault();
                  scrollLenis.scrollTo(href, { offset: -80 });
                }
              }}
              className="rounded-md px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white transition hover:border-cyanline/40 hover:bg-cyanline/10"
        >
          <Code2 className="h-4 w-4" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const rotatingText = useRotatingText(rotatingStatements, 2100);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28"
    >
      <div className="absolute inset-0 z-0" data-hero-visual aria-hidden="true">
        <Image
          src="/ai-infra-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-48"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-matte via-matte/74 to-matte/52" />
        <div className="absolute inset-0 bg-gradient-to-b from-matte/20 via-transparent to-matte" />
      </div>
      <div className="absolute inset-0 z-0 opacity-70" aria-hidden="true">
        <HeroField />
      </div>
      <div className="section-shell relative z-10 grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-cyanline/20 bg-cyanline/10 px-3 py-2 text-sm text-cyanline">
            <Sparkles className="h-4 w-4" />
            AI infrastructure, distributed systems, backend platforms
          </div>
          <h1 className="font-display text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            <Balancer>{profile.name}</Balancer>
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-base font-medium text-zinc-300 sm:text-lg">
            <span>{profile.title}</span>
            <span className="h-1 w-1 rounded-full bg-cyanline" />
            <span>AI Systems</span>
            <span className="h-1 w-1 rounded-full bg-blueprint" />
            <span>Distributed Architecture</span>
            <span className="h-1 w-1 rounded-full bg-violetline" />
            <span>Performance Engineering</span>
          </div>
          <div className="mt-7 h-10 overflow-hidden font-mono text-xl text-cyanline sm:text-2xl">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingText}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                transition={{ duration: 0.48, ease: "easeOut" }}
                className="inline-block"
              >
                {rotatingText}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">
            I build backend systems that keep working when the load spikes, the model
            gets expensive, the queue backs up, and every millisecond starts to
            matter.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <MagneticLink href="#projects" icon={Rocket} tone="primary">
              View Projects
            </MagneticLink>
            <MagneticLink href="/resume" icon={Download}>
              Download Resume
            </MagneticLink>
            <MagneticLink href={profile.github} icon={Code2} external>
              GitHub
            </MagneticLink>
            <MagneticLink href={profile.linkedin} icon={Briefcase} external>
              LinkedIn
            </MagneticLink>
            <MagneticLink href="#contact" icon={Mail}>
              Contact
            </MagneticLink>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 36, filter: "blur(14px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <TerminalShowcase />
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {heroMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.06 }}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl"
              >
                <div className="font-mono text-2xl font-semibold text-white">
                  <CountUp end={metric.value} duration={2.1} enableScrollSpy />
                  <span className="text-cyanline">{metric.suffix}</span>
                </div>
                <div className="mt-1 text-xs text-zinc-500">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroField() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 48 }} dpr={[1, 1.6]}>
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 2, 2]} intensity={1.4} color="#22d3ee" />
      <ParticleCloud />
    </Canvas>
  );
}

function ParticleCloud() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { pointGeometry, lineGeometry } = useMemo(() => {
    const count = 115;
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const stride = index * 3;
      positions[stride] = (seededUnit(index + 11) - 0.5) * 7.5;
      positions[stride + 1] = (seededUnit(index + 37) - 0.5) * 4.2;
      positions[stride + 2] = (seededUnit(index + 73) - 0.5) * 2.5;
    }

    const linePositions: number[] = [];
    for (let index = 0; index < count; index += 1) {
      const next = (index + 7) % count;
      linePositions.push(
        positions[index * 3],
        positions[index * 3 + 1],
        positions[index * 3 + 2],
        positions[next * 3],
        positions[next * 3 + 1],
        positions[next * 3 + 2],
      );
    }

    const points = new THREE.BufferGeometry();
    points.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const lines = new THREE.BufferGeometry();
    lines.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(linePositions), 3),
    );

    return { pointGeometry: points, lineGeometry: lines };
  }, []);

  useFrame(({ clock, mouse }) => {
    const time = clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.035 + mouse.x * 0.05;
      pointsRef.current.rotation.x = mouse.y * 0.025;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.025 + mouse.x * 0.035;
      linesRef.current.rotation.x = mouse.y * 0.02;
    }
  });

  return (
    <group position={[1.25, 0, 0]}>
      <points ref={pointsRef} geometry={pointGeometry}>
        <pointsMaterial
          color="#22d3ee"
          size={0.024}
          transparent
          opacity={0.68}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.14} />
      </lineSegments>
    </group>
  );
}

function seededUnit(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function TerminalShowcase() {
  const command = useTypingCommand(terminalCommands);

  return (
    <div className="glass-panel edge-highlight relative overflow-hidden rounded-lg">
      <div className="scanline" />
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="font-mono text-xs text-zinc-500">prod-ai-platform</div>
      </div>
      <div className="bg-grid-fine p-5 sm:p-6">
        <div className="font-mono text-sm leading-7 text-zinc-300 sm:text-base">
          <p className="text-zinc-500">$ ssh tamil@infra-edge</p>
          <p className="text-zinc-500">$ export TRACE_ID=llm-run-42</p>
          <p className="terminal-caret min-h-7 text-cyanline">$ {command}</p>
          <p className="mt-4 text-zinc-400">workers: 8 online</p>
          <p className="text-zinc-400">queue: drained in 182ms</p>
          <p className="text-zinc-400">cache hit ratio: 94.7%</p>
          <p className="text-zinc-400">p95 latency: 28ms</p>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
          {[
            ["API", "healthy"],
            ["LLM", "streaming"],
            ["Redis", "hot"],
          ].map(([label, status]) => (
            <div key={label} className="rounded-md border border-white/10 bg-black/24 p-3">
              <div className="text-xs text-zinc-500">{label}</div>
              <div className="mt-1 flex items-center gap-2 text-sm text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-cyanline shadow-[0_0_16px_rgba(34,211,238,0.9)]" />
                {status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="About"
          title="Systems first. Interfaces second. Reliability always."
          body="The work is backend-heavy, but the instinct is product-minded: build the path that stays understandable after launch, after scale, and after the first unexpected failure."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div data-reveal className="space-y-6 text-lg leading-9 text-zinc-300">
            <p>
              I like building systems that continue working when everything else gets
              noisy: APIs under traffic, LLM pipelines with shifting outputs, queues
              under pressure, databases that need better indexes, and cloud
              infrastructure that has to be boring in production.
            </p>
            <p>
              My engineering taste sits at the intersection of AI infrastructure,
              backend architecture, large-scale data processing, Linux operations,
              Dockerized deployments, Redis coordination, database design, and
              performance optimization. I experiment with Rust when the problem wants
              tighter control over memory, sockets, or throughput.
            </p>
          </div>
          <div data-reveal className="relative">
            <div className="absolute bottom-6 left-7 top-7 w-px bg-gradient-to-b from-cyanline via-blueprint to-transparent" />
            {[
              ["Design", "Model the failure modes, data flow, ownership boundaries, and recovery path."],
              ["Build", "Ship clean APIs, workers, queues, database paths, and observable services."],
              ["Measure", "Use latency, cost, compression, memory, and throughput to guide the next iteration."],
            ].map(([title, text], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
                className="relative mb-6 pl-16"
              >
                <div className="absolute left-0 top-1 grid h-14 w-14 place-items-center rounded-lg border border-cyanline/30 bg-cyanline/10 text-cyanline">
                  {index + 1}
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                  <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-2 leading-7 text-zinc-400">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="experience" className="relative py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Experience"
          title="Production AI workflows, backend systems, and infrastructure."
          body="The strongest work sits where product requirements meet orchestration, latency, databases, and deployment discipline."
        />
        <div data-reveal className="mt-12 grid gap-8 lg:grid-cols-[0.62fr_0.38fr]">
          <div className="relative">
            <div className="absolute left-4 top-6 h-[calc(100%-48px)] w-px bg-white/10" />
            {timeline.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={cn(
                  "relative mb-5 block w-full rounded-lg border p-5 pl-14 text-left transition",
                  active === index
                    ? "border-cyanline/40 bg-cyanline/10"
                    : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]",
                )}
              >
                <span
                  className={cn(
                    "absolute left-0 top-6 h-8 w-8 rounded-lg border",
                    active === index
                      ? "border-cyanline bg-cyanline/20 shadow-[0_0_24px_rgba(34,211,238,0.35)]"
                      : "border-white/15 bg-matte",
                  )}
                />
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm text-cyanline">{item.year}</span>
                  <span className="text-sm text-zinc-500">{item.company}</span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                  {item.title}
                </h3>
                <AnimatePresence initial={false}>
                  {active === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-5 space-y-3 text-sm leading-7 text-zinc-300">
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-3">
                            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-cyanline" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
          <SystemFlow active={active} />
        </div>
      </div>
    </section>
  );
}

function SystemFlow({ active }: { active: number }) {
  const labels = [
    ["Resume", "LLM", "Redis", "Analytics"],
    ["API", "Queue", "Worker", "Deploy"],
    ["Stream", "Worker", "Parquet", "DuckDB"],
  ][active];

  return (
    <div className="glass-panel edge-highlight relative min-h-[430px] overflow-hidden rounded-lg p-5">
      <div className="absolute inset-0 bg-grid-fine opacity-30" />
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <div className="font-mono text-xs uppercase text-cyanline">flow trace</div>
          <h3 className="mt-2 font-display text-xl font-semibold text-white">
            Distributed request path
          </h3>
        </div>
        <Activity className="h-5 w-5 text-cyanline" />
      </div>
      <div className="relative z-10 mt-12 grid grid-cols-2 gap-5">
        {labels.map((label, index) => (
          <motion.div
            key={`${label}-${active}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="relative rounded-lg border border-white/10 bg-black/28 p-5"
          >
            <div className="mb-5 grid h-10 w-10 place-items-center rounded-md bg-cyanline/10 text-cyanline">
              {[FileText, BrainCircuit, Database, BarChart3][index] &&
                (() => {
                  const Icon = [FileText, BrainCircuit, Database, BarChart3][index];
                  return <Icon className="h-5 w-5" />;
                })()}
            </div>
            <div className="font-display text-lg font-semibold text-white">{label}</div>
            <div className="mt-2 text-sm text-zinc-500">
              {["ingest", "reason", "coordinate", "measure"][index]}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="packet packet-x top-[48%]" />
      <div className="packet packet-y left-[48%]" />
      <div className="packet packet-diagonal" />
    </div>
  );
}

function SkillsGalaxy() {
  const [activeSkill, setActiveSkill] = useState(skills[0]);
  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  return (
    <section id="skills" className="relative py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Technical Skills"
          title="A backend stack organized like a system, not a checklist."
          body="Languages, infrastructure, data stores, cloud, AI, and core computer science stay connected because production systems do not respect category boundaries."
        />
        <div data-reveal className="mt-12 grid items-center gap-8 lg:grid-cols-[0.62fr_0.38fr]">
          <div className="relative mx-auto aspect-square w-full max-w-[620px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.025]">
            <div className="absolute inset-8 rounded-full border border-cyanline/12" />
            <div className="absolute inset-20 rounded-full border border-blueprint/12" />
            <div className="absolute inset-32 rounded-full border border-violetline/12" />
            <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg border border-cyanline/30 bg-cyanline/10 text-center">
              <Cpu className="mx-auto h-6 w-6 text-cyanline" />
              <span className="mt-2 block text-xs text-zinc-300">Systems Core</span>
            </div>
            {skills.map((skill) => (
              <button
                key={skill.name}
                type="button"
                onMouseEnter={() => setActiveSkill(skill)}
                onFocus={() => setActiveSkill(skill)}
                onClick={() => setActiveSkill(skill)}
                className={cn(
                  "skill-node absolute left-1/2 top-1/2 -ml-14 -mt-5 h-10 w-28 rounded-md border px-2 text-xs font-medium transition",
                  activeSkill.name === skill.name
                    ? "border-cyanline bg-cyanline/15 text-white shadow-[0_0_26px_rgba(34,211,238,0.28)]"
                    : "border-white/10 bg-black/36 text-zinc-400 hover:border-white/20 hover:text-white",
                )}
                style={
                  {
                    "--angle": skill.angle,
                    "--radius": skill.radius,
                  } as React.CSSProperties
                }
              >
                {skill.name}
              </button>
            ))}
          </div>
          <div className="glass-panel rounded-lg p-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className={cn(
                    "rounded-md border px-2.5 py-1 text-xs",
                    activeSkill.category === category
                      ? "border-cyanline/40 bg-cyanline/10 text-cyanline"
                      : "border-white/10 bg-white/[0.03] text-zinc-500",
                  )}
                >
                  {category}
                </span>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkill.name}
                initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                transition={{ duration: 0.32 }}
                className="mt-8"
              >
                <div className="font-mono text-sm text-cyanline">
                  {activeSkill.experience}
                </div>
                <h3 className="mt-2 font-display text-3xl font-semibold text-white">
                  {activeSkill.name}
                </h3>
                <p className="mt-4 leading-8 text-zinc-300">{activeSkill.detail}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {activeSkill.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md border border-white/10 bg-black/24 px-3 py-1.5 text-sm text-zinc-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Project work presented as architecture, tradeoffs, and measurable outcomes."
          body="Each build is framed around the production problem, the system shape, the hard parts, and the performance signal."
        />
        <div className="mt-12 space-y-8">
          {projects.map((project, index) => (
            <ProjectShowcase key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;

  return (
    <motion.article
      data-reveal
      className="glass-panel edge-highlight overflow-hidden rounded-lg"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.26, ease: "easeOut" }}
    >
      <div className="grid gap-0 lg:grid-cols-[0.48fr_0.52fr]">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-lg border border-cyanline/30 bg-cyanline/10 text-cyanline">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <div className="font-mono text-xs uppercase text-cyanline">
                {project.eyebrow}
              </div>
              <h3 className="mt-1 font-display text-2xl font-semibold text-white sm:text-3xl">
                {project.title}
              </h3>
            </div>
          </div>
          <p className="mt-6 leading-8 text-zinc-300">{project.problem}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="border-t border-white/10 pt-3">
                <div className="font-mono text-xl text-white">{metric.value}</div>
                <div className="mt-1 text-xs text-zinc-500">{metric.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1 text-xs text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="relative min-h-[430px] border-t border-white/10 bg-black/22 p-6 lg:border-l lg:border-t-0">
          <ArchitectureDiagram steps={project.architecture} index={index} />
          <div className="mt-7">
            <div className="font-mono text-xs uppercase text-zinc-500">
              Challenges
            </div>
            <div className="mt-4 space-y-3">
              {project.challenges.map((challenge) => (
                <div key={challenge} className="flex gap-3 text-sm leading-6 text-zinc-300">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyanline" />
                  <span>{challenge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ArchitectureDiagram({ steps, index }: { steps: string[]; index: number }) {
  const icons = [FileText, BrainCircuit, Database, Workflow, BarChart3, Cloud];

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-matte/50 p-5">
      <div className="absolute inset-0 bg-grid-fine opacity-30" />
      <div className="relative z-10 grid gap-4 sm:grid-cols-3">
        {steps.map((step, stepIndex) => {
          const Icon = icons[stepIndex % icons.length];
          return (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: stepIndex * 0.05 }}
              className="relative rounded-lg border border-white/10 bg-white/[0.035] p-4"
            >
              <div className="grid h-10 w-10 place-items-center rounded-md bg-cyanline/10 text-cyanline">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-display text-base font-semibold text-white">
                {step}
              </div>
              <div className="mt-2 font-mono text-[11px] text-zinc-500">
                stage {String(stepIndex + 1).padStart(2, "0")}
              </div>
              {stepIndex < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute hidden h-px bg-gradient-to-r from-cyanline/70 to-transparent sm:block",
                    stepIndex % 3 === 2 ? "left-1/2 top-full h-4 w-px" : "left-full top-1/2 w-4",
                  )}
                />
              )}
            </motion.div>
          );
        })}
      </div>
      <div
        className={cn(
          "packet packet-x top-1/2",
          index % 2 === 0 ? "bg-cyanline" : "bg-violetline",
        )}
      />
    </div>
  );
}

function DashboardSection() {
  return (
    <section id="dashboard" className="relative py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Engineering Dashboard"
          title="A monitoring view for the engineering signal behind the portfolio."
          body="Stats, languages, architecture strengths, and coding activity are presented as operational telemetry rather than vanity counters."
        />
        <div data-reveal className="mt-12 grid gap-4 lg:grid-cols-12">
          <DashboardWidget className="lg:col-span-5" title="Coding Activity" icon={Activity}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ left: -28, right: 12, top: 16 }}>
                  <defs>
                    <linearGradient id="activity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="day" stroke="#71717a" tickLine={false} axisLine={false} />
                  <YAxis stroke="#71717a" tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ stroke: "#22d3ee", strokeOpacity: 0.28 }}
                    contentStyle={{
                      background: "#111113",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 8,
                      color: "#fafafa",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="commits"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    fill="url(#activity)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </DashboardWidget>
          <DashboardWidget className="lg:col-span-3" title="Languages" icon={Code2}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={languageData} margin={{ left: -28, right: 8, top: 16 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="name" stroke="#71717a" tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  <Tooltip
                    cursor={{ fill: "rgba(34,211,238,0.06)" }}
                    contentStyle={{
                      background: "#111113",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 8,
                      color: "#fafafa",
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardWidget>
          <DashboardWidget className="lg:col-span-4" title="Architecture Skills" icon={Network}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.12)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                  <Radar
                    dataKey="value"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.28}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </DashboardWidget>
          {[
            ["GitHub Stats", "42 repositories", GitBranch],
            ["LeetCode Stats", "320+ problems", Gauge],
            ["Recent Commits", "84 this month", Activity],
            ["System Design", "queues, caches, DBs", Layers3],
          ].map(([title, value, Icon]) => (
            <div
              key={title as string}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-5 lg:col-span-3"
            >
              <Icon className="h-5 w-5 text-cyanline" />
              <div className="mt-5 text-sm text-zinc-500">{title as string}</div>
              <div className="mt-2 font-display text-xl font-semibold text-white">
                {value as string}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardWidget({
  title,
  icon: Icon,
  className,
  children,
}: {
  title: string;
  icon: LucideIcon;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("glass-panel rounded-lg p-5", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
        <Icon className="h-5 w-5 text-cyanline" />
      </div>
      {children}
    </div>
  );
}

function TechGraphSection() {
  const [scale, setScale] = useState(100);
  const [active, setActive] = useState(graphNodes[0]);

  return (
    <section id="tech-graph" className="relative py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Tech Stack Visualization"
          title="A stack graph that follows request flow instead of icon walls."
          body="The graph connects application code, cache, databases, cloud, containers, operating systems, and LLM orchestration as one delivery path."
        />
        <div data-reveal className="mt-12 overflow-hidden rounded-lg border border-white/10 bg-white/[0.025]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-5">
            <div>
              <div className="font-mono text-xs uppercase text-cyanline">active node</div>
              <div className="mt-1 font-display text-xl font-semibold text-white">{active}</div>
            </div>
            <label className="flex items-center gap-3 text-sm text-zinc-400">
              Zoom
              <input
                aria-label="Zoom tech graph"
                type="range"
                min="80"
                max="130"
                value={scale}
                onChange={(event) => setScale(Number(event.target.value))}
                className="accent-cyanline"
              />
            </label>
          </div>
          <div className="overflow-auto p-6">
            <div
              className="relative mx-auto min-h-[520px] min-w-[760px] origin-top rounded-lg bg-matte/60 p-6 transition-transform"
              style={{ transform: `scale(${scale / 100})` }}
            >
              <div className="absolute left-1/2 top-8 h-[calc(100%-64px)] w-px -translate-x-1/2 bg-gradient-to-b from-cyanline via-blueprint to-violetline opacity-40" />
              {graphNodes.map((node, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <button
                    key={node}
                    type="button"
                    onClick={() => setActive(node)}
                    className={cn(
                      "absolute flex w-64 items-center gap-3 rounded-lg border p-4 text-left transition",
                      active === node
                        ? "border-cyanline/50 bg-cyanline/12 text-white shadow-[0_0_36px_rgba(34,211,238,0.16)]"
                        : "border-white/10 bg-white/[0.035] text-zinc-300 hover:border-white/20",
                    )}
                    style={{
                      left: isLeft ? "13%" : "54%",
                      top: `${index * 38 + 12}px`,
                    }}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-cyanline/10 text-cyanline">
                      {[Code2, Server, Workflow, Database, Database, Database, Cloud, Container, Terminal, BrainCircuit, Network, Activity][index] &&
                        (() => {
                          const Icon = [
                            Code2,
                            Server,
                            Workflow,
                            Database,
                            Database,
                            Database,
                            Cloud,
                            Container,
                            Terminal,
                            BrainCircuit,
                            Network,
                            Activity,
                          ][index];
                          return <Icon className="h-4 w-4" />;
                        })()}
                    </span>
                    <span>
                      <span className="block font-display font-semibold">{node}</span>
                      <span className="mt-1 block text-xs text-zinc-500">
                        {index < 3
                          ? "application path"
                          : index < 6
                            ? "state layer"
                            : index < 9
                              ? "runtime layer"
                              : "AI layer"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchitecturePlayground() {
  const [activeNode, setActiveNode] = useState(architectureNodes[0]);
  const ActiveIcon = activeNode.icon;

  return (
    <section id="architecture" className="relative py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Architecture Playground"
          title="An interactive distributed system map with live request motion."
          body="Click any component to inspect its role in a backend architecture built around APIs, queues, workers, Redis, LLM graphs, databases, and object storage."
        />
        <div data-reveal className="mt-12 grid gap-6 lg:grid-cols-[0.68fr_0.32fr]">
          <div className="relative min-h-[560px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.025]">
            <div className="absolute inset-0 bg-grid-fine opacity-35" />
            <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <linearGradient id="playground-line" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#22d3ee" stopOpacity="0.12" />
                  <stop offset="0.5" stopColor="#3b82f6" stopOpacity="0.45" />
                  <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.18" />
                </linearGradient>
              </defs>
              {[
                ["14%", "48%", "29%", "48%"],
                ["31%", "46%", "45%", "33%"],
                ["31%", "50%", "45%", "62%"],
                ["48%", "33%", "64%", "33%"],
                ["48%", "62%", "64%", "62%"],
                ["66%", "33%", "83%", "46%"],
                ["66%", "62%", "83%", "50%"],
              ].map(([x1, y1, x2, y2], index) => (
                <line
                  key={`${x1}-${index}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#playground-line)"
                  strokeWidth="2"
                />
              ))}
            </svg>
            <div className="packet packet-x top-[47%]" />
            <div className="packet packet-diagonal" />
            {architectureNodes.map((node) => {
              const Icon = node.icon;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveNode(node)}
                  className={cn(
                    "absolute w-32 -translate-x-1/2 -translate-y-1/2 rounded-lg border p-3 text-left transition sm:w-36",
                    activeNode.id === node.id
                      ? "border-cyanline/50 bg-cyanline/15 shadow-[0_0_34px_rgba(34,211,238,0.18)]"
                      : "border-white/10 bg-black/44 hover:border-white/20 hover:bg-white/[0.05]",
                  )}
                  style={{ left: node.x, top: node.y }}
                >
                  <Icon className="h-5 w-5 text-cyanline" />
                  <span className="mt-3 block font-display text-sm font-semibold text-white">
                    {node.label}
                  </span>
                  <span className="mt-1 block text-xs text-zinc-500">{node.subtitle}</span>
                </button>
              );
            })}
          </div>
          <div className="glass-panel rounded-lg p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-cyanline/10 text-cyanline">
                <ActiveIcon className="h-6 w-6" />
              </span>
              <div>
                <div className="font-mono text-xs uppercase text-cyanline">component</div>
                <h3 className="font-display text-2xl font-semibold text-white">
                  {activeNode.label}
                </h3>
              </div>
            </div>
            <p className="mt-6 leading-8 text-zinc-300">{activeNode.detail}</p>
            <div className="mt-8 space-y-3">
              {["latency budget", "failure boundary", "observability", "scale path"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between border-b border-white/10 pb-3 text-sm"
                  >
                    <span className="text-zinc-500">{item}</span>
                    <span className="text-cyanline">tracked</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section id="blog" className="relative py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Blog"
          title="Writing topics for people who like the engineering beneath the product."
          body="Distributed systems, AI agents, databases, backend design, Rust, Linux, performance engineering, and architecture notes."
        />
        <div data-reveal className="mt-12 grid gap-4 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article
              key={post.title}
              className="edge-highlight rounded-lg border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:bg-white/[0.05]"
            >
              <div className="font-mono text-xs uppercase text-cyanline">{post.tag}</div>
              <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                {post.title}
              </h3>
              <p className="mt-4 leading-7 text-zinc-400">{post.summary}</p>
              <a
                href={post.href}
                className="mt-6 inline-flex items-center gap-2 text-sm text-cyanline"
              >
                Read article
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-24">
      <div className="section-shell">
        <div data-reveal className="glass-panel rounded-lg p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
            <div>
              <div className="font-mono text-xs uppercase text-cyanline">Achievements</div>
              <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
                Numbers that describe scale, compression, latency, and cost control.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.map((item) => (
                <div key={item.label} className="border-t border-white/10 pt-4">
                  <div className="font-mono text-3xl font-semibold text-white">
                    <CountUp
                      end={item.value}
                      decimals={item.decimals ?? 0}
                      duration={2.3}
                      enableScrollSpy
                    />
                    <span className="text-cyanline">{item.suffix}</span>
                  </div>
                  <div className="mt-2 text-sm text-zinc-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [status, setStatus] = useState("Ready for serious systems work.");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactForm) => {
    const firstName = values.name.trim().split(/\s+/)[0];
    setStatus(`Message staged for ${firstName}. Wire Resend in production.`);
    reset();
  };

  return (
    <section id="contact" className="relative pb-20 pt-24">
      <div className="section-shell">
        <div data-reveal className="grid gap-8 lg:grid-cols-[0.45fr_0.55fr]">
          <div>
            <div className="font-mono text-xs uppercase text-cyanline">Contact</div>
            <h2 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
              Let&apos;s build something incredible.
            </h2>
            <div className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-black/48">
              <div className="border-b border-white/10 px-4 py-3 font-mono text-xs text-zinc-500">
                /contact/tamil
              </div>
              <div className="p-5 font-mono text-sm leading-7 text-zinc-300">
                <p className="text-cyanline">&gt; open channel</p>
                <p>role: backend + AI systems engineer</p>
                <p>focus: reliability, latency, scale, architecture</p>
                <p className="terminal-caret text-white">&gt; {status}</p>
              </div>
            </div>
            <div className="mt-7 space-y-3 text-sm text-zinc-400">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-cyanline" />
                {profile.email}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3"
              >
                <Briefcase className="h-4 w-4 text-cyanline" />
                LinkedIn
              </a>
              <span className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-cyanline" />
                {profile.location}
              </span>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="glass-panel rounded-lg p-5 sm:p-6"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                placeholder="Your name"
                error={errors.name?.message}
                {...register("name")}
              />
              <Field
                label="Email"
                type="email"
                placeholder="you@company.com"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
            <Field
              label="Message"
              placeholder="Tell me what you want to build."
              error={errors.message?.message}
              textarea
              className="mt-4"
              {...register("message")}
            />
            <button
              type="submit"
              className="magnetic-shadow mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md border border-cyanline/40 bg-cyanline/12 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyanline/18 sm:w-auto"
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>
          </form>
        </div>
        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-zinc-500">
          <span>Built for scalable systems, AI platforms, and performance work.</span>
          <div className="flex items-center gap-4">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`}>Email</a>
          </div>
        </footer>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  textarea?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Field = forwardRef<HTMLInputElement | HTMLTextAreaElement, FieldProps>(
  function Field({ label, error, textarea, className, ...props }, ref) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  const baseClass =
    "mt-2 w-full rounded-md border border-white/10 bg-black/28 px-3 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyanline/50 focus:bg-black/40";

  return (
    <label className={cn("block", className)}>
      <span className="text-sm text-zinc-400">{label}</span>
      {textarea ? (
        <textarea
          id={id}
          rows={7}
          className={baseClass}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          {...props}
        />
      ) : (
        <input
          id={id}
          className={baseClass}
          ref={ref as React.Ref<HTMLInputElement>}
          {...props}
        />
      )}
      {error && <span className="mt-2 block text-xs text-red-300">{error}</span>}
    </label>
  );
  },
);

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div data-reveal className="max-w-3xl">
      <div className="font-mono text-xs uppercase text-cyanline">{eyebrow}</div>
      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
        <Balancer>{title}</Balancer>
      </h2>
      <p className="mt-5 text-lg leading-8 text-zinc-400">{body}</p>
    </div>
  );
}

function MagneticLink({
  href,
  icon: Icon,
  children,
  tone = "default",
  external,
}: {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  tone?: "default" | "primary";
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || !ref.current) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    setOffset({
      x: (event.clientX - rect.left - rect.width / 2) * 0.16,
      y: (event.clientY - rect.top - rect.height / 2) * 0.16,
    });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={offset}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.4 }}
      className={cn(
        "magnetic-shadow inline-flex items-center gap-2 rounded-md border px-4 py-3 text-sm font-semibold transition",
        tone === "primary"
          ? "border-cyanline/40 bg-cyanline/14 text-white hover:bg-cyanline/18"
          : "border-white/10 bg-white/[0.045] text-zinc-200 hover:border-cyanline/30 hover:bg-white/[0.07]",
      )}
    >
      <Icon className="h-4 w-4" />
      {children}
    </motion.a>
  );
}

function useRotatingText(items: string[], interval: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [interval, items.length]);

  return items[index];
}

function useTypingCommand(commands: string[]) {
  const [commandIndex, setCommandIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const fullCommand = commands[commandIndex];
    let charIndex = 0;
    let deleting = false;

    const timer = window.setInterval(() => {
      if (!deleting) {
        charIndex += 1;
        setText(fullCommand.slice(0, charIndex));
        if (charIndex >= fullCommand.length) {
          deleting = true;
          window.setTimeout(() => undefined, 650);
        }
      } else {
        charIndex -= 1;
        setText(fullCommand.slice(0, Math.max(charIndex, 0)));
        if (charIndex <= 0) {
          deleting = false;
          setCommandIndex((current) => (current + 1) % commands.length);
        }
      }
    }, deleting ? 42 : 58);

    return () => window.clearInterval(timer);
  }, [commandIndex, commands]);

  return text;
}

function useCursor() {
  const [position, setPosition] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return position;
}
