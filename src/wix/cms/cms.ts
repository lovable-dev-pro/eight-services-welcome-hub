import { items as itemsModule } from "@wix/data";
import { wixModule, wixFetch } from "../sdk";
import {
  services as fallbackServices,
  featuredServices as fallbackFeaturedServices,
  type ServiceItem,
} from "../../data/services";

export interface SiteSettings {
  businessName: string;
  businessSubtitle: string;
  phone: string;
  phoneHref: string;
  email: string;
  whatsappLink: string;
  footerDescription: string;
  footerTagline: string;
  logo: string;
}

export interface PageContent {
  pageKey: "home" | "services" | "contact";
  heroEyebrow: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroDescription: string;
  heroImage?: string;
  introTagline?: string;
  introCaption?: string;
  featuredSectionKicker?: string;
  featuredSectionTitle?: string;
  featuredSectionDescription?: string;
  calloutTitle?: string;
  calloutDescription?: string;
  calloutButtonText?: string;
  footnote?: string;
}

export const defaultSiteSettings: SiteSettings = {
  businessName: "Charlie’s",
  businessSubtitle: "Mobile Vehicle Servicing",
  phone: "+44 7940 834897",
  phoneHref: "tel:+447940834897",
  email: "charlievehicleservicing@gmail.com",
  whatsappLink:
    "https://wa.me/447940834897?text=Hi%20Charlie%2C%20I%E2%80%99d%20like%20to%20ask%20about%20a%20vehicle%20service.",
  footerDescription:
    "Mobile vehicle servicing and repairs, with the honest, reliable, affordable care Charlie’s known for.",
  footerTagline: "Honest. Reliable. Affordable.",
  logo: "/charlie-mobile-vehicle-servicing-logo.png",
};

export const defaultPagesContent: Record<"home" | "services" | "contact", PageContent> = {
  home: {
    pageKey: "home",
    heroEyebrow: "Mobile vehicle servicing",
    heroTitle: "Vehicle care.",
    heroTitleAccent: "On your terms.",
    heroDescription:
      "From regular servicing to brakes, batteries and oil changes, Charlie brings practical vehicle care to you.",
    heroImage: "/charlie-workshop.jpg",
    introTagline: "Honest. Reliable. Affordable.",
    introCaption: "Mobile vehicle servicing by Charlie.",
    featuredSectionKicker: "What Charlie can help with",
    featuredSectionTitle: "Good care for the miles ahead.",
    featuredSectionDescription:
      "From an oil and filter change to routine servicing and brake replacements, explore practical care for your vehicle.",
    calloutTitle: "Let’s talk about your vehicle.",
    calloutDescription: "Call, email or message Charlie to ask about a service or request a quote.",
    calloutButtonText: "Get in touch",
    footnote: "",
  },
  services: {
    pageKey: "services",
    heroEyebrow: "Straightforward vehicle care",
    heroTitle: "Services",
    heroTitleAccent: "",
    heroDescription:
      "Explore Charlie’s vehicle servicing, maintenance and repair options. Need to check what is right for your vehicle? Get in touch to ask or request a quote.",
    heroImage: "",
    introTagline: "",
    introCaption: "",
    featuredSectionKicker: "",
    featuredSectionTitle: "",
    featuredSectionDescription: "",
    calloutTitle: "Have a question or need a quote?",
    calloutDescription: "Talk to Charlie about your vehicle and the service you have in mind.",
    calloutButtonText: "Request a quote",
    footnote:
      "Service intervals are recommendations. Major service items are subject to your vehicle manufacturer’s schedule, and some replacements apply only where relevant or due.",
  },
  contact: {
    pageKey: "contact",
    heroEyebrow: "Questions & quote requests",
    heroTitle: "Let’s talk about your vehicle.",
    heroTitleAccent: "",
    heroDescription:
      "Choose the way that works for you. Get in touch with Charlie to ask about a service or request a quote.",
    heroImage: "",
    introTagline: "",
    introCaption: "",
    featuredSectionKicker: "",
    featuredSectionTitle: "",
    featuredSectionDescription: "",
    calloutTitle: "",
    calloutDescription: "",
    calloutButtonText: "",
    footnote: "",
  },
};

const items = wixModule(itemsModule);

/**
 * Fetch collection items dynamically with fallback
 */
async function queryCollectionItems(collectionId: string): Promise<Record<string, unknown>[]> {
  try {
    const res = await items.query(collectionId).find();
    if (res.items && res.items.length > 0) {
      return res.items as Record<string, unknown>[];
    }
  } catch (err) {
    console.warn(`[CMS SDK] Error querying ${collectionId}, attempting REST fallback:`, err);
  }

  // Fallback to wixFetch
  try {
    const res = await wixFetch("/wix-data/v2/items/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dataCollectionId: collectionId }),
    });
    if (res.ok) {
      const json = await res.json();
      return (json?.dataItems ?? []).map((item: any) => item?.data ?? {});
    }
  } catch (err) {
    console.warn(`[CMS REST] Error querying ${collectionId}:`, err);
  }

  return [];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const items = await queryCollectionItems("SiteSettings");
    if (items.length > 0) {
      const data = items[0];
      return {
        businessName: (data.businessName as string) || defaultSiteSettings.businessName,
        businessSubtitle: (data.businessSubtitle as string) || defaultSiteSettings.businessSubtitle,
        phone: (data.phone as string) || defaultSiteSettings.phone,
        phoneHref: (data.phoneHref as string) || defaultSiteSettings.phoneHref,
        email: (data.email as string) || defaultSiteSettings.email,
        whatsappLink: (data.whatsappLink as string) || defaultSiteSettings.whatsappLink,
        footerDescription: (data.footerDescription as string) || defaultSiteSettings.footerDescription,
        footerTagline: (data.footerTagline as string) || defaultSiteSettings.footerTagline,
        logo: (data.logo as string) || defaultSiteSettings.logo,
      };
    }
  } catch (e) {
    console.warn("[CMS] Fallback to default SiteSettings:", e);
  }
  return defaultSiteSettings;
}

export async function getServices(): Promise<ServiceItem[]> {
  try {
    const items = await queryCollectionItems("Services");
    if (items.length > 0) {
      const sorted = [...items].sort(
        (a: any, b: any) => (Number(a.order) || 0) - (Number(b.order) || 0)
      );
      return sorted.map((d: any, idx: number) => {
        const fallback =
          fallbackServices.find((s) => s.id === d.slug) ||
          fallbackServices[idx] ||
          fallbackServices[0];

        let includedList: string[] = fallback.included;
        if (typeof d.included === "string" && d.included.trim().length > 0) {
          includedList = d.included
            .split("\n")
            .map((s: string) => s.trim())
            .filter(Boolean);
        }

        return {
          id: (d.slug as string) || fallback.id,
          title: (d.title as string) || fallback.title,
          description: (d.description as string) || fallback.description,
          interval:
            d.interval !== undefined && d.interval !== ""
              ? (d.interval as string)
              : fallback.interval,
          included: includedList,
          icon: (d.icon as ServiceItem["icon"]) || fallback.icon,
        };
      });
    }
  } catch (e) {
    console.warn("[CMS] Fallback to default Services:", e);
  }
  return fallbackServices;
}

export async function getFeaturedServices(): Promise<ServiceItem[]> {
  try {
    const items = await queryCollectionItems("Services");
    if (items.length > 0) {
      const all = await getServices();
      const featured = items.filter((d: any) => d.isFeatured === true);
      if (featured.length > 0) {
        const featuredSlugs = new Set(featured.map((d: any) => d.slug));
        const matching = all.filter((s) => featuredSlugs.has(s.id));
        if (matching.length > 0) return matching;
      }
    }
  } catch (e) {
    console.warn("[CMS] Fallback to default featuredServices:", e);
  }
  return fallbackFeaturedServices;
}

export async function getPageContent(
  pageKey: "home" | "services" | "contact"
): Promise<PageContent> {
  const fallback = defaultPagesContent[pageKey];
  try {
    const items = await queryCollectionItems("PageContent");
    const found = items.find((d: any) => d.pageKey === pageKey);
    if (found) {
      return {
        pageKey,
        heroEyebrow: (found.heroEyebrow as string) || fallback.heroEyebrow,
        heroTitle: (found.heroTitle as string) || fallback.heroTitle,
        heroTitleAccent:
          found.heroTitleAccent !== undefined
            ? (found.heroTitleAccent as string)
            : fallback.heroTitleAccent,
        heroDescription: (found.heroDescription as string) || fallback.heroDescription,
        heroImage: (found.heroImage as string) || fallback.heroImage,
        introTagline:
          found.introTagline !== undefined
            ? (found.introTagline as string)
            : fallback.introTagline,
        introCaption:
          found.introCaption !== undefined
            ? (found.introCaption as string)
            : fallback.introCaption,
        featuredSectionKicker:
          found.featuredSectionKicker !== undefined
            ? (found.featuredSectionKicker as string)
            : fallback.featuredSectionKicker,
        featuredSectionTitle:
          found.featuredSectionTitle !== undefined
            ? (found.featuredSectionTitle as string)
            : fallback.featuredSectionTitle,
        featuredSectionDescription:
          found.featuredSectionDescription !== undefined
            ? (found.featuredSectionDescription as string)
            : fallback.featuredSectionDescription,
        calloutTitle:
          found.calloutTitle !== undefined
            ? (found.calloutTitle as string)
            : fallback.calloutTitle,
        calloutDescription:
          found.calloutDescription !== undefined
            ? (found.calloutDescription as string)
            : fallback.calloutDescription,
        calloutButtonText:
          found.calloutButtonText !== undefined
            ? (found.calloutButtonText as string)
            : fallback.calloutButtonText,
        footnote:
          found.footnote !== undefined ? (found.footnote as string) : fallback.footnote,
      };
    }
  } catch (e) {
    console.warn(`[CMS] Fallback to default PageContent for ${pageKey}:`, e);
  }
  return fallback;
}
