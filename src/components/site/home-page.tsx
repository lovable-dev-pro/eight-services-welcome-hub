import { ArrowDown, ArrowRight, BadgeCheck, Clock3, MapPin, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import workshopImage from "@/assets/charlie-workshop.jpg";
import { featuredServices } from "@/lib/services";
import { SiteFrame } from "@/components/site/site-frame";

export function HomePage() {
  return (
    <SiteFrame>
      <section className="hero">
        <img className="hero-image" src={workshopImage} alt="Charlie’s mobile mechanic servicing a car in a professional garage" width={1600} height={1008} fetchPriority="high" />
        <div className="hero-content">
          <div className="eyebrow"><span className="eyebrow-dot" /> Mobile vehicle servicing</div>
          <h1 className="hero-title">Vehicle care.<span className="hero-title-accent">On your terms.</span></h1>
          <p className="hero-copy">From regular servicing to brakes, batteries and oil changes, Charlie brings practical vehicle care to you.</p>
          <div className="hero-actions">
            <Button asChild variant="brand" className="brand-button">
              <a href="https://wa.me/447940834897?text=Hi%20Charlie%2C%20I%E2%80%99d%20like%20to%20ask%20about%20a%20vehicle%20service.">
                Request a quote <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="onDark" className="brand-button">
              <a href="tel:+447940834897">Call +44 7940 834897</a>
            </Button>
          </div>
          <div className="hero-bottomline" aria-label="Our approach">
            <span><BadgeCheck aria-hidden="true" /> Honest advice</span>
            <span><Wrench aria-hidden="true" /> Reliable servicing</span>
            <span><Clock3 aria-hidden="true" /> Convenient mobile care</span>
          </div>
        </div>
      </section>

      <section className="intro-band" aria-label="Charlie’s approach">
        <div className="site-container intro-inner">
          <div>
            <div className="intro-tagline">Honest. Reliable. Affordable.</div>
            <div className="intro-caption">Mobile vehicle servicing by Charlie.</div>
          </div>
          <div className="intro-items">
            <span><Wrench aria-hidden="true" /> Vehicle servicing</span>
            <span><BadgeCheck aria-hidden="true" /> Brake repairs</span>
            <span><MapPin aria-hidden="true" /> Mobile mechanic</span>
          </div>
        </div>
      </section>

      <section className="site-container section-block">
        <div className="section-heading">
          <div>
            <div className="section-kicker">What Charlie can help with</div>
            <h2 className="section-title">Good care for the miles ahead.</h2>
          </div>
          <p className="section-note">From an oil and filter change to routine servicing and brake replacements, explore practical care for your vehicle.</p>
        </div>
        <div className="feature-grid">
          {featuredServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <article className="feature-item" key={service.id}>
                <div className="feature-index">0{index + 1}</div>
                <div className="feature-icon"><Icon aria-hidden="true" /></div>
                <h3 className="feature-title">{service.title}</h3>
                <p className="feature-description">{service.description}</p>
              </article>
            );
          })}
        </div>
        <div className="section-action">
          <Button asChild variant="outline" className="brand-button">
            <a href="/services">Explore all services <ArrowRight aria-hidden="true" /></a>
          </Button>
        </div>
      </section>

      <section className="service-callout">
        <div>
          <h2>Let’s talk about your vehicle.</h2>
          <p>Call, email or message Charlie to ask about a service or request a quote.</p>
        </div>
        <Button asChild variant="brand" className="brand-button callout-button">
          <a href="https://wa.me/447940834897?text=Hi%20Charlie%2C%20I%E2%80%99d%20like%20to%20request%20a%20vehicle%20service%20quote.">
            Get in touch <ArrowRight aria-hidden="true" />
          </a>
        </Button>
      </section>

      <div className="site-container" aria-hidden="true" style={{ height: 1 }}>
        <a href="#top" className="sr-only"><ArrowDown /></a>
      </div>
    </SiteFrame>
  );
}