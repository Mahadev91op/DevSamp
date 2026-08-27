"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only run on the very first page load of the browser session
    try {
      if (sessionStorage.getItem("devsamp_preloaded")) {
        return;
      }
      sessionStorage.setItem("devsamp_preloaded", "true");
    } catch (e) {
      return;
    }

    const startTimer = setTimeout(() => {
      setIsLoading(true);
    }, 0);

    // Ultra-fast entrance animation (max 300ms)
    const interval = setInterval(() => {
      setCount((prev) => {
        const jump = Math.floor(Math.random() * 25) + 15; 
        const next = prev + jump;

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 100);
          return 100;
        }
        return next;
      });
    }, 20);

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
          }} 
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-50 text-slate-900 pointer-events-none"
        >
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[15vw] md:text-[10vw] font-bold font-mono leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600"
            >
              {count}%
            </motion.h1>
            
            <div className="w-64 h-1.5 bg-slate-200 mt-4 rounded-full overflow-hidden mx-auto">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                style={{ width: `${count}%` }}
                transition={{ type: "spring", stiffness: 120 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;