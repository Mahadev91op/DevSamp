"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

// --- FIX: Predefined Gradients ---
// Ye classes ab code me hain, to Tailwind inka CSS pakka generate karega.
// Colors gayab hone ki problem isse solve ho jayegi.
const gradients = [
  "from-blue-500 to-cyan-500",      // Card 1
  "from-purple-500 to-pink-500",    // Card 2
  "from-orange-500 to-red-500",     // Card 3
  "from-emerald-500 to-green-500",  // Card 4
  "from-pink-500 to-rose-500",      // Card 5
  "from-yellow-500 to-orange-500",  // Card 6
];

// --- Fallback Colors for Icon Box ---
const textColors = [
  "text-blue-500",
  "text-purple-500",
  "text-orange-500",
  "text-emerald-500",
  "text-pink-500",
  "text-yellow-500",
];

const Services = () => {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServicesData(data.services || []);
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="relative w-full py-24 bg-black text-white">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] left-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Our <span className="text-blue-500">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto text-lg"
          >
            We provide comprehensive digital solutions to help your business grow and stand out.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const IconComponent = LucideIcons[service.icon] || LucideIcons.HelpCircle;
            
            // Fix: Index ke hisaab se gradient aur color assign karna
            // Agar DB me missing bhi ho, tab bhi ye sahi chalega.
            const gradientClass = gradients[index % gradients.length];
            const colorClass = textColors[index % textColors.length];

            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative p-1 rounded-2xl bg-white/5 hover:bg-transparent transition-all duration-300"
              >
                {/* --- Glow Effect --- */}
                <div className={`absolute -inset-[2px] rounded-2xl bg-gradient-to-r ${gradientClass} opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500 -z-10`} />
                
                {/* Card Content */}
                <div className="h-full bg-neutral-900/90 backdrop-blur-xl border border-white/10 p-8 rounded-xl group-hover:border-transparent transition-colors relative overflow-hidden">
                  
                  {/* Decorative Circle behind Icon */}
                  <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${gradientClass} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out`}></div>

                  {/* Icon */}
                  <div className={`mb-6 p-3 w-fit rounded-lg bg-white/5 border border-white/10 ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={32} />
                  </div>

                  {/* Text */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300">
                    {service.desc}
                  </p>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;