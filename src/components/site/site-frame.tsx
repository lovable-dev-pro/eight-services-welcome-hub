import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/charlie-mobile-vehicle-servicing-logo.png.asset.json";

const phoneHref = "tel:+447940834897";
const phoneLabel = "+44 7940 834897";
const emailHref = "mailto:charlievehicleservicing@gmail.com";
const emailLabel = "charlievehicleservicing@gmail.com";
const whatsappHref = "https://wa.me/447940834897";

const navigation = [
  { label: "Home", to: "/" as const },
  { label: "Services", to: "/services" as const },
  { label: "Contact", to: "/contact" as const },
];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link to="/" className={`brand-lockup${footer ? " footer-brand" : ""}`} aria-label="Charlie’s Mobile Vehicle Servicing home">
      <img className="brand-mark" src={logo.url} alt="Charlie’s Mobile Vehicle Servicing badge" width={66} height={66} />
      <span className="brand-wordmark">
        <span className="brand-title">Charlie’s</span>
        <span className="brand-subtitle">Mobile Vehicle Servicing</span>
      </span>
    </Link>
  );
}

export function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <>
      <header className="site-header">
        <div className="site-container header-inner">
          <Brand />
          <nav className="main-nav" aria-label="Main navigation">
            {navigation.map(({ label, to }) => (
              <Link key={to} to={to} aria-current={pathname === to ? "page" : undefined}>
                {label}
              </Link>
            ))}
          </nav>
          <Button asChild variant="brand" className="brand-button header-call">
            <a href={phoneHref} aria-label={`Call Charlie on ${phoneLabel}`}>
              <Phone aria-hidden="true" /> Call Charlie
            </a>
          </Button>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="site-container footer-main">
          <div>
            <Brand footer />
            <p className="footer-copy">Mobile vehicle servicing and repairs, with the honest, reliable, affordable care Charlie’s known for.</p>
          </div>
          <div>
            <h2 className="footer-heading">Get in touch</h2>
            <div className="footer-links">
              <a href={phoneHref}>{phoneLabel}</a>
              <a href={emailHref}>{emailLabel}</a>
              <a href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
          <div className="footer-cta">
            <h2 className="footer-heading">Need a quote?</h2>
            <p>Tell Charlie what your vehicle needs.</p>
            <Button asChild variant="onDark" className="brand-button">
              <Link to="/contact">
                Contact Charlie <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="site-container footer-bottom">
          <span>© {new Date().getFullYear()} Charlie’s Mobile Vehicle Servicing</span>
          <a href={emailHref}>Honest. Reliable. Affordable.</a>
        </div>
      </footer>
    </>
  );
}

export const businessContact = {
  phoneHref,
  phoneLabel,
  emailHref,
  emailLabel,
  whatsappHref,
};