import { motion } from "framer-motion";
import { sectionHeaderStyles } from "./styles/SectionHeaderStyles";

interface SectionHeaderProps {
  index: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  index,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={sectionHeaderStyles.wrapper(align, className)}
    >
      <h2 className={sectionHeaderStyles.title}>{title}</h2>
      {subtitle && (
        <p className={sectionHeaderStyles.subtitle(align)}>{subtitle}</p>
      )}
      <div className={sectionHeaderStyles.divider(align)} />
    </motion.div>
  );
}
