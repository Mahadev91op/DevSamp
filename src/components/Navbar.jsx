"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
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
  CheckCircle2
} from "lucide-react";
import { navigationConfig } from "@/config/navigation";

const smoothEase = [0.16, 1, 0.3, 1];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  
  // Navigation States
  const [activeDropdown, setActiveDropdown] = useState(null); // id of active desktop dropdown
  const [hoveredTab, setHoveredTab] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMobileAccordions, setOpenMobileAccordions] = useState({});

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

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveDropdown(null);
    setIsMobileOpen(false);
  }

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

  // Active route matching helper
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

  // Dropdown hover timers
  const handleMouseEnter = (itemId) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    const targetItem = navigationConfig.primary.find(i => i.id === itemId);
    if (targetItem?.hasDropdown) {
      setActiveDropdown(itemId);
    } else {
      setActiveDropdown(null);
    }
    setHoveredTab(itemId);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredTab(null);
    }, 150);
  };

  const toggleMobileAccordion = (id) => {
    setOpenMobileAccordions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <>
      {/* Floating Desktop & Tablet Header */}
      <header ref={navRef} className="fixed top-0 left-0 right-0 z-[1000] flex justify-center p-3 md:p-5 select-none pointer-events-none">
        <motion.nav
          initial={{ y: -35, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className={`w-full max-w-5xl rounded-full border transition-all duration-400 pointer-events-auto flex items-center justify-between px-5 md:px-7 py-2.5 md:py-3 relative ${
            scrolled 
              ? "bg-white/90 backdrop-blur-2xl border-slate-200/90 shadow-lg shadow-slate-900/5 ring-1 ring-slate-900/5"
              : "bg-white/80 backdrop-blur-xl border-slate-200/70 shadow-sm"
          }`}
        >
          {/* Ambient gradient border glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 opacity-50 pointer-events-none -z-10" />

          {/* Logo */}
          <Link href="/" prefetch={true} className="relative group flex items-center gap-2.5 shrink-0" data-cursor="DevSamp">
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xs shadow-sm shadow-indigo-600/30 group-hover:scale-105 transition-transform duration-300">
                DS
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            <div className="text-lg font-black tracking-tight text-slate-950 flex items-center">
              <span>DEV</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 ml-0.5">SAMP</span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1 relative bg-slate-100/70 p-1 rounded-full border border-slate-200/60 backdrop-blur-sm">
            {navigationConfig.primary.map((item) => {
              if (item.enabled === false) return null;
              const isActive = isNavActive(item);
              const isMenuOpen = activeDropdown === item.id;

              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      prefetch={true}
                      onClick={() => setActiveDropdown(null)}
                      className={`relative px-3.5 py-1.5 text-xs font-bold transition-colors rounded-full flex items-center gap-1 cursor-pointer ${
                        isActive || isMenuOpen
                          ? "text-indigo-700 font-extrabold"
                          : "text-slate-700 hover:text-slate-950"
                      }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                      {item.hasDropdown && (
                        <ChevronDown 
                          size={12} 
                          className={`transition-transform duration-200 relative z-10 ${isMenuOpen ? "rotate-180 text-indigo-600" : "text-slate-400"}`} 
                        />
                      )}

                      {/* Active / Hover Capsule Slider */}
                      {isActive && (
                        <motion.span 
                          layoutId="navActiveCapsule" 
                          className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/90 z-0" 
                          transition={{ type: "spring", stiffness: 380, damping: 30 }} 
                        />
                      )}
                    </Link>
                  ) : (
                    <button
                      onClick={() => setActiveDropdown(isMenuOpen ? null : item.id)}
                      className={`relative px-3.5 py-1.5 text-xs font-bold transition-colors rounded-full flex items-center gap-1 cursor-pointer ${
                        isActive || isMenuOpen
                          ? "text-indigo-700 font-extrabold"
                          : "text-slate-700 hover:text-slate-950"
                      }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <ChevronDown 
                        size={12} 
                        className={`transition-transform duration-200 relative z-10 ${isMenuOpen ? "rotate-180 text-indigo-600" : "text-slate-400"}`} 
                      />
                    </button>
                  )}

                  {/* Dropdown Menu Panel */}
                  <AnimatePresence>
                    {isMenuOpen && item.groups && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: smoothEase }}
                        className={`absolute top-full mt-2.5 z-50 bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl shadow-xl p-5 text-left font-sans ${
                          item.groups.length > 1 ? "w-[480px] -left-20" : "w-[340px] -left-10"
                        }`}
                      >
                        {/* Header description */}
                        {item.description && (
                          <div className="pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
                            <p className="text-[11px] text-slate-500 font-medium leading-tight">
                              {item.description}
                            </p>
                          </div>
                        )}

                        {/* Grouped Columns */}
                        <div className={`grid gap-4 ${item.groups.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                          {item.groups.map((group, gIdx) => (
                            <div key={gIdx} className="space-y-1.5">
                              <span className="text-[10px] font-mono font-bold text-indigo-600 tracking-wider block px-2 uppercase">
                                {group.title}
                              </span>
                              <div className="space-y-0.5">
                                {group.items.map((sub, sIdx) => {
                                  if (sub.enabled === false) return null;
                                  const Icon = LucideIcons[sub.icon] || Info;

                                  return (
                                    <Link
                                      key={sIdx}
                                      href={sub.href}
                                      prefetch={true}
                                      onClick={() => setActiveDropdown(null)}
                                      className="flex items-start gap-2.5 p-2 rounded-2xl hover:bg-indigo-50/70 group transition-all"
                                    >
                                      <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-indigo-100/80 text-slate-600 group-hover:text-indigo-600 flex items-center justify-center shrink-0 transition-colors mt-0.5 shadow-2xs">
                                        <Icon size={15} />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 transition-colors truncate">
                                            {sub.label}
                                          </span>
                                          {sub.badge && (
                                            <span className="text-[9px] font-mono font-black px-1.5 py-0.2 rounded-md bg-indigo-100 text-indigo-700 uppercase">
                                              {sub.badge}
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-[11px] text-slate-500 group-hover:text-slate-600 line-clamp-1 leading-tight font-normal">
                                          {sub.description}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Action: CTA & Profile / Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* User Session Profile or CTA */}
            {user ? (
              <div 
                className="relative"
                onMouseEnter={() => setIsProfileHovered(true)}
                onMouseLeave={() => setIsProfileHovered(false)}
              >
                <button
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors cursor-pointer"
                  data-cursor="Profile"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="text-xs font-bold text-slate-800 max-w-[80px] truncate hidden sm:inline">
                    {user.name?.split(" ")[0]}
                  </span>
                  <ChevronDown size={12} className="text-slate-500" />
                </button>

                <AnimatePresence>
                  {isProfileHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-44 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-xl p-1.5 z-50 text-xs font-medium"
                    >
                      <Link 
                        href="/dashboard"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/70 transition-colors"
                      >
                        <LayoutDashboard size={14} />
                        <span>Client Dashboard</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                      >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href={navigationConfig.cta.href} prefetch={true} className="hidden sm:block">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 rounded-full bg-slate-950 hover:bg-indigo-600 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-1.5 group cursor-pointer"
                  data-cursor={navigationConfig.cta.dataCursor}
                >
                  <Sparkles size={12} className="text-indigo-400 group-hover:text-white transition-colors" />
                  <span>{navigationConfig.cta.label}</span>
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              </Link>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200 transition-colors cursor-pointer focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer (Accessible Sliding Panel) */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[1050] lg:hidden"
            />

            {/* Mobile Navigation Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white/98 backdrop-blur-2xl border-l border-slate-200 z-[1100] shadow-2xl flex flex-col justify-between p-6 overflow-y-auto lg:hidden"
            >
              {/* Drawer Top Header */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xs">
                      DS
                    </div>
                    <span className="text-base font-black text-slate-950 tracking-tight">
                      DEVSAMP
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Mobile Navigation List with Accordions */}
                <div className="py-4 space-y-1">
                  {navigationConfig.primary.map((item) => {
                    if (item.enabled === false) return null;
                    const isActive = isNavActive(item);
                    const isOpen = openMobileAccordions[item.id];

                    return (
                      <div key={item.id} className="border-b border-slate-100/80 last:border-none pb-1">
                        {item.hasDropdown ? (
                          <div>
                            <button
                              onClick={() => toggleMobileAccordion(item.id)}
                              className={`w-full py-3 px-2 flex items-center justify-between text-sm font-bold transition-colors rounded-xl cursor-pointer ${
                                isActive ? "text-indigo-700 font-extrabold bg-indigo-50/50" : "text-slate-800 hover:text-slate-950"
                              }`}
                            >
                              <span>{item.label}</span>
                              <ChevronDown 
                                size={14} 
                                className={`transition-transform duration-200 text-slate-400 ${isOpen ? "rotate-180 text-indigo-600" : ""}`}
                              />
                            </button>

                            {/* Accordion Sub-items */}
                            <AnimatePresence>
                              {isOpen && item.groups && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="pl-3 pr-1 py-1 space-y-1 bg-slate-50/80 rounded-2xl mb-2"
                                >
                                  {item.groups.map((group, gIdx) => (
                                    <div key={gIdx} className="space-y-0.5 pt-1">
                                      <span className="text-[9px] font-mono font-bold text-indigo-600 tracking-wider block px-2 uppercase">
                                        {group.title}
                                      </span>
                                      {group.items.map((sub, sIdx) => {
                                        if (sub.enabled === false) return null;
                                        const Icon = LucideIcons[sub.icon] || Info;

                                        return (
                                          <Link
                                            key={sIdx}
                                            href={sub.href}
                                            prefetch={true}
                                            onClick={() => setIsMobileOpen(false)}
                                            className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-white transition-colors"
                                          >
                                            <Icon size={14} className="text-slate-400 shrink-0" />
                                            <span className="truncate">{sub.label}</span>
                                            {sub.badge && (
                                              <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 ml-auto">
                                                {sub.badge}
                                              </span>
                                            )}
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href || "/"}
                            prefetch={true}
                            onClick={() => setIsMobileOpen(false)}
                            className={`w-full py-3 px-2 flex items-center justify-between text-sm font-bold transition-colors rounded-xl ${
                              isActive ? "text-indigo-700 font-extrabold bg-indigo-50/50" : "text-slate-800 hover:text-slate-950"
                            }`}
                          >
                            <span>{item.label}</span>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Bottom CTA & User Section */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileOpen(false)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <LayoutDashboard size={14} />
                      <span>Client Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href={navigationConfig.cta.href}
                    prefetch={true}
                    onClick={() => setIsMobileOpen(false)}
                    className="w-full py-3 rounded-full bg-slate-950 hover:bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                  >
                    <Sparkles size={14} className="text-indigo-400" />
                    <span>{navigationConfig.cta.label}</span>
                    <ArrowRight size={14} />
                  </Link>
                )}

                <div className="text-center text-[10px] font-mono text-slate-400">
                  © {new Date().getFullYear()} DevSamp Ecosystem
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;