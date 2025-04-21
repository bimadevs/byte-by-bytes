"use client";

import { ReactNode } from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";

// Jenis animasi yang tersedia
export type AnimationType = "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scale" | "stagger";

interface MotionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  containerClassName?: string;
}

// Konfigurasi animasi umum
export const motionVariants: Record<AnimationType, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },
  slideDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  },
  stagger: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
};

// Motion components for use with server components
export const MotionDiv = motion.div;
export const MotionChild = motion.div;
export const MotionContainer = motion.div;

// Komponen Motion dasar
export function MotionDivBase({
  children,
  type = "fadeIn",
  delay = 0,
  duration = 0.5,
  once = true,
  className = "",
  containerClassName = "",
  ...rest
}: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={motionVariants[type]}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// Komponen container untuk stagger children
export function MotionContainerBase({
  children,
  delay = 0,
  staggerChildren = 0.1,
  className = "",
  once = true,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  staggerChildren?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        visible: {
          opacity: 1,
          transition: {
            delay,
            staggerChildren,
            delayChildren: delay
          }
        },
        hidden: {
          opacity: 1
        }
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// Komponen tombol dengan hover effect
export function MotionButton({
  children,
  className = "",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <motion.button
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

// Link dengan hover effect
export function MotionLink({
  children,
  className = "",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <motion.a
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...rest}
    >
      {children}
    </motion.a>
  );
}

// Text reveal animation component
export function TextReveal({ 
  text, 
  className = "",
  delay = 0,
}: { 
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={className}>
      {text.split(" ").map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-1">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.33, 1, 0.68, 1],
              delay: delay + index * 0.1,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

// Komponen scroll animasi
export function MotionScroll({
  children,
  className = "",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// Hover card effect
export function HoverCard({
  children,
  className = "",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      {...rest}
    >
      {children}
    </motion.div>
  );
} 