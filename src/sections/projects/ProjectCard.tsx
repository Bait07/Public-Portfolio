import { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { ProjectCarousel } from "@/components/ui/ProjectCarousel";
import { ProjectModal } from "./modal/ProjectModal";
import { projectCardStyles as s } from "./styles/ProjectCardStyles";

export interface ProjectCardData {
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  images: string[];
}

interface ProjectCardProps extends ProjectCardData {
  index: number;
}

export const ProjectCard = memo(function ProjectCard({
  title,
  description,
  tags,
  github,
  live,
  images,
  index,
}: ProjectCardProps) {
  const resolvedImages = images.map(
    (img) => import.meta.env.BASE_URL + img.replace(/^\//, ""),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleActiveChange = useCallback((i: number) => setActiveSlide(i), []);
  const handleCenterClick = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.1 }}
        className={s.article}
      >
        <div className={s.carouselWrapper}>
          <ProjectCarousel
            images={resolvedImages}
            title={title}
            onCenterClick={handleCenterClick}
            onActiveChange={handleActiveChange}
          />
        </div>

        <div className={s.header}>
          <h3 className={s.title}>{title}</h3>
          <div className={s.links}>
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub — ${title}`}
                className={s.githubLink}
              >
                <Github className="w-4 h-4" aria-hidden />
              </a>
            )}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live — ${title}`}
                className={s.liveLink}
              >
                <ExternalLink className="w-4 h-4" aria-hidden />
              </a>
            )}
          </div>
        </div>

        <p className={s.description}>{description}</p>

        {tags.length > 0 && (
          <div className={s.tagsList}>
            {tags.map((tag) => (
              <span key={tag} className={s.tag}>{tag}</span>
            ))}
          </div>
        )}
      </motion.article>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={title}
        images={resolvedImages}
        initialSlide={activeSlide}
      />
    </>
  );
});
