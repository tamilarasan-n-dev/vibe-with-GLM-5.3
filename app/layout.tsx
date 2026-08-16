import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tamilarasan.dev"),
  title: {
    default: "TamilArasan N | Backend Software Engineer",
    template: "%s | TamilArasan N",
  },
  description:
    "Premium engineering portfolio for TamilArasan N, focused on AI systems, distributed architecture, backend platforms, data pipelines, databases, Linux, Docker, cloud infrastructure, and performance-critical software.",
  keywords: [
    "TamilArasan N",
    "Backend Software Engineer",
    "AI Systems",
    "Distributed Systems",
    "Performance Engineering",
    "Cloud Architecture",
    "LangChain",
    "LangGraph",
    "MongoDB",
    "Redis",
    "AWS",
    "Docker",
    "Linux",
  ],
  authors: [{ name: "TamilArasan N" }],
  creator: "TamilArasan N",
  openGraph: {
    title: "TamilArasan N | Backend Software Engineer",
    description:
      "AI infrastructure, distributed systems, backend architecture, and performance engineering portfolio.",
    url: "https://tamilarasan.dev",
    siteName: "TamilArasan N",
    images: [
      {
        url: "/ai-infra-hero.png",
        width: 1792,
        height: 1024,
        alt: "AI infrastructure topology visualization",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TamilArasan N | Backend Software Engineer",
    description:
      "AI systems, distributed architecture, backend platforms, and performance-critical software.",
    images: ["/ai-infra-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
