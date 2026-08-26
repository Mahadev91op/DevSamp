import Footer from "@/components/Footer";
import { getWhyDevSampData } from "@/lib/data";

// 19 Modular Section Components
import WhyHero from "@/sections/why/WhyHero";
import WhyDifferentiation from "@/sections/why/WhyDifferentiation";
import WhyEcosystemAdvantage from "@/sections/why/WhyEcosystemAdvantage";
import WhyProductServiceModel from "@/sections/why/WhyProductServiceModel";
import WhyEngineeringFirst from "@/sections/why/WhyEngineeringFirst";
import WhyBuiltForScale from "@/sections/why/WhyBuiltForScale";
import WhyBusinessAlignment from "@/sections/why/WhyBusinessAlignment";
import WhyCustomization from "@/sections/why/WhyCustomization";
import WhyMaintainability from "@/sections/why/WhyMaintainability";
import WhyTransparency from "@/sections/why/WhyTransparency";
import WhyQualityReliability from "@/sections/why/WhyQualityReliability";
import WhySecurity from "@/sections/why/WhySecurity";
import WhyDeveloperCulture from "@/sections/why/WhyDeveloperCulture";
import WhyContinuousImprovement from "@/sections/why/WhyContinuousImprovement";
import WhyCapabilityMatrix from "@/sections/why/WhyCapabilityMatrix";
import WhyPrinciples from "@/sections/why/WhyPrinciples";
import WhyProof from "@/sections/why/WhyProof";
import WhyFAQ from "@/sections/why/WhyFAQ";
import WhyFinalCTA from "@/sections/why/WhyFinalCTA";

export const revalidate = 60; // ISR revalidation 60s

export async function generateMetadata() {
  const { whyData, settings } = await getWhyDevSampData();

  const title = whyData?.hero?.title
    ? `Why DevSamp — ${whyData.hero.title}`
    : "Why DevSamp — Engineering, Products & Compounding Digital Solutions";

  const description = whyData?.hero?.description ||
    "Discover why modern businesses, startups, and enterprises choose DevSamp: combining SaaS products, dedicated engineering pods, and 100% in-house craft.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: "https://devsamp.online/why-devsamp",
      siteName: settings?.siteName || "DevSamp",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: "https://devsamp.online/why-devsamp",
    },
  };
}

export default async function WhyDevSampPage() {
  const {
    whyData,
    settings,
    products,
    services,
    industries,
    caseStudies
  } = await getWhyDevSampData();

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Why DevSamp",
    url: "https://devsamp.online/why-devsamp",
    description: whyData?.hero?.description || "Why modern enterprises partner with DevSamp for scalable software products and custom engineering.",
    publisher: {
      "@type": "Organization",
      name: settings?.siteName || "DevSamp",
      url: "https://devsamp.online",
      logo: "https://devsamp.online/icon.svg",
    },
  };

  return (
    <div className="relative min-h-screen bg-transparent text-slate-900 font-sans selection:bg-indigo-500/20 selection:text-slate-900 overflow-x-hidden">
      
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <main className="relative z-10">
        
        {/* Section 01: Hero */}
        <WhyHero data={whyData?.hero} />

        {/* Section 02: Core Differentiation */}
        <WhyDifferentiation data={whyData?.differentiators} />

        {/* Section 03: Ecosystem Advantage */}
        <WhyEcosystemAdvantage data={whyData?.ecosystemAdvantage} />

        {/* Section 04: Product + Service Model */}
        <WhyProductServiceModel products={products} services={services} />

        {/* Section 05: Engineering-First Discipline */}
        <WhyEngineeringFirst />

        {/* Section 06: Built for Scale */}
        <WhyBuiltForScale />

        {/* Section 07: Business + Technology Alignment */}
        <WhyBusinessAlignment />

        {/* Section 08: Customization Without Chaos */}
        <WhyCustomization />

        {/* Section 09: Maintainability & Ownership */}
        <WhyMaintainability />

        {/* Section 10: Transparency */}
        <WhyTransparency />

        {/* Section 11: Quality & Reliability */}
        <WhyQualityReliability />

        {/* Section 12: Security-Minded Engineering */}
        <WhySecurity />

        {/* Section 13: Developer-Centric Culture */}
        <WhyDeveloperCulture />

        {/* Section 14: Continuous Improvement Loop */}
        <WhyContinuousImprovement />

        {/* Section 15: Capability Matrix */}
        <WhyCapabilityMatrix />

        {/* Section 16: Why Principles */}
        <WhyPrinciples />

        {/* Section 17: Real Proof */}
        <WhyProof caseStudies={caseStudies} products={products} />

        {/* Section 18: FAQ */}
        <WhyFAQ faqs={whyData?.faqs} />

        {/* Section 19: Final CTA */}
        <WhyFinalCTA data={whyData?.finalCta} />

      </main>

      {/* Global Footer */}
      <Footer products={products} services={services} siteSettings={settings} />

    </div>
  );
}
