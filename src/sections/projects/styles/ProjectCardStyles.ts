import { cn } from "@/lib/cn";

export const projectCardStyles = {
  article: cn(
    "liquid-glass-card p-5 sm:p-6 flex flex-col",
    "[content-visibility:auto] [contain-intrinsic-size:0_520px]"
  ),
  carouselWrapper: "w-full mb-4",
  header: "flex items-start justify-between mb-3 gap-3",
  title:
    "text-base sm:text-lg font-bold leading-snug hero-title-gradient",
  links: "flex gap-1.5 shrink-0",
  githubLink:
    "p-1.5 text-muted hover:text-text transition-colors duration-200 rounded-md hover:bg-white/5",
  liveLink:
    "p-1.5 text-muted hover:text-primary transition-colors duration-200 rounded-md hover:bg-primary/10",
  description: "text-muted text-sm leading-relaxed mb-4",
  tagsList: "flex flex-wrap gap-1.5 mt-auto pt-3",
  tag: "text-xs font-mono text-primary/80 bg-primary/8 px-2 py-0.5 rounded-full border border-primary/20",
};
