import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Droplets, Menu, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
}

const NAV_LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "Collection", href: "#collection" },
  { label: "Minerals", href: "#minerals" },
  { label: "Order", href: "#order" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ cartCount, onCartOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-subtle border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group"
            aria-label="Royal Drinking Water - scroll to top"
            data-ocid="navbar.logo"
          >
            <div className="w-8 h-8 rounded-full gradient-water flex items-center justify-center shadow-subtle">
              <Droplets className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="text-left">
              <span className="block text-xs text-label text-muted-foreground leading-none">
                Royal
              </span>
              <span className="block font-display font-bold text-foreground text-sm leading-tight">
                Drinking Water
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth rounded-md hover:bg-muted/60"
                data-ocid={`navbar.${link.label.toLowerCase().replace(" ", "_")}_link`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="relative hidden sm:flex gap-2 border-border hover:border-primary/40 hover:bg-primary/5"
              onClick={onCartOpen}
              data-ocid="navbar.cart_button"
              aria-label={`Shopping cart, ${cartCount} items`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm">Cart</span>
              {cartCount > 0 && (
                <Badge
                  className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground"
                  data-ocid="navbar.cart_badge"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* Mobile cart icon */}
            <button
              type="button"
              className="relative sm:hidden p-2 text-foreground"
              onClick={onCartOpen}
              aria-label={`Cart, ${cartCount} items`}
              data-ocid="navbar.cart_icon_mobile"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 text-xs bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              data-ocid="navbar.mobile_menu_toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav
            className="md:hidden border-t border-border bg-card/95 backdrop-blur-md pb-4"
            aria-label="Mobile navigation"
            data-ocid="navbar.mobile_menu"
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth"
                data-ocid={`navbar.mobile_${link.label.toLowerCase().replace(" ", "_")}_link`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
