"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Youtube, 
  Instagram, 
  ArrowUpRight,
  Bird,
  Clock,
  Terminal,
  Cpu,
  Boxes,
  ShieldCheck,
  Code2
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

// X (Twitter) Icon
const XIcon = ({ size = 18, className }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const Footer = ({ products = [], services = [], siteSettings = null }) => {
  const [time, setTime] = useState("");

  // Running workspace clock (IST - GMT+5:30)
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

  return (
    <footer className="bg-transparent text-slate-900 pt-16 pb-24 md:pt-20 md:pb-0 overflow-hidden relative border-t border-slate-200/80">
      
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
              DevSamp Ecosystem
            </div>
            <h2 className="text-fluid-h2 font-black leading-tight tracking-tight text-slate-950">
              Ready to engineer your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                digital future?
              </span>
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-2 md:mt-0">
            <Link href="/#products" className="w-full sm:w-auto">
              <button 
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-white border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                data-cursor="Products"
              >
                <Boxes size={15} className="text-indigo-600" /> Explore Products
              </button>
            </Link>
            <Link href="/#contact" className="w-full sm:w-auto">
              <button 
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-slate-950 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-sm group cursor-pointer"
                data-cursor="Connect"
              >
                <span>Initialize Connection</span>
                <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300 w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* --- 6-COLUMN ECOSYSTEM GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-8 mb-8 md:mb-10">
          
          {/* 1. Identity & Real-Time IST Node */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-4 space-y-4">
            <div>
              <Link href="/" className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs flex items-center justify-center font-black">DS</span>
                <span>DEV<span className="text-indigo-650">SAMP</span></span>
              </Link>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
                A connected technology ecosystem delivering enterprise software products, full-stack solutions, and developer infrastructure.
              </p>
            </div>

            {/* Real-time Kolkata Clock */}
            {time && (
              <div className="inline-flex items-center gap-2 bg-white border border-slate-200/80 p-2.5 rounded-2xl font-mono text-[11px] text-slate-600 select-none shadow-xs">
                <Clock size={12} className="text-indigo-500 animate-pulse" />
                <span>HQ_NODE (IST):</span>
                <span className="font-bold text-slate-900">{time}</span>
              </div>
            )}

            {/* Social Channels */}
            <div className="flex gap-2 pt-1">
              {[
                { href: "https://www.freelancer.in/u/DevSamp", icon: <Bird size={15} />, color: "hover:bg-indigo-600 hover:text-white" },
                { href: "https://www.youtube.com/@DevSamp1st", icon: <Youtube size={15} />, color: "hover:bg-red-600 hover:text-white" },
                { href: "https://x.com/devsamp1st", icon: <XIcon size={15} />, color: "hover:bg-slate-900 hover:text-white" },
                { href: "https://www.instagram.com/devsamp1st/", icon: <Instagram size={15} />, color: "hover:bg-pink-600 hover:text-white" }
              ].map((social, index) => (
                <motion.a 
                  key={index} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-xl bg-white border border-slate-200/70 text-slate-500 ${social.color} transition-colors shadow-xs`}
                  whileHover={{ y: -2 }}
                  data-cursor="Social"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* 2. Products */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <Boxes size={13} className="text-indigo-600" /> Products
            </h4>
            <div className="flex flex-col gap-2 font-medium text-xs sm:text-sm">
              {[
                { name: "MedERP Pro", href: "/#products" },
                { name: "DevScale Core", href: "/#products" },
                { name: "FlowPulse POS", href: "/#products" },
                { name: "OmniDesk AI", href: "/#products" },
              ].map((item, idx) => (
                <Link key={idx} href={item.href} className="text-slate-600 hover:text-indigo-600 transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* 3. Services */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <Cpu size={13} className="text-indigo-600" /> Services
            </h4>
            <div className="flex flex-col gap-2 font-medium text-xs sm:text-sm">
              {[
                { name: "SaaS Development", href: "/#services" },
                { name: "Next.js Web Apps", href: "/#services" },
                { name: "Mobile Applications", href: "/#services" },
                { name: "AI Workflow Solutions", href: "/#services" },
              ].map((item, idx) => (
                <Link key={idx} href={item.href} className="text-slate-600 hover:text-indigo-600 transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* 4. Developers & Platform */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <Terminal size={13} className="text-indigo-600" /> Developers
            </h4>
            <div className="flex flex-col gap-2 font-medium text-xs sm:text-sm">
              {[
                { name: "REST APIs", href: "/#developers" },
                { name: "Documentation", href: "/#developers" },
                { name: "Webhooks", href: "/#developers" },
                { name: "API Status", href: "/#developers" },
              ].map((item, idx) => (
                <Link key={idx} href={item.href} className="text-slate-600 hover:text-indigo-600 transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* 5. Company & Trust */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-indigo-600" /> Company
            </h4>
            <div className="flex flex-col gap-2 font-medium text-xs sm:text-sm">
              {[
                { name: "About DevSamp", href: "/about" },
                { name: "Vision 2035", href: "/vision" },
                { name: "Why DevSamp", href: "/#why-devsamp" },
                { name: "Case Studies", href: "/#case-studies" },
                { name: "Changelog", href: "/blog" },
                { name: "Contact Pod", href: "/#contact" },
              ].map((item, idx) => (
                <Link key={idx} href={item.href} className="text-slate-600 hover:text-indigo-600 transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>



        </div>

        {/* --- GIANT ANIMATED BRAND TEXT WATERMARK --- */}
        <div className="relative w-full overflow-hidden select-none my-4 md:my-8 text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="text-[13vw] font-black tracking-tighter leading-none text-outline uppercase font-sans select-none block"
          >
            DEVSAMP
          </motion.div>
        </div>

        {/* --- BOTTOM TELEMETRY BAR --- */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-slate-200 pt-5 pb-12 md:pb-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-medium gap-3"
        >
          <div>
            © {new Date().getFullYear()} DevSamp Ecosystem. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link href="/sitemap" className="hover:text-slate-900 transition-colors">Sitemap</Link>
          </div>
        </motion.div>

      </motion.div>
    </footer>
  );
};

export default Footer;