import { Navbar } from "@/components/Navbar";
import type { UseCartReturn } from "@/hooks/useCart";
import { Clock, Droplets, MapPin, Phone } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  cart: UseCartReturn;
  onCartOpen: () => void;
}

const quickLinks = [
  { label: "Our Story", href: "#story" },
  { label: "Collection", href: "#collection" },
  { label: "Order Now", href: "#order" },
];

export function Layout({ children, cart, onCartOpen }: LayoutProps) {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar cartCount={cart.cartCount} onCartOpen={onCartOpen} />

      <main className="flex-1">{children}</main>

      {/* ── Footer ── deep indigo, hero-matching background */}
      <footer
        id="contact"
        className="bg-primary text-primary-foreground"
        data-ocid="footer.section"
      >
        {/* Decorative wave divider */}
        <div className="w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block"
            aria-hidden="true"
          >
            <path
              d="M0 56V28C240 0 480 56 720 28C960 0 1200 56 1440 28V56H0Z"
              className="fill-background"
            />
          </svg>
        </div>

        {/* Main footer grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {/* Column 1 — Brand */}
            <div data-ocid="footer.brand">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/15 border border-primary-foreground/30 flex items-center justify-center shadow-elevated">
                  <Droplets className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="block text-[10px] tracking-[0.2em] uppercase text-primary-foreground/60 font-body">
                    Royal
                  </span>
                  <span className="block font-display font-bold text-primary-foreground text-lg leading-tight">
                    Drinking Water
                  </span>
                </div>
              </div>
              <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-[260px]">
                Mineral purity from the heart of the Gangetic plains. Crafted by
                nature in the depths of Bihar's rich geology — exquisite, fresh,
                and pristine since 2018.
              </p>
            </div>

            {/* Column 2 — Contact */}
            <div data-ocid="footer.contact">
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-primary-foreground/60 font-body mb-5">
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+918541804841"
                    className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth group"
                    data-ocid="footer.phone_link"
                  >
                    <span className="w-8 h-8 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-smooth shrink-0">
                      <Phone className="w-3.5 h-3.5 text-primary-foreground" />
                    </span>
                    +91 85418 04841
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-sm text-primary-foreground/80">
                    <span className="w-8 h-8 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-primary-foreground" />
                    </span>
                    <span className="leading-relaxed">
                      Saharsa, Bihar 852201
                      <br />
                      India
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-3 text-sm text-primary-foreground/80">
                    <span className="w-8 h-8 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5 text-primary-foreground" />
                    </span>
                    <span>
                      8:00 AM – 9:00 PM IST
                      <br />
                      <span className="text-primary-foreground/50 text-xs">
                        Mon – Sun
                      </span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 3 — Quick Links */}
            <div data-ocid="footer.quick_links">
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-primary-foreground/60 font-body mb-5">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.href)}
                      className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-smooth group"
                      data-ocid={`footer.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                    >
                      <span className="w-1 h-1 rounded-full bg-primary-foreground/40 group-hover:bg-primary-foreground group-hover:w-2 transition-all duration-200" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-primary-foreground/50 text-center sm:text-left">
              © {year} Royal Drinking Water. Founded by{" "}
              <span className="text-primary-foreground/70">
                Yuvraj Singh Rajput
              </span>
              , Saharsa, Bihar.
            </p>
            <p className="text-xs text-primary-foreground/50">
              Built with love using{" "}
              <a
                href={utm}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth underline-offset-2 hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
