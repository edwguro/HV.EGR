import { HeroSection } from '@/components/sections/hero-section';
import { ContactSection } from '@/components/sections/contact-section';
import { ProfileSection } from '@/components/sections/profile-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { SiteFooter } from '@/components/site-footer';
import { getProfile, getProjects, getSkills } from '@/lib/api';

export default async function HomePage() {
  const [profile, projects, skills] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkills(),
  ]);
  return (
    <main id="contenido">
      <HeroSection profile={profile} />
      <ProfileSection profile={profile} />
      <ProjectsSection projects={projects} />
      <SkillsSection groups={skills} />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
