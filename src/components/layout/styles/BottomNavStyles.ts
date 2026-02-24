import { cn } from "@/lib/cn";

export const bottomNavStyles = {
  nav: "fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] liquid-glass liquid-glass-nav px-3 py-2.5 flex items-center gap-1 sm:gap-2",
  button:
    "relative p-3 rounded-2xl focus-ring active:scale-95 transition-transform duration-100",
  activePill:
    "absolute inset-0 rounded-2xl bg-primary/15 border border-primary/25",
  hoverPill:
    "absolute inset-0 rounded-2xl bg-primary/8 border border-primary/15",
  icon: (isActive: boolean, isHovered: boolean) =>
    cn(
      "relative z-10 w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200",
      isActive ? "text-primary" : isHovered ? "text-primary/70" : "text-muted"
    ),
};
