import { motion, useScroll } from "framer-motion";
import { sideNavStyles } from "./styles/SideNavStyles";

export function SideNav() {
  const { scrollYProgress } = useScroll();

  return (
    <nav className={sideNavStyles.nav}>
      {/* Progress track */}
      <div
        className={sideNavStyles.track}
        style={{ background: "rgba(102, 126, 234, 0.25)" }}
      />

      {/* Progress fill */}
      <motion.div
        className={sideNavStyles.fill}
        style={{
          background: "linear-gradient(to bottom, rgb(102,126,234), rgb(118,75,162))",
          scaleY: scrollYProgress,
        }}
      />
    </nav>
  );
}
