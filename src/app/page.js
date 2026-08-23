import { Suspense } from "react";
import Hero from "@/sections/Hero";
import EcosystemIntro from "@/sections/EcosystemIntro";
import FeaturedProducts from "@/sections/FeaturedProducts";
import Services from "@/sections/Services";
import EcosystemMap from "@/sections/EcosystemMap";
import WhyDevSamp from "@/sections/WhyDevSamp";
import IndustriesSection from "@/sections/IndustriesSection";
import CaseStudies from "@/sections/CaseStudies";
import DeveloperSection from "@/sections/DeveloperSection";
import TrustSection from "@/sections/TrustSection";
import Testimonials from "@/sections/Testimonials";
import Blogs from "@/sections/Blogs";
import FAQ from "@/sections/FAQ";
import FinalCTA from "@/sections/FinalCTA";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";

import { 
  getHomepageData,
  getServices,
  getProducts,
  getEcosystemItems,
  getIndustries,
  getCaseStudies,
  getReviews,
  getBlogs,
  getHomepageSections,
  getSiteSettings
} from "@/lib/data";

import { 
  ProductsSkeleton,
  ServicesSkeleton, 
  EcosystemSkeleton,
  IndustriesSkeleton,
  DeveloperSkeleton,
  BlogsSkeleton, 
  TestimonialsSkeleton 
} from "@/components/Skeletons";

// Revalidation interval (High Performance + SEO)
export const revalidate = 60;

// Dynamic Metadata
export async function generateMetadata() {
  const settings = await getSiteSettings();
  const title = settings?.tagline 
    ? `DevSamp | ${settings.tagline}`
    : "DevSamp | Technology • Software Products • SaaS • Digital Solutions Ecosystem";
  const description = settings?.heroDescription || 
    "DevSamp powers modern businesses with scalable software products, fullstack digital engineering, and an interconnected developer ecosystem.";

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: "https://devsamp.online",
    },
    openGraph: {
      title,
      description,
      url: "https://devsamp.online",
      siteName: "DevSamp Ecosystem",
      type: "website",
    }
  };
}

// Data Streamers with Suspense boundaries
async function HeroStreamer({ sectionData, siteSettings }) {
  return <Hero sectionData={sectionData} siteSettings={siteSettings} />;
}

async function ProductsStreamer({ sectionData }) {
  const products = await getProducts();
  return <FeaturedProducts initialProducts={products} sectionData={sectionData} />;
}

async function ServicesStreamer({ sectionData }) {
  const services = await getServices();
  return <Services initialServices={services} sectionData={sectionData} />;
}

async function EcosystemMapStreamer({ sectionData }) {
  const ecosystemItems = await getEcosystemItems();
  return <EcosystemMap initialEcosystem={ecosystemItems} sectionData={sectionData} />;
}

async function IndustriesStreamer({ sectionData }) {
  const industries = await getIndustries();
  return <IndustriesSection initialIndustries={industries} sectionData={sectionData} />;
}

async function CaseStudiesStreamer({ sectionData }) {
  const caseStudies = await getCaseStudies();
  return <CaseStudies initialCaseStudies={caseStudies} sectionData={sectionData} />;
}

async function TestimonialsStreamer({ sectionData }) {
  const reviews = await getReviews();
  return <Testimonials initialReviews={reviews} sectionData={sectionData} />;
}

async function BlogsStreamer({ sectionData }) {
  const blogs = await getBlogs(3);
  return <Blogs initialBlogs={blogs} sectionData={sectionData} />;
}

export default async function Home() {
  const homepageData = await getHomepageData();
  const { sections, settings, products, services } = homepageData;

  // Map section configs by key
  const sectionMap = {};
  if (Array.isArray(sections)) {
    sections.forEach(s => {
      sectionMap[s.key] = s;
    });
  }

  const isSectionActive = (key) => {
    if (!sectionMap[key]) return true; // default active if unconfigured
    return sectionMap[key].isActive !== false;
  };

  return (
    <main className="flex min-h-screen flex-col bg-transparent">
      
      {/* 1. HERO SECTION */}
      {isSectionActive("hero") && (
        <HeroStreamer sectionData={sectionMap["hero"]} siteSettings={settings} />
      )}

      {/* 2. ECOSYSTEM INTRODUCTION */}
      {isSectionActive("ecosystem-intro") && (
        <EcosystemIntro sectionData={sectionMap["ecosystem-intro"]} />
      )}

      {/* 3. FEATURED PRODUCTS */}
      {isSectionActive("featured-products") && (
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsStreamer sectionData={sectionMap["featured-products"]} />
        </Suspense>
      )}

      {/* 4. SERVICES SECTION */}
      {isSectionActive("services") && (
        <Suspense fallback={<ServicesSkeleton />}>
          <ServicesStreamer sectionData={sectionMap["services"]} />
        </Suspense>
      )}

      {/* 5. ECOSYSTEM VISUALIZATION MAP */}
      {isSectionActive("ecosystem-map") && (
        <Suspense fallback={<EcosystemSkeleton />}>
          <EcosystemMapStreamer sectionData={sectionMap["ecosystem-map"]} />
        </Suspense>
      )}

      {/* 6. WHY DEVSAMP */}
      {isSectionActive("why-devsamp") && (
        <WhyDevSamp sectionData={sectionMap["why-devsamp"]} />
      )}

      {/* 7. INDUSTRIES & SOLUTIONS */}
      {isSectionActive("industries") && (
        <Suspense fallback={<IndustriesSkeleton />}>
          <IndustriesStreamer sectionData={sectionMap["industries"]} />
        </Suspense>
      )}

      {/* 8. CASE STUDIES */}
      {isSectionActive("case-studies") && (
        <Suspense fallback={<ProductsSkeleton />}>
          <CaseStudiesStreamer sectionData={sectionMap["case-studies"]} />
        </Suspense>
      )}

      {/* 9. DEVELOPER ECOSYSTEM */}
      {isSectionActive("developers") && (
        <Suspense fallback={<DeveloperSkeleton />}>
          <DeveloperSection sectionData={sectionMap["developers"]} />
        </Suspense>
      )}

      {/* 10. TRUST & SECURITY */}
      {isSectionActive("trust") && (
        <TrustSection sectionData={sectionMap["trust"]} />
      )}

      {/* 11. TESTIMONIALS */}
      {isSectionActive("testimonials") && (
        <Suspense fallback={<TestimonialsSkeleton />}>
          <TestimonialsStreamer sectionData={sectionMap["testimonials"]} />
        </Suspense>
      )}

      {/* 12. LATEST UPDATES / CHANGELOG */}
      {isSectionActive("latest-updates") && (
        <Suspense fallback={<BlogsSkeleton />}>
          <BlogsStreamer sectionData={sectionMap["latest-updates"]} />
        </Suspense>
      )}

      {/* 13. FAQ */}
      {isSectionActive("faq") && (
        <FAQ sectionData={sectionMap["faq"]} />
      )}

      {/* 14. FINAL CTA */}
      {isSectionActive("final-cta") && (
        <FinalCTA sectionData={sectionMap["final-cta"]} siteSettings={settings} />
      )}

      {/* 15. CONTACT CONSOLE */}
      <Contact />

      {/* 16. FOOTER */}
      <Footer products={products} services={services} siteSettings={settings} />

    </main>
  );
}