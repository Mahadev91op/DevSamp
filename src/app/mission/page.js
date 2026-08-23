import Footer from "@/components/Footer";
import { getMissionData } from "@/lib/data";

// Modular Section Components
import MissionHero from "@/sections/mission/MissionHero";
import MissionStatement from "@/sections/mission/MissionStatement";
import MissionMeaning from "@/sections/mission/MissionMeaning";
import MissionAudience from "@/sections/mission/MissionAudience";
import MissionWhatWeBuild from "@/sections/mission/MissionWhatWeBuild";
import MissionReliability from "@/sections/mission/MissionReliability";
import MissionScalability from "@/sections/mission/MissionScalability";
import MissionCustomerValue from "@/sections/mission/MissionCustomerValue";
import MissionProcess from "@/sections/mission/MissionProcess";
import MissionUXDesign from "@/sections/mission/MissionUXDesign";
import MissionEngineeringPrinciples from "@/sections/mission/MissionEngineeringPrinciples";
import MissionContinuousLoop from "@/sections/mission/MissionContinuousLoop";
import MissionInPractice from "@/sections/mission/MissionInPractice";
import MissionPillars from "@/sections/mission/MissionPillars";
import MissionQualityTrust from "@/sections/mission/MissionQualityTrust";
import MissionEvidence from "@/sections/mission/MissionEvidence";
import MissionFAQ from "@/sections/mission/MissionFAQ";
import MissionFinalCTA from "@/sections/mission/MissionFinalCTA";

export const revalidate = 60; // ISR revalidation 60s

export async function generateMetadata() {
  const { mission, settings } = await getMissionData();

  const title = mission?.hero?.title
    ? `DevSamp Mission — ${mission.hero.title}`
    : "DevSamp Mission — Building Reliable, Scalable Digital Products";

  const description = mission?.hero?.description ||
    "Explore DevSamp's core mission: engineering reliable, scalable digital products, cloud platforms, and bespoke systems for modern enterprises.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: "https://devsamp.online/mission",
      siteName: settings?.siteName || "DevSamp",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: "https://devsamp.online/mission",
    },
  };
}

export default async function MissionPage() {
  const {
    mission,
    settings,
    products,
    services,
    caseStudies
  } = await getMissionData();

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "DevSamp Mission",
    url: "https://devsamp.online/mission",
    description: mission?.hero?.description || "DevSamp's core mission to build reliable, scalable digital products for customers and businesses.",
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
        
        {/* Section 01: Mission Hero */}
        <MissionHero data={mission?.hero} />

        {/* Section 02: Core Mission Statement */}
        <MissionStatement data={mission?.statement} />

        {/* Section 03: What Our Mission Means */}
        {mission?.meanings && mission.meanings.length > 0 && (
          <MissionMeaning data={mission?.meanings} />
        )}

        {/* Section 04: Who We Build For */}
        {mission?.audiences && mission.audiences.length > 0 && (
          <MissionAudience data={mission?.audiences} />
        )}

        {/* Section 05: What We Build */}
        {mission?.capabilities && mission.capabilities.length > 0 && (
          <MissionWhatWeBuild data={mission?.capabilities} />
        )}

        {/* Section 06: Reliability Baseline */}
        <MissionReliability data={mission?.reliability} />

        {/* Section 07: Scalability Architecture */}
        <MissionScalability data={mission?.scalability} />

        {/* Section 08: Customer Value */}
        <MissionCustomerValue data={mission?.customerValue} />

        {/* Section 09: Product Engineering Process */}
        {mission?.process && mission.process.length > 0 && (
          <MissionProcess data={mission?.process} />
        )}

        {/* Section 10: UX & Design Philosophy */}
        <MissionUXDesign data={mission?.uxPhilosophy} />

        {/* Section 11: Core Engineering Principles */}
        {mission?.engineeringPrinciples && mission.engineeringPrinciples.length > 0 && (
          <MissionEngineeringPrinciples data={mission?.engineeringPrinciples} />
        )}

        {/* Section 12: Continuous Loop */}
        <MissionContinuousLoop data={mission?.continuousLoop} />

        {/* Section 13: Mission in Practice */}
        {mission?.missionInPractice && mission.missionInPractice.length > 0 && (
          <MissionInPractice data={mission?.missionInPractice} />
        )}

        {/* Section 14: Mission Pillars */}
        {mission?.pillars && mission.pillars.length > 0 && (
          <MissionPillars data={mission?.pillars} />
        )}

        {/* Section 15: Quality & Trust */}
        <MissionQualityTrust data={mission?.qualityTrust} />

        {/* Section 16: Verified Evidence / Metrics */}
        {mission?.evidence && mission.evidence.length > 0 && (
          <MissionEvidence data={mission?.evidence} />
        )}

        {/* Section 17: Mission FAQ */}
        {mission?.faqs && mission.faqs.length > 0 && (
          <MissionFAQ data={mission?.faqs} />
        )}

        {/* Section 18: Final CTA */}
        <MissionFinalCTA data={mission?.finalCta} />

      </main>

      <Footer products={products} services={services} siteSettings={settings} />

    </div>
  );
}
