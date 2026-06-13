"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const CustomCursor = () => {
  const pathname = usePathname();
  const [isHovering, setIsHovering] = useState(false);
  const [isOverInput, setIsOverInput] = useState(false); // Hide cursor when over text input fields
  const [cursorText, setCursorText] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const checkMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const updateMousePosition = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Update DOM styles directly for 120Hz/144Hz screen native performance (0ms React lag)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      }
      if (ringRef.current) {
        const offset = isHovering ? 28 : 16;
        ringRef.current.style.transform = `translate3d(${x - offset}px, ${y - offset}px, 0)`;
      }
    };

    const handleMouseOver = (e) => {
      let el = e.target;
      if (!el) return;
      let isClickable = false;
      let customText = "";
      let isInput = false;

      let tempEl = el;
      while (tempEl && tempEl !== document.body && tempEl.parentElement) {
        if (
          tempEl.tagName === "INPUT" ||
          tempEl.tagName === "TEXTAREA" ||
          tempEl.tagName === "SELECT" ||
          tempEl.hasAttribute("contenteditable") ||
          tempEl.classList.contains("cursor-text")
        ) {
          isInput = true;
          break;
        }
        if (
          tempEl.tagName === "A" ||
          tempEl.tagName === "BUTTON" ||
          tempEl.getAttribute("role") === "button" ||
          tempEl.classList.contains("cursor-pointer") ||
          tempEl.getAttribute("data-cursor")
        ) {
          isClickable = true;
          customText = tempEl.getAttribute("data-cursor") || "";
          break;
        }
        tempEl = tempEl.parentElement;
      }

      setIsOverInput(isInput);
      setIsHovering(isClickable);
      setCursorText(customText);
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile, isHovering]);

  if (isMobile || (pathname && pathname.startsWith("/admin"))) {
    return null;
  }

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="hidden lg:block fixed top-0 left-0 w-2 h-2 bg-indigo-600 rounded-full pointer-events-none z-[9999]"
        style={{
          willChange: "transform, opacity",
          transform: "translate3d(-100px, -100px, 0)",
          opacity: isOverInput ? 0 : 1,
          transition: "opacity 0.15s ease",
        }}
      />
      
      {/* Outer Ring / Glow Bubble */}
      <div
        ref={ringRef}
        className="hidden lg:block fixed top-0 left-0 border rounded-full pointer-events-none z-[9998] flex items-center justify-center text-[10px] font-bold tracking-wider uppercase text-white shadow-sm transition-[width,height,background-color,border-color,box-shadow,opacity] duration-200 ease-out"
        style={{
          willChange: "transform, width, height, opacity",
          transform: "translate3d(-100px, -100px, 0)",
          width: isHovering ? "56px" : "32px",
          height: isHovering ? "56px" : "32px",
          backgroundColor: isHovering ? "rgba(79, 70, 229, 0.95)" : "rgba(79, 70, 229, 0.05)",
          borderColor: isHovering ? "rgb(79, 70, 229)" : "rgba(79, 70, 229, 0.4)",
          boxShadow: isHovering ? "0 4px 20px rgba(79, 70, 229, 0.3)" : "none",
          opacity: isOverInput ? 0 : 1,
        }}
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
      </div>
    </>
  );
};

export default CustomCursor;