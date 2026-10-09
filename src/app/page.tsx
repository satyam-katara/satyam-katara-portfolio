import { SkipLink } from "@/components/layout/SkipLink";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AnalyticsShowcaseLazy } from "@/components/sections/AnalyticsShowcaseLazy";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <AnalyticsShowcaseLazy />
        <ExperienceTimeline />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
