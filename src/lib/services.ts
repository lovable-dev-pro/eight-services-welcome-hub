import {
  BatteryCharging,
  CircleGauge,
  Disc3,
  Droplets,
  Fuel,
  Gauge,
  Settings2,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type VehicleService = {
  id: string;
  title: string;
  description: string;
  interval?: string;
  included?: string[];
  icon: LucideIcon;
};

export const vehicleServices: VehicleService[] = [
  {
    id: "oil-filter-change",
    title: "Oil & Filter Change",
    description: "Engine oil and oil filter replacement using the correct manufacturer-recommended oil specification for your vehicle.",
    included: ["Manufacturer-specified oil", "Oil filter replacement"],
    icon: Droplets,
  },
  {
    id: "interim-service",
    title: "Interim Service",
    description: "Routine maintenance to help keep your vehicle running as it should between full services.",
    interval: "Recommended every 6,000 miles or 6 months, whichever comes first.",
    included: ["Engine oil & filter", "Essential fluid checks & top-ups", "General vehicle health check"],
    icon: Gauge,
  },
  {
    id: "full-service",
    title: "Full Service",
    description: "A thorough scheduled service, including an engine air filter replacement.",
    interval: "Recommended every 12,000 miles or 12 months, whichever comes first.",
    included: ["Engine oil & filter", "Engine air filter", "Essential fluid checks & top-ups", "General vehicle health check"],
    icon: CircleGauge,
  },
  {
    id: "major-service",
    title: "Major Service",
    description: "Comprehensive scheduled maintenance tailored to your manufacturer’s service schedule.",
    interval: "Recommended every 24,000 miles or 24 months, subject to manufacturer schedules.",
    included: ["Engine oil & filters", "Cabin and fuel filters where applicable", "Spark plugs where applicable", "Brake fluid when due", "Comprehensive vehicle health check"],
    icon: Wrench,
  },
  {
    id: "gearbox-oil-change",
    title: "Gearbox Oil Change",
    description: "Gearbox oil replacement using the correct manufacturer-recommended specification, with filter replacement where applicable.",
    included: ["Correct gearbox oil specification", "Filter replacement where applicable"],
    icon: Settings2,
  },
  {
    id: "brake-fluid-change",
    title: "Brake Fluid Change",
    description: "Brake fluid replacement using the correct specification for your vehicle to help maintain reliable braking performance.",
    included: ["Vehicle-specified brake fluid", "Replacement when due"],
    icon: Droplets,
  },
  {
    id: "battery-replacement",
    title: "Battery Replacement",
    description: "Supply and professional fitting of a suitable replacement vehicle battery.",
    included: ["Suitable replacement battery", "Professional fitting"],
    icon: BatteryCharging,
  },
  {
    id: "brake-repairs",
    title: "Brake Repairs & Replacement",
    description: "Supply and fitting of replacement brake pads and discs to help maintain safe, reliable braking performance.",
    included: ["Replacement brake pads", "Replacement brake discs"],
    icon: Disc3,
  },
];

export const featuredServices = [vehicleServices[0], vehicleServices[1], vehicleServices[7]].filter(
  (service): service is VehicleService => service !== undefined,
);