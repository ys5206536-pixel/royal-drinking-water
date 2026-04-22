import { useCartContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Minus, Plus, ShoppingCart, Trash2, Waves } from "lucide-react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } =
    useCartContext();

  const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const handleOrder = () => {
    onClose();
    setTimeout(() => {
      document.querySelector("#order")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <SheetContent
        side="right"
        className="w-full sm:max-w-[420px] flex flex-col p-0 bg-card"
        data-ocid="cart.drawer"
      >
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border bg-card">
          <SheetTitle className="flex items-center gap-2.5 font-display text-xl text-foreground">
            <div className="w-8 h-8 rounded-full gradient-water flex items-center justify-center shadow-subtle">
              <ShoppingCart className="w-4 h-4 text-primary-foreground" />
            </div>
            Your Cart
            {itemCount > 0 && (
              <span className="ml-auto text-sm font-body font-normal text-muted-foreground">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          /* ── Empty State ── */
          <div
            className="flex-1 flex flex-col items-center justify-center text-center px-8 py-12"
            data-ocid="cart.empty_state"
          >
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full gradient-water opacity-20 absolute inset-0 blur-xl" />
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center relative">
                <Waves className="w-8 h-8 text-primary/40" />
              </div>
            </div>
            <p className="font-display font-semibold text-lg text-foreground mb-2">
              Your cart awaits
            </p>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed max-w-[220px]">
              Add a bottle of Bihar's finest mineral water to begin your
              journey.
            </p>
            <Button
              type="button"
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/5 transition-smooth"
              onClick={() => {
                onClose();
                setTimeout(
                  () =>
                    document
                      .querySelector("#collection")
                      ?.scrollIntoView({ behavior: "smooth" }),
                  300,
                );
              }}
              data-ocid="cart.browse_button"
            >
              Explore Collection
            </Button>
          </div>
        ) : (
          <>
            {/* ── Item List ── */}
            <div
              className="flex-1 overflow-y-auto px-6 py-4 space-y-3"
              data-ocid="cart.item_list"
            >
              {cartItems.map((item, index) => {
                const subtotal = item.product.price * item.quantity;
                return (
                  <div
                    key={item.product.id}
                    className="bg-background rounded-xl p-4 border border-border/60 shadow-subtle"
                    data-ocid={`cart.item.${index + 1}`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="w-11 h-11 rounded-lg gradient-water flex items-center justify-center shrink-0 shadow-subtle">
                        <ShoppingCart className="w-4 h-4 text-primary-foreground" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-semibold text-sm text-foreground truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.product.volume} &middot; ₹{item.product.price}{" "}
                          each
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition-smooth p-0.5 -mr-1 -mt-1"
                        aria-label="Remove from cart"
                        data-ocid={`cart.delete_button.${index + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Qty + Subtotal */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
                      {/* Qty controls */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-smooth disabled:opacity-40"
                          aria-label="Decrease quantity"
                          data-ocid={`cart.decrease.${index + 1}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-smooth"
                          aria-label="Increase quantity"
                          data-ocid={`cart.increase.${index + 1}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Per-item subtotal */}
                      <p className="text-sm font-semibold text-foreground">
                        ₹{subtotal}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Footer / Totals ── */}
            <div
              className="px-6 pb-6 pt-4 border-t border-border bg-card space-y-4"
              data-ocid="cart.footer"
            >
              {/* Summary rows */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Delivery</span>
                  <span className="text-accent font-medium">Free</span>
                </div>
              </div>

              <Separator className="bg-border/60" />

              {/* Grand Total */}
              <div className="flex justify-between items-center">
                <span className="font-display font-semibold text-base text-foreground">
                  Grand Total
                </span>
                <span className="font-display font-bold text-xl text-primary">
                  ₹{cartTotal}
                </span>
              </div>

              {/* CTAs */}
              <Button
                type="button"
                className="w-full gradient-water text-primary-foreground font-semibold shadow-elevated hover:shadow-lg hover:scale-[1.02] transition-smooth"
                onClick={handleOrder}
                data-ocid="cart.checkout_button"
              >
                Proceed to Order
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-muted-foreground hover:text-foreground transition-smooth"
                onClick={onClose}
                data-ocid="cart.close_button"
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
