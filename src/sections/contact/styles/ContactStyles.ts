import { cn } from "@/lib/cn";

export const contactStyles = {
  section:
    "relative overflow-hidden py-20 sm:py-28 px-4 sm:px-6 lg:px-8 pb-40 sm:pb-48",
  container: "relative max-w-[1200px] mx-auto",
  ctaGroup: "flex flex-col items-center gap-8",
  ctaRow: "flex flex-col sm:flex-row gap-4",
  ctaLink: cn(
    "liquid-glass inline-flex items-center gap-3",
    "px-6 py-4 text-text hover:text-primary",
    "transition-colors duration-300 focus-ring"
  ),
  ctaIcon: "w-5 h-5 text-primary shrink-0",
  ctaLabel: "text-sm font-medium",
  githubLink:
    "text-muted hover:text-text transition-colors duration-200 focus-ring rounded",
};
