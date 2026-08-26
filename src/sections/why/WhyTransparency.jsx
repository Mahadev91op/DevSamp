"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Eye, 
  Sparkles, 
  LayoutDashboard, 
  FileCheck, 
  Users, 
  ArrowRight, 
  CheckCircle2 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const WhyTransparency = () => {
  return (
    <section id="transparency" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Transparency Manifesto */}
          <div className="lg:col-span-6 space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 uppercase tracking-widest"
            >
              <Eye size={13} /> Transparent Execution
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
              className="text-fluid-h2 font-black tracking-tight leading-tight text-slate-950"
            >
              Clear Milestones, Async Devlogs &amp; Direct Architect Access
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
              className="text-slate-600 text-fluid-lead font-normal leading-relaxed"
            >
              No communication black holes. You communicate directly with senior software architects, inspect sprint commits, and review architecture blueprints in real time.
            </motion.p>

            {/* Feature List */}
            <div className="space-y-3 pt-2">
              {[
                { icon: Users, title: "Direct Architect Pairing", desc: "No junior account managers relaying messages between developers and you." },
                { icon: FileCheck, title: "Async Architecture Devlogs", desc: "Recorded video walkthroughs, pull request explanations, and live staging previews." },
                { icon: LayoutDashboard, title: "Client Portal & Milestones", desc: "Inspect live system nodes, deployment health, and active SLA retainers." }
              ].map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                    <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                      <ItemIcon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 leading-snug">{item.title}</h4>
                      <p className="text-slate-600 text-xs font-normal leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link href="/dashboard">
                <button 
                  className="px-6 py-3 rounded-full bg-slate-950 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  data-cursor="Dashboard"
                >
                  <LayoutDashboard size={15} />
                  <span>Inspect Client Portal Experience</span>
                  <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Live Portal HUD Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="lg:col-span-6 bg-slate-950 text-slate-200 rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl font-mono text-xs space-y-4 relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-300 font-bold uppercase text-[11px]">
                  devsamp://client-transparency-console
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-emerald-400">
                ACTIVE SPRINT
              </span>
            </div>

            <div className="bg-black/60 border border-white/10 rounded-2xl p-4 space-y-2 text-slate-300 text-xs leading-relaxed">
              <div className="text-indigo-400 font-bold">&gt; SPRINT 04 • LIVE DEPLOYMENT STATUS</div>
              <p className="text-slate-400">✓ Database index benchmark: 6.4ms average latency</p>
              <p className="text-slate-400">✓ Automated test suite: 100% tests passing</p>
              <p className="text-slate-400">✓ RBAC permission audit: Cryptographically verified</p>
              <p className="text-emerald-400 font-bold">✓ Staging build deployed &amp; ready for review</p>
            </div>

            <div className="flex justify-between items-center text-slate-400 text-[11px] pt-2 border-t border-white/10">
              <span>ASYNC CADENCE: DAILY</span>
              <span className="text-indigo-300 font-bold">✓ 0% HIDDEN WORK</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default WhyTransparency;
