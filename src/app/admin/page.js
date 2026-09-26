"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { 
  LayoutDashboard, Users, Layers, Plus, Loader2, LogOut, Menu, X, 
  CheckCircle2, AlertCircle, Briefcase, PenBox, Trash2, Search, ExternalLink, 
  CreditCard, Star, MessageCircle, TrendingUp, Filter, Rss, Download, Wand2, 
  Eye, Mail, ChevronLeft, ChevronRight, Image as ImageIcon, Maximize2, Minimize2, 
  BarChart3, Activity, ArrowRight, Zap, FolderKanban, Clock, Save, Link as LinkIcon, 
  DollarSign, FileText, UploadCloud, File, Calendar as CalendarIcon, Building2,
  Code2, Github, Sparkles, ShieldCheck, Globe, Compass, Target, HelpCircle,
  Settings, RefreshCw, Smartphone, ChevronDown, Check, ToggleLeft, ToggleRight,
  Boxes, Cpu, Server, CheckSquare, Edit3, Monitor, Tablet, Database, KeyRound
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const smoothEase = [0.16, 1, 0.3, 1];

// Helper: Format Relative Time
const formatTimeAgo = (dateStr) => {
  if (!dateStr) return "Recently";
  const d = new Date(dateStr);
  const diffSec = Math.floor((new Date() - d) / 1000);
  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const [activeTab, setActiveTab] = useState("dashboard"); 
  const [toast, setToast] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [savingSection, setSavingSection] = useState(null);
  
  // Live Simulator Viewport Mode
  const [simulatorUrl, setSimulatorUrl] = useState("/");
  const [simulatorDevice, setSimulatorDevice] = useState("desktop"); // desktop, tablet, mobile
  const [showSimulator, setShowSimulator] = useState(false);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");

  // Master Ecosystem Data
  const [data, setData] = useState({
    leads: [],
    products: [],
    sourceCodes: [],
    services: [],
    ecosystemItems: [],
    industries: [],
    pricing: [],
    reviews: [],
    team: [],
    customers: [],
    sections: [],
    siteSettings: {
      siteName: "DevSamp",
      tagline: "Technology • Software Products • SaaS • Digital Solutions Ecosystem",
      contactEmail: "devsamp1st@gmail.com",
      contactPhone: "+91 9330680642",
      address: "India",
      heroEyebrow: "Technology • Software Products • Ecosystem",
      heroTitle: "Building, Operating & Scaling Digital Ecosystems with Next-Gen Products & Engineering",
      heroDescription: "DevSamp powers modern enterprises with high-performance software products, scalable cloud platforms, and bespoke technology services."
    }
  });

  // Active Modals & Forms
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [editingItem, setEditingItem] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Fetch All Master Data from MongoDB
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [
        contactRes, productsRes, sourceCodesRes, servicesRes,
        ecosystemRes, industriesRes, pricingRes, reviewsRes,
        teamRes, customersRes, homepageRes
      ] = await Promise.all([
        fetch("/api/contact").then(r => r.json()).catch(() => ({ contacts: [] })),
        fetch("/api/products").then(r => r.json()).catch(() => ({ products: [] })),
        fetch("/api/source-code").then(r => r.json()).catch(() => ({ data: [] })),
        fetch("/api/services").then(r => r.json()).catch(() => ({ services: [] })),
        fetch("/api/ecosystem").then(r => r.json()).catch(() => ({ ecosystem: [] })),
        fetch("/api/industries").then(r => r.json()).catch(() => ({ data: { industries: [] } })),
        fetch("/api/pricing").then(r => r.json()).catch(() => ({ pricing: [] })),
        fetch("/api/reviews").then(r => r.json()).catch(() => ({ reviews: [] })),
        fetch("/api/team").then(r => r.json()).catch(() => ({ team: [] })),
        fetch("/api/customers?admin=true").then(r => r.json()).catch(() => ({ data: { customers: [] } })),
        fetch("/api/homepage").then(r => r.json()).catch(() => ({ sections: [], settings: null }))
      ]);

      setData({
        leads: contactRes.contacts || [],
        products: productsRes.products || [],
        sourceCodes: sourceCodesRes.data || [],
        services: servicesRes.services || [],
        ecosystemItems: ecosystemRes.ecosystem || [],
        industries: industriesRes.data?.industries || industriesRes.industries || [],
        pricing: pricingRes.pricing || [],
        reviews: reviewsRes.reviews || [],
        team: teamRes.team || [],
        customers: customersRes.data?.customers || customersRes.customers || [],
        sections: homepageRes.sections || [],
        siteSettings: homepageRes.settings || null
      });
    } catch (e) {
      console.error("Fetch all data failed:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Persistent Session Checker (Cookie + LocalStorage Token)
  useEffect(() => {
    const checkPersistentSession = async () => {
      try {
        const storedToken = typeof window !== "undefined" ? localStorage.getItem("devsamp_admin_token") : null;
        
        const headers = {};
        if (storedToken) {
          headers["Authorization"] = `Bearer ${storedToken}`;
        }

        const res = await fetch("/api/admin/auth", { headers });
        const json = await res.json();
        
        if (res.ok && (json.authenticated || json.isAuthenticated)) {
          setIsAuthenticated(true);
          fetchAllData();
        } else if (storedToken) {
          // If stored token exists, attempt direct auto-login
          setIsAuthenticated(true);
          fetchAllData();
        }
      } catch (err) {
        console.error("Persistent session check error:", err);
      } finally {
        setIsCheckingSession(false);
      }
    };
    checkPersistentSession();
  }, [fetchAllData]);

  // Login handler with persistent 30-day token
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, rememberMe })
      });
      const resJson = await res.json();
      if (res.ok && (resJson.success || resJson.authenticated || resJson.isAuthenticated)) {
        setIsAuthenticated(true);
        if (resJson.token && typeof window !== "undefined") {
          localStorage.setItem("devsamp_admin_token", resJson.token);
        }
        fetchAllData();
        showToast("✓ Access Granted! Session remembered for 30 days.");
      } else {
        showToast(resJson.message || "Invalid Admin Passkey", "error");
      }
    } catch (err) {
      showToast("Server connection error", "error");
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("devsamp_admin_token");
      }
      await fetch("/api/admin/auth", { method: "DELETE" });
      setIsAuthenticated(false);
      setPassword("");
      showToast("Admin session ended successfully");
    } catch (err) {
      showToast("Logout error", "error");
    }
  };

  // Export Full Database JSON Backup
  const handleExportBackup = () => {
    const backupJson = JSON.stringify(data, null, 2);
    const blob = new Blob([backupJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `devsamp-db-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    showToast("✓ Complete Database Backup Exported!");
  };

  // Trigger Master Seeder
  const handleTriggerSeed = async () => {
    if (!confirm("Run master baseline database seeder? Missing records will be restored.")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/seed");
      if (res.ok) {
        showToast("✓ Database Seeder Completed Successfully!");
        fetchAllData();
      }
    } catch (e) {
      showToast("Seed error", "error");
    } finally {
      setLoading(false);
    }
  };

  // --- SAVE / UPDATE HANDLERS (LIVE DB SYNC) ---

  const handleSaveSiteSettings = async (e) => {
    e.preventDefault();
    setSavingSection("settings");
    try {
      const res = await fetch("/api/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "site-setting",
          settings: data.siteSettings
        })
      });
      if (res.ok) {
        showToast("✓ Site Branding & Settings Synchronized Live!");
      } else {
        showToast("Failed to save settings", "error");
      }
    } catch (err) {
      showToast("Error updating settings", "error");
    } finally {
      setSavingSection(null);
    }
  };

  const handleSaveSection = async (sec) => {
    setSavingSection(sec.key);
    try {
      const res = await fetch("/api/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sec)
      });
      if (res.ok) {
        showToast(`✓ Section [${sec.key}] Updated Live!`);
      } else {
        showToast("Error updating section", "error");
      }
    } catch (err) {
      showToast("Connection error", "error");
    } finally {
      setSavingSection(null);
    }
  };

  const handleSaveEntity = async (endpoint, payload, isEdit = false) => {
    setLoading(true);
    try {
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const resJson = await res.json();
      if (res.ok) {
        showToast(`✓ ${isEdit ? "Updated" : "Created"} successfully in Database!`);
        setIsModalOpen(false);
        setEditingItem(null);
        fetchAllData();
      } else {
        showToast(resJson.error || resJson.message || "Failed to save record", "error");
      }
    } catch (err) {
      showToast("Network error while saving", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEntity = async (endpoint, id, name = "Record") => {
    if (!confirm(`Are you sure you want to delete ${name}? This action is immediate.`)) return;
    setLoading(true);
    try {
      const res = await fetch(`${endpoint}?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast(`✓ ${name} deleted successfully from Live DB!`);
        fetchAllData();
      } else {
        showToast("Failed to delete record", "error");
      }
    } catch (err) {
      showToast("Error deleting record", "error");
    } finally {
      setLoading(false);
    }
  };

  // Navigation Items Config
  const NAV_ITEMS = [
    { id: "dashboard", label: "Executive HUD", icon: LayoutDashboard, badge: "LIVE" },
    { id: "homepage", label: "Homepage & Hero CMS", icon: Globe, badge: "CMS" },
    { id: "source-code", label: "Source Code Store", icon: Code2, count: data.sourceCodes.length },
    { id: "products", label: "Flagship Products", icon: Boxes, count: data.products.length },
    { id: "services", label: "Engineering Services", icon: Layers, count: data.services.length },
    { id: "ecosystem", label: "Ecosystem & Nodes", icon: Compass, count: data.ecosystemItems.length },
    { id: "industries", label: "Industry Solutions", icon: Building2, count: data.industries.length },
    { id: "pricing", label: "Pricing & Plans", icon: CreditCard, count: data.pricing.length },
    { id: "leads", label: "Client Inquiries CRM", icon: Mail, count: data.leads.length, badge: data.leads.length > 0 ? `${data.leads.length}` : null },
    { id: "reviews", label: "Developer Reviews", icon: Star, count: data.reviews.length },
    { id: "settings", label: "Site Settings & Brand", icon: Settings },
  ];

  // If Checking Session
  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4 font-mono">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 animate-spin">
          <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
            <Activity size={20} className="text-cyan-400" />
          </div>
        </div>
        <p className="text-xs text-slate-400 tracking-widest uppercase">Verifying Admin Session...</p>
      </div>
    );
  }

  // If Not Authenticated -> Render Login Screen with 30-Day Remember Toggle
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: smoothEase }}
          className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40 space-y-6 text-slate-900 relative z-10"
        >
          {/* Logo Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/25 mx-auto flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-300">
                <Code2 size={24} />
              </div>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">DevSamp Admin Control Plane</h1>
            <p className="text-xs text-slate-500 font-normal">
              Direct access to live database, CMS engines, and source repository store.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase text-slate-500 font-mono tracking-wider">
                Admin Master Passkey
              </label>
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all font-mono"
              />
            </div>

            {/* Remember Me 30 Days Checkbox */}
            <div className="flex items-center justify-between text-xs text-slate-600">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="font-medium">Remember this browser (30 Days)</span>
              </label>
              <span className="text-[10px] text-emerald-600 font-bold font-mono">Persistent Auth</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
              <span>{loading ? "Authenticating Session..." : "Authorize & Remember Device"}</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Database Connected</span>
            </span>
            <span>v2.4.0 Live Monolith</span>
          </div>
        </motion.div>

        {toast && (
          <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[300] px-5 py-2.5 rounded-full text-xs font-bold text-white shadow-xl flex items-center gap-2 ${
            toast.type === "error" ? "bg-red-600" : "bg-emerald-600"
          }`}>
            {toast.type === "error" ? <AlertCircle size={15} /> : <CheckCircle2 size={15} />}
            <span>{toast.message}</span>
          </div>
        )}
      </div>
    );
  }

  // --- AUTHENTICATED MASTER ADMIN DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900 font-sans">
      
      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className="w-full md:w-72 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 text-white flex flex-col justify-between border-r border-indigo-500/20 shrink-0 select-none">
        
        {/* Top Brand Header */}
        <div className="p-5 border-b border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <Link href="/" target="_blank" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-sm">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-300">
                  <Code2 size={18} />
                </div>
              </div>
              <div>
                <h2 className="text-base font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  DevSamp
                </h2>
                <p className="text-[10px] font-mono text-cyan-400 font-bold">CONTROL PLANE</p>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-slate-300 transition-colors cursor-pointer"
              title="Logout from Admin"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* Navigation Items List */}
        <nav className="p-3 space-y-1 overflow-y-auto flex-1 no-scrollbar">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSearchTerm("");
                }}
                className={`w-full px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between group cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className={isActive ? "text-cyan-300" : "text-slate-400 group-hover:text-cyan-300"} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    {item.badge}
                  </span>
                )}
                {item.count !== undefined && !item.badge && (
                  <span className="text-[10px] font-mono text-slate-400 bg-white/10 px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Status & Quick Utilities */}
        <div className="p-4 border-t border-white/10 bg-black/20 text-xs font-mono text-slate-400 space-y-2">
          <div className="flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PERSISTENT AUTH</span>
            </span>
            <button
              onClick={fetchAllData}
              disabled={loading}
              className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw size={11} className={loading ? "animate-spin" : ""} />
              <span>Sync</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleExportBackup}
              className="flex-1 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] text-slate-200 font-bold flex items-center justify-center gap-1"
              title="Download Full JSON Database Backup"
            >
              <Download size={11} />
              <span>Backup</span>
            </button>

            <button
              onClick={handleTriggerSeed}
              className="py-1 px-2 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] text-amber-300 font-bold flex items-center justify-center gap-1"
              title="Restore / Seed Baseline Items"
            >
              <Database size={11} />
              <span>Seed</span>
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN WORKSPACE CONSOLE --- */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-100 overflow-y-auto max-h-screen">
        
        {/* Top Console Bar */}
        <header className="bg-white px-6 py-4 border-b border-slate-200 sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight capitalize">
                {NAV_ITEMS.find((n) => n.id === activeTab)?.label || "Control Console"}
              </h1>
              <p className="text-xs text-slate-500 font-normal">
                Direct CMS editor with instantaneous real-time sync across 90+ ecosystem routes.
              </p>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setShowSimulator(!showSimulator);
                setSimulatorUrl(activeTab === "source-code" ? "/marketplace" : activeTab === "products" ? "/products" : "/");
              }}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Monitor size={13} />
              <span>{showSimulator ? "Hide Live Simulator" : "Live Page Simulator"}</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <ExternalLink size={13} />
              <span>Open Site</span>
            </Link>

            <button
              onClick={fetchAllData}
              disabled={loading}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm shadow-blue-500/25 cursor-pointer"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              <span>{loading ? "Syncing..." : "Sync DB"}</span>
            </button>
          </div>
        </header>

        {/* Live Simulator Viewport Pane */}
        {showSimulator && (
          <div className="bg-slate-950 p-4 border-b border-indigo-500/30 flex flex-col items-center space-y-3">
            <div className="flex items-center justify-between w-full max-w-5xl text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-bold uppercase">Simulator Route:</span>
                <input
                  type="text"
                  value={simulatorUrl}
                  onChange={(e) => setSimulatorUrl(e.target.value)}
                  className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-xs outline-none"
                />
              </div>

              <div className="flex items-center gap-2 bg-white/10 p-1 rounded-xl">
                <button
                  onClick={() => setSimulatorDevice("desktop")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                    simulatorDevice === "desktop" ? "bg-blue-600 text-white" : "text-slate-400"
                  }`}
                >
                  <Monitor size={12} />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setSimulatorDevice("tablet")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                    simulatorDevice === "tablet" ? "bg-blue-600 text-white" : "text-slate-400"
                  }`}
                >
                  <Tablet size={12} />
                  <span>Tablet</span>
                </button>
                <button
                  onClick={() => setSimulatorDevice("mobile")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                    simulatorDevice === "mobile" ? "bg-blue-600 text-white" : "text-slate-400"
                  }`}
                >
                  <Smartphone size={12} />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            <div
              className={`bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 border-4 border-slate-800 ${
                simulatorDevice === "desktop" ? "w-full max-w-5xl h-[520px]" :
                simulatorDevice === "tablet" ? "w-[768px] h-[520px]" :
                "w-[390px] h-[520px]"
              }`}
            >
              <iframe
                src={simulatorUrl}
                title="Live Simulator"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        )}

        {/* Inner Scrollable View Body */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          
          {/* ========================================================================= */}
          {/* TAB 1: EXECUTIVE HUD DASHBOARD                                            */}
          {/* ========================================================================= */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>TOTAL INQUIRIES</span>
                    <Mail size={16} className="text-blue-600" />
                  </div>
                  <p className="text-3xl font-black text-slate-900 font-mono">{data.leads.length}</p>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Active Pipeline
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>FLAGSHIP PRODUCTS</span>
                    <Boxes size={16} className="text-indigo-600" />
                  </div>
                  <p className="text-3xl font-black text-slate-900 font-mono">{data.products.length}</p>
                  <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">
                    Deployed SaaS
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>SOURCE REPOSITORIES</span>
                    <Code2 size={16} className="text-cyan-600" />
                  </div>
                  <p className="text-3xl font-black text-slate-900 font-mono">{data.sourceCodes.length}</p>
                  <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded">
                    GitHub Integrated
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>ENGINEERING SERVICES</span>
                    <Layers size={16} className="text-emerald-600" />
                  </div>
                  <p className="text-3xl font-black text-slate-900 font-mono">{data.services.length}</p>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Custom Pods
                  </span>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white border border-indigo-500/30 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-cyan-300 font-bold">Fast Master Controls</span>
                    <h3 className="text-xl font-bold text-white">Direct Ecosystem Quick Actions</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <button
                    onClick={() => {
                      setActiveTab("source-code");
                      setModalType("source-code");
                      setEditingItem(null);
                      setIsModalOpen(true);
                    }}
                    className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-left space-y-1 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 font-bold text-cyan-300 text-xs">
                      <Plus size={14} />
                      <span>Publish Source Code</span>
                    </div>
                    <p className="text-[11px] text-slate-300">Add free or paid repository to marketplace</p>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("products");
                      setModalType("product");
                      setEditingItem(null);
                      setIsModalOpen(true);
                    }}
                    className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-left space-y-1 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 font-bold text-indigo-300 text-xs">
                      <Plus size={14} />
                      <span>Deploy New SaaS</span>
                    </div>
                    <p className="text-[11px] text-slate-300">Register new flagship software application</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("homepage")}
                    className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-left space-y-1 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 font-bold text-emerald-300 text-xs">
                      <Globe size={14} />
                      <span>Edit Hero CMS</span>
                    </div>
                    <p className="text-[11px] text-slate-300">Live update headlines, badges and CTA buttons</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("leads")}
                    className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-left space-y-1 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 font-bold text-amber-300 text-xs">
                      <Mail size={14} />
                      <span>Inspect Inquiries</span>
                    </div>
                    <p className="text-[11px] text-slate-300">Review new client requests & quotes</p>
                  </button>
                </div>
              </div>

              {/* Recent Inquiries List */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Latest Client Consultations & Leads</h3>
                    <p className="text-xs text-slate-500">Incoming prospective client scopes from contact forms</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("leads")}
                    className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    View All Leads ({data.leads.length}) →
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {data.leads.slice(0, 5).map((lead, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                      <div>
                        <p className="font-bold text-slate-900">{lead.name} <span className="text-slate-400 font-normal">• {lead.email}</span></p>
                        <p className="text-slate-600 line-clamp-1 mt-0.5">{lead.message}</p>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono shrink-0">
                        {formatTimeAgo(lead.createdAt)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: HOMEPAGE & HERO CMS                                                */}
          {/* ========================================================================= */}
          {activeTab === "homepage" && (
            <div className="space-y-8">
              
              {/* Hero Banner Section Live Editor */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded font-mono">
                      HERO SECTION CMS
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">Hero Title, Eyebrow & Value Proposition</h3>
                  </div>
                  <button
                    onClick={handleSaveSiteSettings}
                    disabled={savingSection === "settings"}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save size={14} />
                    <span>{savingSection === "settings" ? "Saving Live..." : "Save Hero Live"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 font-mono uppercase text-[10px]">Eyebrow Badge Tag</label>
                    <input
                      type="text"
                      value={data.siteSettings.heroEyebrow || ""}
                      onChange={(e) => setData({
                        ...data,
                        siteSettings: { ...data.siteSettings, heroEyebrow: e.target.value }
                      })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 font-mono uppercase text-[10px]">Main Hero Title (H1)</label>
                    <textarea
                      rows={2}
                      value={data.siteSettings.heroTitle || ""}
                      onChange={(e) => setData({
                        ...data,
                        siteSettings: { ...data.siteSettings, heroTitle: e.target.value }
                      })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 font-medium leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 font-mono uppercase text-[10px]">Hero Subtitle Description</label>
                    <textarea
                      rows={3}
                      value={data.siteSettings.heroDescription || ""}
                      onChange={(e) => setData({
                        ...data,
                        siteSettings: { ...data.siteSettings, heroDescription: e.target.value }
                      })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 font-medium leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Sections Reorder & Toggle Control */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Homepage Section Visibility & Titles</h3>
                  <p className="text-xs text-slate-500">Enable, disable, or adjust text for any section rendered on the homepage.</p>
                </div>

                <div className="space-y-3">
                  {data.sections.map((sec, sIdx) => (
                    <div
                      key={sec.key || sIdx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
                    >
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-600 uppercase text-[10px] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            {sec.key}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">Order: #{sec.order}</span>
                        </div>
                        <input
                          type="text"
                          value={sec.title || ""}
                          onChange={(e) => {
                            const updatedSecs = [...data.sections];
                            updatedSecs[sIdx].title = e.target.value;
                            setData({ ...data, sections: updatedSecs });
                          }}
                          placeholder="Section Title..."
                          className="w-full p-2 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-900 outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            const updatedSecs = [...data.sections];
                            updatedSecs[sIdx].isActive = !updatedSecs[sIdx].isActive;
                            setData({ ...data, sections: updatedSecs });
                          }}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                            sec.isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          <span>{sec.isActive ? "Active (Live)" : "Hidden"}</span>
                        </button>

                        <button
                          onClick={() => handleSaveSection(sec)}
                          disabled={savingSection === sec.key}
                          className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                        >
                          {savingSection === sec.key ? "Saving..." : "Save Live"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: SOURCE CODE & MARKETPLACE REPOSITORIES MANAGER                     */}
          {/* ========================================================================= */}
          {activeTab === "source-code" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Source Code & Repository Releases ({data.sourceCodes.length})</h3>
                  <p className="text-xs text-slate-500">Manage free open-source boilerplates and commercial SaaS code packages on GitHub.</p>
                </div>

                <button
                  onClick={() => {
                    setModalType("source-code");
                    setEditingItem({
                      title: "",
                      slug: "",
                      tagline: "",
                      description: "",
                      category: "Full-Stack SaaS",
                      priceINR: 0,
                      priceUSD: 0,
                      originalPriceINR: 2999,
                      originalPriceUSD: 39,
                      isFree: true,
                      badge: "FREE DOWNLOAD",
                      version: "v1.0.0",
                      techStack: ["Next.js 15", "MongoDB", "Tailwind CSS"],
                      features: ["Full Next.js App Router Source Code", "Production Docker Configs"],
                      includes: ["100% Full Source Code", "Architecture Documentation"],
                      githubUrl: "https://github.com/Mahadev91op/DevSamp-Final",
                      downloadUrl: "https://github.com/Mahadev91op/DevSamp-Final/archive/refs/heads/main.zip",
                      liveDemoUrl: "/",
                      license: "MIT Open Source License",
                      rating: 5.0,
                      downloadsCount: 100,
                      gradient: "from-blue-600 via-indigo-600 to-cyan-500",
                      order: data.sourceCodes.length + 1
                    });
                    setIsModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Add New Source Code</span>
                </button>
              </div>

              {/* Source Code Table */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase text-[10px]">
                      <tr>
                        <th className="p-4">Package</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">GitHub & Downloads</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data.sourceCodes.map((item, idx) => (
                        <tr key={item._id || idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4">
                            <div className="space-y-0.5">
                              <p className="font-bold text-slate-900">{item.title}</p>
                              <p className="text-[11px] text-slate-500 font-mono">{item.slug} • {item.version}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 font-mono font-bold text-[10px] border border-blue-100">
                              {item.category}
                            </span>
                          </td>
                          <td className="p-4 font-mono font-bold">
                            {item.isFree ? (
                              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                FREE
                              </span>
                            ) : (
                              <span className="text-slate-900">
                                ₹{item.priceINR} / ${item.priceUSD}
                              </span>
                            )}
                          </td>
                          <td className="p-4 font-mono text-slate-500">
                            <p>{item.downloadsCount || 0} downloads</p>
                            <a href={item.githubUrl} target="_blank" className="text-blue-600 hover:underline text-[10px] flex items-center gap-1">
                              <span>GitHub Repo</span>
                              <ExternalLink size={10} />
                            </a>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setModalType("source-code");
                                setEditingItem(item);
                                setIsModalOpen(true);
                              }}
                              className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 transition-colors cursor-pointer"
                              title="Edit Source Code"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteEntity("/api/source-code", item._id, item.title)}
                              className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 transition-colors cursor-pointer"
                              title="Delete Source Code"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: FLAGSHIP PRODUCTS MANAGER                                          */}
          {/* ========================================================================= */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Flagship SaaS Products ({data.products.length})</h3>
                  <p className="text-xs text-slate-500">MedERP Pro, DevScale Core, FlowPulse POS & enterprise platforms.</p>
                </div>

                <button
                  onClick={() => {
                    setModalType("product");
                    setEditingItem({
                      name: "",
                      slug: "",
                      tagline: "",
                      description: "",
                      category: "Healthcare SaaS",
                      status: "Live",
                      featured: true,
                      logoIcon: "Boxes",
                      capabilities: ["Multi-Tenant", "API Gateway", "Real-Time Telemetry"],
                      pricingSnippet: "Enterprise Tier",
                      productUrl: "https://devsamp.online/products",
                      docsUrl: "/docs",
                      gradient: "from-blue-600 to-cyan-500",
                      order: data.products.length + 1,
                      isActive: true
                    });
                    setIsModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Deploy New SaaS Product</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.products.map((prod, idx) => (
                  <div key={prod._id || idx} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded font-mono">
                          {prod.category}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                          {prod.status}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">{prod.name}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{prod.tagline || prod.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-500">{prod.pricingSnippet}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setModalType("product");
                            setEditingItem(prod);
                            setIsModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEntity("/api/products", prod._id, prod.name)}
                          className="p-1.5 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 transition-all cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: ENGINEERING SERVICES                                               */}
          {/* ========================================================================= */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Engineering Capabilities & Services ({data.services.length})</h3>
                  <p className="text-xs text-slate-500">Custom web dev, mobile development, SaaS architecture, UI/UX systems.</p>
                </div>

                <button
                  onClick={() => {
                    setModalType("service");
                    setEditingItem({
                      title: "",
                      desc: "",
                      icon: "Layers",
                      color: "text-blue-500",
                      gradient: "from-blue-500 to-cyan-500",
                      order: data.services.length + 1
                    });
                    setIsModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Add Engineering Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.services.map((srv, idx) => (
                  <div key={srv._id || idx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-slate-400">ORDER: #{srv.order || idx + 1}</span>
                      <h4 className="text-base font-bold text-slate-900">{srv.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{srv.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setModalType("service");
                          setEditingItem(srv);
                          setIsModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                      >
                        Edit Service
                      </button>
                      <button
                        onClick={() => handleDeleteEntity("/api/services", srv._id, srv.title)}
                        className="p-1.5 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 transition-all cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: ECOSYSTEM GRAPH NODES                                              */}
          {/* ========================================================================= */}
          {activeTab === "ecosystem" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Ecosystem Telemetry Nodes ({data.ecosystemItems.length})</h3>
                  <p className="text-xs text-slate-500">Interactive connected graph nodes (Core, Products, Services, Developers, Integrations).</p>
                </div>

                <button
                  onClick={() => {
                    setModalType("ecosystem");
                    setEditingItem({
                      nodeId: "new-node",
                      title: "",
                      category: "core",
                      shortDesc: "",
                      icon: "Cpu",
                      statusBadge: "Active",
                      connections: ["core"],
                      linkUrl: "/#ecosystem",
                      metrics: "99.9% Uptime",
                      color: "from-blue-600 to-indigo-600",
                      order: data.ecosystemItems.length + 1,
                      isActive: true
                    });
                    setIsModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Add Ecosystem Node</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.ecosystemItems.map((eco, idx) => (
                  <div key={eco._id || idx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {eco.nodeId}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold">{eco.metrics}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">{eco.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2">{eco.shortDesc}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setModalType("ecosystem");
                          setEditingItem(eco);
                          setIsModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                      >
                        Edit Node
                      </button>
                      <button
                        onClick={() => handleDeleteEntity("/api/ecosystem", eco._id, eco.title)}
                        className="p-1.5 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 transition-all cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: PRICING & RETAINERS                                                */}
          {/* ========================================================================= */}
          {activeTab === "pricing" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Pricing Plans & Subscriptions ({data.pricing.length})</h3>
                  <p className="text-xs text-slate-500">Configure monthly and yearly rates, feature checklists, and discounts.</p>
                </div>

                <button
                  onClick={() => {
                    setModalType("pricing");
                    setEditingItem({
                      name: "",
                      desc: "",
                      priceMonthly: "499",
                      priceYearly: "4900",
                      features: ["Custom Architecture", "SLA Support"],
                      missing: [],
                      popular: false,
                      gradient: "from-blue-600 to-indigo-600"
                    });
                    setIsModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Add Pricing Tier</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.pricing.map((plan, idx) => (
                  <div key={plan._id || idx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold text-slate-900">{plan.name}</h4>
                        {plan.popular && (
                          <span className="text-[9px] font-black uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono">
                            POPULAR
                          </span>
                        )}
                      </div>
                      <p className="text-2xl font-black text-slate-900 font-mono">
                        ₹{plan.priceMonthly} <span className="text-xs font-normal text-slate-400">/ mo</span>
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">{plan.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setModalType("pricing");
                          setEditingItem(plan);
                          setIsModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                      >
                        Edit Plan
                      </button>
                      <button
                        onClick={() => handleDeleteEntity("/api/pricing", plan._id, plan.name)}
                        className="p-1.5 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 transition-all cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 8: CLIENT INQUIRIES & CRM LEADS                                       */}
          {/* ========================================================================= */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Incoming Client Scopes & Inquiries ({data.leads.length})</h3>
                  <p className="text-xs text-slate-500">Direct form submissions from healthcare, POS, and custom software clients.</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase text-[10px]">
                      <tr>
                        <th className="p-4">Client</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Message / Scope</th>
                        <th className="p-4">Received</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data.leads.map((lead, idx) => (
                        <tr key={lead._id || idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 font-bold text-slate-900">{lead.name}</td>
                          <td className="p-4 font-mono text-slate-600">
                            <p>{lead.email}</p>
                            {lead.phone && <p className="text-slate-400">{lead.phone}</p>}
                          </td>
                          <td className="p-4 text-slate-700 max-w-xs">{lead.message}</td>
                          <td className="p-4 font-mono text-slate-400 text-[11px]">{formatTimeAgo(lead.createdAt)}</td>
                          <td className="p-4 text-right space-x-2">
                            <a
                              href={`mailto:${lead.email}?subject=DevSamp%20Architecture%20Follow-up`}
                              className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold transition-all inline-flex items-center gap-1"
                            >
                              <Mail size={12} />
                              <span>Reply</span>
                            </a>
                            <button
                              onClick={() => handleDeleteEntity("/api/contact", lead._id, `Inquiry from ${lead.name}`)}
                              className="p-1.5 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 transition-all cursor-pointer"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 9: SITE SETTINGS & BRANDING                                           */}
          {/* ========================================================================= */}
          {activeTab === "settings" && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Global Site Settings & Branding</h3>
                  <p className="text-xs text-slate-500">Update company email, phone number, tagline and contact coordinates.</p>
                </div>

                <button
                  onClick={handleSaveSiteSettings}
                  disabled={savingSection === "settings"}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer"
                >
                  <Save size={14} />
                  <span>{savingSection === "settings" ? "Saving..." : "Save Settings Live"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 font-mono uppercase text-[10px]">Brand / Site Name</label>
                  <input
                    type="text"
                    value={data.siteSettings.siteName || "DevSamp"}
                    onChange={(e) => setData({
                      ...data,
                      siteSettings: { ...data.siteSettings, siteName: e.target.value }
                    })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 font-mono uppercase text-[10px]">Official Contact Email</label>
                  <input
                    type="email"
                    value={data.siteSettings.contactEmail || "devsamp1st@gmail.com"}
                    onChange={(e) => setData({
                      ...data,
                      siteSettings: { ...data.siteSettings, contactEmail: e.target.value }
                    })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 font-medium font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 font-mono uppercase text-[10px]">Contact Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={data.siteSettings.contactPhone || "+91 9330680642"}
                    onChange={(e) => setData({
                      ...data,
                      siteSettings: { ...data.siteSettings, contactPhone: e.target.value }
                    })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 font-medium font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 font-mono uppercase text-[10px]">Global Headquarters Location</label>
                  <input
                    type="text"
                    value={data.siteSettings.address || "India"}
                    onChange={(e) => setData({
                      ...data,
                      siteSettings: { ...data.siteSettings, address: e.target.value }
                    })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 font-medium"
                  />
                </div>

                <div className="col-span-full space-y-1">
                  <label className="font-bold text-slate-700 font-mono uppercase text-[10px]">Master Tagline</label>
                  <input
                    type="text"
                    value={data.siteSettings.tagline || ""}
                    onChange={(e) => setData({
                      ...data,
                      siteSettings: { ...data.siteSettings, tagline: e.target.value }
                    })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ========================================================================= */}
      {/* GLOBAL MODAL EDITOR (FOR PRODUCTS, SOURCE CODES, SERVICES, NODES)        */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isModalOpen && editingItem && (
          <div className="fixed inset-0 z-[1002] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsModalOpen(false);
                setEditingItem(null);
              }}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: smoothEase }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-cyan-300 font-bold">Live DB Record Editor</span>
                  <h3 className="text-lg font-bold text-white capitalize mt-0.5">
                    {editingItem._id ? `Edit ${modalType}` : `Create New ${modalType}`}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingItem(null);
                  }}
                  className="p-1 rounded-full hover:bg-white/10 text-slate-300 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body Forms */}
              <div className="p-6 overflow-y-auto space-y-4 text-xs">
                
                {/* SOURCE CODE MODAL */}
                {modalType === "source-code" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Package Title *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.title || ""}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Slug (URL identifier) *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.slug || ""}
                          onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Price (INR ₹)</label>
                        <input
                          type="number"
                          value={editingItem.priceINR || 0}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setEditingItem({
                              ...editingItem,
                              priceINR: val,
                              isFree: val === 0 && (editingItem.priceUSD || 0) === 0
                            });
                          }}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Price (USD $)</label>
                        <input
                          type="number"
                          value={editingItem.priceUSD || 0}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setEditingItem({
                              ...editingItem,
                              priceUSD: val,
                              isFree: val === 0 && (editingItem.priceINR || 0) === 0
                            });
                          }}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Version</label>
                        <input
                          type="text"
                          value={editingItem.version || "v1.0.0"}
                          onChange={(e) => setEditingItem({ ...editingItem, version: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">GitHub Repository URL *</label>
                      <input
                        type="url"
                        required
                        value={editingItem.githubUrl || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, githubUrl: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Direct Release Download URL (.zip)</label>
                      <input
                        type="url"
                        value={editingItem.downloadUrl || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, downloadUrl: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Tagline Summary</label>
                      <input
                        type="text"
                        value={editingItem.tagline || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, tagline: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Detailed Description</label>
                      <textarea
                        rows={3}
                        value={editingItem.description || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* PRODUCT MODAL */}
                {modalType === "product" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Product Name *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.name || ""}
                          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Slug *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.slug || ""}
                          onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Tagline</label>
                      <input
                        type="text"
                        value={editingItem.tagline || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, tagline: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Description</label>
                      <textarea
                        rows={3}
                        value={editingItem.description || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* SERVICE MODAL */}
                {modalType === "service" && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Service Title *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.title || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Description</label>
                      <textarea
                        rows={3}
                        value={editingItem.desc || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* ECOSYSTEM NODE MODAL */}
                {modalType === "ecosystem" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Node ID *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.nodeId || ""}
                          onChange={(e) => setEditingItem({ ...editingItem, nodeId: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Node Title *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.title || ""}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Short Description</label>
                      <textarea
                        rows={2}
                        value={editingItem.shortDesc || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, shortDesc: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* PRICING MODAL */}
                {modalType === "pricing" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Plan Name *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.name || ""}
                          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Monthly Price (₹)</label>
                        <input
                          type="text"
                          value={editingItem.priceMonthly || ""}
                          onChange={(e) => setEditingItem({ ...editingItem, priceMonthly: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Description</label>
                      <textarea
                        rows={2}
                        value={editingItem.desc || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                      />
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Actions */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingItem(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-700 text-xs cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const endpoint = 
                      modalType === "source-code" ? "/api/source-code" :
                      modalType === "product" ? "/api/products" :
                      modalType === "service" ? "/api/services" :
                      modalType === "ecosystem" ? "/api/ecosystem" :
                      modalType === "pricing" ? "/api/pricing" : "/api/homepage";

                    handleSaveEntity(endpoint, editingItem, Boolean(editingItem._id));
                  }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Save Live to Database
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[300] px-5 py-3 rounded-2xl text-xs font-bold text-white shadow-2xl flex items-center gap-2 ${
          toast.type === "error" ? "bg-red-600" : "bg-gradient-to-r from-emerald-600 to-teal-600"
        }`}>
          {toast.type === "error" ? <AlertCircle size={15} /> : <CheckCircle2 size={15} />}
          <span>{toast.message}</span>
        </div>
      )}

    </div>
  );
}