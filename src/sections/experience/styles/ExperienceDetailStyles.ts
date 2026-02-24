import { cn } from "@/lib/cn";

export const experienceDetailStyles = {
  wrapper: "min-h-[200px] sm:min-h-[220px]",

  /* Header row */
  header:
    "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4",
  role: "text-xl sm:text-2xl lg:text-[1.75rem] font-bold leading-tight hero-title-gradient",
  companyRow: "flex items-center gap-2 mt-1",
  companyDot: "w-1.5 h-1.5 rounded-full bg-primary shrink-0",
  company: "text-primary/80 font-medium text-sm",
  period: cn(
    "font-mono text-xs text-muted shrink-0 sm:mt-1 self-start",
    "bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
  ),

  /* Animated divider */
  divider:
    "h-px origin-left bg-gradient-to-r from-primary/40 via-secondary/25 to-transparent mb-4",

  /* Description */
  description: "text-text/75 text-sm sm:text-[0.9375rem] leading-relaxed mb-5",

  /* Bullets — 2-col grid on sm+ */
  bulletsGrid: "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-5",
  bulletRow: "flex items-start gap-2.5 text-sm text-text/65",
  bulletIcon: "text-primary text-[9px] shrink-0 mt-[5px]",

  /* Tech pills */
  techRow: "flex flex-wrap gap-1.5 pt-3 border-t border-white/8",
  techPill: cn(
    "text-[11px] font-mono px-2.5 py-1 rounded-md",
    "bg-primary/8 text-primary/75 border border-primary/15",
    "hover:bg-primary/14 hover:text-primary transition-colors duration-200"
  ),
};
