import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "./fonts/Manrope.ttf",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mairie360.fr"),
  title: "Mairie360 — Vos équipes, mieux connectées",
  description:
    "Tableau de bord, projets, calendrier, messagerie et formations : découvrez Mairie360, la plateforme municipale en développement.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mairie360 — Vos équipes, mieux connectées",
    description: "Un espace commun pour les équipes de votre collectivité.",
    url: "/",
    siteName: "Mairie360",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/mairie-collectif.webp",
        width: 1536,
        height: 1024,
        alt: "Mairie360, le numérique au service du collectif",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
