import Lenis from "@studio-freight/lenis";

let lenisInstance: Lenis | null = null;

export function initLenis(): Lenis {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 2,
  });

  lenisInstance = lenis;
  return lenis;
}

export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: 0, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
