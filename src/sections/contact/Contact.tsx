import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Linkedin } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contactStyles } from "./styles/ContactStyles";

function ContactOrb({ progress }: { progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [-60, 80]);
  const opacity = useTransform(progress, [0, 0.2, 0.85, 1], [0, 0.9, 0.9, 0]);
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <motion.div
        style={{ y, opacity }}
        className="absolute left-[-60px] top-[0%] w-[420px] h-[420px] rounded-full"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(118,75,162,0.22) 0%, rgba(102,126,234,0.10) 50%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>
    </div>
  );
}

export function Contact() {
  const { t } = useTranslation("common");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} id="contact" className={contactStyles.section}>
      <ContactOrb progress={scrollYProgress} />
      <div className={contactStyles.container}>
        <SectionHeader
          index="04"
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className={contactStyles.ctaGroup}
        >
          {/* Primary CTAs */}
          <div className={contactStyles.ctaRow}>
            <a
              href={t("contact.linkedinHref")}
              target="_blank"
              rel="noopener noreferrer"
              className={contactStyles.ctaLink}
              aria-label="LinkedIn"
            >
              <Linkedin className={contactStyles.ctaIcon} aria-hidden />
              <span className={contactStyles.ctaLabel}>
                {t("contact.linkedinLabel")}
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
