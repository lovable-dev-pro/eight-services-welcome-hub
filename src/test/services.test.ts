import { describe, expect, it } from "vitest";
import { vehicleServices } from "@/lib/services";

describe("Charlie’s published service list", () => {
  it("includes all eight services supplied by the client", () => {
    expect(vehicleServices.map((service) => service.title)).toEqual([
      "Oil & Filter Change",
      "Interim Service",
      "Full Service",
      "Major Service",
      "Gearbox Oil Change",
      "Brake Fluid Change",
      "Battery Replacement",
      "Brake Repairs & Replacement",
    ]);
  });

  it("preserves the interim service recommendation", () => {
    expect(vehicleServices.find((service) => service.id === "interim-service")?.interval).toBe(
      "Recommended every 6,000 miles or 6 months, whichever comes first.",
    );
  });

  it("preserves the full service recommendation", () => {
    expect(vehicleServices.find((service) => service.id === "full-service")?.interval).toBe(
      "Recommended every 12,000 miles or 12 months, whichever comes first.",
    );
  });

  it("preserves the major service interval and manufacturer-schedule caveat", () => {
    expect(vehicleServices.find((service) => service.id === "major-service")?.interval).toBe(
      "Recommended every 24,000 miles or 24 months, subject to manufacturer schedules.",
    );
  });
});