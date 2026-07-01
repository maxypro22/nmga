"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerMs?: number;
  delayMs?: number;
}

const CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const CONTAINER_VARIANTS = (staggerMs: number, delayMs: number) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: delayMs / 1000,
      staggerChildren: staggerMs / 1000,
    },
  },
});

export function StaggerGroup({
  children,
  className,
  staggerMs = 90,
  delayMs = 0,
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -64px 0px",
    amount: 0.06,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={CONTAINER_VARIANTS(staggerMs, delayMs)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={CHILD_VARIANTS}>
      {children}
    </motion.div>
  );
}
