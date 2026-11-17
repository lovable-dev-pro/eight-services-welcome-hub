import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/site/contact-page";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Quotes | Charlie’s Mobile Vehicle Servicing" },
      { name: "description", content: "Contact Charlie for a mobile vehicle servicing enquiry or quote by phone, email or WhatsApp." },
      { property: "og:title", content: "Contact Charlie | Mobile Vehicle Servicing" },
      { property: "og:description", content: "Call, email or WhatsApp Charlie about your vehicle service or quote." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});