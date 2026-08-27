"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Youtube, 
  Instagram, 
  Linkedin,
  ArrowUpRight,
  Clock,
  Terminal,
  Cpu,
  Boxes,
  ShieldCheck,
  Code2,
  ChevronDown,
  Layers,
  Activity,
  Compass,
  Lock,
  Sparkles,
  Mail,
  CheckCircle2
} from "lucide-react";
import { navigationConfig } from "@/config/navigation";

const smoothEase = [0.16, 1, 0.3, 1];

// X (Twitter) Icon
const XIcon = ({ size = 16, className }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const Footer = ({ products = [], services = [], siteSettings = null }) => {
  const [time, setTime] = useState("");
  const [openMobileColumn, setOpenMobileColumn] = useState(null);

  // Live workspace clock (IST - GMT+5:30)
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setTime(formatter.format(new Date()));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const emailAddress = siteSettings?.contactEmail || "devsamp1st@gmail.com";
  const phoneNumber = siteSettings?.contactPhone || "+91 9330680642";

  const handlePhoneClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
    const message = "Hello DevSamp, I checked your website and would like to discuss an ecosystem project.";

    if (isMobile) {
      window.location.href = `tel:+${cleanPhone}`;
    } else {
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, "_blank");
    }
  };

  const mailtoLink = `mailto:${emailAddress}?subject=Inquiry%20regarding%20DevSamp%20Ecosystem&body=Hello%20DevSamp%20Team,%0A%0AI%20am%20interested%20in%20discussing%20a%20project.`;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: smoothEase } },
  };

  const toggleMobileCol = (colId) => {
    setOpenMobileColumn(openMobileColumn === colId ? null : colId);
  };

  return (
    <footer className="bg-transparent text-slate-900 pt-16 pb-20 md:pt-20 md:pb-8 overflow-hidden relative border-t border-slate-200/80">
      
      <motion.div 
        className="ecosystem-container relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        
        {/* --- TOP CTA BANNER --- */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-8 md:mb-14 md:pb-10 border-b border-slate-200 min-w-0 gap-6"
        >
          <div className="max-w-xl min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
              DevSamp Connected Ecosystem
            </div>
            <h2 className="text-fluid-h2 font-black leading-tight tracking-tight text-slate-950">
              Ready to Architect Your Next Digital Platform?
            </h2>
            <p className="text-slate-600 text-fluid-body mt-2 font-normal">
              Deploy our proprietary software platforms or partner with a dedicated senior engineering pod.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <Link href="/#contact" prefetch={true}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-full bg-slate-950 hover:bg-indigo-600 text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 group cursor-pointer"
                data-cursor="Connect"
              >
                <span>Initialize Conversation</span>
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </Link>

            <button
              onClick={handlePhoneClick}
              className="px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              data-cursor="Call"
            >
              <span>{phoneNumber}</span>
            </button>
          </div>
        </motion.div>

        {/* --- 6-COLUMN DIRECTORY GRID (DESKTOP) & ACCORDION (MOBILE) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12 min-w-0">
          
          {/* Column 1: Brand & Status */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
                DS
              </div>
              <span className="text-base font-black text-slate-950 tracking-tight">
                DEVSAMP
              </span>
            </div>

            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Software engineering company powering modern enterprises with reliable SaaS products and dedicated engineering pods.
            </p>

            {/* Live IST Workspace Clock */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200/80 text-[11px] font-mono text-slate-700 font-bold">
              <Clock size={12} className="text-indigo-600 animate-pulse" />
              <span>IST: {time || "12:00:00 PM"}</span>
            </div>

            {/* Operational Status */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-600 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-emerald-700">ALL SYSTEMS OPERATIONAL</span>
            </div>
          </motion.div>

          {/* Columns 2-6: Config-Driven Directory Columns */}
          {navigationConfig.footer.columns.map((col) => (
            <motion.div key={col.id} variants={itemVariants} className="col-span-1">
              
              {/* Desktop Column Header */}
              <h3 className="hidden md:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-950 mb-3.5">
                {col.title}
              </h3>

              {/* Mobile Accordion Header */}
              <button
                onClick={() => toggleMobileCol(col.id)}
                className="md:hidden w-full py-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-100"
              >
                <span>{col.title}</span>
                <ChevronDown 
                  size={14} 
                  className={`transition-transform text-slate-400 ${openMobileColumn === col.id ? "rotate-180 text-indigo-600" : ""}`}
                />
              </button>

              {/* Desktop Links List */}
              <div className="hidden md:flex flex-col gap-2 font-medium text-xs">
                {col.items.map((item, idx) => {
                  if (item.enabled === false) return null;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      prefetch={true}
                      className="text-slate-600 hover:text-indigo-600 transition-colors py-0.5"
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Collapsible Links */}
              <AnimatePresence>
                {openMobileColumn === col.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="md:hidden flex flex-col gap-2 py-3 pl-2 font-medium text-xs"
                  >
                    {col.items.map((item, idx) => {
                      if (item.enabled === false) return null;
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          prefetch={true}
                          className="text-slate-600 hover:text-indigo-600 transition-colors py-1"
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          ))}

        </div>

        {/* --- GIANT ANIMATED BRAND TEXT WATERMARK --- */}
        <div className="relative w-full overflow-hidden select-none my-4 md:my-8 text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="text-[16vw] font-black tracking-tighter leading-none text-slate-900/[0.04] whitespace-nowrap uppercase"
          >
            DEVSAMP
          </motion.div>
        </div>

        {/* --- BOTTOM BAR: LEGAL & COPYRIGHT & SOCIAL --- */}
        <motion.div
          variants={itemVariants}
          className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500"
        >
          {/* Dynamic Copyright */}
          <div>
            © {new Date().getFullYear()} DevSamp Ecosystem. All rights reserved.
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center gap-4">
            {navigationConfig.footer.legalLinks.map((leg, idx) => (
              <Link
                key={idx}
                href={leg.href}
                prefetch={true}
                className="hover:text-indigo-600 transition-colors"
              >
                {leg.label}
              </Link>
            ))}
          </div>

          {/* Configured Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/devsamp1st"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 flex items-center justify-center transition-colors shadow-2xs"
              aria-label="X (formerly Twitter)"
            >
              <XIcon size={14} />
            </a>
            <a
              href="https://www.instagram.com/devsamp1st/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 flex items-center justify-center transition-colors shadow-2xs"
              aria-label="Instagram"
            >
              <Instagram size={14} />
            </a>
            <a
              href="https://www.youtube.com/@DevSamp1st"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 flex items-center justify-center transition-colors shadow-2xs"
              aria-label="YouTube"
            >
              <Youtube size={14} />
            </a>
            <a
              href="https://www.linkedin.com/company/devsamp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 flex items-center justify-center transition-colors shadow-2xs"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
          </div>

        </motion.div>

      </motion.div>
    </footer>
  );
};

export default Footer;