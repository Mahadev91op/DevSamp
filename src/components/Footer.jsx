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

// X (Twitter) Icon
const XIcon = ({ size = 20, className }) => (
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
    show: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <footer className="bg-transparent text-slate-900 pt-16 pb-24 md:pt-24 md:pb-0 overflow-hidden relative border-t border-slate-200/80">
      
      <motion.div 
        className="container mx-auto px-4 md:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        
        {/* --- TOP CTA BANNER --- */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-8 md:mb-16 md:pb-12 border-b border-slate-200"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3">
              DevSamp Ecosystem
            </div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
              Ready to engineer your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                digital future?
              </span>
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-6 md:mt-0">
            <Link href="/#products" className="w-full sm:w-auto">
              <button 
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white border border-slate-300 text-slate-800 font-bold text-xs md:text-sm hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2"
                data-cursor="Products"
              >
                <Boxes size={14} className="text-indigo-600" /> Explore Products
              </button>
            </Link>
            <Link href="/#contact" className="w-full sm:w-auto">
              <button 
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-950 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-md group"
                data-cursor="Connect"
              >
                Initialize Connection
                <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300 w-4 h-4" />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* --- 6-COLUMN ECOSYSTEM GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 mb-12 md:mb-16">
          
          {/* 1. Identity & Real-Time IST Node */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-4 space-y-4">
            <div>
              <Link href="/" className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs flex items-center justify-center font-black">DS</span>
                <span>DEV<span className="text-indigo-650">SAMP</span></span>
              </Link>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-sm font-semibold">
                A connected technology ecosystem delivering enterprise software products, full-stack solutions, and developer infrastructure.
              </p>
            </div>

            {/* Real-time Kolkata Clock */}
            {time && (
              <div className="inline-flex items-center gap-2 bg-white border border-slate-200/80 p-2.5 rounded-2xl font-mono text-[10px] text-slate-600 select-none shadow-sm">
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
                  className={`p-2.5 rounded-xl bg-white border border-slate-200/70 text-slate-500 ${social.color} transition-colors shadow-sm`}
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
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3.5 flex items-center gap-1.5">
              <Boxes size={12} className="text-indigo-500" /> Products
            </h4>
            <div className="flex flex-col gap-2.5 font-bold text-xs">
              {[
                { name: "MedERP Pro", href: "/#products" },
                { name: "DevScale Core", href: "/#products" },
                { name: "FlowPulse POS", href: "/#products" },
                { name: "OmniDesk AI", href: "/#products" },
              ].map((item, idx) => (
                <Link key={idx} href={item.href} className="text-slate-600 hover:text-indigo-650 transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* 3. Services */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3.5 flex items-center gap-1.5">
              <Cpu size={12} className="text-indigo-500" /> Services
            </h4>
            <div className="flex flex-col gap-2.5 font-bold text-xs">
              {[
                { name: "SaaS Development", href: "/#services" },
                { name: "Next.js Web Apps", href: "/#services" },
                { name: "Mobile Applications", href: "/#services" },
                { name: "AI Workflow Solutions", href: "/#services" },
              ].map((item, idx) => (
                <Link key={idx} href={item.href} className="text-slate-600 hover:text-indigo-650 transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* 4. Developers & Platform */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3.5 flex items-center gap-1.5">
              <Terminal size={12} className="text-indigo-500" /> Developers
            </h4>
            <div className="flex flex-col gap-2.5 font-bold text-xs">
              {[
                { name: "REST APIs", href: "/#developers" },
                { name: "Documentation", href: "/#developers" },
                { name: "SDKs & Webhooks", href: "/#developers" },
                { name: "Ecosystem Graph", href: "/#ecosystem" },
              ].map((item, idx) => (
                <Link key={idx} href={item.href} className="text-slate-600 hover:text-indigo-650 transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* 5. Company & Contact */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3.5 flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-indigo-500" /> Company
            </h4>
            <div className="flex flex-col gap-2.5 font-bold text-xs">
              {[
                { name: "Philosophy", href: "/#about" },
                { name: "Engineering Squad", href: "/#team" },
                { name: "Release Logs", href: "/blog" },
                { name: "Portfolio", href: "/projects" },
              ].map((item, idx) => (
                <Link key={idx} href={item.href} className="text-slate-600 hover:text-indigo-650 transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-slate-200 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-slate-500 mb-6 gap-3 md:gap-0 font-bold"
        >
          <p>&copy; {new Date().getFullYear()} DevSamp Ecosystem. All rights reserved.</p>
          <div className="flex gap-4 md:gap-6 uppercase tracking-wider font-mono">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-slate-900 transition-colors">Sitemap</Link>
          </div>
        </motion.div>

      </motion.div>

      {/* BACKGROUND BRANDING TEXT */}
      <div className="w-full flex justify-center overflow-hidden pointer-events-none absolute bottom-0 z-0 select-none">
        <h1 className="text-[15vw] md:text-[18vw] font-black text-slate-900/[0.03] leading-none select-none tracking-tighter">
          DEVSAMP
        </h1>
      </div>

    </footer>
  );
};

export default Footer;