"use client";

import { motion } from "framer-motion";
import { 
  Lock, 
  Sparkles, 
  ShieldCheck, 
  Key, 
  Database, 
  Server, 
  CheckCircle2 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const securityProtocols = [
  {
    icon: Lock,
    title: "Server-Side Data Access",
    description: "Database queries and mutation secrets execute strictly server-side. Zero client-side credentials or connection string leakage.",
    badge: "SERVER ACTIONS"
  },
  {
    icon: Key,
    title: "Role-Based Access Control (RBAC)",
    description: "Granular route protection and middleware assertions ensure users can only access their designated tenant scope.",
    badge: "PERMISSION MATRIX"
  },
  {
    icon: Database,
    title: "Isolated Tenant Partitioning",
    description: "Strict isolation across tenant databases ensures no cross-customer data leakage in multi-tenant environments.",
    badge: "SCHEMA ISOLATION"
  },
  {
    icon: Server,
    title: "Environment Secrets & HTTPS",
    description: "All API tokens, webhooks, and session keys are secured in encrypted environment variables with TLS 1.3 encryption.",
    badge: "ENCRYPTED TRANSIT"
  }
];

const WhySecurity = () => {
  return (
    <section id="security" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 uppercase tracking-widest mb-3"
          >
            <Lock size={13} /> Defensive Security
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            Security Engineered as a Core Responsibility
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Security is not a checkbox added after launch. Every API gateway, server action, and session handler is architected defensively from the ground up.
          </motion.p>
        </div>

        {/* 4 Security Protocols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {securityProtocols.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-6 sm:p-8 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs shrink-0">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 uppercase shadow-2xs">
                      {sec.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    {sec.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                    {sec.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs font-mono text-slate-500 font-bold">
                  <span>AUDIT STATUS</span>
                  <span className="text-emerald-600 font-bold">✓ SECURED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhySecurity;
