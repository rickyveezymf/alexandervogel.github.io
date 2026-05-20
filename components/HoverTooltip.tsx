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
      className="pointer-events-none fixed z-40"
      style={{ left: mouse.x + 18, top: mouse.y + 18 }}
    >
      <div className="torn-box px-5 py-2.5">
        <span
          className="text-[11px] tracking-[0.3em] uppercase font-medium inline-flex items-center gap-2"
          style={{ color: "#000000", fontFamily: "var(--font-body)" }}
        >
          {ZONE_LABELS[zone]}
          <span aria-hidden>→</span>
        </span>
      </div>
    </div>
  );
}
