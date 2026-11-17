import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessContact, SiteFrame } from "@/components/site/site-frame";

const options = [
  {
    id: "phone",
    label: "Call Charlie",
    value: businessContact.phoneLabel,
    href: businessContact.phoneHref,
    action: "Call now",
    Icon: Phone,
  },
  {
    id: "email",
    label: "Email Charlie",
    value: businessContact.emailLabel,
    href: businessContact.emailHref,
    action: "Send an email",
    Icon: Mail,
  },
  {
    id: "whatsapp",
    label: "WhatsApp Charlie",
    value: businessContact.phoneLabel,
    href: businessContact.whatsappHref,
    action: "Open WhatsApp",
    Icon: MessageCircle,
    external: true,
  },
];

export function ContactPage() {
  return (
    <SiteFrame>
      <section className="contact-page site-container">
        <div className="contact-intro">
          <div>
            <div className="section-kicker">Questions & quote requests</div>
            <h1 className="section-title">Let’s talk about your vehicle.</h1>
            <p>Choose the way that works for you. Get in touch with Charlie to ask about a service or request a quote.</p>
          </div>
          <Button asChild variant="brand" className="brand-button">
            <a href="https://wa.me/447940834897?text=Hi%20Charlie%2C%20I%E2%80%99d%20like%20to%20ask%20about%20a%20vehicle%20service.">
              Message on WhatsApp <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>

        <div className="contact-grid">
          {options.map(({ id, label, value, href, action, Icon, external }) => (
            <a className="contact-option" key={id} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
              <span className="contact-option-icon"><Icon aria-hidden="true" /></span>
              <span className="contact-option-label">{label}</span>
              <strong>{value}</strong>
              <span className="contact-action">{action} <ArrowUpRight aria-hidden="true" /></span>
            </a>
          ))}
        </div>

        <aside className="contact-footnote">
          <h2>Requesting a quote?</h2>
          <p>Call, email or message Charlie on WhatsApp with a few details about your vehicle and the service you need.</p>
          <p>For an email, you can include your name, vehicle details, the service you’re interested in and a convenient way to reach you.</p>
        </aside>
      </section>
    </SiteFrame>
  );
}