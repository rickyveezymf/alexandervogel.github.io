type Item = { primary: string; secondary: string; bold?: boolean };
type Section = { title: string; items: Item[] };

const sections: Section[] = [
  {
    title: "Education",
    items: [
      { primary: "The Browning School", secondary: "GPA 3.94 · High Honors", bold: true },
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
    <main
      className="min-h-screen px-6 pt-28 pb-16"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="max-w-6xl mx-auto">
        <p
          className="text-[10px] tracking-[0.4em] uppercase mb-2"
          style={{ color: "#666666", fontFamily: "var(--font-body)" }}
        >
          02 / The Record
        </p>

        <h1
          className="text-5xl md:text-7xl font-bold leading-tight mb-10"
          style={{ fontFamily: "var(--font-heading)", color: "#000000" }}
        >
          Résumé
        </h1>

        <div className="grid md:grid-cols-3 gap-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2
                className="text-xs tracking-[0.3em] uppercase mb-3 pb-3"
                style={{
                  color: "#000000",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                }}
              >
                {section.title}
              </h2>
              <div className="torn-line w-full mb-5" />

              <ul className="space-y-5">
                {section.items.map((item) => (
                  <li key={item.primary}>
                    <p
                      className="font-medium text-base"
                      style={{ fontFamily: "var(--font-body)", color: "#000000" }}
                    >
                      {item.primary}
                    </p>
                    <p
                      className="text-sm mt-1"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: item.bold ? "#000000" : "#666666",
                        fontWeight: item.bold ? 700 : 400,
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
