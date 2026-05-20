"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Résumé", href: "/resume" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Landing page is uninterrupted — figure only.
  if (pathname === "/") return null;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1.5px solid #000000",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl tracking-wider"
          style={{ fontFamily: "var(--font-heading)", color: "#000000" }}
        >
          AV.
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs tracking-[0.25em] uppercase pb-1 transition-all duration-150"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#000000",
                    fontWeight: active ? 700 : 400,
                    borderBottom: active ? "1.5px solid #000000" : "1.5px solid transparent",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              backgroundColor: "#000000",
              transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : undefined,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{ backgroundColor: "#000000", opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              backgroundColor: "#000000",
              transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : undefined,
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6"
          style={{ backgroundColor: "#ffffff", borderTop: "1px solid #000000" }}
        >
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-xs tracking-[0.25em] uppercase block"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "#000000",
                      fontWeight: active ? 700 : 400,
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
