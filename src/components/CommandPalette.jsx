"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  Command,
  CornerDownLeft,
  Boxes,
  Code2,
  Cpu,
  Terminal,
  LifeBuoy,
  Building2,
  ShieldCheck,
  Zap,
  Globe,
  FileText,
  Activity,
  Layers,
  HelpCircle,
  Users,
  Compass,
  Target,
  Briefcase,
  Mail,
  Lock,
  CreditCard,
  History,
  Workflow,
  Key,
  LayoutDashboard,
  TrendingUp,
  Award,
  AlertCircle
} from "lucide-react";
import { ECOSYSTEM_PAGES, ECOSYSTEM_SECTIONS } from "@/config/ecosystem-directory";

// Icon mapping helper
const iconMap = {
  Home: Globe,
  Info: HelpCircle,
  Compass: Compass,
  Target: Target,
  ShieldCheck: ShieldCheck,
  Cpu: Cpu,
  CreditCard: CreditCard,
  Users: Users,
  Briefcase: Briefcase,
  Sparkles: Sparkles,
  Rss: Activity,
  Bell: Activity,
  Handshake: Users,
  Mail: Mail,
  Calendar: Activity,
  Palette: Sparkles,
  Lock: Lock,
  FileText: FileText,
  Cookie: FileText,
  Eye: Sparkles,
  Activity: Activity,
  Network: Cpu,
  Boxes: Boxes,
  Layers: Layers,
  Scale: Activity,
  Flag: Target,
  History: History,
  Workflow: Workflow,
  Code2: Code2,
  Globe: Globe,
  Smartphone: Activity,
  Brain: Sparkles,
  Zap: Zap,
  Terminal: Terminal,
  Cloud: Cpu,
  ShieldAlert: ShieldCheck,
  LayoutDashboard: LayoutDashboard,
  Download: Activity,
  LifeBuoy: LifeBuoy,
  Key: Key,
  HelpCircle: HelpCircle,
  BookOpen: FileText,
  MessageSquare: HelpCircle,
  Wrench: Code2,
  Video: Activity,
  PhoneCall: Mail,
  Code: Code2,
  Gauge: Activity,
  AlertTriangle: AlertCircle,
  RefreshCw: History,
  Building2: Building2,
  Heart: Sparkles,
  GraduationCap: Target,
  Newspaper: FileText,
  Bug: AlertCircle,
  FileCheck: FileText,
  Server: Cpu,
  Award: Award,
  BellRing: Activity,
  BookMarked: FileText,
  FolderDown: FileText,
  ShoppingBag: Boxes,
  Grid: Layers,
  DollarSign: CreditCard,
  Github: Terminal,
  FlaskConical: Sparkles,
  TrendingUp: TrendingUp
};

export default function CommandPalette({ isOpen, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSection, setSelectedSection] = useState("all");
  const inputRef = useRef(null);
  const resultsContainerRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        inputRef.current?.focus();
        setSelectedIndex(0);
      }, 50);
    } else {
      timer = setTimeout(() => {
        setQuery("");
        setSelectedSection("all");
      }, 0);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);

  // Global Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via CustomEvent or parent callback
          window.dispatchEvent(new CustomEvent("devsamp:toggle-command-palette"));
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered pages based on search query and section filter
  const filteredPages = useMemo(() => {
    let list = ECOSYSTEM_PAGES;

    if (selectedSection !== "all") {
      list = list.filter((p) => p.sectionId === selectedSection);
    }

    if (!query.trim()) {
      // Return featured or top pages when query is empty
      return list.filter((p) => p.featured || selectedSection !== "all").slice(0, 15);
    }

    const cleanQuery = query.toLowerCase().trim();
    return list.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(cleanQuery);
      const matchDesc = item.description.toLowerCase().includes(cleanQuery);
      const matchCategory = item.category.toLowerCase().includes(cleanQuery);
      const matchKeywords = item.keywords?.some((k) => k.toLowerCase().includes(cleanQuery));
      const matchHref = item.href.toLowerCase().includes(cleanQuery);
      return matchTitle || matchDesc || matchCategory || matchKeywords || matchHref;
    }).slice(0, 20);
  }, [query, selectedSection]);

  // Keyboard navigation within search results
  const handleKeyNavigation = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredPages.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredPages.length - 1));
    } else if (e.key === "Enter" && filteredPages.length > 0) {
      e.preventDefault();
      const target = filteredPages[selectedIndex];
      if (target) {
        navigateTo(target.href);
      }
    }
  };

  const navigateTo = (href) => {
    onClose();
    router.push(href);
  };

  // Scroll active item into view
  useEffect(() => {
    const activeEl = resultsContainerRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-white/95 rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-950/20 overflow-hidden flex flex-col max-h-[80vh] z-10 ring-1 ring-slate-900/5 backdrop-blur-2xl"
          >
            {/* Top Search Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-white/80 gap-3">
              <Search className="w-5 h-5 text-indigo-600 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyNavigation}
                placeholder="Search across all 80+ DevSamp pages, services, APIs, and portals..."
                className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm md:text-base outline-none font-medium"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                <span>ESC</span>
              </div>
            </div>

            {/* Quick Filter Categories */}
            <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-100 bg-slate-50/70 overflow-x-auto no-scrollbar text-xs">
              <button
                onClick={() => { setSelectedSection("all"); setSelectedIndex(0); }}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
                  selectedSection === "all"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200/80"
                }`}
              >
                All Bundles (80+)
              </button>
              {ECOSYSTEM_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => { setSelectedSection(sec.id); setSelectedIndex(0); }}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
                    selectedSection === sec.id
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200/80"
                  }`}
                >
                  {sec.name}
                </button>
              ))}
            </div>

            {/* Search Results List */}
            <div ref={resultsContainerRef} className="flex-1 overflow-y-auto p-2 divide-y divide-slate-50 min-h-[260px] max-h-[420px]">
              {filteredPages.length > 0 ? (
                filteredPages.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  const IconComp = iconMap[item.icon] || Globe;

                  return (
                    <div
                      key={item.href + index}
                      data-index={index}
                      onClick={() => navigateTo(item.href)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-start gap-3.5 p-3 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? "bg-indigo-50/90 border border-indigo-200/70 shadow-xs"
                          : "hover:bg-slate-50 border border-transparent"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-slate-900 truncate">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">
                              {item.badge}
                            </span>
                          )}
                          <span className="text-[11px] text-slate-400 font-normal ml-auto shrink-0">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-normal">
                          {item.description}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="hidden sm:flex items-center text-indigo-600 shrink-0 self-center">
                          <CornerDownLeft className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center text-slate-500">
                  <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="font-semibold text-sm text-slate-800">No pages matching &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Try searching for &ldquo;ERP&rdquo;, &ldquo;API&rdquo;, &ldquo;SaaS&rdquo;, &ldquo;Support&rdquo;, &ldquo;Careers&rdquo;, or &ldquo;Pricing&rdquo;.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Keyboard Hint Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono shadow-2xs">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono shadow-2xs">↓</kbd>
                  to navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono shadow-2xs">↵</kbd>
                  to select
                </span>
              </div>
              <span className="font-semibold text-indigo-600">DevSamp Omni-Search</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
