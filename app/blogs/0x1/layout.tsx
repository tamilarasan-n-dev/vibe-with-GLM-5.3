import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Processing 1.5TB of NDJSON on a Potato Laptop with Rust",
  description:
    "Rust, streaming I/O, Parquet, and DuckDB: turning 1.5TB of NDJSON into 90GB of queryable columnar data on an i3 laptop.",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="blog-theme-container">
      <article className="blog-content">{children}</article>
    </div>
  );
}
