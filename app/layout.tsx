import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import WebVitals from "@/components/WebVitals";
import { siteConfig } from "@/config/site";
import { seoConfig } from "@/config/seo";

export const metadata: Metadata = {
  title: seoConfig.title,
  description: seoConfig.description,
  metadataBase: new URL(seoConfig.siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: seoConfig.openGraph,
  robots: seoConfig.robots,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.language} dir={siteConfig.direction}>
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <GoogleAnalytics />
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
