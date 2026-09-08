import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const image = {
    url: "/images/mairie-collectif.webp",
    width: 1536,
    height: 1024,
    alt: "Mairie360, le numérique au service du collectif",
  };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Mairie360",
      locale: "fr_FR",
      type: "website",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
