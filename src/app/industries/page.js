import { Suspense } from "react";
import Footer from "@/components/Footer";
import { getIndustriesPageData } from "@/lib/data";

// Modular Section Components
import IndustryHero from "@/sections/industries/IndustryHero";
import IndustryEcosystemIntro from "@/sections/industries/IndustryEcosystemIntro";
import IndustryFeatured from "@/sections/industries/IndustryFeatured";
import IndustryCatalog from "@/sections/industries/IndustryCatalog";
import IndustryProblemAreas from "@/sections/industries/IndustryProblemAreas";
import IndustrySolutionFramework from "@/sections/industries/IndustrySolutionFramework";
import IndustryServicesBridge from "@/sections/industries/IndustryServicesBridge";
import IndustryProductsBridge from "@/sections/industries/IndustryProductsBridge";
import IndustryCaseStudies from "@/sections/industries/IndustryCaseStudies";
import IndustryTechCapabilities from "@/sections/industries/IndustryTechCapabilities";
import IndustryDeliveryApproach from "@/sections/industries/IndustryDeliveryApproach";
import IndustryCustomCTA from "@/sections/industries/IndustryCustomCTA";
import IndustryFAQ from "@/sections/industries/IndustryFAQ";
import IndustryFinalCTA from "@/sections/industries/IndustryFinalCTA";

export const revalidate = 60;

export async function generateMetadata() {
  const { industriesPage } = await getIndustriesPageData();
  const title = industriesPage?.hero?.title
    ? `${industriesPage.hero.title} | DevSamp Industries`
    : "Technology Solutions Shaped Around Real Industry Needs | DevSamp";
  const description =
    industriesPage?.hero?.description ||
    "Adapting proprietary software products, bespoke engineering pods, and high-concurrency cloud architectures to the operational demands of specialized industries.";

  return {
    title,
    description,
    alternates: {
      canonical: "https://devsamp.online/industries",
    },
    openGraph: {
      title,
      description,
      url: "https://devsamp.online/industries",
      siteName: "DevSamp Digital Ecosystem",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "DevSamp Industry Solutions",
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

export default async function IndustriesPage() {
  const { industriesPage, industries, products, services, caseStudies, settings } = await getIndustriesPageData();

  // JSON-LD structured schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "DevSamp Industry Solutions & Vertical Platforms",
    "url": "https://devsamp.online/industries",
    "description": industriesPage?.hero?.description || "Vertical industry software platforms, bespoke engineering pods, and domain data meshes.",
    "publisher": {
      "@type": "Organization",
      "name": "DevSamp",
      "url": "https://devsamp.online"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "DevSamp Industry Solutions",
      "itemListElement": (industries || []).map((ind, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "name": ind.name,
          "description": ind.summary || ind.description,
          "category": ind.category || "Enterprise"
        }
      }))
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-transparent text-slate-900 selection:bg-blue-500/20">
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01. Hero Section */}
      <IndustryHero
        data={industriesPage?.hero}
        industryCount={industries?.length || 0}
      />

      {/* 02. Ecosystem Formula Intro */}
      <IndustryEcosystemIntro
        data={industriesPage?.ecosystemIntro}
      />

      {/* 03. Featured Flagship Industries (if any featured) */}
      <IndustryFeatured
        industries={industries}
      />

      {/* 04. Complete Filterable / Searchable Industry Catalog */}
      <IndustryCatalog
        initialIndustries={industries}
      />

      {/* 05. Problem → Solution Matrix */}
      <IndustryProblemAreas />

      {/* 06. 7-Stage Domain Adaptation Lifecycle */}
      <IndustrySolutionFramework
        data={industriesPage?.solutionFramework}
      />

      {/* 07. Engineering Services by Industry */}
      <IndustryServicesBridge
        services={services}
      />

      {/* 08. Software Products by Industry */}
      <IndustryProductsBridge
        products={products}
      />

      {/* 09. Real Case Studies by Industry (Conditional) */}
      <IndustryCaseStudies
        caseStudies={caseStudies}
      />

      {/* 10. Technology Capabilities & Compliance */}
      <IndustryTechCapabilities />

      {/* 11. Domain Delivery Approach */}
      <IndustryDeliveryApproach
        data={industriesPage?.deliveryApproach}
      />

      {/* 12. Custom Sector Scoping CTA */}
      <IndustryCustomCTA
        data={industriesPage?.customSolutionCta}
      />

      {/* 13. Frequently Asked Questions */}
      <IndustryFAQ
        faqs={industriesPage?.faqs}
      />

      {/* 14. Final Conversion CTA */}
      <IndustryFinalCTA
        data={industriesPage?.finalCta}
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
