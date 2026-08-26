import Footer from "@/components/Footer";
import { getProductsPageData } from "@/lib/data";

// 11 Modular Section Components
import ProductHero from "@/sections/products/ProductHero";
import ProductEcosystemIntro from "@/sections/products/ProductEcosystemIntro";
import ProductFeatured from "@/sections/products/ProductFeatured";
import ProductCatalog from "@/sections/products/ProductCatalog";
import ProductCapabilities from "@/sections/products/ProductCapabilities";
import ProductEcosystemBridge from "@/sections/products/ProductEcosystemBridge";
import ProductLifecycle from "@/sections/products/ProductLifecycle";
import ProductCustomCTA from "@/sections/products/ProductCustomCTA";
import ProductFAQ from "@/sections/products/ProductFAQ";
import ProductFinalCTA from "@/sections/products/ProductFinalCTA";

export const revalidate = 60; // ISR revalidation 60s

export async function generateMetadata() {
  const { productPage, settings } = await getProductsPageData();

  const title = productPage?.hero?.title
    ? `${productPage.hero.title} | ${settings?.siteName || "DevSamp"}`
    : "DevSamp Products — Software Products & SaaS Suite";

  const description = productPage?.hero?.description ||
    "Explore enterprise software products, vertical ERP systems, developer engines, and SaaS tools built by the DevSamp ecosystem.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: "https://devsamp.online/products",
      siteName: settings?.siteName || "DevSamp",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: "https://devsamp.online/products",
    },
  };
}

export default async function ProductsPage() {
  const {
    productPage,
    products,
    settings,
    services
  } = await getProductsPageData();

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "DevSamp Software Products & SaaS Suite",
    url: "https://devsamp.online/products",
    description: productPage?.hero?.description || "Software products, SaaS applications, and enterprise systems engineered by DevSamp.",
    publisher: {
      "@type": "Organization",
      name: settings?.siteName || "DevSamp",
      url: "https://devsamp.online",
      logo: "https://devsamp.online/icon.svg",
    },
  };

  return (
    <div className="relative min-h-screen bg-transparent text-slate-900 font-sans selection:bg-blue-500/20 selection:text-slate-900 overflow-x-hidden">
      
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <main className="relative z-10">
        
        {/* Section 01: Hero */}
        <ProductHero data={productPage?.hero} productCount={products.length} />

        {/* Section 02: Ecosystem Intro */}
        <ProductEcosystemIntro data={productPage?.ecosystemIntro} />

        {/* Section 03: Featured Flagship Products */}
        <ProductFeatured products={products} />

        {/* Section 04: Complete Product Catalogue + Filters */}
        <ProductCatalog initialProducts={products} />

        {/* Section 05: Dynamic Capability Overview */}
        <ProductCapabilities products={products} />

        {/* Section 06: Product + Ecosystem Relationship */}
        <ProductEcosystemBridge />

        {/* Section 07: Product Lifecycle & Philosophy */}
        <ProductLifecycle data={productPage?.lifecycle} />

        {/* Section 08: Custom Product CTA */}
        <ProductCustomCTA data={productPage?.customSolutionCta} />

        {/* Section 09: FAQ */}
        <ProductFAQ faqs={productPage?.faqs} />

        {/* Section 10: Final CTA */}
        <ProductFinalCTA data={productPage?.finalCta} />

      </main>

      {/* Global Footer */}
      <Footer products={products} services={services} siteSettings={settings} />

    </div>
  );
}
