"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const CustomCursor = () => {
  const pathname = usePathname();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      if (hoveredElement) {
        let el = hoveredElement;
        let isClickable = false;
        let customText = "";

        // Crawl up the DOM tree to find clickable elements and custom cursor text
        while (el && el !== document.body) {
          const style = window.getComputedStyle(el);
          if (
            style.cursor === "pointer" ||
            el.tagName === "A" ||
            el.tagName === "BUTTON" ||
            el.getAttribute("role") === "button"
          ) {
            isClickable = true;
            customText = el.getAttribute("data-cursor") || "";
            break;
          }
          el = el.parentElement;
        }

        setIsHovering(isClickable);
        setCursorText(customText);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 w-2 h-2 bg-indigo-600 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
      
      {/* Outer Ring / Glow Bubble */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 border rounded-full pointer-events-none z-[9998] flex items-center justify-center text-[10px] font-bold tracking-wider uppercase text-white shadow-sm"
        animate={{
          x: mousePosition.x - (isHovering ? 28 : 16),
          y: mousePosition.y - (isHovering ? 28 : 16),
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          backgroundColor: isHovering ? "rgba(79, 70, 229, 0.95)" : "rgba(79, 70, 229, 0.05)",
          borderColor: isHovering ? "rgb(79, 70, 229)" : "rgba(79, 70, 229, 0.4)",
          boxShadow: isHovering ? "0 4px 20px rgba(79, 70, 229, 0.3)" : "none",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <AnimatePresence>
          {isHovering && cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default CustomCursor;