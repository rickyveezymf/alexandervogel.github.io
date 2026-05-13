"use client";

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-28 px-6" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <p
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: "#c9a84c", fontFamily: "var(--font-body)" }}
        >
          Who I Am
        </p>

        <h2
          className="text-5xl md:text-6xl font-bold mb-16"
          style={{ fontFamily: "var(--font-heading)", color: "#0a0f2c" }}
        >
          About Me
        </h2>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Headshot placeholder */}
          <div className="gsap-fade-in">
            <div
              className="w-full aspect-square flex items-center justify-center rounded-sm"
              style={{ backgroundColor: "#e5e7eb", maxWidth: "420px" }}
            >
              <div className="text-center" style={{ color: "#9ca3af" }}>
                <div
                  className="text-4xl mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  AV
                </div>
                <p className="text-sm tracking-widest uppercase" style={{ fontFamily: "var(--font-body)" }}>
                  Headshot
                </p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="gsap-fade-in flex flex-col justify-center gap-6">
            {/* Gold accent line */}
            <div className="w-12 h-0.5" style={{ backgroundColor: "#c9a84c" }} />

            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ fontFamily: "var(--font-body)", color: "#0a0f2c" }}
            >
              I am a literature enthusiast who channels my passion for storytelling through clubs
              and personal creative projects. Competitive by nature and well-disciplined in
              everything I pursue, I compete at the varsity level in both squash and debate.
            </p>

            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ fontFamily: "var(--font-body)", color: "#0a0f2c" }}
            >
              Beyond academics and athletics, I am deeply committed to my community and the values
              I hold, which I act on through my involvement with JAC and Grassroots. Looking ahead,
              I am driven by a clear ambition to build a career in the entertainment industry.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mt-4 pt-6" style={{ borderTop: "1px solid #e5e7eb" }}>
              {[
                { num: "3.94", label: "GPA" },
                { num: "#1", label: "Squash League" },
                { num: "4+", label: "Clubs & Orgs" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p
                    className="text-3xl font-bold"
                    style={{ fontFamily: "var(--font-heading)", color: "#c9a84c" }}
                  >
                    {num}
                  </p>
                  <p
                    className="text-xs tracking-widest uppercase mt-1"
                    style={{ fontFamily: "var(--font-body)", color: "#6b7280" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
