type Item = { primary: string; secondary: string; accent?: boolean };
type Section = { title: string; items: Item[] };

const sections: Section[] = [
  {
    title: "Education",
    items: [
      { primary: "The Browning School", secondary: "GPA 3.94 · High Honors", accent: true },
    ],
  },
  {
    title: "Experience",
    items: [
      { primary: "Summer Internship", secondary: "Industry exposure and professional development" },
      { primary: "Summer Program", secondary: "Intensive academic and leadership training" },
      { primary: "Grassroots Volunteer", secondary: "Community organizing and civic engagement" },
    ],
  },
  {
    title: "Extracurriculars",
    items: [
      { primary: "Varsity Squash", secondary: "Team placed #1 in league" },
      { primary: "Literature Club", secondary: "Founder & President" },
      { primary: "JAC", secondary: "Board Member" },
      { primary: "Debate Team", secondary: "Competitive varsity debater" },
    ],
  },
];

export default function ResumePage() {
  return (
    <main className="min-h-[calc(100vh-64px)] px-6 py-12" style={{ backgroundColor: "#f5f3ee" }}>
      <div className="max-w-6xl mx-auto">
        <p
          className="text-[10px] tracking-[0.4em] uppercase mb-2"
          style={{ color: "#b85c38", fontFamily: "var(--font-body)" }}
        >
          02 / The Record
        </p>

        <h1
          className="text-5xl md:text-7xl font-bold leading-tight mb-10"
          style={{ fontFamily: "var(--font-heading)", color: "#0a0a0a" }}
        >
          Résumé
        </h1>

        <div className="grid md:grid-cols-3 gap-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2
                className="text-xs tracking-[0.3em] uppercase mb-5 pb-3"
                style={{
                  color: "#b85c38",
                  fontFamily: "var(--font-body)",
                  borderBottom: "1px solid rgba(10,10,10,0.15)",
                }}
              >
                {section.title}
              </h2>

              <ul className="space-y-5">
                {section.items.map((item) => (
                  <li key={item.primary}>
                    <p
                      className="font-medium text-base"
                      style={{ fontFamily: "var(--font-body)", color: "#0a0a0a" }}
                    >
                      {item.primary}
                    </p>
                    <p
                      className="text-sm mt-1"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: item.accent ? "#b85c38" : "#6b6b6b",
                      }}
                    >
                      {item.secondary}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
