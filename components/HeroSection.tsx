"use client";

import dynamic from "next/dynamic";
import { useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const HumanoidScene = dynamic(() => import("./HumanoidScene"), { ssr: false });

export default function HeroSection() {
  const scrollTo = useCallback((id: string) => {
    gsap.to(window, { duration: 1.2, scrollTo: { y: `#${id}`, offsetY: 70 }, ease: "power2.inOut" });
  }, []);

  const handleHeadClick = useCallback(() => scrollTo("about"), [scrollTo]);
  const handleTorsoClick = useCallback(() => scrollTo("work"), [scrollTo]);

  return (
    <section
      id="hero"
      style={{ backgroundColor: "#0a0f2c" }}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js canvas fills entire section */}
      <div className="absolute inset-0">
        <HumanoidScene onHeadClick={handleHeadClick} onTorsoClick={handleTorsoClick} />
      </div>

      {/* Text overlay */}
      <div className="relative z-10 text-center px-6 pointer-events-none select-none">
        <h1
          className="text-6xl md:text-8xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-heading)", color: "#ffffff" }}
        >
          Alexander Vogel
        </h1>
        <p
          className="mt-4 text-lg md:text-xl tracking-widest uppercase"
          style={{ fontFamily: "var(--font-body)", color: "#c9a84c" }}
        >
          Literature · Athletics · Entertainment
        </p>
        <p
          className="mt-8 text-sm tracking-wide opacity-60"
          style={{ color: "#ffffff", fontFamily: "var(--font-body)" }}
        >
          Click the figure to explore ↓
        </p>
      </div>
    </section>
  );
}
