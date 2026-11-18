import { ArrowUpRight, Mail, MessageCircle, Phone, Send } from "lucide-react";
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

        <section className="contact-request" aria-labelledby="contact-request-title">
          <div className="contact-request-heading">
            <div className="section-kicker">Quote enquiry</div>
            <h2 id="contact-request-title">Tell Charlie what your vehicle needs.</h2>
            <p>Share your details and Charlie can get back to you about your vehicle.</p>
          </div>
          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
            <div className="contact-form-field">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" maxLength={100} required />
            </div>
            <div className="contact-form-field">
              <label htmlFor="vehicle-registration">Vehicle registration</label>
              <input id="vehicle-registration" name="vehicleRegistration" type="text" autoComplete="off" maxLength={20} required />
            </div>
            <div className="contact-form-field contact-form-message">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows={5} maxLength={1500} required />
            </div>
            <div className="contact-form-submit">
              <p id="contact-form-status" role="status">Wix needs to be connected before requests can be saved.</p>
              <Button type="submit" variant="brand" className="brand-button" disabled aria-describedby="contact-form-status">
                <Send aria-hidden="true" /> Send enquiry
              </Button>
            </div>
          </form>
        </section>
      </section>
    </SiteFrame>
  );
}