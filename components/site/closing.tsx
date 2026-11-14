"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  achievements,
  achievementsCopy,
  blogCopy,
  blogPosts,
  contactCopy,
  profile,
} from "@/lib/content";
import { ArrowLink, Section, fmt } from "./primitives";

/* Blog -------------------------------------------------------------- */

export function BlogSection() {
  return (
    <Section
      id="blog"
      name={blogCopy.eyebrow}
      title={blogCopy.title}
      body={blogCopy.body}
      aside={
        <Link href="/blogs" className="link text-[15px] text-ink-2 hover:text-ink">
          All posts
        </Link>
      }
    >
      <ul className="grid gap-4 lg:grid-cols-12 lg:gap-8">
        {blogPosts.map((post) => (
          <li key={post.id} className="lg:col-span-9 lg:col-start-4">
            <Link
              href={post.href}
              className="group grid gap-6 rounded-[14px] border border-rule-strong p-5 transition-[background-color,border-color,box-shadow] duration-300 hover:border-ink hover:bg-surface hover:shadow-[var(--shadow)] md:grid-cols-[1fr_auto] md:p-8"
            >
              <div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-ink-3">
                  <span className="text-accent">{post.tag}</span>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="display mt-4 max-w-[22ch] text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.02]">
                  {post.title}
                </h3>
                <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-ink-2">{post.summary}</p>
              </div>
              <span className="inline-flex items-center gap-3 self-end text-[15px] font-medium">
                Read article
                <span className="grid h-11 w-11 place-items-center rounded-full border border-rule-strong transition-[background-color,border-color,color] duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-on-signal">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" aria-hidden="true" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* Achievements ------------------------------------------------------ */

export function AchievementsSection() {
  return (
    <Section
      id="achievements"
      name={achievementsCopy.eyebrow}
      title={achievementsCopy.title}
      className="border-t-0 bg-signal text-ink [--ink:#0a0a0c] [--ink-2:rgba(10,10,12,0.78)] [--ink-3:rgba(10,10,12,0.62)] [--rule:rgba(10,10,12,0.16)] [--rule-strong:rgba(10,10,12,0.32)] [--signal-ink:#0a0a0c] [--focus:#0a0a0c] selection:bg-ink selection:text-signal"
    >
      <dl className="grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
        {achievements.map((a) => (
          <div key={a.label} className="border-t border-rule-strong pb-10 pt-4">
            <dd className="display-tight text-[clamp(3rem,7vw,6rem)] leading-[0.9] tabular-nums">
              {fmt(a.value, a.decimals ?? 0)}
              <span className="text-[0.55em] text-ink-3">{a.suffix}</span>
            </dd>
            <dt className="mt-3 text-[15px] text-ink-2">{a.label}</dt>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/* Contact ----------------------------------------------------------- */

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Enter a valid email"),
  message: z.string().min(12, "Add a little more context"),
});
type ContactForm = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [status, setStatus] = useState(contactCopy.ready);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (values: ContactForm) => {
    const name = values.name.trim();
    const firstName = name.split(/\s+/)[0];
    const subject = encodeURIComponent(`Hello from ${name}`);
    const body = encodeURIComponent(`${values.message.trim()}\n\n${name} (${values.email.trim()})`);
    setStatus(`Thanks ${firstName}. Opening your email app…`);
    window.location.assign(`mailto:${profile.email}?subject=${subject}&body=${body}`);
    reset();
  };

  return (
    <Section id="contact" name={contactCopy.eyebrow} title={contactCopy.title} className="pb-0 md:pb-0">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4 lg:col-start-4">
          <div className="instrument font-mono text-[13px] leading-6">
            <div className="instrument-bar">
              <span>/contact/tamil</span>
              <span className="live-dot" aria-hidden="true" />
            </div>
            <div className="p-4">
              <p className="text-accent">&gt; open channel</p>
              <p className="text-ink-2">{contactCopy.role}</p>
              <p className="text-ink-2">{contactCopy.focus}</p>
              <p className="caret text-ink" aria-live="polite">
                &gt; {status}
              </p>
            </div>
          </div>
          <dl className="mt-8">
            {[
              ["Email", <a key="e" href={`mailto:${profile.email}`} className="link-static break-all" translate="no">{profile.email}</a>],
              ["LinkedIn", <ArrowLink key="l" href={profile.linkedin} external>tamil-dev</ArrowLink>],
              ["GitHub", <ArrowLink key="g" href={profile.github} external>tamilarasan-n-dev</ArrowLink>],
              ["Location", <span key="loc">{profile.location}</span>],
            ].map(([k, v]) => (
              <div key={k as string} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-rule py-3 text-[15px]">
                <dt className="text-ink-3">{k}</dt>
                <dd className="min-w-0">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 lg:col-span-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" error={errors.name?.message}>
              <input {...register("name")} className="field" autoComplete="name" placeholder="Ada Lovelace…" aria-invalid={!!errors.name} />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input
                {...register("email")}
                type="email"
                inputMode="email"
                className="field"
                autoComplete="email"
                spellCheck={false}
                placeholder="you@company.com"
                aria-invalid={!!errors.email}
              />
            </Field>
          </div>
          <Field label="Message" error={errors.message?.message}>
            <textarea {...register("message")} rows={6} className="field" placeholder="Tell me what you want to build…" aria-invalid={!!errors.message} />
          </Field>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <p className="text-[13px] text-ink-3">Opens your email app with the message filled in.</p>
            <button
              type="submit"
              className="inline-flex h-12 items-center gap-2 rounded-[10px] bg-signal px-6 text-[15px] font-semibold text-on-signal transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </Section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-3 text-[14px] text-ink-2">
        {label}
        {error && (
          <span className="text-[13px] text-danger" role="alert">
            {error}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

function Footer() {
  return (
    <footer className="mt-32 border-t border-rule-strong pb-10 pt-8 md:mt-44">
      <div className="grid gap-6 md:grid-cols-12 md:gap-8">
        <p className="text-[15px] text-ink-2 md:col-span-5">{contactCopy.footer}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] md:col-span-4">
          <li><ArrowLink href={profile.github} external>GitHub</ArrowLink></li>
          <li><ArrowLink href={profile.linkedin} external>LinkedIn</ArrowLink></li>
          <li><ArrowLink href={`mailto:${profile.email}`}>Email</ArrowLink></li>
        </ul>
        <div className="text-[15px] md:col-span-3 md:text-right">
          <a href="#hero" className="link text-ink-2 hover:text-ink">Back to top</a>
        </div>
      </div>
      <p className="mt-12 text-[13px] text-ink-3">
        © {new Date().getFullYear()} {profile.name}. Set in Archivo and IBM Plex Mono.
      </p>
    </footer>
  );
}
