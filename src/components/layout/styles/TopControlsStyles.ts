import { cn } from "@/lib/cn";

export const topControlsStyles = {
  wrapper:
    "fixed top-4 right-4 sm:top-6 sm:right-6 z-[1000] flex items-center gap-2 liquid-glass liquid-glass-nav px-3 py-2 sm:px-4 sm:py-2.5",
  button: cn(
    "p-2 rounded-xl text-text hover:bg-white/10 transition-all duration-300 focus-ring hover:scale-110 active:scale-95"
  ),
};
