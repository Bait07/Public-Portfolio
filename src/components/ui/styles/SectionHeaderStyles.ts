import { cn } from "@/lib/cn";

export const sectionHeaderStyles = {
  wrapper: (align: "left" | "center", className?: string) =>
    cn("mb-12", align === "center" && "text-center", className),
  title: cn(
    "text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight",
    "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
  ),
  subtitle: (align: "left" | "center") =>
    cn(
      "mt-3 text-muted text-base sm:text-lg",
      align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
    ),
  divider: (align: "left" | "center") =>
    cn(
      "mt-5 h-px w-14 bg-gradient-to-r from-primary to-secondary",
      align === "center" && "mx-auto"
    ),
};
