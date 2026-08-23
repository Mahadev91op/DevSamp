import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import * as LucideIcons from "lucide-react";
import { 
  Boxes, 
  ArrowLeft, 
  ArrowUpRight, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Layers 
} from "lucide-react";
import { getPaginatedProducts, getSiteSettings, getServices } from "@/lib/data";

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: "Software Products & SaaS Suite | DevSamp",
    description: "Explore enterprise software products, vertical ERP systems, developer engines, and SaaS tools built by the DevSamp ecosystem.",
    alternates: {
      canonical: "https://devsamp.online/products",
    },
  };
}

export default async function ProductsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page || 1);
  const category = resolvedParams?.category || "All";
  const search = resolvedParams?.search || "";

  const { products, meta } = await getPaginatedProducts({ page, limit: 12, category, search });
  const settings = await getSiteSettings();
  const services = await getServices();

  const allCategories = ["All", "SaaS", "Enterprise ERP", "Developer Tool", "Fintech", "HealthTech", "AI"];

  return (
    <main className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-14 md:pt-40 md:pb-20 border-b border-slate-200/70 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="ecosystem-container relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-950 transition-colors">
              <ArrowLeft size={14} /> Back to Ecosystem
            </Link>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3.5">
            <Boxes size={12} /> Software Catalog
          </div>

          <h1 className="text-fluid-h1 font-black text-slate-900 tracking-tight mb-3">
            DevSamp Software Products & SaaS Suite
          </h1>
          
          <p className="text-slate-600 text-fluid-body font-semibold max-w-2xl">
            Explore our ecosystem of proprietary SaaS platforms, vertical ERP systems, developer infrastructure engines, and AI workflow tools.
          </p>

          {/* Category Filter Navigation */}
          <div className="flex gap-2 overflow-x-auto pt-8 pb-2 scrollbar-none">
            {allCategories.map((cat, idx) => {
              const isActive = category === cat;
              return (
                <Link
                  key={idx}
                  href={`/products?category=${encodeURIComponent(cat)}${search ? `&search=${encodeURIComponent(search)}` : ""}`}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
                    isActive
                      ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-350"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-14 md:py-20 flex-1">
        <div className="ecosystem-container">
          
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {products.map((product, idx) => {
                  const IconComponent = LucideIcons[product.logoIcon] || Boxes;
                  const statusColor = 
                    product.status === "Live" 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                      : product.status === "Beta"
                        ? "bg-purple-50 text-purple-700 border-purple-200"
                        : "bg-blue-50 text-blue-700 border-blue-200";

                  return (
                    <div
                      key={product._id || idx}
                      className="group bg-white border border-slate-200/80 hover:border-indigo-500/40 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                    >
                      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${product.gradient || "from-blue-600 to-indigo-600"}`} />

                      <div>
                        <div className="flex justify-between items-start mb-5 pt-1">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${product.gradient || "from-blue-600 to-indigo-600"} shadow-md group-hover:scale-105 transition-transform`}>
                            <IconComponent size={22} />
                          </div>
                          
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusColor}`}>
                            {product.status || "Active"}
                          </span>
                        </div>

                        <div className="mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 font-mono">
                              {product.category}
                            </span>
                            {product.version && (
                              <span className="text-[9px] font-mono text-slate-400 font-bold">
                                {product.version}
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-black text-slate-900 mt-0.5 group-hover:text-indigo-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-xs font-bold text-slate-700 mt-1">
                            {product.tagline}
                          </p>
                        </div>

                        <p className="text-slate-500 text-xs leading-relaxed font-semibold mb-6">
                          {product.description}
                        </p>

                        {product.capabilities && product.capabilities.length > 0 && (
                          <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                              Key Capabilities
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {product.capabilities.map((cap, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/70 text-[10px] font-bold text-slate-600"
                                >
                                  {cap}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                        {product.pricingSnippet && (
                          <span className="text-[11px] font-mono font-bold text-slate-400">
                            {product.pricingSnippet}
                          </span>
                        )}
                        
                        <a
                          href={product.productUrl || "#contact"}
                          target={product.productUrl?.startsWith("http") ? "_blank" : "_self"}
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 text-white hover:bg-indigo-600 text-xs font-bold transition-all shadow-sm group/btn ml-auto"
                        >
                          <span>Access Product</span>
                          <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Pagination Controls (if totalPages > 1) */}
              {meta.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12 pt-8 border-t border-slate-200/70">
                  {page > 1 && (
                    <Link
                      href={`/products?page=${page - 1}&category=${encodeURIComponent(category)}`}
                      className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-950 hover:text-white transition-colors"
                    >
                      Previous
                    </Link>
                  )}
                  <span className="text-xs font-mono font-bold text-slate-500 px-3">
                    Page {page} of {meta.totalPages} ({meta.total} products)
                  </span>
                  {page < meta.totalPages && (
                    <Link
                      href={`/products?page=${page + 1}&category=${encodeURIComponent(category)}`}
                      className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-950 hover:text-white transition-colors"
                    >
                      Next
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                <Boxes size={28} />
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2">No Products Found</h3>
              <p className="text-slate-500 text-xs font-semibold mb-6">
                No products match the selected category &quot;{category}&quot;. Check back soon or request early developer beta access.
              </p>
              <Link href="/#contact">
                <button className="px-6 py-2.5 rounded-full bg-slate-950 text-white font-bold text-xs hover:bg-indigo-600 transition-all">
                  Request Custom Solution
                </button>
              </Link>
            </div>
          )}

        </div>
      </section>

      <Footer products={products} services={services} siteSettings={settings} />
    </main>
  );
}
