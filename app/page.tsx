"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BodyOfWorkSection from "@/components/BodyOfWorkSection";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function HomePage() {
  useEffect(() => {
    const targets = gsap.utils.toArray<HTMLElement>(".gsap-fade-in");

    targets.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <BodyOfWorkSection />
    </main>
  );
}
