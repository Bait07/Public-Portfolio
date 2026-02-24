import { cn } from "@/lib/cn";

export const heroStyles = {
  section:
    "min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8",
  title:
    "text-4xl sm:text-5xl lg:text-6xl font-bold text-center hero-title-gradient min-h-[1.5em] leading-tight py-2",
  subtitle:
    "mt-3 font-mono text-xs tracking-[0.2em] uppercase text-primary/60",
  tagline:
    "mt-5 max-w-[480px] text-center text-muted text-base sm:text-lg leading-relaxed",
  ctaWrapper: "mt-8 flex flex-wrap gap-4 justify-center",
  ctaButton: cn(
    "liquid-glass liquid-glass-hero-cta inline-flex items-center gap-2 cursor-pointer",
    "px-6 py-3 text-sm font-medium text-text/80 hover:text-primary",
    "transition-colors duration-200 focus-ring"
  ),
};
