"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Youtube,
  Instagram,
  Linkedin,
  ArrowUpRight,
  Clock,
  Terminal,
  Cpu,
  Boxes,
  ShieldCheck,
  Code2,
  ChevronDown,
  Layers,
  Activity,
  Compass,
  Lock,
  Sparkles,
  Mail,
  CheckCircle2,
  Search,
  Globe,
  LifeBuoy,
  Building2,
  Briefcase
} from "lucide-react";
import { navigationConfig } from "@/config/navigation";

const smoothEase = [0.16, 1, 0.3, 1];

// X (Twitter) Icon
const XIcon = ({ size = 16, className }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export default function Footer({ siteSettings = null }) {
  const [time, setTime] = useState("");
  const [openMobileColumn, setOpenMobileColumn] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Live workspace clock (IST - GMT+5:30)
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const emailAddress = siteSettings?.contactEmail || "devsamp1st@gmail.com";
  const phoneNumber = siteSettings?.contactPhone || "+91 9330680642";

  const handlePhoneClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
    const message = "Hello DevSamp, I checked your website and would like to discuss an engineering project.";

    if (isMobile) {
      window.location.href = `tel:+${cleanPhone}`;
    } else {
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, "_blank");
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes("@")) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail("");
      }, 3000);
    }
  };

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent("devsamp:toggle-command-palette"));
  };

  const toggleMobileCol = (colId) => {
    setOpenMobileColumn(openMobileColumn === colId ? null : colId);
  };

  return (
    <footer className="bg-white/80 backdrop-blur-md text-slate-900 pt-16 pb-12 md:pt-20 md:pb-10 overflow-hidden relative border-t border-slate-200/80">
      <div className="ecosystem-container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- TOP CTA BANNER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 pb-10 border-b border-slate-200/80 gap-6">
          <div className="max-w-2xl min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[11px] font-bold text-blue-700 uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              DevSamp Software Ecosystem
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight text-slate-950">
              Ready to Architect Your Next Digital Platform?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 font-normal">
              Deploy our proprietary software platforms or partner with a dedicated senior engineering pod.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={openSearch}
              className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border border-slate-200/80 shadow-2xs cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
            >
              <Search size={14} className="text-blue-600" />
              <span>Omni-Search</span>
              <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400">
                ⌘K
              </kbd>
            </button>

            <Link href={navigationConfig.cta.href}>
              <button
                type="button"
                className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-blue-600 text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 group cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
              >
                <span>{navigationConfig.cta.label}</span>
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </Link>

            <button
              type="button"
              onClick={handlePhoneClick}
              className="px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-2xs cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
            >
              <span>{phoneNumber}</span>
            </button>
          </div>
        </div>

        {/* --- 5 STRUCTURED DIRECTORY COLUMNS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12">
          {navigationConfig.footer.columns.map((col) => {
            const isColOpen = openMobileColumn === col.id;

            return (
              <div key={col.id} className="space-y-3">
                {/* Desktop Column Header */}
                <h3 className="hidden md:block text-xs font-black uppercase tracking-wider text-slate-950">
                  {col.title}
                </h3>

                {/* Mobile Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleMobileCol(col.id)}
                  className="md:hidden w-full flex items-center justify-between py-2.5 text-left border-b border-slate-200 text-sm font-bold text-slate-900"
                >
                  <span>{col.title}</span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform duration-200 ${
                      isColOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Items List */}
                <div className={`space-y-2 text-xs md:block ${isColOpen ? "block pb-3" : "hidden md:block"}`}>
                  {col.items.map((item, idx) => (
                    <div key={idx}>
                      <Link
                        href={item.href}
                        className="text-slate-600 hover:text-blue-600 transition-colors py-0.5 inline-flex items-center gap-1.5 group font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none rounded-md px-1 -mx-1"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] uppercase tracking-wider font-extrabold px-1 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-100 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </div>
                  ))}

                  {col.viewAll && (
                    <div className="pt-2 border-t border-slate-100">
                      <Link
                        href={col.viewAll.href}
                        className="text-blue-600 font-bold hover:text-blue-800 transition-colors inline-flex items-center gap-1 text-[11px]"
                      >
                        <span>{col.viewAll.label}</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* --- NEWSLETTER + LIVE STATUS BAR --- */}
        <div className="pt-8 pb-8 border-t border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Brand Info & Live Time */}
          <div className="lg:col-span-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-950 flex items-center justify-center text-white font-black text-xs">
                DS
              </div>
              <span className="font-bold text-base text-slate-950">DevSamp Ecosystem</span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm font-normal">
              High-performance software products, clinical cloud ERP, and dedicated senior engineering pods.
            </p>
            <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-slate-400" />
                <span>IST {time || "Live"}</span>
              </span>
              <span className="text-slate-300">•</span>
              <Link href="/status" className="flex items-center gap-1.5 text-emerald-600 font-semibold hover:underline">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All Systems Operational</span>
              </Link>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-5 space-y-2">
            <p className="text-xs font-bold text-slate-900">
              Subscribe to Engineering Dispatches
            </p>
            <p className="text-xs text-slate-500">
              Monthly deep-dives on architecture, performance benchmarks, and platform releases.
            </p>
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <CheckCircle2 size={14} />
                <span>Thank you! You are now subscribed to DevSamp engineering devlogs.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="architect@company.com"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Social Links */}
          <div className="lg:col-span-3 flex lg:justify-end items-center gap-2.5">
            <a
              href="https://www.linkedin.com/company/devsamp"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 transition-all shadow-2xs"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="https://x.com/devsamp1st"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-950 hover:text-white text-slate-600 transition-all shadow-2xs"
              aria-label="X Twitter"
            >
              <XIcon size={15} />
            </a>
            <a
              href="https://www.youtube.com/@DevSamp1st"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-red-600 hover:text-white text-slate-600 transition-all shadow-2xs"
              aria-label="YouTube"
            >
              <Youtube size={15} />
            </a>
            <a
              href="https://www.instagram.com/devsamp1st/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-pink-600 hover:text-white text-slate-600 transition-all shadow-2xs"
              aria-label="Instagram"
            >
              <Instagram size={15} />
            </a>
          </div>
        </div>

        {/* --- BOTTOM LEGAL COPYRIGHT BAR --- */}
        <div className="pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DevSamp Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            {navigationConfig.footer.legalLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}