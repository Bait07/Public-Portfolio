import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

interface ProjectCarouselProps {
  images: string[];
  title: string;
  height?: number;
  initialSlide?: number;
  onCenterClick?: () => void;
  onActiveChange?: (i: number) => void;
}

/* ── Per-slide gradient palette (cycles if more slides than entries) ──── */
const GRADIENTS = [
  "linear-gradient(135deg, rgba(102,126,234,0.30) 0%, rgba(118,75,162,0.20) 100%)",
  "linear-gradient(220deg, rgba(118,75,162,0.30) 0%, rgba(102,126,234,0.18) 100%)",
  "linear-gradient(315deg, rgba(6,182,212,0.28)  0%, rgba(102,126,234,0.20) 100%)",
  "linear-gradient(45deg,  rgba(16,185,129,0.26)  0%, rgba(102,126,234,0.20) 100%)",
  "linear-gradient(180deg, rgba(245,158,11,0.26)  0%, rgba(118,75,162,0.20) 100%)",
];

/* ── Placeholder slide ────────────────────────────────────────────────── */
function PlaceholderSlide({
  title,
  slideIndex,
}: {
  title: string;
  slideIndex: number;
}) {
  const bg = GRADIENTS[slideIndex % GRADIENTS.length];
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2 select-none"
      style={{ background: bg }}
    >
      <Code2
        className="w-7 h-7 shrink-0"
        style={{ color: "rgba(102,126,234,0.60)" }}
        aria-hidden
      />
      <span
        className="text-[11px] font-mono text-center px-4 leading-tight"
        style={{ color: "rgba(102,126,234,0.60)" }}
      >
        {title}
      </span>
      <span
        className="text-[10px] font-mono"
        style={{ color: "rgba(102,126,234,0.35)" }}
      >
        {slideIndex + 1}
      </span>
    </div>
  );
}

/* ── Dot indicators ───────────────────────────────────────────────────── */
function Dots({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex justify-center items-center gap-1.5 mt-2.5">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Slide ${i + 1}`}
          className="rounded-full transition-all duration-300 focus-ring shrink-0"
          style={{
            width: i === active ? 18 : 6,
            height: 6,
            background:
              i === active
                ? "rgba(102,126,234,0.85)"
                : "rgba(102,126,234,0.28)",
          }}
        />
      ))}
    </div>
  );
}

/* ── Infinite-wrap helper ─────────────────────────────────────────────── */
function wrapD(d: number, n: number): number {
  const r = ((d % n) + n) % n;
  return r > n / 2 ? r - n : r;
}

/* ── Main Coverflow Carousel ──────────────────────────────────────────── */
export function ProjectCarousel({
  images,
  title,
  height = 210,
  initialSlide = 0,
  onCenterClick,
  onActiveChange,
}: ProjectCarouselProps) {
  const slides = images.length > 0 ? images : [""];
  const hasMultiple = slides.length > 1;
  const [active, setActive] = useState(initialSlide);

  /* Measure container width to compute per-pixel step */
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  /* useLayoutEffect: measures before first paint to avoid slide-stack flash */
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setStep(el.getBoundingClientRect().width * 0.65);
    measure();
    /* ResizeObserver per element — avoids 9 global window.resize handlers */
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Sync active slide when initialSlide changes (e.g. modal re-open) */
  useEffect(() => {
    setActive(initialSlide);
  }, [initialSlide]);

  /* Notify parent of active slide changes */
  const onActiveChangeRef = useRef(onActiveChange);
  useEffect(() => {
    onActiveChangeRef.current = onActiveChange;
  });
  useEffect(() => {
    onActiveChangeRef.current?.(active);
  }, [active]);

  /* Swipe / pointer-drag detection (works for mouse + touch) */
  const pointerStartX = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const dx = e.clientX - pointerStartX.current;

    if (Math.abs(dx) < 30) {
      /* Treat as click — open modal only if pointer is in center region */
      if (containerRef.current && onCenterClick) {
        const rect = containerRef.current.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        if (pct >= 0.15 && pct <= 0.85) onCenterClick();
      }
      return;
    }

    if (!hasMultiple) return;
    if (dx < 0) setActive((a) => (a + 1) % slides.length);
    else setActive((a) => (a - 1 + slides.length) % slides.length);
  };

  const goTo = (i: number) => setActive(i);

  const cursorClass = hasMultiple
    ? "cursor-grab active:cursor-grabbing"
    : onCenterClick
    ? "cursor-pointer"
    : "";

  return (
    <div className="w-full select-none">
      {/* ── Coverflow stage ───────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-xl"
        style={{ height }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {/* Cursor overlay */}
        <div
          className={`absolute inset-0 z-20 ${cursorClass}`}
          style={{ touchAction: "pan-y" }}
        />

        {/* Left edge fade */}
        <div
          className="absolute inset-y-0 left-0 w-10 z-10 pointer-events-none rounded-l-xl"
          style={{
            background:
              "linear-gradient(to right, rgba(var(--bg), 0.90) 0%, transparent 100%)",
          }}
        />
        {/* Right edge fade */}
        <div
          className="absolute inset-y-0 right-0 w-10 z-10 pointer-events-none rounded-r-xl"
          style={{
            background:
              "linear-gradient(to left, rgba(var(--bg), 0.90) 0%, transparent 100%)",
          }}
        />

        {/* Slides — infinite wrap via wrapD */}
        {slides.map((src, i) => {
          const d = hasMultiple ? wrapD(i - active, slides.length) : 0;
          const absd = Math.abs(d);
          const scale = Math.max(0.76, 1 - absd * 0.12);
          const opacity = Math.max(0.3, 1 - absd * 0.38);
          const zIndex = Math.max(0, 10 - absd * 3);

          return (
            <motion.div
              key={i}
              animate={{ x: d * step, scale, opacity, zIndex }}
              transition={{ type: "spring", stiffness: 350, damping: 38 }}
              className="absolute top-0 h-full rounded-xl overflow-hidden"
              style={{
                width: "70%",
                left: "50%",
                marginLeft: "-35%",
                transformOrigin: "center center",
              }}
            >
              {src ? (
                <img
                  src={src}
                  alt={`${title} — screenshot ${i + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              ) : (
                <PlaceholderSlide title={title} slideIndex={i} />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── Dots ──────────────────────────────────────────────────────── */}
      {hasMultiple && (
        <Dots count={slides.length} active={active} onSelect={goTo} />
      )}
    </div>
  );
}
