"use client";

// FIX: 'useEffect' aur 'useState' hata diya (agar zaroorat nahi)
// lekin agar aap bad me kuch filter lagana chahe to useState rakh sakte hain, 
// par abhi direct prop use karna fastest hai.
import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";

// --- Predefined Gradients ---
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

// FIX: Props accept kar raha hai
const Services = ({ initialServices = [] }) => {
  
  // FIX: Direct prop use kiya, no loading state needed!
  const servicesData = initialServices;

  // Split data into two halves
  const midpoint = Math.ceil(servicesData.length / 2);
  const row1Data = servicesData.slice(0, midpoint);
  const row2Data = servicesData.slice(midpoint);

  // Common Card Render Function
  const renderCard = (service, index, globalIndex) => {
    const IconComponent = LucideIcons[service.icon] || LucideIcons.HelpCircle;
    const gradientClass = gradients[globalIndex % gradients.length];
    const colorClass = textColors[globalIndex % textColors.length];

    return (
      <Link href="#contact" key={service._id} className="block h-full snap-center min-w-[75vw] sm:min-w-[45%] md:min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="group relative p-1 rounded-2xl bg-white/5 hover:bg-transparent transition-all duration-300 h-full"
        >
          {/* --- Glow Effect --- */}
          <div className={`absolute -inset-[2px] rounded-2xl bg-gradient-to-r ${gradientClass} opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500 -z-10`} />
          
          {/* Card Content */}
          <div className="h-full bg-neutral-900/90 backdrop-blur-xl border border-white/10 p-5 md:p-8 rounded-xl group-hover:border-transparent transition-colors relative overflow-hidden flex flex-col justify-center">
            
            {/* Decorative Circle */}
            <div className={`absolute -right-4 -top-4 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br ${gradientClass} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out`}></div>

            {/* Icon */}
            <div className={`mb-3 md:mb-6 p-2.5 md:p-3 w-fit rounded-lg bg-white/5 border border-white/10 ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent size={28} className="md:w-8 md:h-8" />
            </div>

            {/* Text */}
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 group-hover:text-white transition-colors line-clamp-1">
              {service.title}
            </h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed group-hover:text-gray-300 line-clamp-2 md:line-clamp-none">
              {service.desc}
            </p>

          </div>
        </motion.div>
      </Link>
    );
  };

  return (
    <section id="services" className="relative w-full py-12 md:py-24 bg-black text-white">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] right-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-blue-900/10 rounded-full blur-[80px] md:blur-[120px]"></div>
          <div className="absolute bottom-[10%] left-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-purple-900/10 rounded-full blur-[80px] md:blur-[120px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-4 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-3 md:mb-4"
          >
            Our <span className="text-blue-500">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto text-base md:text-lg px-2"
          >
            We provide comprehensive digital solutions to help your business grow and stand out.
          </motion.p>
        </div>

        {/* --- ROW 1 (Independent Scroll) --- */}
        <div className="
            flex overflow-x-auto py-10 px-4 gap-4 snap-x snap-mandatory overflow-y-hidden
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
            md:grid md:grid-cols-3 md:gap-8 md:pb-0 md:p-0 md:overflow-visible
        ">
          {row1Data.map((service, index) => renderCard(service, index, index))}
        </div>

        {/* --- ROW 2 (Independent Scroll) --- */}
        <div className="
            -mt-14 md:mt-8 
            flex overflow-x-auto py-10 px-4 gap-4 snap-x snap-mandatory overflow-y-hidden
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
            md:grid md:grid-cols-3 md:gap-8 md:pb-0 md:p-0 md:overflow-visible
        ">
          {row2Data.map((service, index) => renderCard(service, index, midpoint + index))}
        </div>

      </div>
    </section>
  );
};

export default Services;