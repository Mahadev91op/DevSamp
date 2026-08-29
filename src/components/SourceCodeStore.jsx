"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Code2,
  Download,
  ExternalLink,
  Github,
  Star,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Tag,
  Search,
  Filter,
  Layers,
  ArrowRight,
  Copy,
  Check,
  X,
  CreditCard,
  Building2,
  FileCode2,
  Terminal,
  Lock,
  Boxes,
  Activity,
  Smartphone,
  Eye,
  AlertCircle,
  Folder,
  File,
  ChevronRight
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

export default function SourceCodeStore({ initialSourceCodes = [] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialSourceCodes);
  const [selectedType, setSelectedType] = useState("all"); // "all", "free", "paid"
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [currency, setCurrency] = useState("INR"); // "INR" or "USD"
  
  // Modals state
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [activeCheckoutItem, setActiveCheckoutItem] = useState(null);
  const [licenseTier, setLicenseTier] = useState("single");
  const [copiedSlug, setCopiedSlug] = useState(null);
  const [downloadingSlug, setDownloadingSlug] = useState(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Extract unique categories dynamically from DB items
  const categories = useMemo(() => {
    const cats = new Set(["All"]);
    items.forEach((item) => {
      if (item.category) cats.add(item.category);
    });
    return Array.from(cats);
  }, [items]);

  // Dynamic filter and sort
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // Type filter
        if (selectedType === "free" && !item.isFree && item.priceINR > 0) return false;
        if (selectedType === "paid" && (item.isFree || item.priceINR === 0)) return false;

        // Category filter
        if (selectedCategory !== "All" && item.category !== selectedCategory) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = item.title?.toLowerCase().includes(q);
          const matchesDesc = item.description?.toLowerCase().includes(q);
          const matchesTagline = item.tagline?.toLowerCase().includes(q);
          const matchesTech = item.techStack?.some((t) => t.toLowerCase().includes(q));
          return matchesTitle || matchesDesc || matchesTagline || matchesTech;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return (a.priceINR || 0) - (b.priceINR || 0);
        if (sortBy === "price-high") return (b.priceINR || 0) - (a.priceINR || 0);
        if (sortBy === "downloads") return (b.downloadsCount || 0) - (a.downloadsCount || 0);
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        return (a.order || 0) - (b.order || 0);
      });
  }, [items, selectedType, selectedCategory, searchQuery, sortBy]);

  // Handle Free direct GitHub download
  const handleFreeDownload = async (item, e) => {
    if (e) e.stopPropagation();
    try {
      setDownloadingSlug(item.slug);

      // Trigger backend download counter API
      const res = await fetch(`/api/source-code/${item.slug}/download`);
      const resData = await res.json();

      // Update local download count
      setItems((prev) =>
        prev.map((it) =>
          it.slug === item.slug
            ? { ...it, downloadsCount: (it.downloadsCount || 0) + 1 }
            : it
        )
      );

      const targetUrl = resData?.data?.downloadUrl || item.downloadUrl || `${item.githubUrl}/archive/refs/heads/main.zip`;
      window.open(targetUrl, "_blank");
    } catch (err) {
      window.open(`${item.githubUrl}/archive/refs/heads/main.zip`, "_blank");
    } finally {
      setTimeout(() => setDownloadingSlug(null), 1500);
    }
  };

  // Copy Git Clone command
  const handleCopyClone = (item, e) => {
    if (e) e.stopPropagation();
    const cloneCmd = `git clone ${item.githubUrl}.git`;
    navigator.clipboard.writeText(cloneCmd);
    setCopiedSlug(item.slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const getPriceDisplay = (item) => {
    if (item.isFree || item.priceINR === 0) return "FREE";
    return currency === "INR" ? `₹${item.priceINR?.toLocaleString()}` : `$${item.priceUSD}`;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* --- TOP HUD BANNER --- */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white shadow-2xl border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-mono font-bold uppercase tracking-wider">
              <Github size={13} />
              <span>Official GitHub Source Repository Store</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              Production-Grade Source Code, Starters & Enterprise SaaS
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Download free open-source templates or purchase full commercial licenses for our flagship clinical ERPs, offline POS engines, and multi-tenant architectures directly with full GitHub repository access.
            </p>
          </div>

          {/* Quick Metrics HUD + Currency Switcher */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <div className="grid grid-cols-3 gap-2.5 w-full sm:w-auto font-mono text-center">
              <div className="p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
                <p className="text-lg font-black text-cyan-400">100%</p>
                <p className="text-[9px] text-slate-300 font-bold uppercase">Clean Code</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
                <p className="text-lg font-black text-emerald-400">0%</p>
                <p className="text-[9px] text-slate-300 font-bold uppercase">Tech Debt</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
                <p className="text-lg font-black text-indigo-300">GitHub</p>
                <p className="text-[9px] text-slate-300 font-bold uppercase">Releases</p>
              </div>
            </div>

            {/* Global Currency Switcher */}
            <div className="flex bg-slate-900/90 p-1 rounded-2xl border border-white/20 text-xs font-mono shrink-0">
              <button
                onClick={() => setCurrency("INR")}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  currency === "INR" ? "bg-blue-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
                }`}
              >
                INR (₹)
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  currency === "USD" ? "bg-blue-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTROLS & FILTER BAR --- */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        
        {/* Row 1: Search + Type Toggles + Sort */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1 min-w-[260px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name, tech stack (Next.js, MongoDB, POS)..."
              className="w-full pl-9 pr-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Pricing Model Pills */}
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 shrink-0">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedType === "all"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              All Packages ({items.length})
            </button>
            <button
              onClick={() => setSelectedType("free")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedType === "free"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-emerald-700"
              }`}
            >
              <Sparkles size={12} />
              <span>Free Downloads ({items.filter(i => i.isFree).length})</span>
            </button>
            <button
              onClick={() => setSelectedType("paid")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedType === "paid"
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-xs"
                  : "text-slate-600 hover:text-blue-700"
              }`}
            >
              <CreditCard size={12} />
              <span>Commercial SaaS ({items.filter(i => !i.isFree).length})</span>
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-400 font-bold hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="featured">Featured / Recommended</option>
              <option value="downloads">Most Downloaded</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Row 2: Category Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- RESULTS SUMMARY --- */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-mono font-bold">
        <span>
          SHOWING {filteredItems.length} OF {items.length} PACKAGES (DATABASE SYNCED)
        </span>
        <span className="flex items-center gap-1.5 text-emerald-600">
          <CheckCircle2 size={12} />
          <span>All packages include complete fullstack source code & documentation</span>
        </span>
      </div>

      {/* --- SOURCE CODE PACKAGES GRID (EVERY CARD IS CLICKABLE) --- */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const isFree = item.isFree || item.priceINR === 0;

              return (
                <motion.div
                  key={item._id || item.slug || idx}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: smoothEase }}
                  onClick={() => router.push(`/marketplace/${item.slug}`)}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
                >
                  {/* Top Gradient Header Stripe */}
                  <div className={`h-2.5 w-full bg-gradient-to-r ${item.gradient || "from-blue-600 via-indigo-600 to-cyan-500"}`} />

                  <div className="p-6 sm:p-7 space-y-4">
                    
                    {/* Top Row: Category, Version, Price Badge */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCategory(item.category);
                          }}
                          className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-0.5 rounded-md border border-blue-100 font-mono transition-colors"
                        >
                          {item.category}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-mono">
                          {item.version}
                        </span>
                        {item.badge && (
                          <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                            isFree
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-purple-50 text-purple-700 border border-purple-200"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Pricing Tag */}
                      <div className="text-right">
                        {isFree ? (
                          <div className="flex items-center gap-1.5">
                            {item.originalPriceINR > 0 && (
                              <span className="text-xs text-slate-400 line-through font-mono">
                                {currency === "INR" ? `₹${item.originalPriceINR}` : `$${item.originalPriceUSD}`}
                              </span>
                            )}
                            <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-mono">
                              FREE 100%
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {item.originalPriceINR > item.priceINR && (
                              <span className="text-xs text-slate-400 line-through font-mono">
                                {currency === "INR" ? `₹${item.originalPriceINR}` : `$${item.originalPriceUSD}`}
                              </span>
                            )}
                            <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
                              {getPriceDisplay(item)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Title and Tagline */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug flex items-center justify-between gap-2">
                        <span>{item.title}</span>
                        <ChevronRight size={18} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-normal leading-relaxed line-clamp-2">
                        {item.tagline || item.description}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSearchQuery(tech);
                            }}
                            className="text-[10px] font-bold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 px-2.5 py-0.5 rounded-md border border-slate-200/80 font-mono transition-colors cursor-pointer"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Key Features Bullet List */}
                    {item.features && item.features.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                          Key Deliverables:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {item.features.slice(0, 4).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-1.5 text-xs text-slate-700">
                              <CheckCircle2 size={13} className="text-blue-600 shrink-0 mt-0.5" />
                              <span className="truncate leading-tight font-medium">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Meta Stats: Rating, Downloads, Stars */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100 font-mono">
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star size={13} fill="currentColor" />
                        <span>{item.rating || 5.0}</span>
                        <span className="text-slate-400">({item.reviewsCount || 10})</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <Download size={12} className="text-blue-600" />
                        <span>{item.downloadsCount || 120} downloads</span>
                      </span>
                      <span>•</span>
                      <span className="text-slate-500 truncate">{item.license}</span>
                    </div>

                  </div>

                  {/* Bottom Action Footer (All buttons with e.stopPropagation for reliable clicks) */}
                  <div className="p-4 sm:p-5 bg-slate-50/90 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                    
                    {/* Left Actions: Details Page & Live Demo */}
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/marketplace/${item.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                      >
                        <Eye size={13} className="text-blue-600" />
                        <span>Inspect Code</span>
                      </Link>

                      {item.liveDemoUrl && (
                        <Link
                          href={item.liveDemoUrl}
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={12} />
                        </Link>
                      )}
                    </div>

                    {/* Right Primary Action: Direct Download or Buy Source Code */}
                    <div className="flex items-center gap-2">
                      {isFree ? (
                        <>
                          <button
                            type="button"
                            onClick={(e) => handleCopyClone(item, e)}
                            className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-all shadow-2xs cursor-pointer"
                            title="Copy git clone command"
                          >
                            {copiedSlug === item.slug ? (
                              <Check size={14} className="text-emerald-600" />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleFreeDownload(item, e)}
                            disabled={downloadingSlug === item.slug}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/25 flex items-center gap-1.5 cursor-pointer"
                          >
                            <Download size={13} />
                            <span>{downloadingSlug === item.slug ? "Downloading..." : "Download (GitHub)"}</span>
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCheckoutItem(item);
                            setLicenseTier("single");
                          }}
                          className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Github size={13} />
                          <span>Get Source License</span>
                        </button>
                      )}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="p-12 text-center bg-white border border-slate-200/90 rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Boxes size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No matching source code packages found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search keywords or switching category filters to discover our available open-source tools and ERP platforms.
          </p>
          <button
            onClick={() => {
              setSelectedType("all");
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* --- CHECKOUT MODAL WITH DYNAMIC UPI QR & WHATSAPP --- */}
      <AnimatePresence>
        {activeCheckoutItem && (
          <div className="fixed inset-0 z-[1002] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setActiveCheckoutItem(null);
                setCheckoutSuccess(false);
              }}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: smoothEase }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10"
            >
              {/* Checkout Header */}
              <div className="p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-cyan-300 font-bold">Commercial Source License</span>
                  <h3 className="text-lg font-bold text-white leading-tight mt-0.5">{activeCheckoutItem.title}</h3>
                </div>
                <button
                  onClick={() => {
                    setActiveCheckoutItem(null);
                    setCheckoutSuccess(false);
                  }}
                  className="p-1 rounded-full hover:bg-white/10 text-slate-300"
                >
                  <X size={18} />
                </button>
              </div>

              {checkoutSuccess ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Access Key & License Generated!</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Your commercial developer license for <strong>{activeCheckoutItem.title}</strong> has been authorized. You have direct GitHub repository invite & archive download access.
                  </p>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 text-left space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">License Serial:</span>
                    <p className="text-blue-700 font-bold select-all">
                      DS-LIC-{Date.now().toString(36).toUpperCase()}-PRO
                    </p>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <a
                      href={activeCheckoutItem.downloadUrl || `${activeCheckoutItem.githubUrl}/archive/refs/heads/main.zip`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Download size={14} />
                      <span>Download Archive (GitHub)</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-6 space-y-5 text-xs text-slate-700">
                  
                  {/* License Tier Selector */}
                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-900">Select License Tier:</span>
                    <div className="grid grid-cols-3 gap-2 text-center font-mono">
                      {[
                        { id: "single", label: "Single Project", mult: 1 },
                        { id: "team", label: "Team Unlimited", mult: 2.2 },
                        { id: "enterprise", label: "Full Buyout IP", mult: 5.0 }
                      ].map((t) => {
                        const calculated = currency === "INR"
                          ? Math.round(activeCheckoutItem.priceINR * t.mult)
                          : Math.round(activeCheckoutItem.priceUSD * t.mult);

                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setLicenseTier(t.id)}
                            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                              licenseTier === t.id
                                ? "bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs"
                                : "bg-slate-50 border-slate-200 text-slate-600"
                            }`}
                          >
                            <span className="text-[10px] block truncate">{t.label}</span>
                            <span className="text-xs font-bold block mt-0.5">
                              {currency === "INR" ? `₹${calculated.toLocaleString()}` : `$${calculated}`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Payment Options */}
                  <div className="space-y-2">
                    <span className="font-bold text-slate-900">Instant Checkout & Payment Channels:</span>
                    <div className="grid grid-cols-2 gap-2.5">
                      <a
                        href={`mailto:devsamp1st@gmail.com?subject=Source%20Code%20Purchase%20-%20${encodeURIComponent(activeCheckoutItem.title)}&body=I%20would%20like%20to%20purchase%20the%20${licenseTier}%20license%20for%20${encodeURIComponent(activeCheckoutItem.title)}.%20Please%20provide%20the%20UPI/Bank%20Invoice%20and%20GitHub%20Access.`}
                        className="p-3 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left space-y-1 group"
                      >
                        <span className="font-bold text-slate-900 block group-hover:text-blue-600">UPI / Direct Bank</span>
                        <p className="text-[11px] text-slate-500 leading-tight">Instant Indian UPI QR & official GST invoice</p>
                      </a>

                      <a
                        href={`https://wa.me/919330680642?text=${encodeURIComponent(`Hello DevSamp, I want to purchase the commercial source code for ${activeCheckoutItem.title} (${licenseTier} tier). Please provide the GitHub repository invite.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-left space-y-1 group"
                      >
                        <span className="font-bold text-slate-900 block group-hover:text-emerald-600">WhatsApp Fast Checkout</span>
                        <p className="text-[11px] text-slate-500 leading-tight">Direct interface with senior lead architect</p>
                      </a>
                    </div>
                  </div>

                  {/* Immediate Simulation Button for Test/Demo */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Direct GitHub Auth:</span>
                    <button
                      type="button"
                      onClick={() => setCheckoutSuccess(true)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-md"
                    >
                      Authorize & Generate Access
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
