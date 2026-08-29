import { Suspense } from "react";
import Footer from "@/components/Footer";
import { getCustomersPageData } from "@/lib/data";

// Modular Customer Section Components
import CustomerHero from "@/sections/customers/CustomerHero";
import CustomerContext from "@/sections/customers/CustomerContext";
import CustomerDirectory from "@/sections/customers/CustomerDirectory";
import CustomerEngagementTypes from "@/sections/customers/CustomerEngagementTypes";
import CustomerRelationshipBridge from "@/sections/customers/CustomerRelationshipBridge";
import CustomerFAQ from "@/sections/customers/CustomerFAQ";
import CustomerFinalCTA from "@/sections/customers/CustomerFinalCTA";

export const revalidate = 60;

export async function generateMetadata() {
  const { customerPage } = await getCustomersPageData();
  const title = customerPage?.hero?.title
    ? `${customerPage.hero.title} | DevSamp Customer Ecosystem`
    : "Customers & Organizations We Serve | DevSamp";
  const description =
    customerPage?.hero?.description ||
    "DevSamp collaborates with forward-thinking enterprises, healthcare networks, retail operators, and high-growth startups to design, build, and operate mission-critical software systems.";

  return {
    title,
    description,
    alternates: {
      canonical: "https://devsamp.online/customers",
    },
    openGraph: {
      title,
      description,
      url: "https://devsamp.online/customers",
      siteName: "DevSamp Digital Ecosystem",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "DevSamp Customer Ecosystem",
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

export default async function CustomersPage() {
  const {
    customerPage,
    customers,
    products,
    services,
    industries,
    settings
  } = await getCustomersPageData();

  // JSON-LD structured schema for Customer Ecosystem
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "DevSamp Customer Ecosystem & Client Relationships",
    "url": "https://devsamp.online/customers",
    "description": customerPage?.hero?.description || "Organizations, businesses, and platforms powered by DevSamp engineering.",
    "provider": {
      "@type": "Organization",
      "name": "DevSamp",
      "url": "https://devsamp.online"
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
      <CustomerHero
        data={customerPage?.hero}
        customerCount={customers?.length || 0}
      />

      {/* 02. Relationship Foundations & Principles */}
      <CustomerContext
        data={customerPage?.ecosystemIntro}
      />

      {/* 03. Live Database-Driven Customer Directory & Filters */}
      <CustomerDirectory
        initialCustomers={customers}
      />

      {/* 04. Engagement & Collaboration Models */}
      <CustomerEngagementTypes
        data={customerPage?.engagementTypes}
      />

      {/* 05. Cross-Ecosystem Relationships Bridge */}
      <CustomerRelationshipBridge
        products={products}
        services={services}
        industries={industries}
      />

      {/* 06. Frequently Answered Questions */}
      <CustomerFAQ
        faqs={customerPage?.faqs}
      />

      {/* 07. Final Conversion CTA */}
      <CustomerFinalCTA
        data={customerPage?.finalCta}
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
