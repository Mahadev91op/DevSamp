"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const TopProgressBar = () => {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    if (isNavigating) {
      setIsNavigating(false);
    }
  }

  useEffect(() => {
    // Intercept internal link clicks to trigger instant visual feedback
    const handleClick = (e) => {
      const target = e.target.closest("a");
      if (
        target &&
        target.href &&
        target.href.startsWith(window.location.origin) &&
        !target.href.includes("#") &&
        target.target !== "_blank" &&
        target.pathname !== window.location.pathname
      ) {
        setIsNavigating(true);
      }
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 0.85, opacity: 1 }}
          exit={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ transformOrigin: "0% 50%" }}
          className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 z-[999999] pointer-events-none shadow-sm shadow-indigo-500/50"
        />
      )}
    </AnimatePresence>
  );
};

export default TopProgressBar;
