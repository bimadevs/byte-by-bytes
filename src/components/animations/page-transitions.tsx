"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";

// Page Transition Component
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Komponen AnimateOnScroll untuk animasi saat elemen muncul dalam viewport
interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: "fade" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "zoom" | "bounce";
  threshold?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

export function AnimateOnScroll({
  children,
  animation = "fade",
  threshold = 0.1,
  delay = 0,
  duration = 0.5,
  once = true,
  className = "",
}: AnimateOnScrollProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: threshold });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [controls, inView, once]);

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    slideDown: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    slideRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    bounce: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          bounce: 0.4,
        }
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants[animation]}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered Container, untuk menganimasi children satu per satu
export function StaggerContainer({ 
  children,
  delay = 0,
  staggerChildren = 0.1,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  staggerChildren?: number;
  className?: string;
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            delay,
            staggerChildren,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered Child Item
export function StaggerItem({ 
  children,
  index = 0,
  className = "",
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            damping: 15,
            stiffness: 100,
            delay: index * 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Parallax Scroll Effect
export function ParallaxScroll({
  children,
  speed = 0.5,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{
          y: scrollY * speed,
          transition: "none",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Hover Effect Card
export function HoverEffectCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        y: -5,
        zIndex: 1,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
} 