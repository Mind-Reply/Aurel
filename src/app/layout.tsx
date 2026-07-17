import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "AUREL — Invisible Premium Connectivity",
  description:
    "We do not sell routers. We design confidence. Premium wireless environments for luxury homes, boutique hospitality, and executive spaces.",
  keywords:
    "premium wifi, luxury connectivity, Wi-Fi 7, seamless wireless, private connectivity design",
  openGraph: {
    title: "AUREL — Invisible Premium Connectivity",
    description: "Reliability before hype. Design before clutter. Private by default.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-aurel-black text-aurel-pearl antialiased">
        {children}
        <Script
          src="/cs/mr-cs-widget.js"
          strategy="afterInteractive"
          data-brand="aurel"
          data-title="AUREL Concierge · 24/7"
          data-accent="#d8b76a"
        />
      </body>
    </html>
  );
}
