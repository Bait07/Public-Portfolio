import { cn } from "@/lib/cn";

export const aboutStyles = {
  section: "relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8",
  container: "relative max-w-[1200px] mx-auto",
  avatarWrapper: "flex justify-center my-4",
  avatar: cn(
    "relative w-44 h-44 rounded-full",
    "overflow-hidden",
    "shadow-[0_0_0_2px_rgba(102,126,234,0.50),0_0_50px_rgba(102,126,234,0.20)]"
  ),
  avatarImg: "absolute inset-0 w-full h-full object-cover object-top",

  /* Animated divider — same pattern as ExperienceDetail */
  divider:
    "h-px origin-left bg-gradient-to-r from-primary/40 via-secondary/25 to-transparent mb-8 mt-2",

  /* Content grid */
  grid: "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16",
  bioCol: "space-y-5",
  bioParagraph: "text-text/75 text-sm sm:text-[0.9375rem] leading-relaxed",

  /* Highlights — ✦ bullet grid, same language as Experience bullets */
  highlightsGrid: "grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 pt-3 border-t border-white/8",
  highlightRow: "flex items-center gap-2.5 text-sm text-text/65",
  highlightIcon: "w-3.5 h-3.5 text-primary shrink-0",
  highlightBullet: "text-primary text-[9px] shrink-0",

  /* Skills — tech-pill style, same as Experience tech pills */
  skillsLabel: "mb-4 font-mono text-xs tracking-[0.2em] uppercase text-muted",
  skillsList: "flex flex-wrap gap-1.5",
  skillBadge: cn(
    "text-[11px] font-mono px-2.5 py-1 rounded-md",
    "bg-primary/8 text-primary/75 border border-primary/15",
    "hover:bg-primary/14 hover:text-primary transition-colors duration-200"
  ),
};
