import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  onOrderClick?: () => void;
}

// Decorative water-wave SVG divider at bottom
function WaveDivider() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0] pointer-events-none">
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-20"
        aria-hidden="true"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill="oklch(var(--background))"
        />
      </svg>
    </div>
  );
}

// Animated water drop SVG ornament
function WaterDropOrnament({
  className,
  style,
}: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 60 80"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M30 0 C30 0 5 35 5 52 C5 67 16.2 78 30 78 C43.8 78 55 67 55 52 C55 35 30 0 30 0Z"
        fill="currentColor"
        fillOpacity="0.22"
      />
      <path
        d="M22 48 C20 42 24 36 28 34"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        strokeOpacity="0.5"
      />
    </svg>
  );
}

// Floating gold shimmer particles
function GoldParticles() {
  const particles = [
    { top: "12%", left: "8%", size: 6, delay: "0s", opacity: 0.35 },
    { top: "25%", left: "18%", size: 4, delay: "0.8s", opacity: 0.25 },
    { top: "60%", left: "5%", size: 8, delay: "1.4s", opacity: 0.2 },
    { top: "75%", left: "22%", size: 5, delay: "0.3s", opacity: 0.3 },
    { top: "15%", right: "10%", size: 7, delay: "1.1s", opacity: 0.28 },
    { top: "40%", right: "6%", size: 5, delay: "0.5s", opacity: 0.22 },
    { top: "70%", right: "14%", size: 9, delay: "1.7s", opacity: 0.18 },
    { top: "85%", right: "25%", size: 4, delay: "0.2s", opacity: 0.3 },
  ] as const;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={`particle-${p.top}-${p.delay}`}
          className="absolute rounded-full animate-pulse"
          style={{
            top: p.top,
            left: "left" in p ? p.left : undefined,
            right: "right" in p ? p.right : undefined,
            width: p.size,
            height: p.size,
            background: `oklch(0.85 0.12 85 / ${p.opacity})`,
            animationDelay: p.delay,
            animationDuration: "3s",
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection({ onOrderClick: _onOrderClick }: HeroSectionProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  function scrollTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const baseTransition = "opacity 0.9s ease, transform 0.9s ease";

  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, oklch(0.22 0.09 250) 0%, oklch(0.17 0.07 240) 38%, oklch(0.14 0.06 230) 65%, oklch(0.18 0.1 200) 100%)",
      }}
      aria-label="Hero - Royal Drinking Water"
    >
      {/* Ambient gold glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 60%, oklch(0.75 0.14 85 / 0.22) 0%, transparent 70%)",
        }}
      />

      <GoldParticles />

      {/* Glow ring behind bottle */}
      <div
        className="absolute right-0 md:right-[8%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.15 190 / 0.25) 0%, transparent 70%)",
        }}
      />

      {/* Two-column grid */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 py-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-screen">
        {/* Left — Text */}
        <div
          className="flex flex-col gap-7 text-center md:text-left order-2 md:order-1"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(36px)",
            transition: baseTransition,
          }}
        >
          {/* Brand eyebrow */}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <WaterDropOrnament
              className="w-5 h-7 shrink-0"
              style={{ color: "oklch(0.72 0.14 170)" }}
            />
            <span
              className="text-label tracking-widest"
              style={{ color: "oklch(0.72 0.14 170)" }}
            >
              Royal Drinking Water
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-hero leading-[1.05]"
            style={{ color: "oklch(0.97 0.01 230)" }}
          >
            Mineral Purity
            <br />
            <span
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.72 0.14 170), oklch(0.82 0.12 85))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              from the Heart
            </span>
            <br />
            of Bihar
          </h1>

          {/* Sub-copy */}
          <p
            className="text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0 font-body"
            style={{ color: "oklch(0.78 0.012 230)" }}
          >
            Sourced from the ancient aquifers of the Gangetic plains, Royal
            Drinking Water captures the pristine mineral richness of
            Bihar&apos;s deep geology — naturally filtered, perfectly balanced,
            exquisitely pure.
          </p>

          {/* CTA row */}
          <div
            className="flex flex-wrap gap-4 justify-center md:justify-start"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
            }}
          >
            <Button
              type="button"
              data-ocid="hero.explore_collection_button"
              size="lg"
              className="font-semibold px-8 py-6 text-base rounded-full shadow-elevated transition-smooth hover:scale-[1.04] focus-visible:ring-2 focus-visible:ring-offset-2 border-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.52 0.17 185), oklch(0.44 0.18 200))",
                color: "oklch(0.98 0.005 200)",
              }}
              onClick={() => scrollTo("#collection")}
            >
              Explore Collection
            </Button>

            <Button
              type="button"
              data-ocid="hero.our_story_button"
              size="lg"
              variant="outline"
              className="font-semibold px-8 py-6 text-base rounded-full transition-smooth hover:scale-[1.04] focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                borderColor: "oklch(0.65 0.12 170 / 0.6)",
                color: "oklch(0.88 0.012 230)",
                background: "oklch(0.97 0.005 230 / 0.06)",
              }}
              onClick={() => scrollTo("#story")}
            >
              Our Story
            </Button>
          </div>

          {/* Trust badges */}
          <div
            className="flex flex-wrap gap-3 justify-center md:justify-start pt-1"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 1.2s ease 0.6s",
            }}
          >
            {["ISI Certified", "BIS Approved", "100% Natural", "pH 7.4"].map(
              (badge) => (
                <span
                  key={badge}
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: "oklch(0.97 0.01 230 / 0.1)",
                    color: "oklch(0.82 0.12 85)",
                    border: "1px solid oklch(0.82 0.12 85 / 0.3)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {badge}
                </span>
              ),
            )}
          </div>
        </div>

        {/* Right — Bottle */}
        <div
          className="flex justify-center items-center order-1 md:order-2 relative"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0) scale(1)"
              : "translateY(24px) scale(0.96)",
            transition: "opacity 1.1s ease 0.15s, transform 1.1s ease 0.15s",
          }}
        >
          {/* Ambient glow disc */}
          <div
            className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle, oklch(0.55 0.16 185 / 0.35) 0%, transparent 65%)",
            }}
          />
          <img
            src="/assets/generated/hero-royal-bottle.dim_800x900.png"
            alt="Royal Drinking Water — premium glass bottle"
            className="relative z-10 h-[360px] md:h-[500px] w-auto object-contain"
            style={{
              filter:
                "drop-shadow(0 32px 48px oklch(0.20 0.10 230 / 0.65)) drop-shadow(0 8px 16px oklch(0.45 0.15 185 / 0.45))",
              animation: "heroFloat 6s ease-in-out infinite",
            }}
          />
          {/* Floating accent drops */}
          <WaterDropOrnament
            className="absolute top-8 right-4 md:right-0 w-8 h-11 animate-pulse"
            style={{
              color: "oklch(0.72 0.14 170)",
              opacity: 0.5,
              animationDelay: "0s",
            }}
          />
          <WaterDropOrnament
            className="absolute bottom-12 left-4 w-5 h-7 animate-pulse"
            style={{
              color: "oklch(0.72 0.14 170)",
              opacity: 0.35,
              animationDelay: "1.5s",
            }}
          />
        </div>
      </div>

      {/* Scroll-down chevron */}
      <button
        type="button"
        data-ocid="hero.scroll_down_button"
        aria-label="Scroll to content"
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 transition-smooth hover:opacity-75 focus-visible:ring-2 rounded focus-visible:ring-offset-2"
        onClick={() => scrollTo("#story")}
        style={{ color: "oklch(0.65 0.08 230)" }}
      >
        <span
          className="text-xs tracking-widest uppercase font-body"
          style={{ letterSpacing: "0.14em" }}
        >
          Discover
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>

      <WaveDivider />

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-bounce, .animate-pulse { animation: none; }
          img[alt*="Royal"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
