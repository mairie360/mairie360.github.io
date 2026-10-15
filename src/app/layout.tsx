import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AudienceAnalytics } from "@/components/audience-analytics";
import { getAnalyticsScriptUrl } from "@/lib/analytics";

const manrope = localFont({
  src: "./fonts/Manrope.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mairie360.fr"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={manrope.variable}>
      <body>{children}<AudienceAnalytics scriptUrl={getAnalyticsScriptUrl()} /></body>
    </html>
  );
}
