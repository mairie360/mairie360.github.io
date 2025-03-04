import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mairie360",
  description: "Mairie360 is an all-in-one digital solution designed to simplify and modernize the management of French town halls.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-title" content="Mairie360" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex-row gap-6 px-6 py-6`}
      >
        <Navbar title="Mairie360" />
        <main className="py-4 flex-row gap-4">{children}</main>
      </body>
    </html> 
  );
}