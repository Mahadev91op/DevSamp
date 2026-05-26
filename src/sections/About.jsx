"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Zap, 
  Target, 
  TrendingUp, 
  Code,
  ArrowUpRight
} from "lucide-react";

const About = () => {
  return (
    <section id="about" className="relative py-12 md:py-24 bg-transparent text-slate-900">
      
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-8 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight"
          >
            We craft <span className="text-indigo-600">digital excellence</span> with code & creativity.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-base md:text-lg leading-relaxed font-medium"
          >
            DevSamp isn't just an agency; it's a lab where ideas turn into high-performance software. 
            We bridge the gap between complex engineering and beautiful design.
          </motion.p>
        </div>

        {/* --- BENTO GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

          {/* Card 1: Main Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 relative h-[220px] md:h-[400px] rounded-3xl overflow-hidden group border border-slate-200 shadow-sm"
          >
            <Image 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
              alt="Cyberpunk Workspace"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8">
              <div className="bg-indigo-600 w-fit px-3 py-1 rounded-full text-xs font-bold text-white mb-2">SINCE 2021</div>
              <h3 className="text-xl md:text-2xl font-bold text-white">Designing the Future</h3>
            </div>
          </motion.div>

          {/* Card 2: Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-3xl p-5 md:p-8 flex flex-row md:flex-col justify-between items-center md:items-start hover:bg-white shadow-sm transition-colors"
          >
            <div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-2 md:mb-6">
                <TrendingUp size={20} className="md:w-6 md:h-6" />
              </div>
              <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-1 md:mb-2">150+</h3>
              <p className="text-xs md:text-base text-slate-500 font-semibold">Projects Delivered</p>
            </div>
            
            <div className="border-l pl-5 md:pl-0 md:border-l-0 md:border-t md:pt-8 border-slate-200 md:mt-8 w-auto md:w-full">
              <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-1 md:mb-2">98%</h3>
              <p className="text-xs md:text-base text-slate-500 font-semibold">Client Retention</p>
            </div>
          </motion.div>

          {/* Card 3: Our Approach */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-1 bg-gradient-to-br from-indigo-50/50 to-white border border-slate-200/60 rounded-3xl p-6 md:p-8 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full"></div>
            
            <Target className="text-indigo-600 mb-4" size={32} />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Strategy First</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4 font-medium">
              We don't just blindly code. We analyze your market, understand your users, and build solutions that actually sell.
            </p>
            <a href="#contact" className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors" data-cursor="Strategy">
                Let's talk strategy <ArrowUpRight size={14} />
            </a>
          </motion.div>

          {/* Card 4: Tech Stack */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden shadow-sm"
          >
             <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 blur-[60px] rounded-full pointer-events-none"></div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
                <Code className="text-pink-600" size={24} />
                <h3 className="text-xl font-bold text-slate-800">Our Tech Arsenal</h3>
            </div>
            
            {/* Auto Scrolling Tech Names */}
            <div className="w-full overflow-hidden relative z-10 mask-linear-fade">
                 <div className="flex gap-4 w-max animate-marquee">
                    {["Next.js", "React", "TypeScript", "Tailwind", "Node.js", "AWS", "Framer Motion", "Supabase", "GraphQL", "Figma"].map((tech, i) => (
                        <span key={i} className="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200/60 text-slate-700 text-sm font-mono whitespace-nowrap shadow-sm">
                            {tech}
                        </span>
                    ))}
                    {["Next.js", "React", "TypeScript", "Tailwind", "Node.js", "AWS", "Framer Motion", "Supabase", "GraphQL", "Figma"].map((tech, i) => (
                        <span key={`dup-${i}`} className="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200/60 text-slate-700 text-sm font-mono whitespace-nowrap shadow-sm">
                            {tech}
                        </span>
                    ))}
                 </div>
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default About;