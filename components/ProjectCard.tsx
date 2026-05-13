"use client";

interface ProjectCardProps {
  title: string;
  description: string;
  href?: string;
}

export default function ProjectCard({ title, description, href = "#" }: ProjectCardProps) {
  return (
    <div
      className="group flex flex-col justify-between p-8 transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: "#ebe7df",
        border: "1px solid rgba(10,10,10,0.1)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.border = "1px solid #b85c38";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 32px rgba(10,10,10,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.border = "1px solid rgba(10,10,10,0.1)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div>
        <div className="w-8 h-px mb-5" style={{ backgroundColor: "#b85c38" }} />
        <h3
          className="text-2xl font-bold mb-3 leading-tight"
          style={{ fontFamily: "var(--font-heading)", color: "#0a0a0a" }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-body)", color: "#6b6b6b" }}
        >
          {description}
        </p>
      </div>

      <a
        href={href}
        className="mt-8 inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.3em] uppercase transition-colors duration-200"
        style={{ fontFamily: "var(--font-body)", color: "#b85c38" }}
        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#0a0a0a")}
        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#b85c38")}
      >
        View Project
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
