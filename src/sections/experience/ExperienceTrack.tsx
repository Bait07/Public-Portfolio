import { motion } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { experienceTrackStyles as s } from "./styles/ExperienceTrackStyles";

export interface ExperienceItemData {
  role: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
  tech?: string[];
}

interface ExperienceTrackProps {
  items: ExperienceItemData[];
  activeIndex: number;
  scrollProgress: MotionValue<number>;
}

export function ExperienceTrack({
  items,
  activeIndex,
  scrollProgress,
}: ExperienceTrackProps) {
  return (
    <div className={s.wrapper}>
      {/* Background line — same style as SideNav track */}
      <div
        className={s.bgLine}
        style={{ background: "rgba(102, 126, 234, 0.25)" }}
      />

      {/* Fill line — same gradient as SideNav fill, horizontal */}
      <motion.div
        className={s.fillLine}
        style={{
          scaleX: scrollProgress,
          background:
            "linear-gradient(to right, rgb(102,126,234), rgb(118,75,162))",
        }}
      />

      {/* Stations */}
      <div className={s.stations}>
        {items.map((item, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;

          return (
            <div key={i} className={s.station}>
              {/* Dot + ripple rings */}
              <div className={s.dotContainer}>
                {/* Two staggered ripple rings when active */}
                {isActive && (
                  <>
                    <motion.div
                      className={s.ripple}
                      animate={{ scale: [1, 3.2], opacity: [0.55, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                    <motion.div
                      className={s.ripple}
                      animate={{ scale: [1, 3.2], opacity: [0.55, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.75,
                      }}
                    />
                  </>
                )}

                {/* Dot */}
                <motion.div
                  className={s.dot}
                  animate={{
                    scale: isActive ? 1.5 : 1,
                    backgroundColor:
                      isActive || isPast
                        ? "rgb(102, 126, 234)"
                        : "rgba(255,255,255,0.2)",
                    boxShadow: isActive
                      ? "0 0 10px rgba(102,126,234,0.7)"
                      : "none",
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>

              {/* Labels — desktop only */}
              <motion.div
                animate={{ opacity: isActive ? 1 : isPast ? 0.45 : 0.3 }}
                transition={{ duration: 0.3 }}
                className={s.labelWrapper}
              >
                <span className={s.company}>{item.company}</span>
                <span className={s.period}>{item.period}</span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
