"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// No filter:blur here — blurring the full-page composite layer is too
// expensive on mobile GPUs and causes dropped frames even on desktop.
// Opacity + translate gives the same cinematic feel at near-zero GPU cost.
const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] as const },
  },
};

export function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={PAGE_VARIANTS}
        initial="initial"
        animate="animate"
        exit="exit"
        className={cn("flex-1", !isHome && "pt-[85px]")}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
