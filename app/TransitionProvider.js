"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function TransitionProvider({ children }) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false); // Controls visibility of new page content

  useEffect(() => {
    // Trigger transition animation on path change
    setIsAnimating(true);
    setIsPageReady(false); // Hide the new page content until the animation is complete

    const animationDuration = 1000; // Match with your transition duration

    const timeout = setTimeout(() => {
      setIsAnimating(false); // Transition animation done
      setIsPageReady(true); // New content can now be rendered
    }, animationDuration);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isAnimating && (
          <motion.div
            key="transition"
            className="transition-overlay"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.25 }}
          >
            <img src="/transitionimg.png" alt="Transition" className="transition-image" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delay rendering the new page until the transition is complete */}
      <AnimatePresence mode="wait">
        {isPageReady && (
          <motion.div
            key={pathname} // Trigger fade-in animation on route change
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}