export default function AboutPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] px-6 py-12" style={{ backgroundColor: "#f5f3ee" }}>
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <p
          className="text-[10px] tracking-[0.4em] uppercase mb-2"
          style={{ color: "#b85c38", fontFamily: "var(--font-body)" }}
        >
          01 / Who I Am
        </p>

        <h1
          className="text-5xl md:text-7xl font-bold leading-tight mb-10"
          style={{ fontFamily: "var(--font-heading)", color: "#0a0a0a" }}
        >
          About Me
        </h1>

        <div className="grid md:grid-cols-[320px_1fr] gap-10 items-start">
          {/* Headshot placeholder */}
          <div
            className="w-full aspect-[4/5] flex items-center justify-center"
            style={{ backgroundColor: "#ebe7df", border: "1px solid rgba(10,10,10,0.08)" }}
          >
            <div className="text-center" style={{ color: "#6b6b6b" }}>
              <div className="text-4xl mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                AV
              </div>
              <p className="text-[10px] tracking-[0.3em] uppercase">Headshot</p>
            </div>
          </div>

          {/* Bio */}
          <div>
            <div className="w-12 h-px mb-6" style={{ backgroundColor: "#b85c38" }} />

            <p
              className="text-lg md:text-xl leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-body)", color: "#0a0a0a" }}
            >
              <span
                className="float-left text-7xl mr-3 mt-1 leading-none"
                style={{ fontFamily: "var(--font-heading)", color: "#b85c38" }}
              >
                I
              </span>
              am a literature enthusiast who channels my passion for storytelling through clubs and
              personal creative projects. Competitive by nature and well-disciplined in everything I
              pursue, I compete at the varsity level in both squash and debate.
            </p>

            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ fontFamily: "var(--font-body)", color: "#0a0a0a" }}
            >
              Beyond academics and athletics, I am deeply committed to my community and the values
              I hold, which I act on through my involvement with JAC and Grassroots. Looking ahead,
              I am driven by a clear ambition to build a career in the entertainment industry.
            </p>

            {/* Stats strip */}
            <div
              className="grid grid-cols-3 gap-6 mt-8 pt-6"
              style={{ borderTop: "1px solid rgba(10,10,10,0.1)" }}
            >
              {[
                { num: "3.94", label: "GPA" },
                { num: "#1", label: "Squash League" },
                { num: "4+", label: "Clubs & Orgs" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p
                    className="text-3xl font-bold"
                    style={{ fontFamily: "var(--font-heading)", color: "#b85c38" }}
                  >
                    {num}
                  </p>
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mt-1"
                    style={{ fontFamily: "var(--font-body)", color: "#6b6b6b" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
