import { Suspense } from "react";
import Footer from "@/components/Footer";
import { getServicesPageData } from "@/lib/data";

// Modular Section Components
import ServicesHero from "@/sections/services/ServicesHero";
import ServicesPhilosophy from "@/sections/services/ServicesPhilosophy";
import ServicesFeatured from "@/sections/services/ServicesFeatured";
import ServicesCatalog from "@/sections/services/ServicesCatalog";
import ServicesCapabilities from "@/sections/services/ServicesCapabilities";
import ServicesDeliveryApproach from "@/sections/services/ServicesDeliveryApproach";
import ServicesEcosystemBridge from "@/sections/services/ServicesEcosystemBridge";
import ServicesTechLayer from "@/sections/services/ServicesTechLayer";
import ServicesIndustries from "@/sections/services/ServicesIndustries";
import ServicesEngagementModels from "@/sections/services/ServicesEngagementModels";
import ServicesCustomCTA from "@/sections/services/ServicesCustomCTA";
import ServicesFAQ from "@/sections/services/ServicesFAQ";
import ServicesFinalCTA from "@/sections/services/ServicesFinalCTA";

export const revalidate = 60;

export async function generateMetadata() {
  const { servicesPage } = await getServicesPageData();
  const title = servicesPage?.hero?.title
    ? `${servicesPage.hero.title} | DevSamp Engineering Services`
    : "Bespoke Full-Stack Engineering & Digital Product Solutions | DevSamp";
  const description =
    servicesPage?.hero?.description ||
    "Dedicated engineering pods building custom Next.js platforms, cloud edge architectures, and high-concurrency database systems with zero architectural debt.";

  return {
    title,
    description,
    alternates: {
      canonical: "https://devsamp.online/services",
    },
    openGraph: {
      title,
      description,
      url: "https://devsamp.online/services",
      siteName: "DevSamp Digital Ecosystem",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "DevSamp Engineering Services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function ServicesPage() {
  const { servicesPage, services, products, industries, settings } = await getServicesPageData();

  // JSON-LD structured schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "DevSamp Engineering & Software Development Services",
    "provider": {
      "@type": "Organization",
      "name": "DevSamp",
      "url": "https://devsamp.online"
    },
    "description": servicesPage?.hero?.description || "Bespoke full-stack engineering, custom SaaS development, database optimization, and cloud architecture.",
    "serviceType": "Software Engineering",
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "DevSamp Services Catalogue",
      "itemListElement": (services || []).map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title || service.name,
          "description": service.desc || service.description,
          "category": service.category || "Engineering"
        },
        "position": index + 1
      }))
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-transparent text-slate-900 selection:bg-indigo-500/20">
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01. Hero Section */}
      <ServicesHero
        data={servicesPage?.hero}
        serviceCount={services?.length || 0}
      />

      {/* 02. Services Philosophy */}
      <ServicesPhilosophy
        data={servicesPage?.philosophy}
      />

      {/* 03. Featured Flagship Services (if any featured) */}
      <ServicesFeatured
        services={services}
      />

      {/* 04. Complete Filterable / Searchable Service Catalog */}
      <ServicesCatalog
        initialServices={services}
      />

      {/* 05. Technical Capabilities Overview */}
      <ServicesCapabilities />

      {/* 06. 7-Step Delivery Process */}
      <ServicesDeliveryApproach
        data={servicesPage?.deliveryApproach}
      />

      {/* 07. Service → Product → Ecosystem Bridge */}
      <ServicesEcosystemBridge
        products={products}
      />

      {/* 08. Applied Tech Stack & Frameworks */}
      <ServicesTechLayer />

      {/* 09. Industry Specializations */}
      <ServicesIndustries
        industries={industries}
      />

      {/* 10. Commercial Engagement Models */}
      <ServicesEngagementModels
        data={servicesPage?.engagementModels}
      />

      {/* 11. Custom Architectural Scoping CTA */}
      <ServicesCustomCTA
        data={servicesPage?.customSolutionCta}
      />

      {/* 12. Frequently Asked Questions */}
      <ServicesFAQ
        faqs={servicesPage?.faqs}
      />

      {/* 13. Final Conversion CTA */}
      <ServicesFinalCTA
        data={servicesPage?.finalCta}
      />

      {/* Global Unified Footer */}
      <Footer
        products={products}
        services={services}
        siteSettings={settings}
      />

    </main>
  );
}
