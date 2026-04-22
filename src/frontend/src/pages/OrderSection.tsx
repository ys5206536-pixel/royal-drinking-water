import { useCartContext } from "@/App";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PRODUCTS } from "@/types/product";
import {
  CheckCircle,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useState } from "react";

// ─── Payment method definitions ──────────────────────────────────────────────
const PAYMENT_METHODS = [
  {
    id: "upi",
    label: "UPI",
    icon: (
      <svg viewBox="0 0 48 48" className="w-6 h-6" aria-hidden="true">
        <rect width="48" height="48" rx="8" fill="#6D1F7C" />
        <text
          x="50%"
          y="62%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          UPI
        </text>
      </svg>
    ),
  },
  {
    id: "googlepay",
    label: "Google Pay",
    icon: (
      <svg viewBox="0 0 48 48" className="w-6 h-6" aria-hidden="true">
        <rect width="48" height="48" rx="8" fill="#fff" />
        <text
          x="50%"
          y="62%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="11"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          <tspan fill="#4285F4">G</tspan>
          <tspan fill="#EA4335">P</tspan>
          <tspan fill="#FBBC05">a</tspan>
          <tspan fill="#34A853">y</tspan>
        </text>
      </svg>
    ),
  },
  {
    id: "phonepe",
    label: "PhonePe",
    icon: (
      <svg viewBox="0 0 48 48" className="w-6 h-6" aria-hidden="true">
        <rect width="48" height="48" rx="8" fill="#5F259F" />
        <text
          x="50%"
          y="62%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="10"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          Pe
        </text>
      </svg>
    ),
  },
  {
    id: "paytm",
    label: "Paytm",
    icon: (
      <svg viewBox="0 0 48 48" className="w-6 h-6" aria-hidden="true">
        <rect width="48" height="48" rx="8" fill="#00BAF2" />
        <text
          x="50%"
          y="62%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="10"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          Paytm
        </text>
      </svg>
    ),
  },
  {
    id: "netbanking",
    label: "Net Banking",
    icon: (
      <svg viewBox="0 0 48 48" className="w-6 h-6" aria-hidden="true">
        <rect width="48" height="48" rx="8" fill="#1A4F7A" />
        <text
          x="50%"
          y="62%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="9"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          Bank
        </text>
      </svg>
    ),
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    icon: (
      <svg viewBox="0 0 48 48" className="w-6 h-6" aria-hidden="true">
        <rect width="48" height="48" rx="8" fill="#2D7A4F" />
        <text
          x="50%"
          y="62%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="9"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          COD
        </text>
      </svg>
    ),
  },
];

// ─── Form state & validation ──────────────────────────────────────────────────
interface FormState {
  name: string;
  phone: string;
  address: string;
  pincode: string;
  instructions: string;
  payment: string;
}
interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
  pincode?: string;
}

function generateOrderId(): string {
  return `RDW-${Math.floor(100000 + Math.random() * 900000).toString()}`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function OrderSection() {
  const { cartItems, cartTotal, addToCart, removeFromCart, updateQuantity } =
    useCartContext();

  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    instructions: "",
    payment: "upi",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [orderId, setOrderId] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Full name is required";
    if (!form.phone.trim()) next.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s+/g, "")))
      next.phone = "Enter a valid 10-digit Indian mobile number";
    if (!form.address.trim()) next.address = "Delivery address is required";
    if (!form.pincode.trim()) next.pincode = "Pin code is required";
    else if (!/^\d{6}$/.test(form.pincode.trim()))
      next.pincode = "Enter a valid 6-digit pin code";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (validate()) {
      setOrderId(generateOrderId());
      setShowConfirmation(true);
    }
  };

  const selectedPaymentLabel =
    PAYMENT_METHODS.find((m) => m.id === form.payment)?.label ?? "UPI";

  return (
    <section
      id="order"
      className="bg-muted/30 py-20 md:py-28"
      data-ocid="order.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14" data-ocid="order.header">
          <p className="text-label text-accent mb-3">Checkout</p>
          <h2 className="text-section-title text-foreground mb-4">
            Place Your Order
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Review your cart, fill in your details, and we'll deliver fresh from
            Saharsa, Bihar directly to your door.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* ── Left column: Cart Summary ── */}
          <div className="lg:col-span-2 space-y-6">
            <h3
              className="font-display font-bold text-xl text-foreground"
              data-ocid="order.cart_heading"
            >
              Cart Summary
            </h3>

            {cartItems.length === 0 ? (
              /* Empty cart state */
              <div
                className="bg-card border border-border rounded-2xl p-8 text-center shadow-subtle"
                data-ocid="order.cart_empty_state"
              >
                <ShoppingCart className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-foreground font-semibold mb-1">
                  Your cart is empty
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore our collection and add your favourite bottles.
                </p>
                <a
                  href="#collection"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline transition-smooth"
                  data-ocid="order.explore_collection_link"
                >
                  Explore our collection →
                </a>
              </div>
            ) : (
              /* Populated cart */
              <div
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-subtle"
                data-ocid="order.cart_summary"
              >
                <div className="divide-y divide-border">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 p-4"
                      data-ocid={`order.cart_item.${index + 1}`}
                    >
                      {/* Product info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.product.volume} · ₹{item.product.price} each
                        </p>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-smooth"
                          aria-label={`Decrease quantity of ${item.product.name}`}
                          data-ocid={`order.cart_decrease.${index + 1}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-semibold text-sm tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => addToCart(item.product)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-smooth"
                          aria-label={`Increase quantity of ${item.product.name}`}
                          data-ocid={`order.cart_increase.${index + 1}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right shrink-0 min-w-[3.5rem]">
                        <p className="font-bold text-sm text-foreground tabular-nums">
                          ₹{item.product.price * item.quantity}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-destructive hover:opacity-70 transition-smooth ml-1 shrink-0"
                        aria-label={`Remove ${item.product.name} from cart`}
                        data-ocid={`order.cart_remove.${index + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Grand total */}
                <div className="bg-muted/40 px-4 py-3 flex justify-between items-center border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Grand Total
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {cartItems.reduce((s, i) => s + i.quantity, 0)} item
                      {cartItems.reduce((s, i) => s + i.quantity, 0) !== 1
                        ? "s"
                        : ""}{" "}
                      · Free delivery
                    </p>
                  </div>
                  <p
                    className="text-2xl font-bold font-display text-foreground tabular-nums"
                    data-ocid="order.grand_total"
                  >
                    ₹{cartTotal}
                  </p>
                </div>
              </div>
            )}

            {/* Quick add products */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">
                Add More Products
              </p>
              <div className="space-y-2" data-ocid="order.quick_add_list">
                {PRODUCTS.map((product, index) => {
                  const inCart = cartItems.find(
                    (i) => i.product.id === product.id,
                  );
                  return (
                    <div
                      key={product.id}
                      className="bg-card border border-border rounded-xl px-3 py-2.5 flex items-center gap-3 shadow-subtle"
                      data-ocid={`order.product_row.${index + 1}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.volume} · ₹{product.price}
                        </p>
                      </div>
                      {inCart ? (
                        <Badge
                          variant="outline"
                          className="text-accent border-accent/40 text-xs shrink-0"
                        >
                          ×{inCart.quantity} in cart
                        </Badge>
                      ) : null}
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => addToCart(product)}
                        className="shrink-0 h-7 text-xs px-2.5"
                        data-ocid={`order.quick_add.${index + 1}`}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right column: Checkout Form ── */}
          <div className="lg:col-span-3">
            <h3
              className="font-display font-bold text-xl text-foreground mb-5"
              data-ocid="order.form_heading"
            >
              Delivery Details
            </h3>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-card border border-border rounded-2xl p-6 shadow-subtle space-y-5"
              data-ocid="order.form"
            >
              {/* Full Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Yuvraj Singh Rajput"
                  className={
                    errors.name
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                  data-ocid="order.name_input"
                />
                {errors.name && (
                  <p
                    className="text-xs text-destructive mt-0.5"
                    data-ocid="order.name_field_error"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <Label htmlFor="phone">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className={
                    errors.phone
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                  data-ocid="order.phone_input"
                />
                {errors.phone && (
                  <p
                    className="text-xs text-destructive mt-0.5"
                    data-ocid="order.phone_field_error"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Delivery Address */}
              <div className="space-y-1.5">
                <Label htmlFor="address">
                  Delivery Address <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="House/Flat no., Street, Locality, City"
                  rows={3}
                  className={
                    errors.address
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                  data-ocid="order.address_input"
                />
                {errors.address && (
                  <p
                    className="text-xs text-destructive mt-0.5"
                    data-ocid="order.address_field_error"
                  >
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Pin Code */}
              <div className="space-y-1.5">
                <Label htmlFor="pincode">
                  Pin Code <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="pincode"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pin code (e.g. 852201)"
                  maxLength={6}
                  className={
                    errors.pincode
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                  data-ocid="order.pincode_input"
                />
                {errors.pincode && (
                  <p
                    className="text-xs text-destructive mt-0.5"
                    data-ocid="order.pincode_field_error"
                  >
                    {errors.pincode}
                  </p>
                )}
              </div>

              {/* Delivery Instructions (optional) */}
              <div className="space-y-1.5">
                <Label htmlFor="instructions">
                  Delivery Instructions{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    (optional)
                  </span>
                </Label>
                <Textarea
                  id="instructions"
                  name="instructions"
                  value={form.instructions}
                  onChange={handleChange}
                  placeholder="e.g. Leave at gate, call before delivery…"
                  rows={2}
                  data-ocid="order.instructions_input"
                />
              </div>

              {/* Payment Method */}
              <div className="space-y-2.5">
                <Label>
                  Payment Method <span className="text-destructive">*</span>
                </Label>
                <div
                  className="grid grid-cols-3 gap-2.5"
                  data-ocid="order.payment_methods"
                >
                  {PAYMENT_METHODS.map((method) => {
                    const selected = form.payment === method.id;
                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() =>
                          setForm((prev) => ({ ...prev, payment: method.id }))
                        }
                        className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-xs font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                          selected
                            ? "border-accent bg-accent/10 text-accent shadow-subtle"
                            : "border-border bg-background text-muted-foreground hover:border-accent/40 hover:bg-muted/40"
                        }`}
                        aria-pressed={selected}
                        data-ocid={`order.payment_${method.id}`}
                      >
                        {method.icon}
                        <span className="text-center leading-tight">
                          {method.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Empty cart warning */}
              {cartItems.length === 0 && (
                <div
                  className="rounded-lg bg-muted/60 border border-border px-4 py-3 text-sm text-muted-foreground flex items-center gap-2"
                  data-ocid="order.empty_cart_warning"
                >
                  <ShoppingCart className="w-4 h-4 shrink-0" />
                  <span>
                    Your cart is empty.{" "}
                    <a
                      href="#collection"
                      className="font-semibold text-accent hover:underline"
                      data-ocid="order.goto_collection_link"
                    >
                      Explore our collection →
                    </a>
                  </span>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full text-base py-5 transition-smooth hover:scale-[1.01]"
                disabled={cartItems.length === 0}
                data-ocid="order.confirm_button"
              >
                Confirm Order
                {cartItems.length > 0 && (
                  <span className="ml-2 font-bold">· ₹{cartTotal}</span>
                )}
              </Button>

              {/* Trust badges */}
              <div
                className="flex flex-wrap gap-2 justify-center"
                data-ocid="order.trust_badges"
              >
                {[
                  "FSSAI Certified",
                  "BIS Approved",
                  "Free Delivery",
                  "100% Natural",
                ].map((badge) => (
                  <Badge
                    key={badge}
                    variant="outline"
                    className="text-xs border-border text-muted-foreground"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ── Order Confirmation Modal ── */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent
          className="max-w-md w-full rounded-2xl"
          data-ocid="order.confirmation_dialog"
        >
          <div className="text-center pt-2 pb-1">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9 text-accent" />
            </div>
            <p className="text-label text-accent mb-1">Order Confirmed</p>
            <h3 className="font-display font-bold text-2xl text-foreground mb-1">
              Thank You, {form.name.split(" ")[0]}!
            </h3>
            <p className="text-muted-foreground text-sm mb-5">
              We'll contact you at{" "}
              <span className="font-semibold text-foreground">
                {form.phone}
              </span>{" "}
              to confirm delivery.
            </p>

            {/* Order ID */}
            <div className="bg-muted/40 rounded-xl px-4 py-3 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-accent" />
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                  Order ID
                </span>
              </div>
              <span
                className="font-mono font-bold text-foreground text-sm"
                data-ocid="order.order_id"
              >
                {orderId}
              </span>
            </div>

            {/* Items ordered */}
            <div className="bg-card border border-border rounded-xl overflow-hidden mb-4 text-left">
              <div className="px-4 py-2 bg-muted/30 border-b border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                  Items Ordered
                </p>
              </div>
              <div className="divide-y divide-border">
                {cartItems.map((item, index) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between items-center px-4 py-2.5 text-sm"
                    data-ocid={`order.confirmation_item.${index + 1}`}
                  >
                    <span className="text-foreground">
                      {item.product.name}{" "}
                      <span className="text-muted-foreground">
                        ×{item.quantity}
                      </span>
                    </span>
                    <span className="font-semibold text-foreground tabular-nums">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center px-4 py-3 bg-muted/40 border-t border-border">
                <span className="font-bold text-foreground">Total</span>
                <span
                  className="font-bold text-lg text-foreground tabular-nums"
                  data-ocid="order.confirmation_total"
                >
                  ₹{cartTotal}
                </span>
              </div>
            </div>

            {/* Delivery & payment info */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-muted/30 rounded-xl p-3 text-left">
                <p className="text-xs text-muted-foreground mb-0.5">
                  Expected Delivery
                </p>
                <p className="text-sm font-semibold text-foreground">
                  1–2 Business Days
                </p>
              </div>
              <div className="bg-muted/30 rounded-xl p-3 text-left">
                <p className="text-xs text-muted-foreground mb-0.5">Payment</p>
                <p className="text-sm font-semibold text-foreground">
                  {selectedPaymentLabel}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setShowConfirmation(false)}
              data-ocid="order.confirmation_close_button"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
