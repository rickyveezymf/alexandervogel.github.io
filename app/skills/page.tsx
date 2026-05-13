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
    <main className="min-h-[calc(100vh-64px)] px-6 py-12" style={{ backgroundColor: "#f5f3ee" }}>
      <div className="max-w-6xl mx-auto">
        <p
          className="text-[10px] tracking-[0.4em] uppercase mb-2"
          style={{ color: "#b85c38", fontFamily: "var(--font-body)" }}
        >
          03 / Capabilities
        </p>

        <h1
          className="text-5xl md:text-7xl font-bold leading-tight mb-10"
          style={{ fontFamily: "var(--font-heading)", color: "#0a0a0a" }}
        >
          Skills
        </h1>

        <div className="grid md:grid-cols-3 gap-10">
          {columns.map(({ category, items }, idx) => (
            <div
              key={category}
              className="p-6"
              style={{
                border: "1px solid rgba(10,10,10,0.1)",
                backgroundColor: "#ebe7df",
              }}
            >
              <div className="flex items-baseline justify-between mb-6">
                <h2
                  className="text-xs tracking-[0.3em] uppercase"
                  style={{ color: "#0a0a0a", fontFamily: "var(--font-body)" }}
                >
                  {category}
                </h2>
                <span
                  className="text-xs"
                  style={{ color: "#b85c38", fontFamily: "var(--font-heading)" }}
                >
                  0{idx + 1}
                </span>
              </div>

              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-base"
                    style={{ fontFamily: "var(--font-body)", color: "#0a0a0a" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "#b85c38" }}
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
