"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  LayoutDashboard,
  LogOut,
  LogIn,
  Layers,
  Cpu,
  Boxes,
  Activity,
  ShieldCheck,
  TrendingUp,
  Target,
  Compass,
  Info,
  Terminal,
  Rss,
  Lock,
  Mail,
  Users,
  Briefcase,
  Flag,
  Code2,
  Workflow,
  Zap,
  CheckCircle2,
  Search,
  Globe,
  LifeBuoy,
  HelpCircle,
  BookOpen,
  CreditCard,
  Building2,
  FileText,
  History,
  Scale,
  Smartphone,
  Brain,
  Cloud,
  Phone,
  MessageCircle
} from "lucide-react";
import { navigationConfig } from "@/config/navigation";
import CommandPalette from "@/components/CommandPalette";

const smoothEase = [0.16, 1, 0.3, 1];

// Clean icon map lookup
const iconMap = {
  Home: Globe,
  Info: Info,
  Compass: Compass,
  Target: Target,
  ShieldCheck: ShieldCheck,
  Cpu: Cpu,
  CreditCard: CreditCard,
  Users: Users,
  Briefcase: Briefcase,
  Sparkles: Sparkles,
  Rss: Rss,
  Mail: Mail,
  Lock: Lock,
  FileText: FileText,
  Activity: Activity,
  Boxes: Boxes,
  Layers: Layers,
  Scale: Scale,
  Flag: Flag,
  History: History,
  Workflow: Workflow,
  Code2: Code2,
  Globe: Globe,
  Smartphone: Smartphone,
  Brain: Brain,
  Zap: Zap,
  Terminal: Terminal,
  Cloud: Cloud,
  LayoutDashboard: LayoutDashboard,
  LifeBuoy: LifeBuoy,
  HelpCircle: HelpCircle,
  BookOpen: BookOpen,
  Building2: Building2
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  // Navigation States
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMobileAccordions, setOpenMobileAccordions] = useState({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  // Check user session
  useEffect(() => {
    const checkUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } catch (e) {
        setUser(null);
      }
    };
    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    setUser(null);
    router.push("/login");
  };

  // Close dropdowns on route change
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      const timer = setTimeout(() => {
        setActiveDropdown(null);
        setIsMobileOpen(false);
        setIsSearchOpen(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Scroll detection
  useEffect(() => {
    let active = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== active) {
        active = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for global custom event to toggle command palette
  useEffect(() => {
    const handleToggle = () => {
      setIsSearchOpen((prev) => !prev);
    };
    window.addEventListener("devsamp:toggle-command-palette", handleToggle);
    return () => window.removeEventListener("devsamp:toggle-command-palette", handleToggle);
  }, []);

  // Click outside & Escape key listeners
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  // Robust active route matching helper (exact, nested, child)
  const isNavActive = (item) => {
    if (!item) return false;
    if (Array.isArray(item.match)) {
      return item.match.some((m) => pathname === m || (m !== "/" && pathname?.startsWith(m)));
    }
    if (item.match === "/") {
      return pathname === "/";
    }
    return pathname === item.match || (item.match && item.match !== "/" && pathname?.startsWith(item.match));
  };

  // Dropdown hover timers with intentional delay to prevent accidental closing
  const handleMouseEnter = (itemId) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    const targetItem = navigationConfig.primary.find((i) => i.id === itemId);
    if (targetItem?.hasDropdown) {
      setActiveDropdown(itemId);
    } else {
      setActiveDropdown(null);
    }
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleMobileAccordion = (id) => {
    setOpenMobileAccordions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <>
      {/* Omni-Search Command Palette (Ctrl+K or ⌘K) */}
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Floating Desktop & Tablet Header */}
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[1000] flex justify-center p-2.5 sm:p-4 md:p-5 select-none pointer-events-none"
      >
        <motion.nav
          role="navigation"
          aria-label="Main Navigation"
          initial={{ y: -35, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className={`w-full max-w-6xl xl:max-w-7xl rounded-full border transition-all duration-300 pointer-events-auto flex items-center justify-between px-3.5 sm:px-5 md:px-6 py-2 relative ${
            scrolled
              ? "bg-white/95 backdrop-blur-2xl border-slate-200/90 shadow-xl shadow-slate-900/6 ring-1 ring-slate-900/5"
              : "bg-white/90 backdrop-blur-xl border-slate-200/75 shadow-md shadow-slate-900/3"
          }`}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-cyan-600/5 blur-sm opacity-60 pointer-events-none" />

          {/* LEFT: DevSamp Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2.5 group cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none rounded-xl p-0.5"
              aria-label="DevSamp Home"
              data-cursor="Home"
            >
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all">
                <div className="w-full h-full rounded-[10px] bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-600 flex items-center justify-center text-white font-black text-xs md:text-sm tracking-tighter">
                  DS
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-sm md:text-base tracking-tight text-slate-950 group-hover:text-blue-600 transition-colors">
                  DevSamp
                </span>
                <span className="text-[9px] uppercase tracking-widest text-blue-600 font-bold -mt-0.5">
                  Ecosystem
                </span>
              </div>
            </Link>
          </div>

          {/* CENTER: Primary Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 relative">
            {navigationConfig.primary.map((item) => {
              const active = isNavActive(item);
              const isOpen = activeDropdown === item.id;

              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.hasDropdown ? (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => setActiveDropdown(isOpen ? null : item.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                        active || isOpen
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/25"
                          : "text-slate-700 hover:text-blue-600 hover:bg-blue-50/80"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                        active
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/25"
                          : "text-slate-700 hover:text-blue-600 hover:bg-blue-50/80"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* MEGA MENU FLYOUT */}
                  <AnimatePresence>
                    {isOpen && item.hasDropdown && (
                      <motion.div
                        role="region"
                        aria-label={`${item.label} Submenu`}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: smoothEase }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-3.5 w-[560px] xl:w-[620px] bg-white/98 rounded-3xl border border-slate-200/90 shadow-2xl p-5 z-50 ring-1 ring-slate-900/5 backdrop-blur-2xl"
                      >
                        {/* Mega Menu Header */}
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs">
                          <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                            {item.label} Hub
                          </span>
                          <span className="text-[11px] text-slate-500 font-normal line-clamp-1 max-w-[340px]">
                            {item.description}
                          </span>
                        </div>

                        {/* Mega Menu Columns Grid */}
                        <div className={`grid gap-4 ${item.groups?.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                          {item.groups?.map((group, gIdx) => (
                            <div key={gIdx} className="space-y-1">
                              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2.5 mb-1.5">
                                {group.title}
                              </p>
                              {group.items.map((sub, sIdx) => {
                                const IconC = iconMap[sub.icon] || Globe;
                                return (
                                  <Link
                                    key={sIdx}
                                    href={sub.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 group/item transition-all focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                                  >
                                    <div className="p-1.5 rounded-lg bg-slate-100 group-hover/item:bg-blue-600 group-hover/item:text-white text-slate-600 transition-colors shrink-0 mt-0.5">
                                      <IconC size={14} />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-bold text-slate-900 group-hover/item:text-blue-600 transition-colors truncate">
                                          {sub.label}
                                        </span>
                                        {sub.badge && (
                                          <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-100 shrink-0">
                                            {sub.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                                        {sub.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          ))}
                        </div>

                        {/* View All & Featured Card Footer (Solves Dropdown Cutoff!) */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                          {item.viewAll && (
                            <Link
                              href={item.viewAll.href}
                              onClick={() => setActiveDropdown(null)}
                              className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 group/viewall"
                            >
                              <span>{item.viewAll.label}</span>
                              <ArrowRight size={12} className="group-hover/viewall:translate-x-0.5 transition-transform" />
                            </Link>
                          )}

                          {item.featuredCard && (
                            <Link
                              href={item.featuredCard.href}
                              onClick={() => setActiveDropdown(null)}
                              className="text-[11px] font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1 transition-colors ml-auto"
                            >
                              <span className="text-slate-400 font-normal">Featured:</span>
                              <span className="truncate max-w-[200px]">{item.featuredCard.title}</span>
                              <ArrowUpRight size={11} className="text-blue-600" />
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Search Trigger + Primary CTA (Desktop & Mobile Refined) */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
            {/* Desktop Search Trigger Button (Ctrl+K or ⌘K) */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 text-xs font-medium transition-all cursor-pointer border border-slate-200/80 shadow-2xs focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
              title="Search entire ecosystem (Ctrl+K or ⌘K)"
              aria-label="Search Ecosystem"
            >
              <Search size={13} className="text-blue-600" />
              <span className="text-[11px] text-slate-500 font-normal">Search</span>
              <kbd className="text-[9px] font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Icon-Only Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="sm:hidden p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 shadow-2xs cursor-pointer"
              aria-label="Search Ecosystem"
            >
              <Search size={15} className="text-blue-600" />
            </button>

            {/* Mobile Quick WhatsApp Action */}
            <a
              href="https://wa.me/919330680642"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-[11px] font-bold shadow-2xs transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={13} className="text-emerald-600 shrink-0" />
              <span>WhatsApp</span>
            </a>

            {/* Desktop Primary CTA (Start a Project) */}
            <Link href={navigationConfig.cta.href} className="hidden lg:block">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                data-cursor={navigationConfig.cta.dataCursor}
              >
                <span>{navigationConfig.cta.label}</span>
                <ArrowRight size={12} />
              </motion.button>
            </Link>

            {/* Mobile Drawer Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 rounded-full bg-slate-950 text-white hover:bg-blue-600 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none cursor-pointer shadow-sm"
              aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* --- COMPREHENSIVE MOBILE ECOSYSTEM DRAWER --- */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-[1100] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: smoothEase }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col z-10 overflow-hidden"
            >
              {/* Top Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white font-black text-xs shadow-md shadow-blue-500/25">
                    DS
                  </div>
                  <div>
                    <h2 className="font-extrabold text-sm text-slate-950 leading-tight">DevSamp Ecosystem</h2>
                    <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Software Directory</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Mobile Omni-Search Bar Button */}
              <div className="p-3 border-b border-slate-100 bg-slate-50/70">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 text-xs font-medium shadow-2xs hover:border-blue-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Search size={14} className="text-blue-600" />
                    <span>Search all products & docs...</span>
                  </div>
                  <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-mono">
                    ⌘K
                  </span>
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                
                {/* 1. Quick Access Platform Tiles (1-tap to all core platforms) */}
                <div>
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Core Platforms</span>
                    <span className="text-[10px] text-blue-600 font-bold">1-Tap Launch</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { href: "/products/mederp-pro", label: "MedERP Pro", desc: "Hospital ERP", icon: Activity, badge: "Flagship" },
                      { href: "/products", label: "All Products", desc: "SaaS Catalog", icon: Boxes },
                      { href: "/services", label: "Services", desc: "Engineering Pods", icon: Layers },
                      { href: "/marketplace", label: "Marketplace", desc: "Source Repos", icon: Code2, badge: "Store" },
                      { href: "/pricing", label: "Pricing", desc: "Blueprint Plans", icon: CreditCard },
                      { href: "/case-studies", label: "Case Studies", desc: "Client Results", icon: Sparkles },
                      { href: "/open-source", label: "Open Source", desc: "Free Starters", icon: Globe },
                      { href: "/glossary", label: "Tech Glossary", desc: "SaaS Terms", icon: BookOpen },
                      { href: "/developers", label: "Developer APIs", desc: "SDKs & Webhooks", icon: Terminal },
                      { href: "/status", label: "Live Status", desc: "99.9% Uptime", icon: ShieldCheck, badge: "Live" }
                    ].map((tile, tIdx) => {
                      const TileIcon = tile.icon;
                      return (
                        <Link
                          key={tIdx}
                          href={tile.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 transition-all flex flex-col justify-between group"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <TileIcon size={16} className="text-blue-600 group-hover:scale-110 transition-transform" />
                            {tile.badge && (
                              <span className="text-[8px] font-extrabold uppercase px-1 py-0.2 rounded bg-blue-100 text-blue-700">
                                {tile.badge}
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block group-hover:text-blue-600 transition-colors truncate">
                              {tile.label}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium block truncate">
                              {tile.desc}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Collapsible Nav Accordions for Deep Navigation */}
                <div>
                  <div className="px-1 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Ecosystem Architecture</span>
                  </div>
                  <div className="space-y-2">
                    {navigationConfig.primary.map((item) => {
                      const isAccordionOpen = !!openMobileAccordions[item.id];

                      return (
                        <div key={item.id} className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/40">
                          {item.hasDropdown ? (
                            <>
                              <button
                                type="button"
                                onClick={() => toggleMobileAccordion(item.id)}
                                aria-expanded={isAccordionOpen}
                                className="w-full flex items-center justify-between p-3.5 text-left text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-100/60 transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <span>{item.label}</span>
                                  {item.badge && (
                                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-extrabold border border-blue-100">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <ChevronDown
                                  size={15}
                                  className={`text-slate-400 transition-transform duration-200 ${
                                    isAccordionOpen ? "rotate-180" : ""
                                  }`}
                                />
                              </button>

                              <AnimatePresence>
                                {isAccordionOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="px-3 pb-3 pt-1 border-t border-slate-100 bg-white space-y-3"
                                  >
                                    {item.groups?.map((group, gIdx) => (
                                      <div key={gIdx} className="space-y-1">
                                        <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 px-2">
                                          {group.title}
                                        </p>
                                        {group.items.map((sub, sIdx) => {
                                          const SubIcon = iconMap[sub.icon] || Globe;
                                          return (
                                            <Link
                                              key={sIdx}
                                              href={sub.href}
                                              onClick={() => setIsMobileOpen(false)}
                                              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 text-xs font-semibold"
                                            >
                                              <SubIcon size={14} className="text-blue-600 shrink-0" />
                                              <span className="truncate">{sub.label}</span>
                                              {sub.badge && (
                                                <span className="text-[8px] font-black uppercase px-1 py-0.2 rounded bg-blue-50 text-blue-700 ml-auto">
                                                  {sub.badge}
                                                </span>
                                              )}
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    ))}

                                    {item.viewAll && (
                                      <div className="pt-2 border-t border-slate-100">
                                        <Link
                                          href={item.viewAll.href}
                                          onClick={() => setIsMobileOpen(false)}
                                          className="text-xs font-bold text-blue-600 flex items-center justify-between p-2 rounded-xl hover:bg-blue-50"
                                        >
                                          <span>{item.viewAll.label}</span>
                                          <ArrowRight size={12} />
                                        </Link>
                                      </div>
                                    )}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={() => setIsMobileOpen(false)}
                              className="flex items-center justify-between p-3.5 text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-100/60"
                            >
                              <span>{item.label}</span>
                              <ArrowRight size={14} className="text-slate-400" />
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Bottom Mobile Drawer Actions & Direct Connect */}
              <div className="p-4 border-t border-slate-200/80 bg-slate-50 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://wa.me/919330680642"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="tel:+919330680642"
                    className="py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all"
                  >
                    <Phone size={14} className="text-blue-600" />
                    <span>Call Squad</span>
                  </a>
                </div>

                <Link
                  href={navigationConfig.cta.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all"
                >
                  <span>{navigationConfig.cta.label}</span>
                  <ArrowRight size={14} />
                </Link>

                <div className="flex items-center justify-between pt-1 px-1 text-[11px] text-slate-500">
                  <span>devsamp1st@gmail.com</span>
                  <Link href="/account" onClick={() => setIsMobileOpen(false)} className="font-bold text-blue-600 hover:underline">
                    Client Portal →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- NATIVE MOBILE APP FLOATING DOCK (Bottom Navigation) --- */}
      <nav 
        aria-label="Mobile Bottom App Bar" 
        className="md:hidden fixed bottom-3.5 left-4 right-4 z-40 bg-slate-950/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-1.5 px-2 flex items-center justify-around text-slate-300 font-sans select-none"
      >
        {[
          { href: "/", label: "Home", icon: Globe, match: (p) => p === "/" },
          { href: "/products", label: "Products", icon: Boxes, match: (p) => p.startsWith("/products") },
          { href: "/services", label: "Services", icon: Layers, match: (p) => p.startsWith("/services") },
          { action: () => setIsSearchOpen(true), label: "Search", icon: Search },
          { action: () => setIsMobileOpen(true), label: "Menu", icon: Menu }
        ].map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = tab.match ? tab.match(pathname) : false;

          if (tab.action) {
            return (
              <button
                key={idx}
                type="button"
                onClick={tab.action}
                className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400 hover:text-white transition-all active:scale-95 cursor-pointer"
              >
                <div className={`w-8 h-8 rounded-full ${tab.label === 'Menu' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' : 'bg-white/10 text-cyan-400'} flex items-center justify-center shadow-xs mb-0.5`}>
                  <Icon size={15} />
                </div>
                <span className="text-[10px] font-bold text-slate-400">{tab.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={idx}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all active:scale-95 relative cursor-pointer ${
                isActive ? "text-white font-bold" : "text-slate-400 hover:text-slate-200 font-medium"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-dock-active"
                  className="absolute inset-0 bg-white/15 rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon size={16} className={`mb-0.5 ${isActive ? "text-blue-400 scale-110" : "text-slate-400"} transition-all`} />
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}