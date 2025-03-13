import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        <main>{children}</main>
      </body>
    </html> 
  );
}