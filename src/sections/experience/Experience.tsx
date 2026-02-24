import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  animate,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExperienceTrack } from "./ExperienceTrack";
import { ExperienceDetail } from "./ExperienceDetail";
import type { ExperienceItemData } from "./ExperienceTrack";
import { experienceStyles } from "./styles/ExperienceStyles";

export function Experience() {
  const { t } = useTranslation("common");
  const sectionRef   = useRef<HTMLElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const items = t("experience.items", {
    returnObjects: true,
  }) as ExperienceItemData[];

  // Mouse-tracking glow shadow (declared before scroll event to avoid TDZ)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springCfg = { stiffness: 180, damping: 35 };
  const smoothX = useSpring(rawX, springCfg);
  const smoothY = useSpring(rawY, springCfg);
  // Primary follows mouse; secondary is on the opposite side
  const negX = useTransform(smoothX, (v) => v * -0.6);
  const negY = useTransform(smoothY, (v) => v * -0.6);
  const boxShadow = useMotionTemplate`${smoothX}px ${smoothY}px 55px rgba(102,126,234,0.35), ${negX}px ${negY}px 45px rgba(118,75,162,0.25), 0 0 70px rgba(102,126,234,0.1)`;

  // Scroll-driven active station
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    isVisibleRef.current = latest > 0 && latest < 1;
    if (latest <= 0 || latest >= 1) {
      rawX.set(0);
      rawY.set(0);
    }
    const idx = Math.min(Math.floor(latest * items.length), items.length - 1);
    setActiveIndex(idx);
  });

  // Desktop: global mouse tracking, active only while section is visible
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const handleMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) return;
      rawX.set((e.clientX / window.innerWidth - 0.5) * 64);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 64);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [rawX, rawY]);

  // Mobile: organic idle animation (no mouse available)
  useEffect(() => {
    if (window.innerWidth >= 768) return;
    const xAnim = animate(rawX, [-22, 22, -22], {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const yAnim = animate(rawY, [15, -15, 15], {
      duration: 8.5,
      repeat: Infinity,
      ease: "easeInOut",
    });
    return () => { xAnim.stop(); yAnim.stop(); };
  }, [rawX, rawY]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={experienceStyles.section}
      style={{ height: `${items.length * 100}vh` }}
    >
      <div className={experienceStyles.sticky}>
        <div className={experienceStyles.container}>
          <SectionHeader
            index="02"
            title={t("experience.title")}
            subtitle={t("experience.subtitle")}
            className="mb-6 sm:mb-8"
          />

          <motion.div
            ref={cardRef}
            className={experienceStyles.card}
            style={{ boxShadow }}
          >
            <ExperienceTrack
              items={items}
              activeIndex={activeIndex}
              scrollProgress={scrollYProgress}
            />
            <ExperienceDetail
              item={items[activeIndex]}
              activeIndex={activeIndex}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
