import { useEffect, useRef, useState } from "react";

interface Mineral {
  symbol: string;
  name: string;
  benefit: string;
  concentration: number;
  value: string;
  unit: string;
  colorFrom: string;
  colorTo: string;
}

const MINERALS: Mineral[] = [
  {
    symbol: "Ca",
    name: "Calcium",
    benefit: "Strengthens bones and teeth",
    concentration: 78,
    value: "16.2",
    unit: "mg/L",
    colorFrom: "oklch(0.78 0.14 210)",
    colorTo: "oklch(0.70 0.18 195)",
  },
  {
    symbol: "Mg",
    name: "Magnesium",
    benefit: "Supports muscle function",
    concentration: 60,
    value: "7.8",
    unit: "mg/L",
    colorFrom: "oklch(0.75 0.14 175)",
    colorTo: "oklch(0.65 0.18 160)",
  },
  {
    symbol: "K",
    name: "Potassium",
    benefit: "Regulates heart rhythm",
    concentration: 40,
    value: "1.4",
    unit: "mg/L",
    colorFrom: "oklch(0.72 0.14 220)",
    colorTo: "oklch(0.62 0.17 205)",
  },
  {
    symbol: "HCO₃",
    name: "Bicarbonates",
    benefit: "Balances body pH naturally",
    concentration: 95,
    value: "82",
    unit: "mg/L",
    colorFrom: "oklch(0.65 0.18 250)",
    colorTo: "oklch(0.55 0.20 240)",
  },
  {
    symbol: "SiO₂",
    name: "Silica",
    benefit: "Promotes healthy skin and hair",
    concentration: 52,
    value: "6.5",
    unit: "mg/L",
    colorFrom: "oklch(0.68 0.18 285)",
    colorTo: "oklch(0.58 0.20 270)",
  },
  {
    symbol: "Zn",
    name: "Zinc",
    benefit: "Boosts immunity and healing",
    concentration: 35,
    value: "0.8",
    unit: "mg/L",
    colorFrom: "oklch(0.65 0.16 230)",
    colorTo: "oklch(0.55 0.18 250)",
  },
  {
    symbol: "Na",
    name: "Sodium",
    benefit: "Maintains fluid balance",
    concentration: 28,
    value: "4.2",
    unit: "mg/L",
    colorFrom: "oklch(0.70 0.14 200)",
    colorTo: "oklch(0.62 0.16 180)",
  },
  {
    symbol: "F",
    name: "Fluoride",
    benefit: "Protects enamel and cavities",
    concentration: 15,
    value: "0.2",
    unit: "mg/L",
    colorFrom: "oklch(0.72 0.14 165)",
    colorTo: "oklch(0.65 0.17 185)",
  },
];

function MineralCard({
  mineral,
  index,
  visible,
}: {
  mineral: Mineral;
  index: number;
  visible: boolean;
}) {
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(
      () => {
        setBarWidth(mineral.concentration);
      },
      350 + index * 110,
    );
    return () => clearTimeout(timer);
  }, [visible, mineral.concentration, index]);

  return (
    <div
      data-ocid={`minerals.card.${index + 1}`}
      className="group relative rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.13)",
        backdropFilter: "blur(8px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${index * 0.07}s, transform 0.55s ease ${index * 0.07}s`,
      }}
    >
      {/* Gradient accent top bar */}
      <div
        className="h-[2px] w-full"
        style={{
          background: `linear-gradient(90deg, ${mineral.colorFrom}, ${mineral.colorTo})`,
        }}
      />

      <div className="p-5">
        {/* Symbol badge + name */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg shrink-0"
            style={{
              background: `linear-gradient(135deg, ${mineral.colorFrom}, ${mineral.colorTo})`,
            }}
          >
            <span className="text-[11px] font-bold text-white/95 font-mono tracking-tight leading-none text-center px-0.5">
              {mineral.symbol}
            </span>
          </div>
          <div className="min-w-0">
            <p
              className="font-display font-semibold text-base leading-tight"
              style={{ color: "rgba(255,255,255,0.92)" }}
            >
              {mineral.name}
            </p>
            <p
              className="text-xs font-body mt-0.5"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {mineral.value} {mineral.unit}
            </p>
          </div>
        </div>

        {/* Benefit */}
        <p
          className="text-sm font-body leading-snug mb-4"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          {mineral.benefit}
        </p>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span
              className="text-[10px] uppercase tracking-widest font-body"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Level
            </span>
            <span
              className="text-[11px] font-semibold font-body"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {mineral.concentration}%
            </span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.10)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${barWidth}%`,
                background: `linear-gradient(90deg, ${mineral.colorFrom}, ${mineral.colorTo})`,
                transition: "width 1.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MineralsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const sortedForChart = [...MINERALS].sort(
    (a, b) => b.concentration - a.concentration,
  );

  return (
    <section
      ref={sectionRef}
      id="minerals"
      data-ocid="minerals.section"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, oklch(0.22 0.09 255) 0%, oklch(0.19 0.08 242) 45%, oklch(0.21 0.10 185) 100%)",
      }}
    >
      {/* Decorative floating orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {(
          [
            { size: 400, top: "-10%", left: "-8%", opacity: 0.05 },
            { size: 280, bottom: "5%", right: "-5%", opacity: 0.05 },
            { size: 160, top: "20%", right: "15%", opacity: 0.04 },
            { size: 100, top: "50%", left: "8%", opacity: 0.04 },
            { size: 70, top: "38%", left: "42%", opacity: 0.035 },
          ] as Array<{
            size: number;
            top?: string;
            left?: string;
            right?: string;
            bottom?: string;
            opacity: number;
          }>
        ).map((b) => (
          <span
            key={`orb-${b.size}-${b.opacity}`}
            className="absolute rounded-full"
            style={{
              width: b.size,
              height: b.size,
              top: b.top,
              left: b.left,
              right: b.right,
              bottom: b.bottom,
              background: `radial-gradient(circle at 35% 35%, rgba(200,240,255,${b.opacity * 2.5}), rgba(80,180,220,${b.opacity}))`,
              border: `1px solid rgba(255,255,255,${b.opacity * 0.8})`,
            }}
          />
        ))}
      </div>

      {/* Wave top divider */}
      <div aria-hidden="true" className="absolute top-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
          style={{ height: 56, display: "block" }}
          aria-hidden="true"
        >
          <title>Wave divider</title>
          <path
            d="M0 0 C360 56 1080 0 1440 36 L1440 0 Z"
            fill="oklch(0.96 0.006 60)"
            fillOpacity="0.55"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        {/* Section header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <p
            className="text-label mb-4"
            style={{ color: "rgba(80,220,200,0.85)" }}
          >
            Mineral Composition
          </p>
          <h2
            className="text-section-title mb-6"
            style={{ color: "rgba(255,255,255,0.95)" }}
          >
            Nature's Minerals,{" "}
            <span
              className="italic font-display"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.83 0.14 185), oklch(0.78 0.12 230))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Perfectly Balanced
            </span>
          </h2>
          <p
            className="font-body text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Sourced from ancient aquifers beneath the Gangetic plains, each drop
            carries an ideal spectrum of minerals essential for life.
          </p>
        </div>

        {/* 8-mineral cards grid */}
        <div
          data-ocid="minerals.list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
        >
          {MINERALS.map((mineral, index) => (
            <MineralCard
              key={mineral.name}
              mineral={mineral}
              index={index}
              visible={visible}
            />
          ))}
        </div>

        {/* Horizontal comparative chart */}
        <div
          data-ocid="minerals.chart"
          className="rounded-2xl p-6 md:p-8 mb-14"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <p
            className="text-xs uppercase tracking-widest font-body mb-6"
            style={{ color: "rgba(255,255,255,0.40)" }}
          >
            Relative Mineral Concentrations
          </p>
          <div className="space-y-3.5">
            {sortedForChart.map((mineral, i) => (
              <div key={mineral.name} className="flex items-center gap-3">
                <span
                  className="text-xs font-body w-24 shrink-0"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {mineral.name}
                </span>
                <div
                  className="flex-1 h-2 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: visible ? `${mineral.concentration}%` : "0%",
                      background: `linear-gradient(90deg, ${mineral.colorFrom}, ${mineral.colorTo})`,
                      transition: `width 1.4s cubic-bezier(0.4,0,0.2,1) ${0.45 + i * 0.06}s`,
                    }}
                  />
                </div>
                <span
                  className="text-xs font-body w-16 text-right shrink-0"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {mineral.value} {mineral.unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tagline + trust badges */}
        <div
          className="text-center"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.85s ease 1s",
          }}
        >
          <div
            className="inline-block px-5 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.13)",
            }}
          >
            <span
              className="text-xs uppercase tracking-widest font-body"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Royal Drinking Water · Saharsa, Bihar
            </span>
          </div>

          <p
            className="font-display text-2xl md:text-3xl max-w-2xl mx-auto leading-relaxed italic"
            style={{
              color: "rgba(255,255,255,0.88)",
              textShadow: "0 2px 24px rgba(0,210,200,0.18)",
            }}
          >
            "Every sip brings nature's goodness from the heart of Bihar"
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              { label: "pH Balanced", value: "7.4" },
              { label: "TDS Optimised", value: "142 mg/L" },
              { label: "BIS Certified", value: "✓" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{
                    background: "oklch(0.75 0.14 175)",
                    boxShadow: "0 0 8px oklch(0.75 0.14 175 / 0.7)",
                  }}
                />
                <span
                  className="text-sm font-body"
                  style={{ color: "rgba(255,255,255,0.50)" }}
                >
                  {label}
                </span>
                <span
                  className="text-sm font-semibold font-body"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave bottom divider */}
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
          style={{ height: 56, display: "block" }}
          aria-hidden="true"
        >
          <title>Wave divider bottom</title>
          <path
            d="M0 56 C400 0 1040 56 1440 20 L1440 56 Z"
            fill="oklch(0.98 0.006 230)"
            fillOpacity="0.50"
          />
        </svg>
      </div>
    </section>
  );
}
