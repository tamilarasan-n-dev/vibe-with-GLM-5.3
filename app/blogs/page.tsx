import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering notes on Rust, data pipelines, backend systems, and performance.",
};

const blogPosts = [
  {
    id: "0x1",
    title: "Big data processing with Rust",
    description:
      "Processing 1.5TB of NDJSON on a low-end hardware with Rust 🦀",
    date: "January 2026",
    tags: ["Rust", "Data Analysis", "NDJSON", "Charts"],
    readTime: "8 min read",
  },
];

export default function BlogsPage() {
  return (
    <div className="blogs-container">
      <div className="blogs-header">
        <h1 className="blogs-title">Blog Posts</h1>
        <p className="blogs-subtitle">
          Thoughts, tutorials, and insights on software development
        </p>
      </div>
      <div className="blogs-grid">
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blogs/${post.id}`}
            className="blog-card"
          >
            <div className="blog-card-content">
              <div className="blog-card-header">
                <span className="blog-card-date">{post.date}</span>
                <span className="blog-card-read-time">{post.readTime}</span>
              </div>
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-description">{post.description}</p>
              <div className="blog-card-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="blog-card-footer">
                <span className="read-more">Read article →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
