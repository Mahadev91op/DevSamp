"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HelpCircle, 
  ChevronDown, 
  Sparkles, 
  CheckCircle2, 
  Boxes, 
  Layers, 
  ShieldCheck 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultWhyFaqs = [
  {
    question: "What makes DevSamp fundamentally different from a web development agency?",
    answer: "Traditional agencies treat client work as disposable one-off projects with outsourced developers and no ongoing accountability. DevSamp is a software engineering company that builds and operates live vertical SaaS products while deploying dedicated in-house engineering pods for custom platforms.",
    category: "Differentiation"
  },
  {
    question: "Does DevSamp build custom software as well as its own SaaS products?",
    answer: "Yes. Our dual-engine model means clients can either license pre-built SaaS applications (like MedERP Pro or FlowPulse POS), commission custom software from our engineering pods, or combine both in a hybrid engagement model.",
    category: "Engagement"
  },
  {
    question: "Do I retain 100% intellectual property rights and code ownership?",
    answer: "Absolutely. For all bespoke client projects and pod engagements, you receive clean, fully documented Git repositories with 100% intellectual property ownership upon milestone completion. We have zero proprietary lock-in.",
    category: "Ownership"
  },
  {
    question: "How does DevSamp ensure systems don't require expensive rewrites in 2 years?",
    answer: "Every system is built on modular Next.js 15, optimized database index trees, and strict schema contracts. We design for 10x traffic expansion from day zero without spaghetti code dependencies.",
    category: "Scalability"
  },
  {
    question: "Can DevSamp integrate with our existing third-party tools and databases?",
    answer: "Yes. Our platforms and engineering pods support standardized OpenAPI 3.1 REST interfaces, webhook relays, and direct database adapters to integrate smoothly with your existing accounting, CRM, and cloud infrastructure.",
    category: "Integration"
  },
  {
    question: "How does long-term support and SLA maintenance work?",
    answer: "We offer continuous SLA retainers that include 24/7 edge telemetry monitoring, automated security patch deployments, database index optimizations, and direct priority escalation to core software architects.",
    category: "Support"
  }
];

const WhyFAQ = ({ faqs = [] }) => {
  const displayFaqs = faqs && faqs.length > 0 ? faqs : defaultWhyFaqs;
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
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
            <HelpCircle size={13} /> Common Questions
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Everything you need to know about partnering with DevSamp, our engineering standards, and commercial agreements.
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
                    ? "bg-slate-50 border-indigo-300 shadow-md ring-1 ring-indigo-500/20" 
                    : "bg-slate-50/60 border-slate-200/90 hover:border-slate-300 shadow-xs"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-indigo-600 shrink-0">
                      0{idx + 1}.
                    </span>
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ${
                    isOpen ? "bg-indigo-600 text-white rotate-180 shadow-xs" : "bg-slate-200/70 text-slate-600"
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
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-slate-200/80 mt-2 text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
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

export default WhyFAQ;
