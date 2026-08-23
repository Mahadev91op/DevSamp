import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { getAboutData } from "@/lib/data";

// Modular Section Components
import AboutHero from "@/sections/about/AboutHero";
import AboutOverview from "@/sections/about/AboutOverview";
import AboutStory from "@/sections/about/AboutStory";
import AboutFounders from "@/sections/about/AboutFounders";
import AboutTeam from "@/sections/about/AboutTeam";
import AboutMissionVision from "@/sections/about/AboutMissionVision";
import AboutVisionPillars from "@/sections/about/AboutVisionPillars";
import AboutEcosystem from "@/sections/about/AboutEcosystem";
import AboutCapabilities from "@/sections/about/AboutCapabilities";
import AboutPhilosophy from "@/sections/about/AboutPhilosophy";
import AboutTechApproach from "@/sections/about/AboutTechApproach";
import AboutIndustries from "@/sections/about/AboutIndustries";
import AboutMilestones from "@/sections/about/AboutMilestones";
import AboutCulture from "@/sections/about/AboutCulture";
import AboutCareers from "@/sections/about/AboutCareers";
import AboutFAQ from "@/sections/about/AboutFAQ";
import AboutFinalCTA from "@/sections/about/AboutFinalCTA";

export const revalidate = 60; // ISR revalidation 60s

export async function generateMetadata() {
  const { about, settings } = await getAboutData();

  const title = about?.hero?.title
    ? `About DevSamp — ${about.hero.title}`
    : "About DevSamp — Building the Technology Layer for Next-Gen Ecosystems";

  const description = about?.hero?.description ||
    "Learn about DevSamp, our company story, founders, engineering philosophy, SaaS software products, and strategic vision.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: "https://devsamp.online/about",
      siteName: settings?.siteName || "DevSamp",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: "https://devsamp.online/about",
    },
  };
}

export default async function AboutPage() {
  const {
    about,
    settings,
    teamMembers,
    industries,
    products,
    services
  } = await getAboutData();

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings?.siteName || "DevSamp",
    url: "https://devsamp.online",
    logo: "https://devsamp.online/icon.svg",
    description: about?.hero?.description || "Technology Ecosystem & Software Products Company",
    email: settings?.contactEmail || "devsamp1st@gmail.com",
    telephone: settings?.contactPhone || "+91 9330680642",
    founder: {
      "@type": "Person",
      name: "Mahadev Mondal",
      jobTitle: "Founder & Lead Architect",
    },
    sameAs: [
      "https://www.youtube.com/@DevSamp1st",
      "https://github.com/Mahadev91op",
      "https://x.com/devsamp1st",
      "https://www.instagram.com/devsamp1st/",
    ],
  };

  return (
    <div className="relative min-h-screen bg-transparent text-slate-900 font-sans selection:bg-indigo-500/20 selection:text-slate-900 overflow-x-hidden">
      
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* Global Interactive Elements */}
      <CustomCursor />
      <Navbar />

      <main className="relative z-10">
        
        {/* Section 01: Hero */}
        <AboutHero data={about?.hero} />

        {/* Section 02: DevSamp At A Glance */}
        <AboutOverview data={about?.overview} />

        {/* Section 03: Company Story */}
        <AboutStory data={about?.story} />

        {/* Section 04: Founders */}
        <AboutFounders data={about?.founders} />

        {/* Section 05: Leadership & Core Pod */}
        {teamMembers && teamMembers.length > 0 && (
          <AboutTeam data={teamMembers} />
        )}

        {/* Section 06 & 07: Mission & Vision (with 3-phase progression) */}
        <AboutMissionVision 
          missionData={about?.mission} 
          visionData={about?.vision} 
        />

        {/* Section 08: Long-Term Direction & Pillars */}
        <AboutVisionPillars data={about?.visionPillars} />

        {/* Section 09: What We Build */}
        <AboutEcosystem products={products} services={services} />

        {/* Section 10: Capabilities */}
        <AboutCapabilities data={about?.capabilities} />

        {/* Section 11: Engineering Philosophy */}
        <AboutPhilosophy data={about?.engineeringPrinciples} />

        {/* Section 12: Technology Approach */}
        <AboutTechApproach data={about?.technologyApproach} />

        {/* Section 13: Industries */}
        {industries && industries.length > 0 && (
          <AboutIndustries industries={industries} />
        )}

        {/* Section 14: Milestones */}
        <AboutMilestones data={about?.milestones} />

        {/* Section 15 & 16: Culture & Community */}
        <AboutCulture 
          cultureData={about?.culture} 
          communityData={about?.community} 
        />

        {/* Section 17: Careers Preview */}
        <AboutCareers data={about?.careers} />

        {/* Section 18: FAQ Accordion */}
        <AboutFAQ data={about?.faqs} />

        {/* Section 19: Final Ecosystem CTA */}
        <AboutFinalCTA data={about?.finalCta} />

      </main>

      <Footer products={products} services={services} siteSettings={settings} />

    </div>
  );
}
