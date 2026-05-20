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
    (zone: Zone) => router.push(ZONE_ROUTES[zone]),
    [router]
  );

  const handleHoverChange = useCallback((zone: Zone | null, m?: { x: number; y: number }) => {
    setHoverZone(zone);
    setMouse(m ?? null);
  }, []);

  return (
    <section
      className="relative w-full"
      style={{ backgroundColor: "#ffffff", height: "100vh", width: "100vw" }}
    >
      <HumanoidScene onZoneClick={handleZoneClick} onHoverChange={handleHoverChange} />
      <HoverTooltip zone={hoverZone} mouse={mouse} />
    </section>
  );
}
