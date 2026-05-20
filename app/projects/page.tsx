import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "Short Film Project",
    description:
      "A narrative short exploring themes of identity and belonging — written, directed, and edited using Final Draft Pro and Adobe Premiere Pro.",
  },
  {
    title: "Literary Journal",
    description:
      "Founded and curated a student literary journal through the Literature Club, amplifying student voices across poetry, fiction, and essays.",
  },
  {
    title: "Community Campaign",
    description:
      "Led a Grassroots community awareness campaign, coordinating volunteers and outreach events across the local neighborhood.",
  },
];

export default function ProjectsPage() {
  return (
    <main
      className="min-h-screen px-6 pt-28 pb-16"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="max-w-6xl mx-auto">
        <p
          className="text-[10px] tracking-[0.4em] uppercase mb-2"
          style={{ color: "#666666", fontFamily: "var(--font-body)" }}
        >
          04 / Creative Work
        </p>

        <h1
          className="text-5xl md:text-7xl font-bold leading-tight mb-10"
          style={{ fontFamily: "var(--font-heading)", color: "#000000" }}
        >
          Projects
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} title={p.title} description={p.description} />
          ))}
        </div>
      </div>
    </main>
  );
}
