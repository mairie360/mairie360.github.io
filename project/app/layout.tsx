import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Header from '@/components/Header';
import TopBanner from '@/components/TopBanner';
import Footer from '@/components/Footer';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MAIRIE360 – Solution numérique pour les mairies',
  description: 'MAIRIE360 est un socle numérique pour moderniser les mairies françaises. Une plateforme complète pour la gestion, la collaboration et la sécurité.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={montserrat.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
