import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { getVisionData } from "@/lib/data";

// Modular Section Components
import VisionHero from "@/sections/vision/VisionHero";
import VisionStatement from "@/sections/vision/VisionStatement";
import VisionReasons from "@/sections/vision/VisionReasons";
import VisionPhases from "@/sections/vision/VisionPhases";
import VisionEcosystemFuture from "@/sections/vision/VisionEcosystemFuture";
import VisionPillars from "@/sections/vision/VisionPillars";
import VisionProductEvolution from "@/sections/vision/VisionProductEvolution";
import VisionPlatformLayer from "@/sections/vision/VisionPlatformLayer";
import VisionAiAutomation from "@/sections/vision/VisionAiAutomation";
import VisionIndustriesExpansion from "@/sections/vision/VisionIndustriesExpansion";
import VisionDeveloperEcosystem from "@/sections/vision/VisionDeveloperEcosystem";
import VisionTechDirection from "@/sections/vision/VisionTechDirection";
import VisionRoadmap from "@/sections/vision/VisionRoadmap";
import VisionPrinciples from "@/sections/vision/VisionPrinciples";
import VisionFutureState from "@/sections/vision/VisionFutureState";
import VisionFAQ from "@/sections/vision/VisionFAQ";
import VisionFinalCTA from "@/sections/vision/VisionFinalCTA";

export const revalidate = 60; // ISR revalidation 60s

export async function generateMetadata() {
  const { vision, settings } = await getVisionData();

  const title = vision?.hero?.title
    ? `DevSamp Vision — ${vision.hero.title}`
    : "DevSamp Vision — Engineering the Global Operating Layer for Connected Enterprise Software";

  const description = vision?.hero?.description ||
    "Explore DevSamp's 10–15 year strategic horizon, 4-phase evolutionary roadmap, unified ecosystem topology, and platform architecture.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: "https://devsamp.online/vision",
      siteName: settings?.siteName || "DevSamp",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: "https://devsamp.online/vision",
    },
  };
}

export default async function VisionPage() {
  const {
    vision,
    settings,
    industries,
    products,
    services
  } = await getVisionData();

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "DevSamp Vision 2035",
    url: "https://devsamp.online/vision",
    description: vision?.hero?.description || "Long-term 10-15 year strategic horizon and technical roadmap for the DevSamp Ecosystem.",
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

        
        {/* Section 01: Vision Hero */}
        <VisionHero data={vision?.hero} />

        {/* Section 02: Core Vision Statement */}
        <VisionStatement data={vision?.statement} />

        {/* Section 03: Why This Vision */}
        {vision?.reasons && vision.reasons.length > 0 && (
          <VisionReasons data={vision?.reasons} />
        )}

        {/* Section 04: 10–15 Year Direction & Phases */}
        {vision?.phases && vision.phases.length > 0 && (
          <VisionPhases data={vision?.phases} />
        )}

        {/* Section 05: Future DevSamp Ecosystem Architecture */}
        {vision?.ecosystemLayers && vision.ecosystemLayers.length > 0 && (
          <VisionEcosystemFuture data={vision?.ecosystemLayers} />
        )}

        {/* Section 06: Strategic Pillars */}
        {vision?.pillars && vision.pillars.length > 0 && (
          <VisionPillars data={vision?.pillars} />
        )}

        {/* Section 07: Software & Product Vision */}
        <VisionProductEvolution data={vision?.productVision} />

        {/* Section 08: Platform Vision */}
        <VisionPlatformLayer data={vision?.platformVision} />

        {/* Section 09: AI & Automation Direction */}
        <VisionAiAutomation data={vision?.aiDirection} />

        {/* Section 10: Business & Industry Expansion */}
        {industries && industries.length > 0 && (
          <VisionIndustriesExpansion industries={industries} />
        )}

        {/* Section 11: Developer Ecosystem Vision */}
        <VisionDeveloperEcosystem data={vision?.developerVision} />

        {/* Section 12: Technology & Engineering Direction */}
        <VisionTechDirection data={vision?.techDirection} />

        {/* Section 13: Future Roadmap */}
        {vision?.roadmap && vision.roadmap.length > 0 && (
          <VisionRoadmap data={vision?.roadmap} />
        )}

        {/* Section 14: Vision Principles */}
        {vision?.principles && vision.principles.length > 0 && (
          <VisionPrinciples data={vision?.principles} />
        )}

        {/* Section 15: Future State / Destination */}
        <VisionFutureState data={vision?.futureState} />

        {/* Section 16: Vision FAQ */}
        {vision?.faqs && vision.faqs.length > 0 && (
          <VisionFAQ data={vision?.faqs} />
        )}

        {/* Section 17: Final CTA */}
        <VisionFinalCTA data={vision?.finalCta} />

      </main>

      <Footer products={products} services={services} siteSettings={settings} />

    </div>
  );
}
