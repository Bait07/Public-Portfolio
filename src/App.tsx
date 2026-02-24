import { useEffect, useState } from "react";
import { TopControls } from "@/components/layout/TopControls";
import { BottomNav } from "@/components/layout/BottomNav";
import { SideNav } from "@/components/layout/SideNav";
import { GlobalBackground } from "@/components/layout/GlobalBackground";
import { Hero } from "@/sections/hero/Hero";
import { About } from "@/sections/about/About";
import { Experience } from "@/sections/experience/Experience";
import { Projects } from "@/sections/projects/Projects";
import { Contact } from "@/sections/contact/Contact";
import { initLenis } from "@/lib/lenis";

const SECTION_IDS = ["home", "about", "experience", "projects", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

function useActiveSection() {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    let lastActive: SectionId = "home";

    const onScroll = () => {
      const top = window.scrollY + 120;
      let current: SectionId = "home";
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el && el.offsetTop <= top) {
          current = SECTION_IDS[i];
          break;
        }
      }
      if (current !== lastActive) {
        lastActive = current;
        setActive(current);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return active;
}

export default function App() {
  const activeSection = useActiveSection();

  useEffect(() => {
    const lenis = initLenis();

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <GlobalBackground />
      <TopControls />

      {/* Desktop: vertical side nav */}
      <SideNav />

      <main className="relative z-[1]">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Mobile: bottom pill nav */}
      <div className="md:hidden">
        <BottomNav activeSection={activeSection} />
      </div>
    </>
  );
}
