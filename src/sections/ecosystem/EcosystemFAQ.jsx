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

const defaultFaqs = [
  {
    question: "How is DevSamp different from a standard web agency?",
    answer: "Standard agencies build disposable, one-off websites and hand off unmaintained code. DevSamp operates as an integrated software ecosystem—building reusable SaaS products, maintaining dedicated engineering pods, and running continuous cloud operations with 24/7 SLA.",
    category: "Architecture"
  },
  {
    question: "Can I use a DevSamp product and also hire an engineering pod to customize it?",
    answer: "Yes! That is our most popular engagement model. You license one of our SaaS platforms (such as MedERP Pro or FlowPulse POS) and retain a dedicated DevSamp pod to build custom workflows, private APIs, and bespoke integrations tailored specifically to your business.",
    category: "Engagement"
  },
  {
    question: "Do I own the intellectual property and source code for custom builds?",
    answer: "Yes. For bespoke client projects and custom engineering pods, you retain 100% full ownership of your custom business logic, database schemas, and proprietary code repositories upon milestone completion.",
    category: "Governance"
  },
  {
    question: "How do DevSamp products share infrastructure without compromising security?",
    answer: "Every application operates with strict tenant isolation, isolated schema routing, encrypted JWT sessions, and dedicated database indexes. No customer or clinical data is ever shared across tenant boundaries.",
    category: "Security"
  },
  {
    question: "How do I get started with the DevSamp Ecosystem?",
    answer: "You can start by exploring our live SaaS products on the /products page, commissioning an engineering pod on the /services page, or initializing a direct discovery call with our senior architects via the contact pod.",
    category: "Getting Started"
  }
];

const EcosystemFAQ = ({ faqs = [] }) => {
  const displayFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;
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
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 uppercase tracking-widest mb-3"
          >
            <HelpCircle size={13} /> Ecosystem FAQ
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
            Everything you need to know about our interconnected products, engineering pods, platform technology, and commercial agreements.
          </motion.p>
        </div>

        {/* FAQ Accordion List */}
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
                    ? "bg-white border-indigo-300 shadow-md ring-1 ring-indigo-500/20" 
                    : "bg-white/80 border-slate-200/90 hover:border-slate-300 shadow-xs"
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
                    isOpen ? "bg-indigo-600 text-white rotate-180 shadow-xs" : "bg-slate-100 text-slate-600"
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

export default EcosystemFAQ;
