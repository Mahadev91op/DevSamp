"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Download,
  Github,
  Star,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Tag,
  Copy,
  Check,
  CreditCard,
  Building2,
  FileCode2,
  Terminal,
  ExternalLink,
  Layers,
  ArrowRight,
  ChevronRight,
  Folder,
  File,
  MessageSquare,
  Send,
  Lock,
  QrCode,
  Smartphone
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const DEFAULT_FILE_TREES = {
  "Healthcare ERP": [
    "src/app/(clinical)/opd/page.js",
    "src/app/(clinical)/ipd/patient-chart/page.js",
    "src/app/(pharmacy)/pos/checkout/page.js",
    "src/app/(pathology)/lab-reports/generator.js",
    "src/server/services/ClinicalBillingService.js",
    "src/server/services/HL7BridgeDaemon.js",
    "src/models/PatientRecord.js",
    "src/models/PharmacyBatch.js",
    "src/models/Invoice.js",
    "public/drivers/escpos-thermal.exe",
    "package.json",
    ".env.example",
    "README.md"
  ],
  "POS & Commerce": [
    "src/app/pos/register/page.js",
    "src/app/inventory/warehouses/page.js",
    "src/electron/main.js",
    "src/electron/sqlite-sync.js",
    "src/server/services/BarcodeIndexService.js",
    "src/server/services/StockManifestService.js",
    "src/models/ProductSKU.js",
    "src/models/SalesRegister.js",
    "package.json",
    ".env.example",
    "README.md"
  ],
  "default": [
    "src/app/layout.js",
    "src/app/page.js",
    "src/app/api/v1/routes.js",
    "src/components/Navigation.jsx",
    "src/components/Dashboard.jsx",
    "src/server/services/AuthService.js",
    "src/server/services/BillingService.js",
    "src/models/User.js",
    "src/models/Organization.js",
    "package.json",
    ".env.example",
    "README.md"
  ]
};

export default function SourceCodeDetailClient({ item, relatedItems = [] }) {
  const [activeTab, setActiveTab] = useState("overview"); // "overview", "files", "quickstart", "license", "reviews"
  const [currency, setCurrency] = useState("INR"); // "INR" or "USD"
  const [licenseTier, setLicenseTier] = useState("single"); // "single", "team", "enterprise"
  const [copiedClone, setCopiedClone] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  
  // Reviews state
  const [reviewsList, setReviewsList] = useState(item.reviews || [
    {
      name: "Siddharth Verma",
      role: "Lead Software Architect",
      company: "Apex Healthcare Tech",
      rating: 5,
      comment: "The Next.js 15 architecture is extraordinarily clean. We integrated the OPD billing ledger into our hospital within 48 hours. Zero technical debt.",
      createdAt: new Date().toISOString()
    },
    {
      name: "Ananya Roy",
      role: "Founder & CTO",
      company: "CloudRetail Ltd",
      rating: 5,
      comment: "Offline SQLite sync works flawlessly during network cutoffs. The thermal receipt ESC/POS daemon saved our engineering squad weeks of R&D.",
      createdAt: new Date().toISOString()
    }
  ]);
  const [reviewForm, setReviewForm] = useState({ name: "", role: "", company: "", rating: 5, comment: "" });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const isFree = item.isFree || item.priceINR === 0;

  // Price calculations based on license tier
  const tierMultiplier = licenseTier === "single" ? 1 : licenseTier === "team" ? 2.2 : 5.0;
  const currentPrice = currency === "INR" 
    ? Math.round((item.priceINR || 0) * tierMultiplier)
    : Math.round((item.priceUSD || 0) * tierMultiplier);

  const fileTree = item.fileTree && item.fileTree.length > 0 
    ? item.fileTree 
    : DEFAULT_FILE_TREES[item.category] || DEFAULT_FILE_TREES["default"];

  // Download free handler
  const handleFreeDownload = async () => {
    try {
      setDownloading(true);
      await fetch(`/api/source-code/${item.slug}/download`);
      const targetUrl = item.downloadUrl || `${item.githubUrl}/archive/refs/heads/main.zip`;
      window.open(targetUrl, "_blank");
    } catch (e) {
      window.open(`${item.githubUrl}/archive/refs/heads/main.zip`, "_blank");
    } finally {
      setTimeout(() => setDownloading(false), 1500);
    }
  };

  const handleCopyClone = () => {
    navigator.clipboard.writeText(`git clone ${item.githubUrl}.git`);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const handleCopyEnv = () => {
    const envSnippet = `# DevSamp ${item.title} Environment Variables
NODE_ENV=production
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/devsamp_production
JWT_SECRET=your_super_secret_jwt_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret`;
    navigator.clipboard.writeText(envSnippet);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.comment) return;

    try {
      setSubmittingReview(true);
      const res = await fetch(`/api/source-code/${item.slug}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewForm)
      });
      const data = await res.json();
      if (data.success) {
        setReviewsList((prev) => [data.data, ...prev]);
        setReviewForm({ name: "", role: "", company: "", rating: 5, comment: "" });
        setReviewSuccess(true);
        setTimeout(() => setReviewSuccess(false), 4000);
      }
    } catch (e) {
      console.error("Failed to submit review:", e);
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      
      {/* --- HERO BANNER --- */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white shadow-2xl border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Details */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase text-cyan-300 bg-cyan-900/50 px-3 py-1 rounded-full border border-cyan-500/40 font-mono">
                {item.category}
              </span>
              <span className="text-xs font-mono font-bold bg-white/10 px-2.5 py-1 rounded-full text-slate-300">
                {item.version}
              </span>
              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                <Star size={14} fill="currentColor" /> {item.rating || 5.0} ({reviewsList.length} reviews)
              </span>
              <span className="text-xs text-slate-400 font-mono">
                • {item.downloadsCount || 150}+ downloads
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {item.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
              {item.tagline || item.description}
            </p>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {item.techStack?.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-xs font-mono font-bold text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Action Box */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 space-y-4 shadow-xl">
            
            {/* Price & Currency Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Pricing Tier</span>
                {isFree ? (
                  <p className="text-2xl font-black text-emerald-400 font-mono">FREE 100%</p>
                ) : (
                  <p className="text-2xl font-black text-white font-mono">
                    {currency === "INR" ? `₹${currentPrice?.toLocaleString()}` : `$${currentPrice}`}
                  </p>
                )}
              </div>

              {!isFree && (
                <div className="flex bg-slate-900/80 p-0.5 rounded-xl border border-white/10 text-xs font-mono">
                  <button
                    onClick={() => setCurrency("INR")}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      currency === "INR" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    INR (₹)
                  </button>
                  <button
                    onClick={() => setCurrency("USD")}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      currency === "USD" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    USD ($)
                  </button>
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            {isFree ? (
              <button
                onClick={handleFreeDownload}
                disabled={downloading}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
              >
                <Download size={16} />
                <span>{downloading ? "Preparing GitHub Download..." : "Download Release (.zip)"}</span>
              </button>
            ) : (
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all cursor-pointer"
              >
                <Github size={16} />
                <span>Get Source License & Repo</span>
              </button>
            )}

            {/* Git Clone Command Trigger */}
            <button
              onClick={handleCopyClone}
              className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedClone ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedClone ? "Clone Command Copied!" : "Copy Git Clone Command"}</span>
            </button>

            {item.liveDemoUrl && (
              <Link
                href={item.liveDemoUrl}
                target="_blank"
                className="block text-center text-xs text-cyan-300 font-bold hover:underline"
              >
                Open Live Interactive Demo →
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* --- TAB NAVIGATION BAR --- */}
      <div className="border-b border-slate-200 flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar">
        {[
          { id: "overview", label: "Overview & Features", icon: Layers },
          { id: "files", label: "File Architecture", icon: FileCode2 },
          { id: "quickstart", label: "Quick Start & Setup", icon: Terminal },
          { id: "license", label: "License & Specs", icon: ShieldCheck },
          { id: "reviews", label: `Reviews (${reviewsList.length})`, icon: MessageSquare }
        ].map((tab) => {
          const IconC = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <IconC size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* --- TAB CONTENTS --- */}
      <div className="min-h-[400px]">
        
        {/* 1. OVERVIEW TAB */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Project Overview & Architecture</h2>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>

            {/* Key Deliverables Grid */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Key Included Deliverables & Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {item.features?.map((feat, fIdx) => (
                  <div key={fIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-slate-800">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What is Included In Full Package */}
            {item.includes && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900">What You Receive in the Repository</h2>
                <div className="space-y-2">
                  {item.includes.map((inc, iIdx) => (
                    <div key={iIdx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                      <Sparkles size={14} className="text-blue-600 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* 2. FILE TREE EXPLORER TAB */}
        {activeTab === "files" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-950 text-slate-200 rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl font-mono space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <span className="text-cyan-400 font-bold">DIRECTORY LAYOUT & REPO TREE</span>
              <span className="text-slate-400">{fileTree.length} CORE FILES</span>
            </div>

            <div className="space-y-1.5 text-xs">
              {fileTree.map((filePath, fIdx) => {
                const isDir = filePath.includes("/") && !filePath.includes(".");
                return (
                  <div key={fIdx} className="flex items-center gap-2.5 py-1 px-2 rounded hover:bg-white/5 transition-colors">
                    {isDir ? (
                      <Folder size={14} className="text-amber-400 shrink-0" />
                    ) : (
                      <File size={14} className="text-blue-400 shrink-0" />
                    )}
                    <span className="text-slate-300 font-mono">{filePath}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 3. QUICKSTART & SETUP TAB */}
        {activeTab === "quickstart" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Terminal Commands Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-slate-200 border border-indigo-500/30 shadow-2xl font-mono space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <span className="text-cyan-400 font-bold">3-STEP LOCAL DEPLOYMENT</span>
                <button
                  onClick={handleCopyClone}
                  className="text-cyan-300 hover:underline flex items-center gap-1"
                >
                  {copiedClone ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedClone ? "Copied" : "Copy All"}</span>
                </button>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <span className="text-slate-400"># 1. Clone repository from GitHub:</span>
                  <p className="text-cyan-300 font-bold bg-white/5 p-2.5 rounded-xl mt-1 select-all">
                    git clone {item.githubUrl}.git
                  </p>
                </div>

                <div>
                  <span className="text-slate-400"># 2. Install dependencies:</span>
                  <p className="text-cyan-300 font-bold bg-white/5 p-2.5 rounded-xl mt-1 select-all">
                    cd {item.slug} && npm install
                  </p>
                </div>

                <div>
                  <span className="text-slate-400"># 3. Configure environment & start development server:</span>
                  <p className="text-cyan-300 font-bold bg-white/5 p-2.5 rounded-xl mt-1 select-all">
                    cp .env.example .env.local && npm run dev
                  </p>
                </div>
              </div>
            </div>

            {/* Environment Variables Template */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Environment Variables (.env.example)</h3>
                <button
                  onClick={handleCopyEnv}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1"
                >
                  {copiedEnv ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                  <span>{copiedEnv ? "Copied" : "Copy .env"}</span>
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 overflow-x-auto">
{`# DevSamp ${item.title} Configuration
NODE_ENV=production
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/devsamp_production
JWT_SECRET=your_super_secret_jwt_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret`}
              </pre>
            </div>
          </motion.div>
        )}

        {/* 4. LICENSE & SPECS TAB */}
        {activeTab === "license" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6"
          >
            <h2 className="text-xl font-bold text-slate-900">Commercial License Terms & Rights</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <ShieldCheck size={20} className="text-blue-600" />
                <h4 className="font-bold text-sm text-slate-900">100% IP Ownership</h4>
                <p className="text-xs text-slate-600">You own 100% of the code deployed in your applications. No recurring royalty fees.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <Lock size={20} className="text-indigo-600" />
                <h4 className="font-bold text-sm text-slate-900">Zero Telemetry Callbacks</h4>
                <p className="text-xs text-slate-600">The software runs 100% isolated on your infrastructure with zero tracking daemons.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <Github size={20} className="text-emerald-600" />
                <h4 className="font-bold text-sm text-slate-900">GitHub Repo Invites</h4>
                <p className="text-xs text-slate-600">Receive verified invitations to private upstream branches for continuous bug fixes.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 5. REVIEWS & RATINGS TAB */}
        {activeTab === "reviews" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Review Submission Form */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Leave a Verified Developer Review</h3>
              
              {reviewSuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>Thank you! Your verified developer review has been posted.</span>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 font-medium"
                    />
                    <input
                      type="text"
                      placeholder="Role (e.g. CTO, Architect)"
                      value={reviewForm.role}
                      onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 font-medium"
                    />
                    <input
                      type="text"
                      placeholder="Company / Org Name"
                      value={reviewForm.company}
                      onChange={(e) => setReviewForm({ ...reviewForm, company: e.target.value })}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 font-medium"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <span className="font-bold text-slate-700">Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          size={18}
                          fill={star <= reviewForm.rating ? "currentColor" : "none"}
                        />
                      </button>
                    ))}
                  </div>

                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your development experience with this codebase..."
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 font-medium"
                  />

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                  >
                    <Send size={13} />
                    <span>{submittingReview ? "Submitting..." : "Publish Review"}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviewsList.map((rev, rIdx) => (
                <div key={rIdx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-slate-900">{rev.name}</p>
                      <p className="text-xs text-slate-500">{rev.role} • {rev.company}</p>
                    </div>
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>

      {/* --- RELATED PACKAGES CAROUSEL --- */}
      {relatedItems.length > 0 && (
        <div className="pt-10 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Explore Related Source Code Packages</h3>
            <Link href="/marketplace" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
              <span>View All Store Packages</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedItems.map((rel, idx) => (
              <Link
                key={idx}
                href={`/marketplace/${rel.slug}`}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono">
                      {rel.category}
                    </span>
                    <span className="text-xs font-bold text-slate-900 font-mono">
                      {rel.isFree ? "FREE" : `₹${rel.priceINR}`}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 font-normal">
                    {rel.tagline || rel.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Inspect Code</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* --- CHECKOUT MODAL WITH DYNAMIC UPI QR & WHATSAPP --- */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-[1002] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowCheckout(false);
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
              <div className="p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-cyan-300 font-bold">Commercial License Checkout</span>
                  <h3 className="text-lg font-bold text-white leading-tight mt-0.5">{item.title}</h3>
                </div>
                <button
                  onClick={() => {
                    setShowCheckout(false);
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
                  <h4 className="text-lg font-bold text-slate-900">Commercial License Authorized!</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    You have complete lifetime access to <strong>{item.title}</strong> with full repository ownership.
                  </p>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 text-left space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">License Serial:</span>
                    <p className="text-blue-700 font-bold select-all">
                      DS-LIC-{Date.now().toString(36).toUpperCase()}-COMMERCIAL
                    </p>
                  </div>

                  <a
                    href={item.downloadUrl || `${item.githubUrl}/archive/refs/heads/main.zip`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Download size={14} />
                    <span>Download Archive from GitHub</span>
                  </a>
                </div>
              ) : (
                <div className="p-6 space-y-5 text-xs text-slate-700">
                  
                  {/* License Tier Selector */}
                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-900">Select License Scope:</span>
                    <div className="grid grid-cols-3 gap-2 text-center font-mono">
                      {[
                        { id: "single", label: "Single Project", price: item.priceINR },
                        { id: "team", label: "Team Unlimited", price: Math.round(item.priceINR * 2.2) },
                        { id: "enterprise", label: "Full Buyout IP", price: Math.round(item.priceINR * 5.0) }
                      ].map((t) => (
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
                          <span className="text-xs font-bold block mt-0.5">₹{t.price?.toLocaleString()}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Options */}
                  <div className="space-y-2">
                    <span className="font-bold text-slate-900">Instant Checkout Options:</span>
                    <div className="grid grid-cols-2 gap-2.5">
                      <a
                        href={`mailto:devsamp1st@gmail.com?subject=Source%20Code%20Purchase%20-%20${encodeURIComponent(item.title)}&body=I%20want%20to%20purchase%20the%20${licenseTier}%20license%20for%20${encodeURIComponent(item.title)}%20(Cost:%20${currency === "INR" ? `INR%20${currentPrice}` : `USD%20${currentPrice}`}).%20Please%20send%20the%20invoice%20and%20GitHub%20repo%20invite.`}
                        className="p-3 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left space-y-1"
                      >
                        <span className="font-bold text-slate-900 block">UPI / Bank Wire</span>
                        <p className="text-[11px] text-slate-500">Official GST invoice & bank coordinates</p>
                      </a>

                      <a
                        href={`https://wa.me/919330680642?text=${encodeURIComponent(`Hello DevSamp, I want to purchase the commercial license for ${item.title} (${licenseTier} tier, ₹${currentPrice}). Please provide the GitHub repository invite.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-left space-y-1"
                      >
                        <span className="font-bold text-slate-900 block">WhatsApp Fast Pay</span>
                        <p className="text-[11px] text-slate-500">Instant senior architect assistance</p>
                      </a>
                    </div>
                  </div>

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
