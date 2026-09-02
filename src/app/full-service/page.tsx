import type { Metadata } from "next";
import { FullServiceFlow } from "@/components/full-service-flow";

export const metadata: Metadata = {
  title: "Full Service Catering Estimate",
  description:
    "Build a clear Full Service catering estimate for a San Diego wedding, party or company gathering.",
};

export default function FullServicePage() {
  return <FullServiceFlow />;
}
