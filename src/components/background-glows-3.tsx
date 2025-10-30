"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * VARIANT 3: Gradient Mesh Animation (Fluid/Modern)
 *
 * Features:
 * - Animated CSS gradient mesh
 * - Smooth color transitions (teal → azure → soft blue)
 * - Organic fluid movement
 * - Layered with subtle bokeh
 * - Performance-optimized via CSS/GPU
 */
export function BackgroundGlows() {
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

  // Subtle bokeh base layer
  const baseGlows = [
    {
      color: "rgba(0, 211, 192, 0.15)",
      size: "700px",
      top: "5%",
      left: "5%",
    },
    {
      color: "rgba(43, 108, 255, 0.18)",
      size: "900px",
      top: "30%",
      right: "10%",
    },
    {
      color: "rgba(45, 156, 255, 0.12)",
      size: "600px",
      bottom: "15%",
      left: "20%",
    },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base bokeh layer */}
      {baseGlows.map((glow, index) => (
        <div
          key={`glow-${index}`}
          className="absolute rounded-full"
          style={{
            width: glow.size,
            height: glow.size,
            background: `radial-gradient(circle, ${glow.color} 0%, transparent 70%)`,
            filter: "blur(100px)",
            ...(glow.top && { top: glow.top }),
            ...(glow.bottom && { bottom: glow.bottom }),
            ...(glow.left && { left: glow.left }),
            ...(glow.right && { right: glow.right }),
          }}
          aria-hidden="true"
        />
      ))}

      {/* Animated gradient mesh */}
      {!prefersReducedMotion ? (
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(11, 18, 32, 0.8) 100%),
              radial-gradient(circle at 20% 30%, rgba(0, 211, 192, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(43, 108, 255, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(45, 156, 255, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 90% 70%, rgba(0, 211, 192, 0.1) 0%, transparent 50%)
            `,
            filter: "blur(60px)",
          }}
          animate={{
            backgroundPosition: [
              "0% 0%, 20% 30%, 80% 20%, 40% 80%, 90% 70%",
              "10% 10%, 30% 40%, 70% 30%, 50% 70%, 80% 80%",
              "5% 5%, 25% 35%, 75% 25%, 45% 75%, 85% 75%",
              "0% 0%, 20% 30%, 80% 20%, 40% 80%, 90% 70%",
            ],
            backgroundSize: [
              "100% 100%, 150% 150%, 120% 120%, 140% 140%, 130% 130%",
              "120% 120%, 130% 130%, 150% 150%, 120% 120%, 140% 140%",
              "110% 110%, 140% 140%, 135% 135%, 130% 130%, 135% 135%",
              "100% 100%, 150% 150%, 120% 120%, 140% 140%, 130% 130%",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(11, 18, 32, 0.8) 100%),
              radial-gradient(circle at 20% 30%, rgba(0, 211, 192, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(43, 108, 255, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(45, 156, 255, 0.12) 0%, transparent 50%)
            `,
            filter: "blur(60px)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Organic blob animation overlays */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "600px",
              height: "600px",
              background: "radial-gradient(circle, rgba(0, 211, 192, 0.08) 0%, transparent 70%)",
              filter: "blur(80px)",
              left: "10%",
              top: "20%",
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          />

          <motion.div
            className="absolute rounded-full"
            style={{
              width: "800px",
              height: "800px",
              background: "radial-gradient(circle, rgba(43, 108, 255, 0.1) 0%, transparent 70%)",
              filter: "blur(90px)",
              right: "5%",
              top: "30%",
            }}
            animate={{
              x: [0, -40, 25, 0],
              y: [0, 30, -25, 0],
              scale: [1, 0.95, 1.08, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            aria-hidden="true"
          />

          <motion.div
            className="absolute rounded-full"
            style={{
              width: "500px",
              height: "500px",
              background: "radial-gradient(circle, rgba(45, 156, 255, 0.06) 0%, transparent 70%)",
              filter: "blur(70px)",
              left: "30%",
              bottom: "10%",
            }}
            animate={{
              x: [0, 20, -30, 0],
              y: [0, -25, 15, 0],
              scale: [1, 1.05, 0.98, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}
