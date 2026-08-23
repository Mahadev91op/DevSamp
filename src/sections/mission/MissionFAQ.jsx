"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ChevronRight, CornerDownRight, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultFaqs = [
  {
    question: "What is DevSamp's core mission?",
    answer: "DevSamp's mission is to build reliable, scalable digital products for customers and businesses, eliminating technical debt and delivering compounding software value.",
    order: 1
  },
  {
    question: "What does 'reliable' mean at DevSamp?",
    answer: "Reliable means software that works predictably 24/7—with zero unhandled crashes, defensive error boundaries, secure session handling, and sub-second operational latency.",
    order: 2
  },
  {
    question: "What does 'scalable' mean in your engineering approach?",
    answer: "Scalable means architectures built with compound database index trees, multi-tenant schema isolation, and modular components that scale 10x without needing expensive code rewrites.",
    order: 3
  },
  {
    question: "Does DevSamp build custom software or only its own SaaS?",
    answer: "Both. We build and operate our own software products (like MedERP Pro) while also deploying dedicated engineering pods for clients who need custom platforms built to the same enterprise standards.",
    order: 4
  }
];

const MissionFAQ = ({ data = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const faqs = data && data.length > 0 ? data : defaultFaqs;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative">
      <div className="ecosystem-container max-w-3xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Terminal size={12} /> Diagnostics
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            Frequently Asked Questions About Our Mission
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            Direct clarity on what we build, how we guarantee reliability, and how our software creates business value.
          </p>
        </div>

        {/* Terminal Accordion Wrapper */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden min-w-0">
          
          {/* Top Bar */}
          <div className="h-11 bg-slate-100/90 border-b border-slate-200/70 px-4 md:px-6 flex items-center justify-between select-none min-w-0">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider truncate">
              <Terminal size={12} className="text-indigo-600 shrink-0" />
              <span className="truncate">guest@devsamp:~ $ help --mission-ops</span>
            </div>
            <div className="w-6 shrink-0"></div>
          </div>

          {/* Console Accordion Items */}
          <div className="p-3.5 md:p-5 space-y-2.5 font-mono min-w-0">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div
                  key={index}
                  className={`border transition-all duration-300 rounded-2xl min-w-0 ${
                    isOpen 
                      ? "bg-slate-50/80 border-slate-200 shadow-xs" 
                      : "bg-transparent border-transparent hover:bg-slate-50/40"
                  }`}
                >
                  {/* Command Row */}
                  <div
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    className="p-3.5 md:p-4 flex items-center justify-between cursor-pointer select-none min-w-0 gap-3"
                    data-cursor="Query"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm min-w-0 flex-1">
                      <span className="text-indigo-600 font-black shrink-0">$</span>
                      <span className="text-slate-400 font-bold text-[11px] shrink-0">query m-0{index + 1}</span>
                      <h3 className={`font-sans font-bold text-xs sm:text-sm transition-colors pl-1 min-w-0 flex-1 truncate ${
                        isOpen ? "text-indigo-700 font-black" : "text-slate-800 hover:text-slate-950"
                      }`}>
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`p-1 rounded-full border transition-all duration-300 shrink-0 ${
                      isOpen 
                        ? "rotate-90 text-indigo-600 border-indigo-200 bg-indigo-50" 
                        : "text-slate-400 border-slate-200 bg-white"
                    }`}>
                      <ChevronRight size={13} />
                    </div>
                  </div>

                  {/* STDOUT Response Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                      >
                        <div className="px-4 pb-4 pl-4 md:pl-7 text-xs text-slate-700 leading-relaxed font-mono flex items-start gap-2 border-t border-slate-200/60 pt-3 bg-slate-50/60 rounded-b-2xl min-w-0">
                          <CornerDownRight size={13} className="text-indigo-600 shrink-0 mt-0.5" />
                          <div className="space-y-0.5 min-w-0 flex-1">
                            <span className="text-indigo-600 text-[10px] font-bold select-none">[STDOUT] &gt; </span>
                            <span className="font-sans font-normal text-slate-600 text-xs sm:text-sm pl-0.5 leading-relaxed block">{faq.answer}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default MissionFAQ;
