import { Nav } from "@/components/site/nav";
import "./blogs.css";

export default function BlogsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav onHome={false} />
      <main id="main">{children}</main>
    </>
  );
}
