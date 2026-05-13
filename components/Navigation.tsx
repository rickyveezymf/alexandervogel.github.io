"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const navLinks = [
  { label: "About Me", href: "about" },
  { label: "Body of Work", href: "work" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    gsap.to(window, { duration: 1.2, scrollTo: { y: `#${id}`, offsetY: 70 }, ease: "power2.inOut" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: "#0a0f2c",
        borderBottom: scrolled ? "1px solid #c9a84c" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Name */}
        <button
          onClick={() => gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: "power2.inOut" })}
          className="text-white text-xl tracking-wider"
          style={{ fontFamily: "var(--font-heading)", background: "none", border: "none", cursor: "pointer" }}
        >
          AV
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="text-white text-sm tracking-widest uppercase transition-colors duration-200"
                style={{ fontFamily: "var(--font-body)", background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#c9a84c")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#ffffff")}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span
            className="block w-6 h-0.5 bg-white transition-all duration-300"
            style={{ transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : undefined }}
          />
          <span
            className="block w-6 h-0.5 bg-white transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 bg-white transition-all duration-300"
            style={{ transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : undefined }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6" style={{ backgroundColor: "#0a0f2c" }}>
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="text-white text-sm tracking-widest uppercase w-full text-left"
                  style={{ fontFamily: "var(--font-body)", background: "none", border: "none", cursor: "pointer" }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
