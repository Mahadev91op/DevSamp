import { Suspense } from "react";
import Footer from "@/components/Footer";
import { getPricingPageData } from "@/lib/data";

// Modular Pricing Section Components
import PricingHero from "@/sections/pricing/PricingHero";
import PricingContext from "@/sections/pricing/PricingContext";
import PricingCatalog from "@/sections/pricing/PricingCatalog";
import PricingCalculator from "@/sections/pricing/PricingCalculator";
import PricingEngagementModels from "@/sections/pricing/PricingEngagementModels";
import PricingProductServiceBridge from "@/sections/pricing/PricingProductServiceBridge";
import PricingFAQ from "@/sections/pricing/PricingFAQ";
import PricingCustomCTA from "@/sections/pricing/PricingCustomCTA";
import PricingFinalCTA from "@/sections/pricing/PricingFinalCTA";

export const revalidate = 60;

export async function generateMetadata() {
  const { pricingPage } = await getPricingPageData();
  const title = pricingPage?.hero?.title
    ? `${pricingPage.hero.title} | DevSamp Commercial Architecture`
    : "Transparent Pricing & Commercial Blueprints | DevSamp";
  const description =
    pricingPage?.hero?.description ||
    "Transparent pricing for DevSamp software products, dedicated fullstack engineering pod retainers, and custom bespoke architectures with 100% intellectual property ownership.";

  return {
    title,
    description,
    alternates: {
      canonical: "https://devsamp.online/pricing",
    },
    openGraph: {
      title,
      description,
      url: "https://devsamp.online/pricing",
      siteName: "DevSamp Digital Ecosystem",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "DevSamp Commercial Pricing Architecture",
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

export default async function PricingPage() {
  const { 
    pricingPage, 
    plans, 
    calcSettings, 
    products, 
    services, 
    settings 
  } = await getPricingPageData();

  // JSON-LD structured schema for Commercial Pricing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "DevSamp Commercial Pricing & Software Blueprints",
    "url": "https://devsamp.online/pricing",
    "description": pricingPage?.hero?.description || "Transparent pricing for DevSamp software platforms and engineering retainers.",
    "provider": {
      "@type": "Organization",
      "name": "DevSamp",
      "url": "https://devsamp.online"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "DevSamp Commercial Blueprints",
      "itemListElement": (plans || []).map((plan, index) => ({
        "@type": "Offer",
        "name": plan.name,
        "description": plan.desc || plan.description,
        "price": plan.priceMonthly,
        "priceCurrency": plan.currency === "$" ? "USD" : (plan.currency || "USD"),
        "billingDuration": "P1M",
        "position": index + 1
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
      <PricingHero
        data={pricingPage?.hero}
        planCount={plans?.length || 0}
      />

      {/* 02. Commercial Framework & Context */}
      <PricingContext
        data={pricingPage?.structureIntro}
      />

      {/* 03. Core Database-Driven Pricing Cards & Filter System */}
      <PricingCatalog
        initialPlans={plans}
      />

      {/* 04. Interactive Scope Evaluator / Live Calculator */}
      <PricingCalculator
        initialSettings={calcSettings}
      />

      {/* 05. Commercial Engagement Models */}
      <PricingEngagementModels
        data={pricingPage?.engagementModels}
      />

      {/* 06. Product & Service Relationship Bridge */}
      <PricingProductServiceBridge
        products={products}
        services={services}
      />

      {/* 07. Frequently Answered Questions */}
      <PricingFAQ
        faqs={pricingPage?.faqs}
      />

      {/* 08. Bespoke Scoping CTA */}
      <PricingCustomCTA
        data={pricingPage?.customSolutionCta}
      />

      {/* 09. Final Conversion CTA */}
      <PricingFinalCTA
        data={pricingPage?.finalCta}
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
