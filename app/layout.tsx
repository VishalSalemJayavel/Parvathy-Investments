import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';
import { ScrollProgress } from '@/components/ScrollProgress';
import { BackToTop } from '@/components/BackToTop';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://parvathyinvestments.com'),
  title: {
    default: 'Parvathy Investment Company',
    template: '%s | Parvathy Investment Company',
  },
  description:
    'Parvathy Investment Company — a disciplined investment platform focused on responsible capital deployment and long-term value creation across diversified asset classes.',
  keywords: ['investment', 'EB-5', 'real estate', 'private equity', 'capital deployment', 'Parvathy'],
  openGraph: {
    type: 'website',
    siteName: 'Parvathy Investment Company',
    title: 'Parvathy Investment Company',
    description: 'Responsible Capital Deployment And Disciplined Investing For Long-Term Value Creation.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-body bg-white text-text-dark antialiased">
        <SmoothScroll />
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
