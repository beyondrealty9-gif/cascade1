import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { generateProjectMetadata, generateRealEstateSchema } from "@/lib/seo";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = generateProjectMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdSchema = generateRealEstateSchema();

  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable} scroll-smooth dark`}>
      <head>
        {/* Preconnect to Google Fonts CDN for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload hero poster — this IS the LCP element on mobile */}
        <link
          rel="preload"
          as="image"
          href="/images/swimming-pool.jpg"
          fetchPriority="high"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="bg-background text-gray-100 font-body antialiased min-h-screen">
        {children}
      </body>
    </html>
  );

}
