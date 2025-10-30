"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * VARIANT 1: Enhanced Bokeh Glows (Logo-Perfect Match)
 *
 * Features:
 * - 5 glows matching logo placement exactly
 * - Massive hero glow (1200px) in top-right
 * - Very soft blur (120px)
 * - Vibrant colors (opacity 0.22-0.3)
 * - Subtle pulse animation (breathing effect)
 * - Mouse parallax tracking
 */
export function BackgroundGlows() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  const glows = [
    {
      color: "rgba(0, 211, 192, 0.22)", // Teal - top left
      size: "650px",
      top: "8%",
      left: "5%",
      parallax: 1.3,
      pulseDelay: 0,
    },
    {
      color: "rgba(43, 108, 255, 0.3)", // Azure - HERO GLOW top right
      size: "1200px",
      top: "15%",
      right: "5%",
      parallax: 0.7,
      pulseDelay: 1,
    },
    {
      color: "rgba(45, 156, 255, 0.18)", // Soft blue - bottom left
      size: "700px",
      bottom: "10%",
      left: "0%",
      parallax: 1.5,
      pulseDelay: 2,
    },
    {
      color: "rgba(0, 211, 192, 0.24)", // Teal - bottom right
      size: "800px",
      bottom: "5%",
      right: "15%",
      parallax: 1.1,
      pulseDelay: 3,
    },
    {
      color: "rgba(43, 108, 255, 0.15)", // Azure - center left (subtle depth)
      size: "550px",
      top: "50%",
      left: "25%",
      parallax: 1.8,
      pulseDelay: 4,
    },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {glows.map((glow, index) => {
        const style: React.CSSProperties = {
          width: glow.size,
          height: glow.size,
          background: `radial-gradient(circle, ${glow.color} 0%, transparent 70%)`,
          filter: "blur(120px)",
          ...(glow.top && { top: glow.top }),
          ...(glow.bottom && { bottom: glow.bottom }),
          ...(glow.left && { left: glow.left }),
          ...(glow.right && { right: glow.right }),
        };

        if (prefersReducedMotion) {
          return (
            <div key={index} className="absolute rounded-full" style={style} aria-hidden="true" />
          );
        }

        return (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={style}
            animate={{
              x: mousePosition.x * glow.parallax,
              y: mousePosition.y * glow.parallax,
              scale: [1, 1.05, 1], // Breathing pulse
            }}
            transition={{
              x: {
                type: "spring",
                stiffness: 50,
                damping: 30,
                mass: 0.5,
              },
              y: {
                type: "spring",
                stiffness: 50,
                damping: 30,
                mass: 0.5,
              },
              scale: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: glow.pulseDelay,
              },
            }}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
