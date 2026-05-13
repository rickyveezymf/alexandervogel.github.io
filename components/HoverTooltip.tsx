"use client";

import { Zone } from "./HumanoidScene";

const ZONE_LABELS: Record<Zone, string> = {
  head: "About Me",
  torso: "Résumé",
  arms: "Skills",
  legs: "Projects",
};

interface HoverTooltipProps {
  zone: Zone | null;
  mouse: { x: number; y: number } | null;
}

export default function HoverTooltip({ zone, mouse }: HoverTooltipProps) {
  if (!zone || !mouse) return null;

  return (
    <div
      className="pointer-events-none fixed z-40 transition-opacity duration-150"
      style={{
        left: mouse.x + 18,
        top: mouse.y + 18,
        opacity: 1,
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-sm shadow-lg backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(10, 10, 10, 0.92)",
          border: "1px solid #b85c38",
        }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "#f5f3ee", fontFamily: "var(--font-body)" }}
        >
          {ZONE_LABELS[zone]}
        </span>
        <span style={{ color: "#b85c38" }}>→</span>
      </div>
    </div>
  );
}
