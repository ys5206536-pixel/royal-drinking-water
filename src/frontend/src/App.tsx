import { Layout } from "@/components/Layout";
import { useCart } from "@/hooks/useCart";
import type { UseCartReturn } from "@/hooks/useCart";
import { createContext, useContext, useState } from "react";

// Cart context so pages can access cart without prop-drilling
const CartContext = createContext<UseCartReturn | null>(null);

export function useCartContext(): UseCartReturn {
  const ctx = useContext(CartContext);
  if (!ctx)
    throw new Error("useCartContext must be used inside CartContext.Provider");
  return ctx;
}

import { CartDrawer } from "@/components/CartDrawer";
import { CollectionSection } from "@/pages/CollectionSection";
// Lazy page imports to keep App.tsx thin
import { HeroSection } from "@/pages/HeroSection";
import { MineralsSection } from "@/pages/MineralsSection";
import { OrderSection } from "@/pages/OrderSection";
import { StorySection } from "@/pages/StorySection";

export default function App() {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartContext.Provider value={cart}>
      <Layout cart={cart} onCartOpen={() => setCartOpen(true)}>
        <HeroSection
          onOrderClick={() =>
            document
              .querySelector("#order")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        />
        <StorySection />
        <CollectionSection />
        <MineralsSection />
        <OrderSection />
      </Layout>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </CartContext.Provider>
  );
}
