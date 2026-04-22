import { motion } from "motion/react";

const milestones = [
  {
    year: "2018",
    title: "Founded in Saharsa",
    description:
      "Yuvraj Singh Rajput establishes Royal Drinking Water, tapping Bihar's pristine Gangetic aquifers.",
  },
  {
    year: "2020",
    title: "First 1,000 Homes",
    description:
      "Royal reaches a thousand families across Saharsa district, earning trust through unmatched purity.",
  },
  {
    year: "2023",
    title: "Expanding Across Bihar",
    description:
      "Operations scale statewide — bringing mineral-rich water to cities, towns and villages throughout Bihar.",
  },
];

function WaveTopDivider() {
  return (
    <div className="w-full overflow-hidden leading-none" aria-hidden="true">
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-20 block"
        focusable="false"
        role="presentation"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill="oklch(0.96 0.012 60)"
        />
      </svg>
    </div>
  );
}

function WaveBottomDivider() {
  return (
    <div className="w-full overflow-hidden leading-none" aria-hidden="true">
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-20 block"
        focusable="false"
        role="presentation"
      >
        <path
          d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,0 L0,0 Z"
          fill="oklch(0.96 0.012 60)"
        />
      </svg>
    </div>
  );
}

export function StorySection() {
  return (
    <>
      {/* Top wave transitioning from bg-background into cream */}
      <WaveTopDivider />

      <section
        id="story"
        className="py-20 md:py-28"
        style={{ backgroundColor: "oklch(0.96 0.012 60)" }}
        data-ocid="story.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section label + heading */}
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-label text-accent mb-3 tracking-widest">
              Our Heritage
            </p>
            <h2
              className="text-section-title text-foreground"
              data-ocid="story.heading"
            >
              The Royal Story
            </h2>
            <div className="mx-auto mt-4 w-20 h-[2px] bg-primary/30 rounded-full" />
          </motion.div>

          {/* Two-column: text left, visual right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-24">
            {/* Left — narrative text */}
            <motion.div
              className="order-2 lg:order-1"
              data-ocid="story.narrative"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              <p className="text-label text-primary mb-3 tracking-widest">
                Founder · Yuvraj Singh Rajput
              </p>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-snug mb-6">
                Born from the Heart of{" "}
                <span className="italic text-primary">Gangetic Bihar</span>
              </h3>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
                <p>
                  In 2018, Yuvraj Singh Rajput stood at the banks of the Ganges
                  in Saharsa, Bihar, with a single, unshakeable conviction —
                  that the mineral-rich groundwater lying beneath this ancient
                  land deserved to be shared with the world.
                </p>
                <p>
                  Royal Drinking Water was founded on that belief. Our source
                  taps deep Gangetic aquifers, where geological layers
                  accumulated over millennia naturally enrich every drop with
                  calcium, magnesium, potassium and bicarbonates that sustain
                  life at its most essential.
                </p>
                <p>
                  Our mission is straightforward and relentless: bring pure,
                  unadulterated mineral water — untouched by artificial
                  additives — to every home, every table, every family across
                  India. Bihar's natural abundance, bottled with care.
                </p>
              </div>

              {/* Stats row */}
              <motion.div
                className="mt-8 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                {[
                  { value: "2018", label: "Est. Saharsa, Bihar" },
                  { value: "6+", label: "Years of Purity" },
                  { value: "100%", label: "Natural Minerals" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-card border border-border rounded-xl px-5 py-4 shadow-subtle flex-1 min-w-[110px]"
                  >
                    <p className="font-display font-bold text-2xl text-primary">
                      {s.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Bihar heritage visual */}
            <motion.div
              className="relative order-1 lg:order-2"
              data-ocid="story.visual"
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-elevated aspect-[4/5] max-w-md mx-auto lg:ml-auto">
                <img
                  src="/assets/generated/bihar-heritage-story.dim_800x900.jpg"
                  alt="Bihar Gangetic plains — the source of Royal Drinking Water"
                  className="w-full h-full object-cover"
                />
                {/* Overlay with quote */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display italic text-lg font-semibold text-primary-foreground/95 leading-snug">
                    "Pure water is the world's first and foremost medicine."
                  </p>
                  <p className="mt-2 text-primary-foreground/60 text-xs tracking-widest uppercase">
                    — Slovakian Proverb
                  </p>
                </div>
              </div>

              {/* Floating founder card */}
              <motion.div
                className="absolute -bottom-6 -left-4 bg-card border border-border rounded-xl px-5 py-4 shadow-elevated"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-water flex items-center justify-center flex-shrink-0">
                    <span className="font-display font-bold text-primary-foreground text-sm">
                      YR
                    </span>
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground text-sm leading-tight">
                      Yuvraj Singh Rajput
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Founder · Saharsa, Bihar
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Timeline milestones */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-label text-accent text-center mb-10 tracking-widest">
              Milestones
            </p>
            <div className="relative">
              {/* Connecting line (desktop) */}
              <div
                className="hidden md:block absolute top-10 left-1/6 right-1/6 h-[1px] bg-border"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    data-ocid={`story.milestone.${i + 1}`}
                    className="relative bg-card border border-border rounded-2xl p-6 shadow-subtle text-center group hover:shadow-elevated transition-smooth"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                  >
                    {/* Year badge */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-water text-primary-foreground font-display font-bold text-lg shadow-subtle mb-4 group-hover:scale-105 transition-smooth">
                      {m.year}
                    </div>
                    <h4 className="font-display font-bold text-foreground text-lg mb-2">
                      {m.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {m.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom wave back to bg-background */}
      <WaveBottomDivider />
    </>
  );
}
