import type { Metadata } from 'next';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AUREL — The House',
  description: 'Scent · Metal · System. Invisible premium connectivity engineered as atmosphere.',
  openGraph: {
    title: 'AUREL — The House',
    description: 'Scent · Metal · System. Invisible premium connectivity engineered as atmosphere.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-[#090807] text-[#f3ece3] antialiased font-sans selection:bg-[#c9854a]/30 selection:text-[#f3ece3]">
        {children}
      </body>
    </html>
  );
}
