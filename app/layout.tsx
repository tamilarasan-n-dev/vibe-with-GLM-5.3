import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/site/theme";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

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
  icons: { icon: "/favicon.svg" },
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
  themeColor: "#07070a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${plexMono.variable}`}
    >
      <body>
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
          >
            Skip to content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
