"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  Sliders,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  Clock,
  DollarSign
} from "lucide-react";

const PROJECT_TYPES = [
  { id: "saas", label: "Multi-Tenant SaaS Platform", basePrice: 90000, duration: "4–6 Weeks" },
  { id: "mobile", label: "Cross-Platform Mobile App", basePrice: 85000, duration: "4–5 Weeks" },
  { id: "ai", label: "AI Agent & Semantic Vector Mesh", basePrice: 110000, duration: "3–5 Weeks" },
  { id: "erp", label: "Custom Hospital / Retail ERP", basePrice: 150000, duration: "6–8 Weeks" }
];

const POD_SIZES = [
  { id: "solo", label: "Lead Architect (Solo Sprint)", multiplier: 1.0, desc: "1 Senior Fullstack Architect" },
  { id: "standard", label: "Core Engineering Pod (Most Popular)", multiplier: 1.8, desc: "1 Lead Architect + 2 Fullstack Engineers + 1 QA" },
  { id: "squad", label: "Full-Scale Scale Squad", multiplier: 2.6, desc: "1 Principal Architect + 3 Fullstack Devs + 1 DevOps + 1 QA" }
];

const ADDONS = [
  { id: "cicd", label: "Docker & Kubernetes CI/CD Pipeline", price: 20000 },
  { id: "sla", label: "24/7 Guaranteed 15-Min Response SLA", price: 35000 },
  { id: "payment", label: "Stripe & Razorpay Multi-Currency Engine", price: 15000 },
  { id: "hl7", label: "Laboratory Machine HL7/ASTM Bridge", price: 40000 }
];

export default function PodEstimator() {
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0]);
  const [selectedPod, setSelectedPod] = useState(POD_SIZES[1]);
  const [selectedAddons, setSelectedAddons] = useState(["cicd", "payment"]);

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const estimatedTotal = Math.round(selectedType.basePrice * selectedPod.multiplier + addonsTotal);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Calculator size={13} />
            <span>Interactive Scope Calculator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
            Estimate Your Dedicated Pod Sprint & Retainer
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Configure your technical scope and engineering team size for transparent, upfront pricing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Options Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Project Type Selector */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700">
              1. Select Project Architecture
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PROJECT_TYPES.map((type) => {
                const isSelected = selectedType.id === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "bg-blue-50 border-blue-600 text-slate-950 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80"
                    }`}
                  >
                    <div className="font-bold text-xs">{type.label}</div>
                    <div className="text-[11px] text-slate-500 mt-1">Est. Duration: {type.duration}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Pod Size Selector */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700">
              2. Choose Dedicated Pod Capacity
            </label>
            <div className="space-y-2">
              {POD_SIZES.map((pod) => {
                const isSelected = selectedPod.id === pod.id;
                return (
                  <button
                    key={pod.id}
                    type="button"
                    onClick={() => setSelectedPod(pod)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-blue-50 border-blue-600 text-slate-950 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs">{pod.label}</div>
                      <div className="text-[11px] text-slate-500">{pod.desc}</div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? "border-blue-600 bg-blue-600" : "border-slate-300"
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Optional Architecture Add-ons */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700">
              3. Architectural Modules & Add-Ons
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ADDONS.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 ${
                      isChecked
                        ? "bg-blue-50 border-blue-500 text-slate-900"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/80"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
                      isChecked ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 bg-white"
                    }`}>
                      {isChecked && <CheckCircle2 size={12} />}
                    </div>
                    <div>
                      <div className="font-bold text-[11px] leading-snug">{addon.label}</div>
                      <div className="text-[10px] text-blue-700 font-bold mt-0.5">+₹{addon.price.toLocaleString("en-IN")}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Summary Card */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl sticky top-24">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400">
              Estimated Sprint Scope
            </span>
            <h4 className="text-lg font-bold text-white">
              {selectedType.label}
            </h4>
            <p className="text-xs text-slate-400">
              {selectedPod.label}
            </p>
          </div>

          <div className="py-4 border-y border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Base Engineering Scope:</span>
              <span className="text-white font-mono font-bold">
                ₹{(selectedType.basePrice * selectedPod.multiplier).toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Add-on Modules ({selectedAddons.length}):</span>
              <span className="text-white font-mono font-bold">
                ₹{addonsTotal.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Estimated Timeline:</span>
              <span className="text-emerald-400 font-bold">
                {selectedType.duration}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Total Estimated Investment
            </span>
            <div className="text-3xl font-black text-blue-400">
              ₹{estimatedTotal.toLocaleString("en-IN")}
              <span className="text-xs font-normal text-slate-400"> / sprint</span>
            </div>
            <p className="text-[10px] text-slate-500">
              *100% transparent scope. Includes complete source IP handover & deployment.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href={`/contact?scope=${encodeURIComponent(selectedType.label)}&pod=${encodeURIComponent(selectedPod.label)}&est=INR_${estimatedTotal}`}
              className="block w-full"
            >
              <button
                type="button"
                className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Book This Pod Scope</span>
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
