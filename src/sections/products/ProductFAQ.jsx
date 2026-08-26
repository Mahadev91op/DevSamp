"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HelpCircle, 
  ChevronDown, 
  Sparkles, 
  Boxes, 
  ShieldCheck 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultProductFaqs = [
  {
    question: "Can DevSamp software products be customized for our specific workflow?",
    answer: "Yes. In addition to deploying our turnkey SaaS platforms (such as MedERP Pro or FlowPulse POS), our dedicated engineering pods can customize database schemas, user permissions, and external integrations to match 100% of your operational workflow.",
    category: "Customization"
  },
  {
    question: "Where are DevSamp SaaS products hosted and how is data isolated?",
    answer: "Our platforms are hosted across high-availability AWS and Vercel edge clusters with strict tenant schema isolation. Each organization's data is partitioned to ensure zero cross-customer data leakage and compliance with industry standards.",
    category: "Hosting & Security"
  },
  {
    question: "Do DevSamp products provide open APIs and webhook relays?",
    answer: "Yes. Every platform is built with standardized OpenAPI 3.1 REST interfaces, cryptographically signed webhook relays, and role-based API keys to integrate smoothly with your existing ERPs, CRMs, or accounting ledgers.",
    category: "Integrations"
  },
  {
    question: "What happens if we require on-premise or dedicated private cloud deployment?",
    answer: "We support private tenant deployments on your own AWS/GCP infrastructure, complete with automated backup scripts, custom SSL certificates, and 24/7 SLA telemetry monitoring.",
    category: "Deployment"
  },
  {
    question: "How do platform updates and continuous improvements roll out?",
    answer: "All core SaaS platforms receive continuous, zero-downtime updates including database index optimizations, security hot-patches, and UI improvements without disrupting active client operations.",
    category: "Maintenance"
  }
];

const ProductFAQ = ({ faqs = [] }) => {
  const displayFaqs = faqs && faqs.length > 0 ? faqs : defaultProductFaqs;
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3"
          >
            <HelpCircle size={13} /> Common Questions
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            Frequently Asked Product Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Everything you need to know about licensing, customizing, and scaling DevSamp software products.
          </motion.p>
        </div>

        {/* FAQ Accordions */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {displayFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.06 }}
                className={`border rounded-2xl sm:rounded-3xl transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? "bg-white border-blue-400 shadow-md ring-1 ring-blue-500/20" 
                    : "bg-white border-slate-200/90 hover:border-slate-300 shadow-xs"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-blue-600 shrink-0">
                      0{idx + 1}.
                    </span>
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ${
                    isOpen ? "bg-blue-600 text-white rotate-180 shadow-xs" : "bg-slate-100 text-slate-600"
                  }`}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: smoothEase }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-slate-100 mt-2 text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProductFAQ;
