import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Home, User, Briefcase, FolderOpen, Mail } from "lucide-react";
import { bottomNavStyles } from "./styles/BottomNavStyles";

const SECTIONS = [
  { id: "home", icon: Home, key: "nav.home" },
  { id: "about", icon: User, key: "nav.about" },
  { id: "experience", icon: Briefcase, key: "nav.experience" },
  { id: "projects", icon: FolderOpen, key: "nav.projects" },
  { id: "contact", icon: Mail, key: "nav.contact" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

interface BottomNavProps {
  activeSection: SectionId;
}

function scrollToSection(id: SectionId) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function BottomNav({ activeSection }: BottomNavProps) {
  const { t } = useTranslation("common");
  const [hovered, setHovered] = useState<SectionId | null>(null);

  return (
    <nav
      className={bottomNavStyles.nav}
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 10px)" }}
      role="navigation"
      aria-label="Main navigation"
    >
      {SECTIONS.map(({ id, icon: Icon, key }) => {
        const isActive = activeSection === id;
        const isHovered = hovered === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSection(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            className={bottomNavStyles.button}
            aria-label={t(key)}
            aria-current={isActive ? "true" : undefined}
          >
            {/* Burbuja activa — desliza con layout animation entre secciones */}
            {isActive && (
              <motion.span
                layoutId="active-pill"
                className={bottomNavStyles.activePill}
                style={{
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}

            {/* Burbuja hover — solo en ítems no activos */}
            <AnimatePresence>
              {isHovered && !isActive && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className={bottomNavStyles.hoverPill}
                  style={{
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                />
              )}
            </AnimatePresence>

            <Icon
              className={bottomNavStyles.icon(isActive, isHovered)}
              aria-hidden
            />
          </button>
        );
      })}
    </nav>
  );
}
