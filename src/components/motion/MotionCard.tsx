"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
}

export function MotionCard({ children, className }: MotionCardProps) {
  return (
    <motion.div
      className={cn("premium-card", className)}
      whileHover={{
        y: -7,
        scale: 1.018,
        transition: {
          type: "spring",
          stiffness: 340,
          damping: 22,
          mass: 0.8,
        },
      }}
      whileTap={{
        scale: 0.98,
        transition: { type: "spring", stiffness: 500, damping: 30 },
      }}
    >
      {children}
    </motion.div>
  );
}
