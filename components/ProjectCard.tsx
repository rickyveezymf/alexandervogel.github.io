"use client";

interface ProjectCardProps {
  title: string;
  description: string;
  href?: string;
}

export default function ProjectCard({ title, description, href = "#" }: ProjectCardProps) {
  return (
    <div
      className="group flex flex-col justify-between p-8 rounded-sm transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid rgba(201,168,76,0.2)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.border = "1px solid #c9a84c";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.border = "1px solid rgba(201,168,76,0.2)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div>
        <div className="w-8 h-0.5 mb-6" style={{ backgroundColor: "#c9a84c" }} />
        <h3
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: "var(--font-heading)", color: "#0a0f2c" }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-body)", color: "#4b5563" }}
        >
          {description}
        </p>
      </div>

      <a
        href={href}
        className="mt-8 inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase transition-colors duration-200"
        style={{ fontFamily: "var(--font-body)", color: "#c9a84c" }}
        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#0a0f2c")}
        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#c9a84c")}
      >
        View Project
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
