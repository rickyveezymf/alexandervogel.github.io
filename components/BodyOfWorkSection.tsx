"use client";

import ProjectCard from "./ProjectCard";

const resumeData = {
  education: [
    { school: "The Browning School", detail: "GPA 3.94 · High Honors" },
  ],
  experience: [
    { role: "Summer Internship", detail: "Industry exposure and professional development" },
    { role: "Summer Program", detail: "Intensive academic and leadership training" },
    { role: "Grassroots Volunteer", detail: "Community organizing and civic engagement" },
  ],
  extracurriculars: [
    { activity: "Varsity Squash", detail: "Team placed #1 in league" },
    { activity: "Literature Club", detail: "Founder & President" },
    { activity: "JAC", detail: "Board Member" },
    { activity: "Debate Team", detail: "Competitive varsity debater" },
  ],
};

const skillsData = [
  {
    category: "Technical",
    items: ["Adobe Premiere Pro", "Final Draft Pro", "Photography", "Videography"],
  },
  {
    category: "Academic",
    items: ["Research & Writing", "Argumentation & Debate", "Literary Analysis", "Public Speaking"],
  },
  {
    category: "Personal",
    items: ["Leadership", "Networking", "Active Listening", "Community Organizing"],
  },
];

const projectsData = [
  {
    title: "Short Film Project",
    description:
      "A narrative short exploring themes of identity and belonging, written, directed, and edited using Final Draft Pro and Adobe Premiere Pro.",
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs tracking-widest uppercase mb-3"
      style={{ color: "#c9a84c", fontFamily: "var(--font-body)" }}
    >
      {children}
    </p>
  );
}

export default function BodyOfWorkSection() {
  return (
    <section id="work" style={{ backgroundColor: "#0a0f2c" }}>
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        <SectionLabel>Portfolio</SectionLabel>
        <h2
          className="text-5xl md:text-6xl font-bold"
          style={{ fontFamily: "var(--font-heading)", color: "#ffffff" }}
        >
          Body of Work
        </h2>
      </div>

      {/* ── Resume ─────────────────────────────────────────── */}
      <div
        className="gsap-fade-in max-w-6xl mx-auto px-6 py-16"
        style={{ borderTop: "1px solid rgba(201,168,76,0.2)" }}
      >
        <SectionLabel>Résumé</SectionLabel>

        <div className="grid md:grid-cols-3 gap-12 mt-8">
          {/* Education */}
          <div>
            <h3
              className="text-xl font-bold mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "#ffffff" }}
            >
              Education
            </h3>
            {resumeData.education.map((e) => (
              <div key={e.school} className="mb-4">
                <p className="text-white font-medium" style={{ fontFamily: "var(--font-body)" }}>
                  {e.school}
                </p>
                <p className="text-sm mt-1" style={{ color: "#c9a84c", fontFamily: "var(--font-body)" }}>
                  {e.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div>
            <h3
              className="text-xl font-bold mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "#ffffff" }}
            >
              Experience
            </h3>
            {resumeData.experience.map((e) => (
              <div key={e.role} className="mb-4">
                <p className="text-white font-medium" style={{ fontFamily: "var(--font-body)" }}>
                  {e.role}
                </p>
                <p className="text-sm mt-1" style={{ color: "#9ca3af", fontFamily: "var(--font-body)" }}>
                  {e.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Extracurriculars */}
          <div>
            <h3
              className="text-xl font-bold mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "#ffffff" }}
            >
              Extracurriculars
            </h3>
            {resumeData.extracurriculars.map((e) => (
              <div key={e.activity} className="mb-4">
                <p className="text-white font-medium" style={{ fontFamily: "var(--font-body)" }}>
                  {e.activity}
                </p>
                <p className="text-sm mt-1" style={{ color: "#9ca3af", fontFamily: "var(--font-body)" }}>
                  {e.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Skills ─────────────────────────────────────────── */}
      <div
        id="skills"
        className="gsap-fade-in max-w-6xl mx-auto px-6 py-16"
        style={{ borderTop: "1px solid rgba(201,168,76,0.2)" }}
      >
        <SectionLabel>Capabilities</SectionLabel>
        <h2
          className="text-4xl font-bold mb-12"
          style={{ fontFamily: "var(--font-heading)", color: "#ffffff" }}
        >
          Skills
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {skillsData.map(({ category, items }) => (
            <div key={category}>
              <h3
                className="text-xs tracking-widest uppercase mb-6"
                style={{ color: "#c9a84c", fontFamily: "var(--font-body)" }}
              >
                {category}
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-white"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#c9a84c" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Projects ───────────────────────────────────────── */}
      <div
        id="projects"
        className="gsap-fade-in max-w-6xl mx-auto px-6 py-16 pb-28"
        style={{ borderTop: "1px solid rgba(201,168,76,0.2)" }}
      >
        <SectionLabel>Creative Work</SectionLabel>
        <h2
          className="text-4xl font-bold mb-12"
          style={{ fontFamily: "var(--font-heading)", color: "#ffffff" }}
        >
          Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projectsData.map((p) => (
            <ProjectCard key={p.title} title={p.title} description={p.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
