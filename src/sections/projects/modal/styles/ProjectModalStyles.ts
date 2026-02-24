import { cn } from "@/lib/cn";

export const projectModalStyles = {
  backdrop:
    "fixed inset-0 z-[9998] bg-black/65 cursor-pointer",
  panel: cn(
    "fixed z-[9999] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    "w-[85vw] max-w-[1200px]",
    "liquid-glass p-6",
    "flex flex-col gap-4"
  ),
  header: "flex items-center justify-between gap-4 shrink-0",
  title: "text-lg sm:text-xl font-semibold text-text",
  closeBtn: cn(
    "p-2 rounded-xl text-muted hover:text-text",
    "hover:bg-white/10 transition-all duration-200",
    "focus-ring shrink-0"
  ),
  carouselWrapper: "w-full",
};
