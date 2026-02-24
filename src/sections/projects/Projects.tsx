import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "./ProjectCard";
import type { ProjectCardData } from "./ProjectCard";
import { projectsStyles } from "./styles/ProjectsStyles";

export function Projects() {
  const { t } = useTranslation("common");

  const items = t("projects.items", {
    returnObjects: true,
  }) as ProjectCardData[];

  return (
    <section id="projects" className={projectsStyles.section}>
      <div className={projectsStyles.container}>
        <SectionHeader
          index="03"
          title={t("projects.title")}
          subtitle={t("projects.subtitle")}
        />

        <div className={projectsStyles.grid}>
          {items.map((item, index) => (
            <ProjectCard key={index} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
