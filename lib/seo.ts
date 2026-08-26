import type { Metadata } from "next";
import cascadeContent from "@/content/cascade.json";

export function generateProjectMetadata(): Metadata {
  const { name, developer, tagline, subtitle, location, priceStarting } = cascadeContent.project;

  const title = `${name} by ${developer} | 2, 3 & 4 BHK Riverside Homes at ${location}`;
  const description = `${subtitle}. ${tagline} Premium homes starting at ${priceStarting} in Trisulia, Cuttack. Direct river views, 60% open green space, and luxury amenities.`;

  return {
    metadataBase: new URL("https://codenamecascade.com"),
    title,
    description,
    keywords: [
      "Codename Cascade",
      "Motwani Constructions",
      "Riverside flats Cuttack",
      "Trisulia luxury apartments",
      "2 BHK Trisulia Cuttack",
      "3 BHK Trisulia Cuttack",
      "4 BHK Trisulia Cuttack",
      "Mahanadi view homes",
      "Real estate Cuttack Bhubaneswar",
      "Flats in Cuttack starting 69 lakhs",
    ],
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
    openGraph: {
      title,
      description,
      url: "https://codenamecascade.com",
      siteName: name,
      images: [
        {
          url: "/images/road-elevation-dusk.webp",
          width: 1200,
          height: 630,
          alt: `${name} Riverside Elevation at Trisulia Cuttack`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/road-elevation-dusk.webp"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateRealEstateSchema() {
  const { name, developer, location, priceStarting, address } = cascadeContent.project;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://codenamecascade.com/#organization",
        "name": developer,
        "url": "https://motwaniconstructions.com",
        "logo": "https://codenamecascade.com/images/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": cascadeContent.project.phone,
          "contactType": "sales",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi", "Odia"],
        },
      },
      {
        "@type": "RealEstateListing",
        "@id": "https://codenamecascade.com/#listing",
        "name": name,
        "description": cascadeContent.project.subtitle,
        "url": "https://codenamecascade.com",
        "image": "https://codenamecascade.com/images/road-elevation-dusk.webp",
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "INR",
          "lowPrice": "6900000",
          "offerCount": "150",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
        },
      },
      {
        "@type": "SingleFamilyResidence",
        "@id": "https://codenamecascade.com/#residence",
        "name": `${name} Luxury Riverside Residences`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": address,
          "addressLocality": "Cuttack",
          "addressRegion": "Odisha",
          "postalCode": "754005",
          "addressCountry": "IN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 20.4431,
          "longitude": 85.8718,
        },
        "numberOfRooms": "3",
        "amenityFeature": cascadeContent.amenities.categories.flatMap((cat) =>
          cat.items.map((item) => ({
            "@type": "LocationFeatureSpecification",
            "name": item.name,
            "value": true,
          }))
        ),
      },
    ],
  };
}
