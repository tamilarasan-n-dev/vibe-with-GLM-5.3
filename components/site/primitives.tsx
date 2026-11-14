import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Section frame. The section name sits in its own column beside the
 * headline (sentence case, no eyebrow chrome); the body copy sits under
 * the headline at a readable measure.
 */
export function Section({
  id,
  name,
  title,
  body,
  aside,
  children,
  className,
}: {
  id: string;
  name: string;
  title?: string;
  body?: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      data-section
      aria-labelledby={`${id}-name`}
      className={cn("relative border-t border-rule py-24 md:py-32", className)}
    >
      <div className="shell">
        <header className="mb-14 grid gap-4 md:mb-20 lg:grid-cols-12 lg:gap-8">
          <div className="flex items-start justify-between gap-4 lg:col-span-3 lg:block">
            <h2 id={`${id}-name`} className="flex items-center gap-2.5 text-[15px] font-medium text-ink">
              <span className="h-2.5 w-2.5 rounded-[2px] bg-signal-ink" aria-hidden="true" />
              {name}
            </h2>
            {aside && <div className="lg:mt-4">{aside}</div>}
          </div>
          {title && (
            <div className="lg:col-span-9">
              <p className="display max-w-[18ch] text-[clamp(2.25rem,5.2vw,4.75rem)] leading-[0.98] tracking-[-0.02em] text-ink">
                {title}
              </p>
              {body && <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-ink-2">{body}</p>}
            </div>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}

export function ArrowLink({
  href,
  children,
  external,
  className,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn("group inline-flex items-center gap-1 text-ink", className)}
    >
      <span className="link">{children}</span>
      {external && (
        <ArrowUpRight
          className="h-3.5 w-3.5 text-ink-3 transition-[transform,color] duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          aria-label="(opens in a new tab)"
        />
      )}
    </a>
  );
}

export function fmt(n: number, decimals = 0) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}
