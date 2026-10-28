import HeroAboutScene from "@/components/homepage/HeroAboutScene";
import ProjectsPreview from "@/components/homepage/ProjectsPreview";
import UsesPreview from "@/components/homepage/UsesPreview";
import ContactPreview from "@/components/homepage/ContactPreview";

export default function Home() {
  return (
    <main>
      <HeroAboutScene />
      <ProjectsPreview />
      <UsesPreview />
      <ContactPreview />
    </main>
  );
}
