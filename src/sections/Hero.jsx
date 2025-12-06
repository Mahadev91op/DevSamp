"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Code2, 
  LayoutTemplate, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  CheckCircle2 
} from "lucide-react";

const Hero = () => {
  return (
    // FIX 1: 'pb-40' kar diya taaki niche kaafi jagah bache aur content upar rahe
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden pt-32 pb-40">
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* --- SOCIAL SIDEBAR --- */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="hidden xl:flex absolute left-10 top-1/2 -translate-y-1/2 flex-col gap-6 items-center z-20"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-gray-600"></div>
        <div className="flex flex-col gap-6">
            <a href="#" className="text-gray-500 hover:text-blue-500 hover:-translate-y-1 transition-all"><Github size={22} /></a>
            <a href="#" className="text-gray-500 hover:text-blue-500 hover:-translate-y-1 transition-all"><Linkedin size={22} /></a>
            <a href="#" className="text-gray-500 hover:text-blue-500 hover:-translate-y-1 transition-all"><Twitter size={22} /></a>
            <a href="#" className="text-gray-500 hover:text-blue-500 hover:-translate-y-1 transition-all"><Instagram size={22} /></a>
        </div>
        <div className="w-[1px] h-24 bg-gradient-to-t from-transparent to-gray-600"></div>
      </motion.div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8 backdrop-blur-sm hover:border-blue-500/30 transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Available for Freelance Projects
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6"
        >
          Transforming Ideas Into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Digital Reality
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          DevSamp is a creative agency specializing in Next.js, motion design, 
          and scalable web solutions for modern businesses.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full"
        >
          <button className="group px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all flex items-center gap-2 shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)]">
            Start a Project 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="px-8 py-3.5 rounded-full border border-white/20 hover:bg-white/10 text-white font-semibold text-lg transition-all backdrop-blur-sm">
            View Portfolio
          </button>
        </motion.div>

        {/* --- STATS BAR --- */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 pt-8 border-t border-white/10 w-full max-w-3xl flex flex-wrap justify-center sm:justify-between gap-6 sm:gap-0"
        >
            <div className="flex items-center gap-3 text-gray-400">
                <div className="bg-blue-500/10 p-2 rounded-full"><CheckCircle2 className="text-blue-500" size={18} /></div>
                <span className="text-sm font-medium">100% Client Satisfaction</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
                <div className="bg-purple-500/10 p-2 rounded-full"><CheckCircle2 className="text-purple-500" size={18} /></div>
                <span className="text-sm font-medium">Fast Delivery</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
                <div className="bg-pink-500/10 p-2 rounded-full"><CheckCircle2 className="text-pink-500" size={18} /></div>
                <span className="text-sm font-medium">24/7 Support</span>
            </div>
        </motion.div>

      </div>

      {/* --- FLOATING BACKGROUND ICONS --- */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[5%] hidden 2xl:block text-gray-800 opacity-20"
      >
        <Code2 size={100} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] right-[5%] hidden 2xl:block text-gray-800 opacity-20"
      >
        <LayoutTemplate size={100} />
      </motion.div>

      {/* --- SCROLL INDICATOR --- */}
      {/* FIX 2: 'bottom-10' use kiya taaki ye content se door rahe */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 z-20 cursor-pointer"
      >
        <div className="w-[30px] h-[50px] border-2 border-white/20 rounded-full flex justify-center pt-2 p-1 bg-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <motion.div 
                animate={{ 
                    y: [0, 15, 0], 
                    opacity: [1, 0, 1] 
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-2 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"
            />
        </div>
        <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-medium animate-pulse">
            Scroll
        </span>
      </motion.div>

    </section>
  );
};

export default Hero;