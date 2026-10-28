import ProjectsArchive from "@/components/projects/ProjectsArchive";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects | Ranjit Jana",
  description: "A complete archive of selected work by Ranjit Jana.",
};

export default function ProjectsPage() {
  return <ProjectsArchive projects={projects} />;
}
