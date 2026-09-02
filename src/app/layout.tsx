import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bekker’s Catering | San Diego Catering Since 1958",
    template: "%s | Bekker’s Catering",
  },
  description:
    "Build an honest estimate for Bekker’s Catering delivery, pickup or full-service catering in San Diego.",
  icons: {
    icon: {
      url: "https://www.bekkerscatering.com/templates/rt_kraken/custom/images/logo/bekkersLogo-sq-onWhtTable.jpg",
      type: "image/jpeg",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f0e7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${cormorant.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
