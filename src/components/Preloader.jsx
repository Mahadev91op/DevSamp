"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fast Loading Logic
    const interval = setInterval(() => {
      setCount((prev) => {
        // Randomly 1 se 15 ke beech jump karega (Bahut tez)
        const jump = Math.floor(Math.random() * 15) + 1; 
        const next = prev + jump;

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 200); // Sirf 0.2 second rukega complete hone par
          return 100;
        }
        return next;
      });
    }, 40); // Har 40ms me update hoga

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } // Fast "Curtain" Exit
          }} 
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black text-white"
        >
          <div className="text-center">
            {/* Percentage Text */}
            <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[15vw] md:text-[10vw] font-bold font-mono leading-none tracking-tighter"
            >
              {count}%
            </motion.h1>
            
            {/* Loading Bar */}
            <div className="w-64 h-1 bg-white/20 mt-4 rounded-full overflow-hidden mx-auto">
                <motion.div 
                    className="h-full bg-blue-500"
                    style={{ width: `${count}%` }}
                    // Bar animation smooth rahegi bhale hi numbers jump karein
                    transition={{ type: "spring", stiffness: 100 }}
                />
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;