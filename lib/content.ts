// All copy for the portfolio lives here so the components stay purely presentational.

export const profile = {
  name: "TamilArasan N",
  title: "Backend Software Engineer",
  email: "tamilarasan.n.dev@gmail.com",
  github: "https://github.com/tamilarasan-n-dev/",
  linkedin: "https://www.linkedin.com/in/tamil-dev/",
  location: "India",
};

export const heroEyebrow = "AI infrastructure, distributed systems, backend platforms";

export const heroDisciplines = [
  profile.title,
  "AI Systems",
  "Distributed Architecture",
  "Performance Engineering",
];

export const heroIntro =
  "I build backend systems that keep working when the load spikes, the model gets expensive, the queue backs up, and every millisecond starts to matter.";

export const rotatingStatements = [
  "Building AI Systems.",
  "Scaling Distributed Infrastructure.",
  "Designing High Performance Backends.",
  "Engineering Reliable Platforms.",
  "Optimizing at Scale.",
];

export const terminalCommands = [
  "docker compose up --scale worker=8",
  "cargo run --release --bin audio-server",
  "redis-cli --latency-history",
  "kubectl get pods -n ai-platform",
  "pnpm build && git push origin main",
  "duckdb analytics.parquet",
];

export const heroMetrics = [
  { label: "Experience", value: 2, suffix: "+ yrs" },
  { label: "Projects", value: 18, suffix: "+" },
  { label: "GitHub Repos", value: 42, suffix: "+" },
  { label: "LeetCode", value: 320, suffix: "+" },
  { label: "Years Coding", value: 5, suffix: "+" },
  { label: "Coffee", value: 1200, suffix: "+ cups" },
];

export const achievements = [
  { value: 100, suffix: "K+", label: "Production users" },
  { value: 300, suffix: "M", label: "Records processed" },
  { value: 1.5, suffix: "TB", label: "Data pipeline scale", decimals: 1 },
  { value: 16, suffix: "x", label: "Compression wins" },
  { value: 40, suffix: "%", label: "Token savings" },
  { value: 10, suffix: "x", label: "Query performance" },
  { value: 0.68, suffix: "ms", label: "Latency target", decimals: 2 },
];

export const about = {
  eyebrow: "About",
  title: "Systems first. Interfaces second. Reliability always.",
  body: "The work is backend-heavy, but the instinct is product-minded: build the path that stays understandable after launch, after scale, and after the first unexpected failure.",
  paragraphs: [
    "I like building systems that continue working when everything else gets noisy: APIs under traffic, LLM pipelines with shifting outputs, queues under pressure, databases that need better indexes, and cloud infrastructure that has to be boring in production.",
    "My engineering taste sits at the intersection of AI infrastructure, backend architecture, large-scale data processing, Linux operations, Dockerized deployments, Redis coordination, database design, and performance optimization. I experiment with Rust when the problem wants tighter control over memory, sockets, or throughput.",
  ],
  method: [
    ["Design", "Model the failure modes, data flow, ownership boundaries, and recovery path."],
    ["Build", "Ship clean APIs, workers, queues, database paths, and observable services."],
    ["Measure", "Use latency, cost, compression, memory, and throughput to guide the next iteration."],
  ] as const,
};

export const experience = {
  eyebrow: "Experience",
  title: "Production AI workflows, backend systems, and infrastructure.",
  body: "The strongest work sits where product requirements meet orchestration, latency, databases, and deployment discipline.",
};

export const timeline = [
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
    flow: ["Resume", "LLM", "Redis", "Analytics"],
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
    flow: ["API", "Queue", "Worker", "Deploy"],
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
    flow: ["Stream", "Worker", "Parquet", "DuckDB"],
  },
];

export const flowVerbs = ["ingest", "reason", "coordinate", "measure"];

export type Skill = {
  name: string;
  category: string;
  experience: string;
  detail: string;
  tools: string[];
};

export const skillsCopy = {
  eyebrow: "Technical Skills",
  title: "A backend stack organized like a system, not a checklist.",
  body: "Languages, infrastructure, data stores, cloud, AI, and core computer science stay connected because production systems do not respect category boundaries.",
};

export const skills: Skill[] = [
  {
    name: "TypeScript",
    category: "Languages",
    experience: "Production",
    detail: "Backend services, API contracts, workflow orchestration, and type-safe product code.",
    tools: ["Node.js", "Express", "Next.js"],
  },
  {
    name: "Python",
    category: "AI",
    experience: "Applied",
    detail: "LLM integration, data utilities, ranking workflows, scripting, and pipeline experiments.",
    tools: ["LangChain", "LangGraph", "Data tools"],
  },
  {
    name: "Node.js",
    category: "Backend",
    experience: "Production",
    detail: "APIs, streaming, queues, authentication, evented workloads, and platform glue.",
    tools: ["Express", "WebSockets", "Workers"],
  },
  {
    name: "Redis",
    category: "Infrastructure",
    experience: "Production",
    detail: "Caching, queues, coordination, latency-sensitive paths, and session primitives.",
    tools: ["BullMQ", "Streams", "Rate limits"],
  },
  {
    name: "MongoDB",
    category: "Databases",
    experience: "Production",
    detail: "Schema design, indexes, aggregation flows, agent memory, and ranked retrieval support.",
    tools: ["Indexes", "Aggregation", "Atlas"],
  },
  {
    name: "PostgreSQL",
    category: "Databases",
    experience: "Strong",
    detail: "Relational modeling, query planning, joins, transactions, and durable system state.",
    tools: ["SQL", "Indexes", "Migrations"],
  },
  {
    name: "AWS",
    category: "Cloud",
    experience: "Production",
    detail: "Deployments, storage, compute, secrets, and environment design for AI-backed products.",
    tools: ["EC2", "S3", "Lambda"],
  },
  {
    name: "Docker",
    category: "DevOps",
    experience: "Daily",
    detail: "Repeatable environments, multi-service systems, local production mirrors, and VPS deployment.",
    tools: ["Compose", "Images", "Nginx"],
  },
  {
    name: "Rust",
    category: "Languages",
    experience: "Experimenting",
    detail: "High-performance services, systems-level thinking, streaming, networking, and safe concurrency.",
    tools: ["Tokio", "Cargo", "Profiling"],
  },
  {
    name: "Core CS",
    category: "Core CS",
    experience: "Practiced",
    detail: "Data structures, algorithms, operating systems, networking, databases, and system design.",
    tools: ["DSA", "OS", "Networks"],
  },
  {
    name: "LLM Systems",
    category: "AI",
    experience: "Production",
    detail: "Prompt pipelines, evaluation loops, token budgets, retrieval, agents, and observability.",
    tools: ["LangGraph", "RAG", "Eval"],
  },
  {
    name: "Linux",
    category: "Infrastructure",
    experience: "Daily",
    detail: "Shell workflows, VPS operations, services, networking, logs, permissions, and hardening.",
    tools: ["systemd", "Nginx", "SSH"],
  },
];

export type Project = {
  title: string;
  eyebrow: string;
  problem: string;
  architecture: string[];
  challenges: string[];
  metrics: { label: string; value: string }[];
  tech: string[];
};

export const projectsCopy = {
  eyebrow: "Featured Projects",
  title: "Project work presented as architecture, tradeoffs, and measurable outcomes.",
  body: "Each build is framed around the production problem, the system shape, the hard parts, and the performance signal.",
};

export const projects: Project[] = [
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
  },
];

export const dashboardCopy = {
  eyebrow: "Engineering Dashboard",
  title: "A monitoring view for the engineering signal behind the portfolio.",
  body: "Stats, languages, architecture strengths, and coding activity are presented as operational telemetry rather than vanity counters.",
};

export const activityData = [
  { day: "Mon", commits: 8, reviews: 3 },
  { day: "Tue", commits: 14, reviews: 5 },
  { day: "Wed", commits: 11, reviews: 7 },
  { day: "Thu", commits: 18, reviews: 6 },
  { day: "Fri", commits: 16, reviews: 8 },
  { day: "Sat", commits: 7, reviews: 2 },
  { day: "Sun", commits: 10, reviews: 4 },
];

export const languageData = [
  { name: "TS", value: 38 },
  { name: "Python", value: 24 },
  { name: "Rust", value: 14 },
  { name: "SQL", value: 12 },
  { name: "Shell", value: 12 },
];

export const radarData = [
  { skill: "APIs", value: 94 },
  { skill: "Data", value: 88 },
  { skill: "AI", value: 91 },
  { skill: "Ops", value: 86 },
  { skill: "Perf", value: 90 },
  { skill: "Design", value: 82 },
];

export const dashboardStats = [
  ["GitHub Stats", "42 repositories"],
  ["LeetCode Stats", "320+ problems"],
  ["Recent Commits", "84 this month"],
  ["System Design", "queues, caches, DBs"],
] as const;

export const techGraphCopy = {
  eyebrow: "Tech Stack Visualization",
  title: "A stack graph that follows request flow instead of icon walls.",
  body: "The graph connects application code, cache, databases, cloud, containers, operating systems, and LLM orchestration as one delivery path.",
};

export const graphLayers = [
  { name: "application path", nodes: ["TypeScript", "Node.js", "Express"] },
  { name: "state layer", nodes: ["Redis", "PostgreSQL", "MongoDB"] },
  { name: "runtime layer", nodes: ["AWS", "Docker", "Linux"] },
  { name: "AI layer", nodes: ["LLM", "LangGraph", "Pipecat"] },
];

export type ArchitectureNode = {
  id: string;
  label: string;
  subtitle: string;
  x: number;
  y: number;
  mx: number;
  my: number;
  detail: string;
};

export const architectureCopy = {
  eyebrow: "Architecture Playground",
  title: "An interactive distributed system map with live request motion.",
  body: "Click any component to inspect its role in a backend architecture built around APIs, queues, workers, Redis, LLM graphs, databases, and object storage.",
};

// x/y = desktop position (%), mx/my = narrow-screen position (%)
export const architectureNodes: ArchitectureNode[] = [
  {
    id: "users",
    label: "Users",
    subtitle: "Web clients",
    x: 9.5,
    y: 50,
    mx: 50,
    my: 7,
    detail: "Authenticated browser sessions, realtime interview flows, dashboards, and API clients.",
  },
  {
    id: "gateway",
    label: "API Gateway",
    subtitle: "Ingress",
    x: 29.5,
    y: 50,
    mx: 50,
    my: 23,
    detail: "Rate limits, auth checks, routing, observability headers, and request shaping.",
  },
  {
    id: "api",
    label: "Backend API",
    subtitle: "Node services",
    x: 50,
    y: 24,
    mx: 29.5,
    my: 42,
    detail: "Core business rules, workflow state, validation, integrations, and product-facing APIs.",
  },
  {
    id: "redis",
    label: "Redis",
    subtitle: "Cache and queue",
    x: 50,
    y: 76,
    mx: 74,
    my: 42,
    detail: "Hot data, job coordination, retry buffers, rate limiting, and session state.",
  },
  {
    id: "workers",
    label: "Workers",
    subtitle: "Async compute",
    x: 70.5,
    y: 24,
    mx: 29.5,
    my: 62,
    detail: "Resume scoring, audio processing, embeddings, pipeline stages, and background tasks.",
  },
  {
    id: "llm",
    label: "LLM Graph",
    subtitle: "Agents",
    x: 70.5,
    y: 76,
    mx: 74,
    my: 62,
    detail: "LangGraph orchestration, guardrails, context compression, tool calls, and eval loops.",
  },
  {
    id: "storage",
    label: "Storage",
    subtitle: "DB plus object store",
    x: 90.5,
    y: 50,
    mx: 50,
    my: 88,
    detail: "MongoDB, PostgreSQL, S3-like storage, analytics tables, audit trails, and query paths.",
  },
];

export const architectureEdges: [string, string][] = [
  ["users", "gateway"],
  ["gateway", "api"],
  ["gateway", "redis"],
  ["api", "workers"],
  ["redis", "llm"],
  ["workers", "storage"],
  ["llm", "storage"],
];

export const architectureChecks = [
  "latency budget",
  "failure boundary",
  "observability",
  "scale path",
];

export const blogCopy = {
  eyebrow: "Blog",
  title: "Writing topics for people who like the engineering beneath the product.",
  body: "Distributed systems, AI agents, databases, backend design, Rust, Linux, performance engineering, and architecture notes.",
};

export const blogPosts = [
  {
    id: "0x1",
    title: "Processing 1.5TB of NDJSON on a Potato Laptop with Rust",
    shortTitle: "Big data processing with Rust",
    tag: "Performance",
    summary:
      "Streaming conversion, compression tradeoffs, worker pools, Parquet, and DuckDB query paths on low-end hardware.",
    description: "Processing 1.5TB of NDJSON on a low-end hardware with Rust 🦀",
    href: "/blogs/0x1",
    date: "January 2026",
    tags: ["Rust", "Data Analysis", "NDJSON", "Charts"],
    readTime: "8 min read",
  },
];

export const achievementsCopy = {
  eyebrow: "Achievements",
  title: "Numbers that describe scale, compression, latency, and cost control.",
};

export const contactCopy = {
  eyebrow: "Contact",
  title: "Let's build something incredible.",
  ready: "Ready for serious systems work.",
  role: "role: backend + AI systems engineer",
  focus: "focus: reliability, latency, scale, architecture",
  footer: "Built for scalable systems, AI platforms, and performance work.",
};
