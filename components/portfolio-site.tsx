import { ArchitectureSection } from "./site/architecture";
import { AchievementsSection, BlogSection, ContactSection } from "./site/closing";
import { Hero } from "./site/hero";
import { Nav } from "./site/nav";
import { ProjectsSection } from "./site/projects";
import { AboutSection, ExperienceSection, SkillsSection } from "./site/sections-intro";
import { DashboardSection, TechGraphSection } from "./site/telemetry";

export function PortfolioSite() {
  return (
    <>
      <Nav />
      <main id="main" className="relative">
        <Hero />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <DashboardSection />
        <TechGraphSection />
        <ArchitectureSection />
        <BlogSection />
        <AchievementsSection />
        <ContactSection />
      </main>
    </>
  );
}
