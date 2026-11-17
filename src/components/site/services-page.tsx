import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { vehicleServices } from "@/lib/services";
import { SiteFrame } from "@/components/site/site-frame";

function ServiceCard({ service, index }: { service: (typeof vehicleServices)[number]; index: number }) {
  const Icon = service.icon;
  const quoteUrl = `https://wa.me/447940834897?text=${encodeURIComponent(`Hi Charlie, I’d like to ask about a ${service.title.toLowerCase()} for my vehicle.`)}`;

  return (
    <article className="service-card" id={service.id}>
      <div className="service-card-top">
        <span className="service-number">0{index + 1}</span>
        <span className="service-icon"><Icon aria-hidden="true" /></span>
      </div>
      <h2>{service.title}</h2>
      <p className="service-description">{service.description}</p>
      {service.interval ? <span className="service-interval">{service.interval}</span> : null}
      {service.included?.length ? (
        <ul className="service-includes">
          {service.included.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}
        </ul>
      ) : null}
      <a className="service-card-link" href={quoteUrl}>
        Ask about this service <ArrowRight aria-hidden="true" />
      </a>
    </article>
  );
}

export function ServicesPage() {
  return (
    <SiteFrame>
      <section className="page-heading">
        <div className="site-container">
          <div className="section-kicker">Straightforward vehicle care</div>
          <h1 className="section-title">Services</h1>
          <p>Explore Charlie’s vehicle servicing, maintenance and repair options. Need to check what is right for your vehicle? Get in touch to ask or request a quote.</p>
        </div>
      </section>
      <section className="site-container service-list-section">
        <div className="service-list">
          {vehicleServices.map((service, index) => <ServiceCard key={service.id} service={service} index={index} />)}
        </div>
        <p className="service-footnote">Service intervals are recommendations. Major service items are subject to your vehicle manufacturer’s schedule, and some replacements apply only where relevant or due.</p>
      </section>
      <section className="service-callout">
        <div>
          <h2>Have a question or need a quote?</h2>
          <p>Talk to Charlie about your vehicle and the service you have in mind.</p>
        </div>
        <Button asChild variant="brand" className="brand-button callout-button">
          <a href="https://wa.me/447940834897?text=Hi%20Charlie%2C%20I%E2%80%99d%20like%20to%20request%20a%20quote.">
            Request a quote <ArrowRight aria-hidden="true" />
          </a>
        </Button>
      </section>
    </SiteFrame>
  );
}