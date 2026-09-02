import type { Metadata } from "next";
import { ToGoFlow } from "@/components/to-go-flow";

export const metadata: Metadata = {
  title: "Delivery & Pickup Estimate",
  description:
    "Choose a Bekker’s Catering To Go menu for delivery or pickup and build an itemized estimate.",
};

export default async function ToGoPage({
  searchParams,
}: {
  searchParams: Promise<{ orderType?: string | string[] }>;
}) {
  const params = await searchParams;
  const initialOrderType = params.orderType === "Pickup" ? "Pickup" : "Delivery";

  return <ToGoFlow initialOrderType={initialOrderType} />;
}
