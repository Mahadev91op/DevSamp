"use client";

import { useState } from "react";
import {
  Flag,
  CheckCircle2,
  Clock,
  Sparkles,
  ThumbsUp,
  Filter,
  Plus,
  ArrowRight
} from "lucide-react";

const INITIAL_ROADMAP = [
  {
    id: "feat-1",
    title: "MedERP Pro AI Discharge Summaries & ICD-10 Auto-Coding",
    desc: "Automated physician notes summarizer with automated diagnosis coding and multi-language patient discharge printouts.",
    quarter: "Q3 2026",
    status: "In Progress",
    product: "MedERP Pro",
    upvotes: 142
  },
  {
    id: "feat-2",
    title: "Omni-Channel WhatsApp Patient Bot & Live Token Queue",
    desc: "Instant OPD appointment booking, real-time consultation token alerts, and automated PDF lab report delivery via WhatsApp.",
    quarter: "Q3 2026",
    status: "In Progress",
    product: "MedERP Pro",
    upvotes: 98
  },
  {
    id: "feat-3",
    title: "Developer Webhook Replay Console & HMAC Signature Verification",
    desc: "Real-time webhook inspection, payload signing verification, and manual failure replay triggers directly in developer portal.",
    quarter: "Q3 2026",
    status: "In Progress",
    product: "Developer APIs",
    upvotes: 83
  },
  {
    id: "feat-4",
    title: "Offline-First SQLite POS Engine for 50+ Store Retail Chains",
    desc: "Sub-second barcode retail billing that operates completely uninterrupted during ISP internet failures with automatic cloud sync.",
    quarter: "Q2 2026",
    status: "Shipped",
    product: "Retail POS",
    upvotes: 215
  },
  {
    id: "feat-5",
    title: "Platform Core Central Identity & Multi-Tenant Subdomain Mesh",
    desc: "Zero-latency tenant isolation with automated SSL provisioning and unified customer login across all DevSamp software.",
    quarter: "Q2 2026",
    status: "Shipped",
    product: "Platform Core",
    upvotes: 174
  },
  {
    id: "feat-6",
    title: "Multi-Warehouse Automated Stock Transfer Manifests",
    desc: "Automated inter-branch stock replenishment triggers, batch expiry alarms, and barcode transfer verification.",
    quarter: "Q4 2026",
    status: "Planned",
    product: "Retail POS",
    upvotes: 76
  },
  {
    id: "feat-7",
    title: "Enterprise SSO with Okta, Azure AD & Google Workspace",
    desc: "SAML 2.0 and OIDC single sign-on enabling hospital IT admins to enforce centralized corporate login and MFA.",
    quarter: "Q4 2026",
    status: "Planned",
    product: "Platform Core",
    upvotes: 119
  },
  {
    id: "feat-8",
    title: "Autonomous Edge Diagnostics AI for Pathology Specimen Flagging",
    desc: "Low-latency on-device computer vision models to flag potential contamination in blood smears before pathologist sign-off.",
    quarter: "2027",
    status: "Under Research",
    product: "MedERP Pro",
    upvotes: 156
  }
];

const STATUSES = ["All", "In Progress", "Shipped", "Planned", "Under Research"];
const PRODUCTS = ["All", "MedERP Pro", "Retail POS", "Developer APIs", "Platform Core"];

export default function PublicRoadmapBoard() {
  const [items, setItems] = useState(INITIAL_ROADMAP);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState("All");
  const [upvotedIds, setUpvotedIds] = useState({});

  const handleUpvote = (id) => {
    if (upvotedIds[id]) return;
    setUpvotedIds({ ...upvotedIds, [id]: true });
    setItems(
      items.map((item) => (item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item))
    );
  };

  const filteredItems = items.filter((item) => {
    const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;
    const matchesProduct = selectedProduct === "All" || item.product === selectedProduct;
    return matchesStatus && matchesProduct;
  });

  return (
    <div className="space-y-6">
      
      {/* Filter Toolbar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {STATUSES.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedStatus === st
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Product Filter Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className="text-xs text-slate-400 font-medium">Product:</span>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-blue-600"
          >
            {PRODUCTS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Feature Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const isUpvoted = upvotedIds[item.id];

          return (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {item.quarter}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {item.product}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                      item.status === "Shipped"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : item.status === "In Progress"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : item.status === "Planned"
                        ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              {/* Upvote Bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleUpvote(item.id)}
                  className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isUpvoted
                      ? "bg-blue-50 text-blue-700 border-blue-300 shadow-2xs"
                      : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
                  }`}
                >
                  <ThumbsUp size={13} className={isUpvoted ? "text-blue-600 fill-blue-600" : "text-slate-400"} />
                  <span>{item.upvotes} Upvotes</span>
                </button>

                <span className="text-[11px] font-bold text-slate-400">
                  Target: {item.quarter}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
