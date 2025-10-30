"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

/**
 * VARIANT 4: Hybrid (All Effects Combined)
 *
 * Features:
 * - Enhanced bokeh base (5 glows with pulse)
 * - Animated gradient mesh layer
 * - Sparse floating particles (40 particles)
 * - Multi-speed parallax
 * - Most dramatic/premium look
 */

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export function BackgroundGlows() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

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

  // Sparse particles effect
  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize fewer particles for hybrid effect
    const particleCount = 40;
    particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 1.5 + 0.5,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 211, 192, 0.7)";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(0, 211, 192, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw connection lines (sparse)
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(43, 108, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [prefersReducedMotion]);

  // Enhanced bokeh glows (logo-matched)
  const glows = [
    {
      color: "rgba(0, 211, 192, 0.22)",
      size: "650px",
      top: "8%",
      left: "5%",
      parallax: 1.3,
      pulseDelay: 0,
    },
    {
      color: "rgba(43, 108, 255, 0.28)", // HERO GLOW
      size: "1200px",
      top: "15%",
      right: "5%",
      parallax: 0.7,
      pulseDelay: 1,
    },
    {
      color: "rgba(45, 156, 255, 0.18)",
      size: "700px",
      bottom: "10%",
      left: "0%",
      parallax: 1.5,
      pulseDelay: 2,
    },
    {
      color: "rgba(0, 211, 192, 0.24)",
      size: "800px",
      bottom: "5%",
      right: "15%",
      parallax: 1.1,
      pulseDelay: 3,
    },
    {
      color: "rgba(43, 108, 255, 0.15)",
      size: "550px",
      top: "50%",
      left: "25%",
      parallax: 1.8,
      pulseDelay: 4,
    },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Layer 1: Enhanced Bokeh Glows */}
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
            <div
              key={`glow-${index}`}
              className="absolute rounded-full"
              style={style}
              aria-hidden="true"
            />
          );
        }

        return (
          <motion.div
            key={`glow-${index}`}
            className="absolute rounded-full"
            style={style}
            animate={{
              x: mousePosition.x * glow.parallax,
              y: mousePosition.y * glow.parallax,
              scale: [1, 1.05, 1],
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

      {/* Layer 2: Animated Gradient Mesh */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(0, 211, 192, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(43, 108, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(45, 156, 255, 0.06) 0%, transparent 50%)
            `,
            filter: "blur(80px)",
          }}
          animate={{
            backgroundPosition: [
              "20% 30%, 80% 20%, 40% 80%",
              "30% 40%, 70% 30%, 50% 70%",
              "25% 35%, 75% 25%, 45% 75%",
              "20% 30%, 80% 20%, 40% 80%",
            ],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
      )}

      {/* Layer 3: Sparse Particles */}
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.5 }}
        />
      )}
    </div>
  );
}
