export interface Product {
  id: string;
  name: string;
  volume: string;
  price: number;
  variant: "azure" | "teal" | "silver" | "gold";
  tagline: string;
  description: string;
  minerals: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "azure-blue-500ml",
    name: "Azure Blue",
    volume: "500ml",
    price: 15,
    variant: "azure",
    tagline: "Pure Clarity",
    description:
      "Crisp and light, perfect for everyday hydration. Sourced from the pristine aquifers of Saharsa.",
    minerals: ["Calcium 16.2 mg/L", "Magnesium 7.8 mg/L"],
  },
  {
    id: "aqua-teal-750ml",
    name: "Aqua Teal",
    volume: "750ml",
    price: 15,
    variant: "teal",
    tagline: "Nature's Balance",
    description:
      "Balanced mineral profile, inspired by Bihar's Gangetic plains. Ideal for active lifestyles.",
    minerals: ["Potassium 1.4 mg/L", "Bicarbonate 82 mg/L"],
  },
  {
    id: "pearl-silver-1l",
    name: "Pearl Silver",
    volume: "1L",
    price: 25,
    variant: "silver",
    tagline: "Refined Purity",
    description:
      "Refined and silky-smooth, this 1-litre bottle embodies daily luxury. pH 7.4 — naturally balanced.",
    minerals: ["pH 7.4", "TDS 142 mg/L"],
  },
  {
    id: "royal-gold-1-5l",
    name: "Royal Gold Luxury",
    volume: "1.5L",
    price: 25,
    variant: "gold",
    tagline: "The Pinnacle of Purity",
    description:
      "Our signature expression — mineral-rich, full-bodied hydration for discerning taste. The Royal experience.",
    minerals: ["Calcium 16.2 mg/L", "pH 7.4", "TDS 142 mg/L"],
  },
];
