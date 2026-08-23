"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Code2, 
  TrendingUp,
  Sparkles,
  Workflow
} from "lucide-react";

const valuePillars = [
  {
    icon: BoxesIcon,
    title: "Product-First DNA",
    description: "We don't just build client projects; we build and run SaaS products. That means our engineering conventions, security standards, and architectures are battle-tested in real production.",
    highlight: "SaaS Quality"
  },
  {
    icon: Cpu,
    title: "Scalable Multi-Tenant Core",
    description: "Engineered from day one with Next.js 15, optimized database indexing, and automated tenant isolation so your software can scale without re-architecture bottlenecks.",
    highlight: "Zero Bottlenecks"
  },
  {
    icon: Workflow,
    title: "Interconnected Ecosystem",
    description: "Every product and service connects seamlessly through standardized REST APIs, webhooks, and shared authentication protocols across the entire platform.",
    highlight: "Unified Stack"
  },
  {
    icon: ShieldCheck,
    title: "Production SLA & Dedicated Pod",
    description: "We provide ongoing SLA monitoring, automated security patch pipelines, and direct engineering access to guarantee uptime and reliability.",
    highlight: "Enterprise Support"
  }
];

function BoxesIcon(props) {
  return <Layers {...props} />;
}

const WhyDevSamp = ({ sectionData = null }) => {
  const badge = sectionData?.badge || "Value Matrix";
  const title = sectionData?.title || "Why High-Growth Teams Choose DevSamp";
  const description = sectionData?.description || "Combining the speed of modern product development with the precision of custom engineering to create compounding digital value.";

  return (
    <section id="why-devsamp" className="py-16 md:py-28 bg-transparent text-slate-900 relative overflow-hidden">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3.5"
          >
            <Sparkles size={12} /> {badge}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-sm md:text-base font-semibold"
          >
            {description}
          </motion.p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {valuePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-white/85 border border-slate-200/80 hover:border-indigo-500/40 p-7 md:p-9 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100/60 text-indigo-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <Icon size={22} />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200/60 text-slate-600 uppercase">
                      {pillar.highlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs md:text-sm font-semibold leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold">
                  <span>SPECIFICATION: VERIFIED</span>
                  <span className="text-indigo-600 group-hover:translate-x-1 transition-transform">✓ ACTIVE STANDARD</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyDevSamp;
