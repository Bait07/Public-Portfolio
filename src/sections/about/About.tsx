import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { Code2, Globe, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutStyles } from "./styles/AboutStyles";

interface Highlight {
  icon: LucideIcon;
  key: string;
}

const highlights: Highlight[] = [
  { icon: Code2, key: "quality" },
  { icon: Zap, key: "performance" },
  { icon: Globe, key: "responsive" },
];

const skills = [
  "React", "TypeScript", "Astro", "JavaScript (ES6+)", "Firebase",
  "Tailwind CSS", "HTML & CSS", "Git / Azure DevOps", "REST APIs",
  "Figma", "Python", "Framer Motion",
];

/* ── Ring config ──────────────────────────────────────────────────────── */
interface RingConfig {
  inset: number;
  color: string;
  glow: number;
  delay: number;
  rotateDuration: number; // mobile: seconds per full rotation
  rotateDir: 1 | -1;     // mobile: 1 = CW, -1 = CCW
}

const RINGS: RingConfig[] = [
  { inset: 40, color: "rgba(102,126,234,0.50)", glow: 10, delay: 1.4, rotateDuration: 9,  rotateDir: -1 },
  { inset: 22, color: "rgba(102,126,234,0.32)", glow: 14, delay: 0.7, rotateDuration: 15, rotateDir:  1 },
  { inset: 5,  color: "rgba(102,126,234,0.18)", glow: 20, delay: 0,   rotateDuration: 24, rotateDir: -1 },
];

/* ── Spring config ────────────────────────────────────────────────────── */
const SPRING = { stiffness: 140, damping: 18, mass: 0.8 };

/* ── Theme detection ──────────────────────────────────────────────────── */
function useIsDark() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.dataset.theme !== "light"
  );
  useEffect(() => {
    setIsDark(document.documentElement.dataset.theme !== "light");
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.dataset.theme !== "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

export function About() {
  const { t } = useTranslation("common");
  const sectionRef = useRef<HTMLElement>(null);
  const isDark = useIsDark();
  const imgSrc = isDark ? "/imgs/about/WB.jpeg" : "/imgs/about/color.jpeg";

  /* ── Mobile detection ─────────────────────────────────────────────── */
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined"
      ? window.matchMedia("(hover: none) and (pointer: coarse)").matches
      : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ── Scroll parallax ──────────────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [70, -110]);

  /* ── Desktop: cursor-based tilt ───────────────────────────────────── */
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const tiltY = useSpring(useTransform(cursorX, [-1, 1], [-24, 24]), SPRING);
  const tiltX = useSpring(useTransform(cursorY, [-1, 1], [24, -24]), SPRING);

  const shineBackground = useMotionValue(
    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, transparent 60%)"
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = Math.max(-1, Math.min(1,
      (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    ));
    const cy = Math.max(-1, Math.min(1,
      (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    ));
    cursorX.set(cx);
    cursorY.set(cy);
    shineBackground.set(
      `radial-gradient(circle at ${cx * 35 + 50}% ${cy * 35 + 50}%, rgba(255,255,255,0.22) 0%, transparent 58%)`
    );
  };

  const handleMouseLeave = () => {
    cursorX.set(0);
    cursorY.set(0);
    shineBackground.set(
      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, transparent 60%)"
    );
  };

  /* ── Desktop: ring parallax at different depths ───────────────────── */
  const r1x = useSpring(useTransform(cursorX, [-1, 1], [-7,  7]),  SPRING);
  const r1y = useSpring(useTransform(cursorY, [-1, 1], [-7,  7]),  SPRING);
  const r2x = useSpring(useTransform(cursorX, [-1, 1], [-17, 17]), SPRING);
  const r2y = useSpring(useTransform(cursorY, [-1, 1], [-17, 17]), SPRING);
  const r3x = useSpring(useTransform(cursorX, [-1, 1], [-28, 28]), SPRING);
  const r3y = useSpring(useTransform(cursorY, [-1, 1], [-28, 28]), SPRING);
  const ringDesktopMotion = [
    { x: r1x, y: r1y },
    { x: r2x, y: r2y },
    { x: r3x, y: r3y },
  ];


  return (
    <section
      ref={sectionRef}
      id="about"
      className={aboutStyles.section}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
    >

      {/* ── Avatar ─────────────────────────────────────────────────────── */}
      <motion.div style={{ y: imageY }} className={aboutStyles.avatarWrapper}>

        {/* Entry animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Continuous float */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
          >
            {/* Perspective context */}
            <div style={{ perspective: "550px" }}>

              {/* Tilt + rings container: 280×280
                  Mobile: keyframe animate (no useTime ticker)
                  Desktop: spring motion values driven by cursor */}
              <motion.div
                animate={isMobile ? {
                  rotateX: [7, -7, 7],
                  rotateY: [-7, 7, -7],
                } : undefined}
                transition={isMobile ? {
                  repeat: Infinity,
                  duration: 4.5,
                  ease: "easeInOut",
                } : undefined}
                style={{
                  ...(!isMobile ? { rotateX: tiltX, rotateY: tiltY } : {}),
                  width: 280,
                  height: 280,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >

                {/* Rings */}
                {RINGS.map((ring, i) => (
                  <motion.div
                    key={i}
                    animate={
                      isMobile
                        ? {
                            opacity: [0.25, 0.85, 0.25],
                            rotate: 360 * ring.rotateDir,
                          }
                        : { opacity: [0.25, 0.85, 0.25] }
                    }
                    transition={
                      isMobile
                        ? {
                            opacity: {
                              repeat: Infinity,
                              duration: 3.5,
                              ease: "easeInOut",
                              delay: ring.delay,
                            },
                            rotate: {
                              repeat: Infinity,
                              duration: ring.rotateDuration,
                              ease: "linear",
                            },
                          }
                        : {
                            repeat: Infinity,
                            duration: 3.5,
                            ease: "easeInOut",
                            delay: ring.delay,
                          }
                    }
                    style={{
                      ...(isMobile
                        ? {}
                        : { x: ringDesktopMotion[i].x, y: ringDesktopMotion[i].y }),
                      position: "absolute",
                      top: ring.inset,
                      right: ring.inset,
                      bottom: ring.inset,
                      left: ring.inset,
                      borderRadius: "50%",
                      border: isMobile
                        ? `1.5px dashed ${ring.color}`
                        : `1px solid ${ring.color}`,
                      boxShadow: `0 0 ${ring.glow}px ${ring.color}`,
                      pointerEvents: "none",
                    }}
                  />
                ))}

                {/* Photo */}
                <div className={aboutStyles.avatar}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imgSrc}
                      src={imgSrc}
                      alt="Juan Diego Enríquez"
                      className={aboutStyles.avatarImg}
                      draggable={false}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </AnimatePresence>

                  {/* Cursor-following shine (desktop only) */}
                  {!isMobile && (
                    <motion.div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ background: shineBackground }}
                    />
                  )}
                </div>

              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className={aboutStyles.container}>
        <SectionHeader index="01" title={t("about.title")} />

        {/* Animated divider — same pattern as ExperienceDetail */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className={aboutStyles.divider}
        />

        <div className={aboutStyles.grid}>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className={aboutStyles.bioCol}
          >
            <p className={aboutStyles.bioParagraph}>{t("about.bio1")}</p>
            <p className={aboutStyles.bioParagraph}>{t("about.bio2")}</p>

            {/* Highlights — ✦ bullet grid */}
            <div className={aboutStyles.highlightsGrid}>
              {highlights.map(({ icon: Icon, key }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.28, ease: "easeOut" }}
                  className={aboutStyles.highlightRow}
                >
                  <span className={aboutStyles.highlightBullet}>✦</span>
                  <Icon className={aboutStyles.highlightIcon} aria-hidden />
                  <span>{t(`about.highlights.${key}`)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.22 }}
          >
            <h3 className={aboutStyles.skillsLabel}>
              {t("about.skillsLabel")}
            </h3>
            <div className={aboutStyles.skillsList}>
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.04, duration: 0.22, ease: "easeOut" }}
                  className={aboutStyles.skillBadge}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
