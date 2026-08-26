"use client";

import { motion } from "framer-motion";
import { 
  Compass, 
  Sparkles, 
  Bot, 
  Globe2, 
  Layers, 
  Workflow, 
  Clock,
  ShieldCheck 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const futureInitiatives = [
  {
    title: "Autonomous Workflow Agents",
    timeframe: "Horizon 2027",
    status: "PLANNED CAPABILITY",
    description: "Self-healing database indexers, AI-assisted clinical note categorization, and automated retail inventory reordering.",
    badge: "AI AUTOMATION",
    icon: Bot,
    color: "from-blue-600 to-indigo-600"
  },
  {
    title: "Developer Extensions Marketplace",
    timeframe: "Horizon 2027–2028",
    status: "ROADMAP STAGE",
    description: "Allowing external software engineers to publish custom workflow modules, UI components, and domain plugins for DevSamp products.",
    badge: "MARKETPLACE",
    icon: Layers,
    color: "from-indigo-600 to-purple-600"
  },
  {
    title: "Global Partner Integration Mesh",
    timeframe: "Horizon 2028+",
    status: "LONG-TERM VISION",
    description: "Decentralized data relays and universal settlement protocols across regional logistics, banking, and hospital nodes.",
    badge: "GLOBAL MESH",
    icon: Globe2,
    color: "from-purple-600 to-pink-600"
  }
];

const EcosystemFutureExpansion = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "Ecosystem Horizon";
  const title = data?.title || "Upcoming Platform Expansion & Future Horizons";
  const description = data?.description || "Strategic future layers being actively roadmapped to further integrate, automate, and expand modern enterprise software workloads.";

  return (
    <section id="future" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-xs font-bold text-purple-700 uppercase tracking-widest mb-3"
          >
            <Compass size={13} className="animate-spin-slow text-purple-600" /> {eyebrow}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        {/* Future Horizon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {futureInitiatives.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-white border border-slate-200/90 hover:border-purple-400 p-6 sm:p-8 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${item.color} shadow-xs shrink-0`}>
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 uppercase shadow-2xs">
                      {item.timeframe}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-5">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500 font-bold">
                  <span>STATUS: {item.status}</span>
                  <span className="text-purple-600 font-bold">PLANNED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EcosystemFutureExpansion;
