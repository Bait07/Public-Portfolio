import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Download, Linkedin } from "lucide-react";
import { heroStyles } from "./styles/HeroStyles";

export function Hero() {
  const { t, i18n } = useTranslation("common");
  const cvHref = i18n.language.startsWith("es")
    ? `${import.meta.env.BASE_URL}cv/JuanDiego CV (Español).pdf`
    : `${import.meta.env.BASE_URL}cv/JuanDiego CV english.pdf`;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={sectionRef} id="home" className={heroStyles.section}>
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center w-full"
      >
        {/* Nombre */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className={heroStyles.title}
        >
          {t("hero.title")}
        </motion.h1>

        {/* Rol — monospace accent igual que los section headers */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className={heroStyles.subtitle}
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className={heroStyles.tagline}
        >
          {t("hero.tagline")}
        </motion.p>

        {/* Botones CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className={heroStyles.ctaWrapper}
        >
          {/* Descargar CV — estilo glass/secundario */}
          <a href={cvHref} download className={heroStyles.ctaButton}>
            <Download className="w-4 h-4 shrink-0" aria-hidden />
            {t("ui.downloadCv")}
          </a>
          {/* LinkedIn — acceso directo al perfil */}
          <a
            href={t("contact.linkedinHref")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("contact.linkedinLabel")}
            className={heroStyles.ctaButton}
          >
            <Linkedin className="w-4 h-4 shrink-0" aria-hidden />
            <span>{t("contact.linkedinLabel")}</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
