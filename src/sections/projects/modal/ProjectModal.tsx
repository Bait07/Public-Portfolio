import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ProjectCarousel } from "@/components/ui/ProjectCarousel";
import { projectModalStyles } from "./styles/ProjectModalStyles";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images: string[];
  initialSlide: number;
}

export function ProjectModal({
  isOpen,
  onClose,
  title,
  images,
  initialSlide,
}: ProjectModalProps) {
  /* ESC to close */
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  /* Lock body scroll while open */
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={projectModalStyles.backdrop}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={projectModalStyles.panel}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={projectModalStyles.header}>
              <h2 className={projectModalStyles.title}>{title}</h2>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className={projectModalStyles.closeBtn}
              >
                <X className="w-5 h-5" aria-hidden />
              </button>
            </div>

            <div className={projectModalStyles.carouselWrapper}>
              <ProjectCarousel
                images={images}
                title={title}
                height={380}
                initialSlide={initialSlide}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
