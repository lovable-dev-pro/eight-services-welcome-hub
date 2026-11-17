import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/home-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Charlie’s Mobile Vehicle Servicing | Mobile Mechanic" },
      { name: "description", content: "Honest, reliable and affordable mobile vehicle servicing, maintenance and repairs from Charlie’s Mobile Vehicle Servicing." },
      { property: "og:title", content: "Charlie’s Mobile Vehicle Servicing | Mobile Mechanic" },
      { property: "og:description", content: "Vehicle servicing and repairs from Charlie, with convenient mobile care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});
