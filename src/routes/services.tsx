import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/components/site/services-page";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Vehicle Servicing & Repairs | Charlie’s Mobile Vehicle Servicing" },
      { name: "description", content: "Explore oil changes, interim, full and major services, gearbox oil, brake fluid, batteries and brake repairs from Charlie." },
      { property: "og:title", content: "Vehicle Services | Charlie’s Mobile Vehicle Servicing" },
      { property: "og:description", content: "Straightforward mobile maintenance, servicing and repairs for your vehicle." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});