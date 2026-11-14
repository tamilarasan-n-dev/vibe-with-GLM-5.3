import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Processing 1.5TB of NDJSON on a Potato Laptop with Rust",
  description:
    "Rust, streaming I/O, Parquet, and DuckDB: turning 1.5TB of NDJSON into 90GB of queryable columnar data on an i3 laptop.",
};

const post = blogPosts.find((p) => p.id === "0x1")!;

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="blog-theme-container">
      <div className="shell pt-28 md:pt-36">
        <div className="mx-auto flex max-w-[46rem] flex-wrap items-center justify-between gap-4 border-b border-rule pb-5 text-[14px] text-ink-3">
          <Link href="/blogs" className="link text-ink-2 hover:text-ink">
            All posts
          </Link>
          <span className="flex gap-4">
            <span className="text-accent">{post.tag}</span>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </span>
        </div>
      </div>
      <article className="blog-content">{children}</article>
      <div className="shell">
        <div className="mx-auto mt-20 flex max-w-[46rem] flex-wrap items-center justify-between gap-4 border-t border-rule-strong pt-6 text-[15px]">
          <Link href="/blogs" className="link text-ink-2 hover:text-ink">All posts</Link>
          <Link href="/#contact" className="link text-ink-2 hover:text-ink">Get in touch</Link>
        </div>
      </div>
    </div>
  );
}
