"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Search,
  Globe,
  LifeBuoy,
  Terminal,
  Cpu,
  Layers,
  Boxes,
  Activity,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import Footer from "@/components/Footer";

const smoothEase = [0.16, 1, 0.3, 1];

export default function EcosystemPageShell({
  breadcrumbs = [],
  badge = "DevSamp Ecosystem",
  title,
  subtitle,
  primaryAction = { label: "Book a Demo", href: "/book-demo" },
  secondaryAction = null,
  relatedSection = null,
  children
}) {
  const openSearch = () => {
    window.dispatchEvent(new CustomEvent("devsamp:toggle-command-palette"));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 pt-24 sm:pt-28 pb-16 relative overflow-hidden">
      {/* Ambient background blur elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-br from-indigo-500/10 via-cyan-500/5 to-purple-500/10 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 overflow-x-auto no-scrollbar py-1">
          <Link href="/" className="hover:text-indigo-600 font-medium transition-colors">
            Home
          </Link>
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <div key={idx} className="flex items-center gap-1.5 shrink-0">
                <ChevronRight size={12} className="text-slate-400" />
                {isLast || !crumb.href ? (
                  <span className="text-slate-900 font-bold">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-indigo-600 font-medium transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Hero Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: smoothEase }}
          className="pb-10 md:pb-14 border-b border-slate-200/80 mb-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-4">
                <Sparkles size={12} className="text-indigo-600" />
                <span>{badge}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={openSearch}
                className="px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-2xs cursor-pointer"
              >
                <Search size={14} className="text-indigo-600" />
                <span>Search Hub (⌘K)</span>
              </button>

              {secondaryAction && (
                <Link href={secondaryAction.href}>
                  <button className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 text-xs sm:text-sm font-bold transition-all shadow-2xs cursor-pointer">
                    {secondaryAction.label}
                  </button>
                </Link>
              )}

              {primaryAction && (
                <Link href={primaryAction.href}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2.5 rounded-full bg-slate-950 hover:bg-indigo-600 text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 group cursor-pointer"
                  >
                    <span>{primaryAction.label}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </motion.button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>

        {/* Page Main Content Area */}
        <div className="min-h-[300px] mb-16">
          {children}
        </div>

        {/* Related Section Hub Callout */}
        {relatedSection && (
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl mb-16 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <span className="text-[10px] uppercase font-black tracking-widest text-indigo-400 bg-indigo-900/50 px-2.5 py-1 rounded-full border border-indigo-700/50">
                  {relatedSection.badge || "Ecosystem Hub"}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold mt-2.5">
                  {relatedSection.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">
                  {relatedSection.description}
                </p>
              </div>
              <Link href={relatedSection.href}>
                <button className="px-5 py-2.5 rounded-full bg-white hover:bg-indigo-50 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer">
                  <span>{relatedSection.actionLabel || "Explore Hub"}</span>
                  <ArrowUpRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* Global Unified Footer */}
      <Footer />
    </main>
  );
}
