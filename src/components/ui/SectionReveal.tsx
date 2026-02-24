import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
}

// WHY this pattern:
// whileInView + initial={{ clipPath: "inset(100%...)" }} never fires because
// Chrome's IntersectionObserver computes intersection AFTER clip-path —
// an element clipped to zero area is never "intersecting".
// Fix: observe a plain div (no clip), animate the inner motion.div.
export function SectionReveal({ children, delay = 0 }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
        animate={
          isInView
            ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
            : { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }
        }
        transition={{
          clipPath: {
            duration: 0.9,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay,
          },
          opacity: { duration: 0.4, delay },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
