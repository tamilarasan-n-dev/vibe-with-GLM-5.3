import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering notes on Rust, data pipelines, backend systems, and performance.",
};

export default function BlogsPage() {
  return (
    <div className="shell pb-32 pt-32 md:pt-40">
      <header className="grid gap-6 border-b border-rule-strong pb-12 lg:grid-cols-12 lg:gap-8">
        <p className="flex items-center gap-2.5 text-[15px] font-medium lg:col-span-3">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-signal-ink" aria-hidden="true" />
          Blog
        </p>
        <div className="lg:col-span-9">
          <h1 className="display-tight text-[clamp(3.5rem,11vw,9rem)] uppercase leading-[0.85] tracking-[-0.015em]">
            Blog Posts
          </h1>
          <p className="mt-6 max-w-[50ch] text-[18px] leading-relaxed text-ink-2">
            Thoughts, tutorials, and insights on software development
          </p>
        </div>
      </header>

      <ul>
        {blogPosts.map((post) => (
          <li key={post.id} className="border-b border-rule">
            <Link href={post.href} className="group grid gap-4 py-10 lg:grid-cols-12 lg:gap-8">
              <div className="flex gap-4 text-[14px] text-ink-3 lg:col-span-3 lg:flex-col lg:gap-1">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <div className="lg:col-span-7">
                <h2 className="display text-[clamp(1.9rem,4vw,3.25rem)] leading-[1] transition-colors duration-300 group-hover:text-accent">
                  {post.shortTitle}
                </h2>
                <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-ink-2">{post.description}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-rule-strong px-3 py-1 text-[13px] text-ink-2">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-start lg:col-span-2 lg:justify-end">
                <span className="inline-flex items-center gap-3 text-[15px] font-medium">
                  <span className="lg:sr-only">Read article</span>
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-rule-strong transition-[background-color,border-color,color] duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-on-signal">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" aria-hidden="true" />
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
