import Footer from "@/components/Footer";
import { getEcosystemData } from "@/lib/data";

// 18 Modular Section Components
import EcosystemHero from "@/sections/ecosystem/EcosystemHero";
import EcosystemDefinition from "@/sections/ecosystem/EcosystemDefinition";
import EcosystemArchitecture from "@/sections/ecosystem/EcosystemArchitecture";
import EcosystemLayers from "@/sections/ecosystem/EcosystemLayers";
import EcosystemProductsLayer from "@/sections/ecosystem/EcosystemProductsLayer";
import EcosystemServicesLayer from "@/sections/ecosystem/EcosystemServicesLayer";
import EcosystemTechLayer from "@/sections/ecosystem/EcosystemTechLayer";
import EcosystemSolutionsLayer from "@/sections/ecosystem/EcosystemSolutionsLayer";
import EcosystemConnections from "@/sections/ecosystem/EcosystemConnections";
import EcosystemFlow from "@/sections/ecosystem/EcosystemFlow";
import EcosystemMapSection from "@/sections/ecosystem/EcosystemMapSection";
import EcosystemSharedFoundation from "@/sections/ecosystem/EcosystemSharedFoundation";
import EcosystemDeveloperLayer from "@/sections/ecosystem/EcosystemDeveloperLayer";
import EcosystemBusinessGrowth from "@/sections/ecosystem/EcosystemBusinessGrowth";
import EcosystemFutureExpansion from "@/sections/ecosystem/EcosystemFutureExpansion";
import EcosystemPrinciples from "@/sections/ecosystem/EcosystemPrinciples";
import EcosystemFAQ from "@/sections/ecosystem/EcosystemFAQ";
import EcosystemCTA from "@/sections/ecosystem/EcosystemCTA";

export const revalidate = 60; // ISR revalidation 60s

export async function generateMetadata() {
  const { ecosystem, settings } = await getEcosystemData();

  const title = ecosystem?.hero?.title
    ? `DevSamp Ecosystem — ${ecosystem.hero.title}`
    : "DevSamp Ecosystem — Interconnected SaaS Products, Pods & Platform Mesh";

  const description = ecosystem?.hero?.description ||
    "Discover the interconnected DevSamp software ecosystem: uniting flagship SaaS products, bespoke engineering pods, open developer APIs, and continuous cloud SLA.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: "https://devsamp.online/ecosystem",
      siteName: settings?.siteName || "DevSamp",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: "https://devsamp.online/ecosystem",
    },
  };
}

export default async function EcosystemPage() {
  const {
    ecosystem,
    settings,
    ecosystemNodes,
    products,
    services,
    industries,
    caseStudies
  } = await getEcosystemData();

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "DevSamp Ecosystem",
    url: "https://devsamp.online/ecosystem",
    description: ecosystem?.hero?.description || "How all components of DevSamp connect: SaaS Products, Engineering Pods, Developer APIs, and Solutions.",
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
        
        {/* Section 01: Ecosystem Hero */}
        <EcosystemHero data={ecosystem?.hero} />

        {/* Section 02: Ecosystem Definition */}
        <EcosystemDefinition data={ecosystem?.definition} />

        {/* Section 03: Ecosystem Architecture */}
        <EcosystemArchitecture data={ecosystem?.architecture} />

        {/* Section 04: Core Ecosystem Layers */}
        <EcosystemLayers data={ecosystem?.layers} />

        {/* Section 05: Products Layer */}
        <EcosystemProductsLayer products={products} />

        {/* Section 06: Services Layer */}
        <EcosystemServicesLayer services={services} />

        {/* Section 07: Technology / Platform Layer */}
        <EcosystemTechLayer />

        {/* Section 08: Customer Solutions Layer */}
        <EcosystemSolutionsLayer />

        {/* Section 09: How Everything Connects (Flywheel) */}
        <EcosystemConnections data={ecosystem?.connections} />

        {/* Section 10: Engagement Flow */}
        <EcosystemFlow data={ecosystem?.flow} />

        {/* Section 11: Ecosystem Map (Topology Mesh) */}
        <EcosystemMapSection nodes={ecosystemNodes} />

        {/* Section 12: Shared Technology Foundation */}
        <EcosystemSharedFoundation data={ecosystem?.sharedFoundation} />

        {/* Section 13: Developer / Technical Layer */}
        <EcosystemDeveloperLayer data={ecosystem?.developerLayer} />

        {/* Section 14: Business Growth Layer */}
        <EcosystemBusinessGrowth data={ecosystem?.businessGrowth} />

        {/* Section 15: Future Ecosystem Expansion */}
        <EcosystemFutureExpansion data={ecosystem?.futureExpansion} />

        {/* Section 16: Ecosystem Principles */}
        <EcosystemPrinciples data={ecosystem?.principles} />

        {/* Section 17: FAQ */}
        <EcosystemFAQ faqs={ecosystem?.faqs} />

        {/* Section 18: Final CTA */}
        <EcosystemCTA data={ecosystem?.finalCta} />

      </main>

      {/* Reused Site Footer */}
      <Footer products={products} services={services} siteSettings={settings} />

    </div>
  );
}
