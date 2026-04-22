import { useCartContext } from "@/App";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";
import { PRODUCTS } from "@/types/product";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { useState } from "react";

/* ─── Per-variant colour tokens ──────────────────────────────────────────── */
const VARIANT_CONFIG: Record<
  Product["variant"],
  {
    borderClass: string;
    gradientClass: string;
    badgeBg: string;
    badgeText: string;
    bottleColor: string;
    bottleAccent: string;
    shimmer: string;
    label: string;
  }
> = {
  azure: {
    borderClass: "border-[oklch(0.55_0.18_240)]",
    gradientClass: "from-[oklch(0.28_0.14_240)] to-[oklch(0.65_0.16_235)]",
    badgeBg: "bg-[oklch(0.92_0.06_240)]",
    badgeText: "text-[oklch(0.28_0.14_240)]",
    bottleColor: "oklch(0.55_0.18_240)",
    bottleAccent: "oklch(0.78_0.12_230)",
    shimmer: "from-[oklch(0.55_0.18_240/0.25)] to-[oklch(0.75_0.10_235/0.08)]",
    label: "Pure Clarity",
  },
  teal: {
    borderClass: "border-[oklch(0.55_0.16_175)]",
    gradientClass: "from-[oklch(0.25_0.12_175)] to-[oklch(0.6_0.15_170)]",
    badgeBg: "bg-[oklch(0.92_0.06_175)]",
    badgeText: "text-[oklch(0.25_0.12_175)]",
    bottleColor: "oklch(0.52_0.16_175)",
    bottleAccent: "oklch(0.74_0.10_170)",
    shimmer: "from-[oklch(0.52_0.16_175/0.25)] to-[oklch(0.72_0.08_170/0.08)]",
    label: "Nature's Balance",
  },
  silver: {
    borderClass: "border-[oklch(0.65_0.01_240)]",
    gradientClass: "from-[oklch(0.38_0.01_240)] to-[oklch(0.72_0.01_235)]",
    badgeBg: "bg-[oklch(0.92_0.005_240)]",
    badgeText: "text-[oklch(0.32_0.01_240)]",
    bottleColor: "oklch(0.62_0.01_240)",
    bottleAccent: "oklch(0.82_0.005_230)",
    shimmer: "from-[oklch(0.62_0.01_240/0.25)] to-[oklch(0.82_0.005_230/0.08)]",
    label: "Refined Purity",
  },
  gold: {
    borderClass: "border-[oklch(0.70_0.14_80)]",
    gradientClass: "from-[oklch(0.35_0.10_75)] to-[oklch(0.72_0.14_85)]",
    badgeBg: "bg-[oklch(0.95_0.06_80)]",
    badgeText: "text-[oklch(0.35_0.10_75)]",
    bottleColor: "oklch(0.68_0.14_80)",
    bottleAccent: "oklch(0.86_0.10_88)",
    shimmer: "from-[oklch(0.68_0.14_80/0.25)] to-[oklch(0.86_0.10_88/0.08)]",
    label: "The Pinnacle",
  },
};

/* ─── Water bottle SVG silhouette ─────────────────────────────────────────── */
function WaterBottleSVG({
  color,
  accent,
  className = "",
}: {
  color: string;
  accent: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 60 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Bottle cap */}
      <rect x="22" y="2" width="16" height="10" rx="3" fill={color} />
      {/* Bottle neck */}
      <path
        d="M22 12 Q20 18 18 24 L18 28 L42 28 L42 24 Q40 18 38 12 Z"
        fill={color}
      />
      {/* Bottle body */}
      <path
        d="M16 28 Q10 32 10 40 L10 96 Q10 108 20 112 L40 112 Q50 108 50 96 L50 40 Q50 32 44 28 Z"
        fill={color}
        opacity="0.9"
      />
      {/* Highlight streak */}
      <path
        d="M20 36 Q22 44 21 60 Q20 72 22 86"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Label area */}
      <rect
        x="16"
        y="50"
        width="28"
        height="32"
        rx="4"
        fill={accent}
        opacity="0.18"
      />
      {/* Crown/logo mark */}
      <path
        d="M26 62 L28 58 L30 61 L32 57 L34 62 L34 66 L26 66 Z"
        fill={accent}
        opacity="0.7"
      />
      {/* Water ripple at base */}
      <ellipse cx="30" cy="108" rx="12" ry="3" fill={accent} opacity="0.3" />
    </svg>
  );
}

/* ─── Product card ────────────────────────────────────────────────────────── */
function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const { addToCart } = useCartContext();
  const [added, setAdded] = useState(false);
  const cfg = VARIANT_CONFIG[product.variant];

  function handleAdd() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div
      className={`
        relative bg-card rounded-2xl border-2 ${cfg.borderClass}
        shadow-subtle overflow-hidden
        hover:shadow-elevated hover:-translate-y-2
        transition-all duration-300 ease-out
        flex flex-col group
      `}
      data-ocid={`collection.product.${index + 1}`}
    >
      {/* Gradient banner with bottle illustration */}
      <div
        className={`relative h-52 bg-gradient-to-br ${cfg.gradientClass} flex items-end justify-center overflow-hidden`}
      >
        {/* Shimmer wash */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${cfg.shimmer} opacity-80`}
        />

        {/* Floating bubble accents */}
        <div className="absolute top-5 left-5 w-6 h-6 rounded-full border border-white/20 opacity-40" />
        <div className="absolute top-14 left-10 w-3 h-3 rounded-full border border-white/20 opacity-30" />
        <div className="absolute top-8 right-8 w-4 h-4 rounded-full border border-white/20 opacity-35" />

        {/* Water bottle */}
        <WaterBottleSVG
          color={cfg.bottleColor}
          accent={cfg.bottleAccent}
          className="relative z-10 w-16 h-32 mb-2 drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
        />

        {/* Volume badge */}
        <Badge
          className={`absolute top-3 right-3 text-xs font-semibold border-0 ${cfg.badgeBg} ${cfg.badgeText}`}
        >
          {product.volume}
        </Badge>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tagline label */}
        <p className={`text-label text-xs mb-1 ${cfg.badgeText} opacity-80`}>
          {cfg.label}
        </p>

        {/* Name */}
        <h3 className="font-display font-bold text-lg leading-snug text-foreground">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-1 line-clamp-3">
          {product.description}
        </p>

        {/* Mineral chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.minerals.map((m) => (
            <span
              key={m}
              className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/60"
            >
              {m}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-4 border-t border-border/50" />

        {/* Price + CTA */}
        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="font-display font-bold text-2xl text-foreground">
              ₹{product.price}
            </span>
            <span className="text-xs text-muted-foreground ml-1">/ bottle</span>
          </div>

          <Button
            type="button"
            size="sm"
            variant={added ? "secondary" : "default"}
            onClick={handleAdd}
            className={`gap-1.5 min-w-[92px] transition-all duration-200 ${
              added ? "pointer-events-none" : "hover:scale-105"
            }`}
            data-ocid={`collection.add_to_cart.${index + 1}`}
          >
            {added ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Collection section ──────────────────────────────────────────────────── */
export function CollectionSection() {
  return (
    <section
      id="collection"
      className="bg-muted/30 py-20 md:py-28"
      data-ocid="collection.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14" data-ocid="collection.header">
          <p className="text-label text-accent mb-3">Our Collection</p>
          <h2 className="text-section-title text-foreground mb-4">
            Four Expressions of
            <br />
            <span className="font-display italic text-primary">
              Natural Purity
            </span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Each variant is crafted to match a moment — from everyday hydration
            to the Royal experience. Choose the purity that fits your day.
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          data-ocid="collection.product_list"
        >
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
