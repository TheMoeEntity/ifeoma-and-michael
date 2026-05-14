"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide once the page's load event fires (fonts, images done)
    function dismiss() {
      setTimeout(() => setVisible(false), 400);
    }
    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
      // Fallback — never block for more than 3.5s
      const fallback = setTimeout(() => setVisible(false), 3500);
      return () => clearTimeout(fallback);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#1a1208]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Animated rings */}
          <div className="relative flex items-center justify-center mb-10">
            <motion.span
              className="absolute rounded-full border border-[#EBAC19]/20"
              animate={{ width: [64, 120], height: [64, 120], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              className="absolute rounded-full border border-[#EBAC19]/30"
              animate={{ width: [64, 96], height: [64, 96], opacity: [0.8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
            />

            {/* Monogram */}
            <div className="w-16 h-16 rounded-full border border-[#EBAC19]/60 flex items-center justify-center">
              <span
                className="text-[#EBAC19] text-2xl"
                style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
              >
                I&M
              </span>
            </div>
          </div>

          {/* Names */}
          <motion.p
            className="text-white/90 text-sm tracking-[0.4em] uppercase mb-8"
            style={{ fontFamily: "var(--font-garamond)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Ifeoma &amp; Michael
          </motion.p>

          {/* Progress bar */}
          <div className="w-40 h-px bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#EBAC19] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.8, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
