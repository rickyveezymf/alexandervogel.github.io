"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import HoverTooltip from "./HoverTooltip";
import type { Zone } from "./HumanoidScene";

const HumanoidScene = dynamic(() => import("./HumanoidScene"), { ssr: false });

const ZONE_ROUTES: Record<Zone, string> = {
  head: "/about",
  torso: "/resume",
  arms: "/skills",
  legs: "/projects",
};

export default function HeroSection() {
  const router = useRouter();
  const [hoverZone, setHoverZone] = useState<Zone | null>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  const handleZoneClick = useCallback(
    (zone: Zone) => {
      router.push(ZONE_ROUTES[zone]);
    },
    [router]
  );

  const handleHoverChange = useCallback(
    (zone: Zone | null, m?: { x: number; y: number }) => {
      setHoverZone(zone);
      if (m) setMouse(m);
      else setMouse(null);
    },
    []
  );

  return (
    <section
      className="relative w-full flex flex-col"
      style={{ backgroundColor: "#f5f3ee", height: "calc(100vh - 64px)" }}
    >
      {/* Title row */}
      <div className="text-center pt-6 pb-2 px-6 flex-shrink-0">
        <h1
          className="text-5xl md:text-7xl font-bold leading-none tracking-tight"
          style={{ fontFamily: "var(--font-heading)", color: "#0a0a0a" }}
        >
          Alexander Vogel
        </h1>
        <p
          className="mt-2 text-xs md:text-sm tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-body)", color: "#b85c38" }}
        >
          Literature · Athletics · Entertainment
        </p>
      </div>

      {/* 3D canvas — flex-1 fills remaining height */}
      <div className="flex-1 relative">
        <HumanoidScene onZoneClick={handleZoneClick} onHoverChange={handleHoverChange} />
      </div>

      {/* Bottom hint */}
      <div className="text-center pb-5 pt-2 flex-shrink-0">
        <p
          className="text-[10px] md:text-xs tracking-[0.4em] uppercase"
          style={{ fontFamily: "var(--font-body)", color: "#6b6b6b" }}
        >
          Hover the figure · Click to enter
        </p>
      </div>

      {/* Tooltip overlay */}
      <HoverTooltip zone={hoverZone} mouse={mouse} />
    </section>
  );
}
