"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultFaqs = [
  {
    question: "How does DevSamp structure dedicated engineering pod retainers?",
    answer: "Our dedicated engineering pods consist of senior fullstack engineers matched to your technical stack. Engagements operate on transparent monthly retainers with no minimum long-term contract lock-in. You receive daily asynchronous progress updates, weekly video syncs, and direct repository pull requests with 100% intellectual property transfer.",
    category: "Engagements",
  },
  {
    question: "Do I retain 100% intellectual property of custom code built by DevSamp?",
    answer: "Yes, 100%. All custom code, architectures, database schemas, and digital assets developed for your project are fully owned by you from the first sprint. We do not retain proprietary holdbacks or licensing liens on client bespoke codebases.",
    category: "Ownership",
  },
  {
    question: "What is included with DevSamp proprietary SaaS software licensing?",
    answer: "DevSamp SaaS licenses (like MedERP Pro and FlowPulse POS) include cloud hosting, multi-tenant database partitioning, automated SSL certificates, daily automated data backups, continuous security patches, and version upgrades.",
    category: "SaaS Licensing",
  },
  {
    question: "Can we switch between monthly and annual billing intervals?",
    answer: "Yes. You can switch between monthly and annual billing at the start of any billing cycle. Annual billing includes configured multi-month discounts and priority architectural advisory time.",
    category: "Billing",
  },
  {
    question: "What happens if our project scope exceeds standard blueprint tiers?",
    answer: "If your workflow requires bespoke multi-region clusters, legacy mainframe bridges, or custom compliance auditing (e.g. HIPAA, SOC2), our solutions architects conduct an architectural scoping session to formulate a custom milestone-based proposal.",
    category: "Custom Scopes",
  },
  {
    question: "How quickly can a DevSamp engineering pod be initialized?",
    answer: "Standard engineering pods can be initialized within 3 to 5 business days following scope alignment and repository access provisioning.",
    category: "Delivery",
  },
];

const PricingFAQ = ({ faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const displayFaqs = Array.isArray(faqs) && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">
            <HelpCircle size={13} /> Commercial FAQ
          </div>
          <h2 className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950">
            Frequently Answered <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">Questions</span>
          </h2>
          <p className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed">
            Everything you need to know regarding DevSamp billing intervals, IP ownership, SLAs, and custom scope initialization.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {displayFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`border rounded-2xl sm:rounded-3xl transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "bg-blue-50/20 border-blue-300 shadow-sm" 
                    : "bg-white border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: smoothEase }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-blue-100/60 pt-4">
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

export default PricingFAQ;
