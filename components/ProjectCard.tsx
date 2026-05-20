"use client";

interface ProjectCardProps {
  title: string;
  description: string;
  href?: string;
}

export default function ProjectCard({ title, description, href = "#" }: ProjectCardProps) {
  return (
    <a
      href={href}
      className="torn-box torn-box-hover group flex flex-col justify-between p-8 cursor-pointer no-underline"
      style={{ minHeight: "260px" }}
    >
      <div>
        <div className="torn-line w-8 mb-5" />
        <h3
          className="text-2xl font-bold mb-3 leading-tight"
          style={{ fontFamily: "var(--font-heading)", color: "#000000" }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-body)", color: "#666666" }}
        >
          {description}
        </p>
      </div>

      <span
        className="mt-8 inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.3em] uppercase"
        style={{ fontFamily: "var(--font-body)", color: "#000000" }}
      >
        View Project <span aria-hidden>→</span>
      </span>
    </a>
  );
}
