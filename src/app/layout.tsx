import type { Metadata } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Mono, VT323 } from "next/font/google";
import "./globals.css";
import { AudienceAnalytics } from "@/components/audience-analytics";
import { getAnalyticsScriptUrl } from "@/lib/analytics";

const manrope = localFont({
  src: "./fonts/Manrope.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Only used by the 1993 Minitel screen of the timeline.
const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mairie360.fr"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${manrope.variable} ${plexMono.variable} ${vt323.variable}`}>
      <body>{children}<AudienceAnalytics scriptUrl={getAnalyticsScriptUrl()} /></body>
    </html>
  );
}
