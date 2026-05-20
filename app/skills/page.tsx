const columns = [
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

export default function SkillsPage() {
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
          03 / Capabilities
        </p>

        <h1
          className="text-5xl md:text-7xl font-bold leading-tight mb-10"
          style={{ fontFamily: "var(--font-heading)", color: "#000000" }}
        >
          Skills
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {columns.map(({ category, items }, idx) => (
            <div key={category} className="torn-box p-7">
              <div className="flex items-baseline justify-between mb-5">
                <h2
                  className="text-xs tracking-[0.3em] uppercase"
                  style={{ color: "#000000", fontFamily: "var(--font-body)", fontWeight: 700 }}
                >
                  {category}
                </h2>
                <span
                  className="text-xs"
                  style={{ color: "#666666", fontFamily: "var(--font-heading)" }}
                >
                  0{idx + 1}
                </span>
              </div>

              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-base"
                    style={{ fontFamily: "var(--font-body)", color: "#000000" }}
                  >
                    <span
                      className="w-1.5 h-1.5 flex-shrink-0"
                      style={{ backgroundColor: "#000000" }}
                    />
                    {item}
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
