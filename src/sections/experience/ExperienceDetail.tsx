import { AnimatePresence, motion } from "framer-motion";
import type { ExperienceItemData } from "./ExperienceTrack";
import { experienceDetailStyles as s } from "./styles/ExperienceDetailStyles";

interface ExperienceDetailProps {
  item: ExperienceItemData;
  activeIndex: number;
}

export function ExperienceDetail({ item, activeIndex }: ExperienceDetailProps) {
  return (
    <div className={s.wrapper}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {/* ── Header ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94], delay: 0 }}
            className={s.header}
          >
            <div>
              <h3 className={s.role}>{item.role}</h3>
              <div className={s.companyRow}>
                <span className={s.companyDot} />
                <span className={s.company}>{item.company}</span>
              </div>
            </div>
            <span className={s.period}>{item.period}</span>
          </motion.div>

          {/* ── Divider ────────────────────────────────────────────── */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
            className={s.divider}
          />

          {/* ── Description ────────────────────────────────────────── */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: "easeOut", delay: 0.14 }}
            className={s.description}
          >
            {item.description}
          </motion.p>

          {/* ── Bullets grid ───────────────────────────────────────── */}
          <div className={s.bulletsGrid}>
            {item.bullets.map((bullet, i) => (
              <motion.div
                key={`${activeIndex}-b-${i}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.18 + i * 0.06,
                  duration: 0.28,
                  ease: "easeOut",
                }}
                className={s.bulletRow}
              >
                <span className={s.bulletIcon}>✦</span>
                <span>{bullet}</span>
              </motion.div>
            ))}
          </div>

          {/* ── Tech pills ─────────────────────────────────────────── */}
          {item.tech && item.tech.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.44 }}
              className={s.techRow}
            >
              {item.tech.map((tag) => (
                <span key={tag} className={s.techPill}>
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
