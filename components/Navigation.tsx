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

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "rgba(245, 243, 238, 0.92)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(10, 10, 10, 0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl tracking-wider"
          style={{ fontFamily: "var(--font-heading)", color: "#0a0a0a" }}
        >
          AV<span style={{ color: "#b85c38" }}>.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs tracking-[0.25em] uppercase relative pb-1 transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: active ? "#b85c38" : "#0a0a0a",
                    borderBottom: active ? "1px solid #b85c38" : "1px solid transparent",
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
              backgroundColor: "#0a0a0a",
              transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : undefined,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{ backgroundColor: "#0a0a0a", opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              backgroundColor: "#0a0a0a",
              transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : undefined,
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6" style={{ backgroundColor: "#f5f3ee" }}>
          <ul className="flex flex-col gap-4">
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
                      color: active ? "#b85c38" : "#0a0a0a",
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
