"use client";

import { motion, useInView, type TargetAndTransition } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "left" | "right" | "scale" | "fade";

const HIDDEN: Record<Direction, TargetAndTransition> = {
  up:    { opacity: 0, y: 28 },
  left:  { opacity: 0, x: -36 },
  right: { opacity: 0, x: 36 },
  scale: { opacity: 0, y: 18, scale: 0.97 },
  fade:  { opacity: 0 },
};

const VISIBLE: TargetAndTransition = { opacity: 1, y: 0, x: 0, scale: 1 };

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.9,
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: "0px 0px -64px 0px",
    amount: 0.08,
  });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={HIDDEN[direction]}
      animate={isInView ? VISIBLE : HIDDEN[direction]}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
