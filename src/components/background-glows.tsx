"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
      color: "rgba(0, 211, 192, 0.15)",
      size: "600px",
      top: "10%",
      left: "10%",
      parallax: 1.2,
    },
    {
      color: "rgba(43, 108, 255, 0.2)",
      size: "800px",
      top: "40%",
      right: "10%",
      parallax: 0.8,
    },
    {
      color: "rgba(45, 156, 255, 0.12)",
      size: "500px",
      bottom: "20%",
      left: "30%",
      parallax: 1.5,
    },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {glows.map((glow, index) => {
        const style: React.CSSProperties = {
          width: glow.size,
          height: glow.size,
          background: `radial-gradient(circle, ${glow.color} 0%, transparent 70%)`,
          filter: "blur(80px)",
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
            }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 30,
              mass: 0.5,
            }}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
