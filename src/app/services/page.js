import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import * as LucideIcons from "lucide-react";
import { 
  Layers, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Cpu, 
  Code2, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck 
} from "lucide-react";
import { getServices, getProducts, getSiteSettings } from "@/lib/data";

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: "Engineering Services & Capabilities | DevSamp",
    description: "Bespoke full-stack web development, custom Next.js platforms, cloud edge architectures, and high-concurrency systems engineered by DevSamp.",
    alternates: {
      canonical: "https://devsamp.online/services",
    },
  };
}

export default async function ServicesPage() {
  const [services, products, settings] = await Promise.all([
    getServices(),
    getProducts({}, 6),
    getSiteSettings()
  ]);

  return (
    <main className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-14 md:pt-40 md:pb-20 border-b border-slate-200/70 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="ecosystem-container relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-950 transition-colors">
              <ArrowLeft size={14} /> Back to Ecosystem
            </Link>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3.5">
            <Layers size={12} /> Technology Services
          </div>

          <h1 className="text-fluid-h1 font-black text-slate-900 tracking-tight mb-3">
            Bespoke Engineering & Digital Solutions
          </h1>
          
          <p className="text-slate-600 text-fluid-body font-semibold max-w-2xl">
            We architect and deploy custom enterprise web applications, high-throughput microservices, mobile applications, and resilient cloud architectures.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-14 md:py-20 flex-1">
        <div className="ecosystem-container">
          
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service, idx) => {
                const IconComponent = LucideIcons[service.icon] || Layers;
                
                return (
                  <div
                    key={service._id || idx}
                    className="group bg-white border border-slate-200/80 hover:border-indigo-500/40 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-5">
                        <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-xs group-hover:scale-105 transition-transform">
                          <IconComponent size={22} />
                        </div>
                        <span className="font-mono text-[9px] font-bold text-slate-400">
                          [0{idx + 1} / SERVICE]
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-slate-500 text-xs md:text-sm font-semibold leading-relaxed mb-6">
                        {service.desc}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                      <Link 
                        href="/#contact"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-indigo-600 transition-colors group/link"
                      >
                        <span>Request Custom Scope</span>
                        <ArrowUpRight size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center max-w-xl mx-auto">
              <h3 className="text-lg font-black text-slate-800 mb-2">Services in Configuration</h3>
              <p className="text-slate-500 text-xs font-semibold mb-6">
                Bespoke services are currently being cataloged. Contact our engineering team for custom architectural quotes.
              </p>
              <Link href="/#contact">
                <button className="px-6 py-2.5 rounded-full bg-slate-950 text-white font-bold text-xs hover:bg-indigo-600 transition-all">
                  Contact Engineering Pod
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
