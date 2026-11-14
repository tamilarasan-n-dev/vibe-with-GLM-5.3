"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { about, experience, flowVerbs, skills, skillsCopy, timeline } from "@/lib/content";
import { cn } from "@/lib/utils";
import { EASE, Section } from "./primitives";

/* About ------------------------------------------------------------- */

export function AboutSection() {
  return (
    <Section id="about" name={about.eyebrow} title={about.title} body={about.body}>
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-6 lg:col-span-5 lg:col-start-4">
          <p className="text-[19px] leading-[1.6] text-ink">{about.paragraphs[0]}</p>
          <p className="text-[17px] leading-[1.7] text-ink-2">{about.paragraphs[1]}</p>
        </div>

        <div className="lg:col-span-4">
          <h3 className="text-[14px] text-ink-3">How the work moves</h3>
          <ol className="mt-4">
            {about.method.map(([title, text], i) => (
              <li key={title} className="relative grid grid-cols-[2.25rem_1fr] gap-3 pb-8 last:pb-0">
                {i < about.method.length - 1 && (
                  <span className="absolute bottom-0 left-[0.8rem] top-8 w-px bg-rule-strong" aria-hidden="true" />
                )}
                <span className="grid h-7 w-7 place-items-center rounded-full border border-accent font-mono text-[12px] text-accent">
                  {i + 1}
                </span>
                <div>
                  <h4 className="display text-[22px] leading-7">{title}</h4>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

/* Experience -------------------------------------------------------- */

export function ExperienceSection() {
  const [active, setActive] = useState(0);

  return (
    <Section id="experience" name={experience.eyebrow} title={experience.title} body={experience.body}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <ul className="border-t border-rule-strong">
            {timeline.map((item, index) => {
              const open = active === index;
              return (
                <li key={item.title} className="border-b border-rule">
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-expanded={open}
                    aria-controls={`exp-${index}`}
                    className="group grid w-full grid-cols-[5rem_1fr_auto] items-baseline gap-4 py-6 text-left md:grid-cols-[7rem_1fr_auto]"
                  >
                    <span className={cn("text-[14px] transition-colors duration-300", open ? "text-signal-ink" : "text-ink-3")}>
                      {item.year}
                    </span>
                    <span>
                      <span
                        className={cn(
                          "display block text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.05] transition-colors duration-300",
                          open ? "text-ink" : "text-ink-3 group-hover:text-ink",
                        )}
                      >
                        {item.title}
                      </span>
                      <span className="mt-1.5 block text-[15px] text-ink-2">{item.company}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid h-8 w-8 place-items-center rounded-full border text-[18px] leading-none transition-[transform,border-color,color] duration-500 ease-out-expo",
                        open ? "rotate-45 border-signal bg-signal text-on-signal" : "border-rule-strong text-ink-3 group-hover:border-ink group-hover:text-ink",
                      )}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`exp-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pl-[6rem] md:pl-[8rem]">
                          <ul className="max-w-[60ch] list-disc space-y-2.5 pl-4 text-[16px] leading-relaxed text-ink-2 marker:text-accent">
                            {item.points.map((p) => (
                              <li key={p}>{p}</li>
                            ))}
                          </ul>
                          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
                            {item.stack.map((t) => (
                              <li key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[13px] text-ink-2">
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <SystemFlow active={active} />
          </div>
        </div>
      </div>
    </Section>
  );
}

function SystemFlow({ active }: { active: number }) {
  const labels = timeline[active].flow;

  return (
    <figure className="instrument flow-on" aria-label={`Request path for ${timeline[active].title}`}>
      <div className="instrument-bar">
        <span>Request path</span>
        <span className="text-ink-2">{timeline[active].title}</span>
      </div>
      <div className="graph-paper px-5 py-7 md:px-7">
        <ol>
          {labels.map((label, i) => (
            <li key={i}>
              <div className="flex items-center justify-between gap-4 rounded-[10px] border border-accent/40 bg-surface px-4 py-3">
                <div className="flex min-w-0 items-center gap-3.5">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-[11px] text-accent">
                    {i + 1}
                  </span>
                  <span className="relative block h-7 min-w-0 overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={`${active}-${label}`}
                        className="display block truncate text-[20px] leading-7"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                      >
                        {label}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </div>
                <span className="shrink-0 font-mono text-[12px] text-ink-3">{flowVerbs[i]}</span>
              </div>
              {i < labels.length - 1 && (
                <div
                  className="flow-line flow-line-y ml-[1.65rem] h-6 w-px bg-accent/40"
                  style={{ "--delay": `${i * 0.4}s` } as React.CSSProperties}
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="border-t border-rule px-4 py-3 text-[13px] text-ink-3">
        Select a role to trace how a request moves through that work.
      </figcaption>
    </figure>
  );
}

/* Skills ------------------------------------------------------------ */

export function SkillsSection() {
  const [active, setActive] = useState(0);
  const skill = skills[active];

  return (
    <Section id="skills" name={skillsCopy.eyebrow} title={skillsCopy.title} body={skillsCopy.body}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-rule-strong pb-2.5 text-[13px] text-ink-3 md:grid-cols-[1fr_10rem_8rem]">
            <span>Skill</span>
            <span className="hidden md:block">Category</span>
            <span className="text-right md:text-left">Experience</span>
          </div>
          <ul>
            {skills.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.name} className="border-b border-rule">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-4 py-3.5 text-left md:grid-cols-[1fr_10rem_8rem]"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-2 w-2 rounded-[2px] transition-[background-color,transform] duration-300",
                          on ? "scale-100 bg-signal-ink" : "scale-75 bg-rule-strong",
                        )}
                      />
                      <span
                        className={cn(
                          "display text-[20px] leading-7 transition-colors duration-300 md:text-[22px]",
                          on ? "text-ink" : "text-ink-2 group-hover:text-ink",
                        )}
                      >
                        {s.name}
                      </span>
                    </span>
                    <span className="hidden text-[15px] text-ink-3 md:block">{s.category}</span>
                    <span className={cn("text-right text-[14px] md:text-left", on ? "text-signal-ink" : "text-ink-3")}>
                      {s.experience}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        className="overflow-hidden lg:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                      >
                        <div className="pb-5 pl-5">
                          <p className="text-[15px] leading-relaxed text-ink-2">{s.detail}</p>
                          <ul className="mt-3 flex flex-wrap gap-1.5">
                            {s.tools.map((t) => (
                              <li key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[13px] text-ink-2">
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="hidden lg:col-span-5 lg:block" aria-live="polite">
          <div className="instrument sticky top-24">
            <div className="instrument-bar">
              <span>Spec sheet</span>
              <span className="tabular-nums">
                {active + 1} of {skills.length}
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="p-6"
              >
                <h3 className="display-tight text-[64px] uppercase leading-[0.9] tracking-[-0.015em]">{skill.name}</h3>
                <dl className="mt-6 grid grid-cols-2 gap-4 rounded-[10px] bg-paper p-4">
                  <div>
                    <dt className="text-[13px] text-ink-3">Category</dt>
                    <dd className="mt-0.5 text-[16px]">{skill.category}</dd>
                  </div>
                  <div>
                    <dt className="text-[13px] text-ink-3">Experience</dt>
                    <dd className="mt-0.5"><span className="rounded-full bg-signal px-2.5 py-0.5 text-[14px] font-medium text-on-signal">{skill.experience}</span></dd>
                  </div>
                </dl>
                <p className="mt-6 text-[17px] leading-relaxed text-ink-2">{skill.detail}</p>
                <h4 className="mt-8 text-[13px] text-ink-3">Tooling</h4>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {skill.tools.map((t) => (
                    <li key={t} className="rounded-full border border-rule-strong px-3 py-1 text-[14px] text-ink-2">
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </aside>
      </div>
    </Section>
  );
}
