import { projects, projectsCopy, type Project } from "@/lib/content";
import { Section } from "./primitives";

const pretty = (s: string) => s.replace("->", "→");
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function ProjectsSection() {
  return (
    <Section id="projects" name={projectsCopy.eyebrow} title={projectsCopy.title} body={projectsCopy.body}>
      <nav aria-label="Projects on this page" className="mb-24 md:mb-32">
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <li key={p.title}>
              <a
                href={`#${slug(p.title)}`}
                className="group flex h-full flex-col justify-between gap-8 rounded-[12px] border border-rule-strong p-4 transition-[background-color,border-color] duration-300 hover:border-ink hover:bg-surface"
              >
                <span className="text-[13px] text-ink-3">{p.eyebrow}</span>
                <span className="display text-[21px] leading-[1.1]">{pretty(p.title)}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-32 md:space-y-44">
        {projects.map((project) => (
          <CaseStudy key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}

function CaseStudy({ project }: { project: Project }) {
  return (
    <article id={slug(project.title)} className="scroll-mt-24">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <p className="text-[15px] text-accent lg:col-span-3 lg:pt-4">{project.eyebrow}</p>
        <h3 className="display-tight text-[clamp(2.75rem,7vw,6.5rem)] uppercase leading-[0.88] tracking-[-0.015em] lg:col-span-9">
          {pretty(project.title)}
        </h3>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:col-start-4">
          <h4 className="text-[14px] text-ink-3">The problem</h4>
          <p className="mt-2 text-[19px] leading-[1.55] text-ink">{project.problem}</p>
        </div>
        <dl className="grid grid-cols-3 gap-2 self-start lg:col-span-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="rounded-[12px] bg-surface p-3.5 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset]">
              <dd
                className={`display leading-none ${
                  m.value.length > 6 ? "text-[clamp(1rem,1.3vw,1.2rem)]" : "text-[clamp(1.15rem,1.75vw,1.6rem)]"
                }`}
              >
                {m.value}
              </dd>
              <dt className="mt-2 text-[13px] leading-snug text-ink-3">{m.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <Pipeline steps={project.architecture} />

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:col-start-4">
          <h4 className="text-[14px] text-ink-3">What made it hard</h4>
          <ul className="mt-3 space-y-3">
            {project.challenges.map((c) => (
              <li key={c} className="grid grid-cols-[1rem_1fr] gap-2 text-[16px] leading-relaxed text-ink-2">
                <span className="mt-[0.6em] h-1.5 w-1.5 rounded-full bg-accent-fill" aria-hidden="true" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-4">
          <h4 className="text-[14px] text-ink-3">Built with</h4>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li key={t} className="rounded-full border border-rule-strong px-3 py-1 text-[14px] text-ink-2">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function Pipeline({ steps }: { steps: string[] }) {
  return (
    <figure className="instrument flow-host mt-14" aria-label={`System shape: ${steps.join(", then ")}`}>
      <div className="instrument-bar">
        <span>System shape</span>
        <span className="hidden sm:inline">Hover to send a request through</span>
      </div>
      <div className="graph-paper p-4 sm:p-6 md:p-8">
        <ol className="flex flex-col md:flex-row md:items-stretch">
          {steps.map((step, i) => (
            <li key={step} className="flex flex-col md:min-w-0 md:flex-1 md:flex-row md:items-center">
              <div className="flex flex-1 items-center gap-3 rounded-[10px] border border-accent/40 bg-surface px-4 py-3.5 md:min-h-[6rem] md:flex-col md:items-start md:justify-between">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-[11px] text-accent">
                  {i + 1}
                </span>
                <span className="text-[15px] font-medium leading-tight">{step}</span>
              </div>
              {i < steps.length - 1 && (
                <>
                  <span
                    aria-hidden="true"
                    className="flow-line flow-line-y ml-[1.65rem] block h-5 w-px bg-accent/50 md:hidden"
                    style={{ "--delay": `${i * 0.3}s` } as React.CSSProperties}
                  />
                  <span
                    aria-hidden="true"
                    className="flow-line hidden h-px w-4 shrink-0 bg-accent/50 md:block lg:w-6"
                    style={{ "--delay": `${i * 0.3}s` } as React.CSSProperties}
                  />
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
