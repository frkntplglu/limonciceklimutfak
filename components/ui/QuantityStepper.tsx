"use client";

import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  size = "md",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  size?: "sm" | "md";
}) {
  const btn =
    size === "sm"
      ? "size-7"
      : "size-9";

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-olive/15 bg-paper p-1">
      <motion.button
        type="button"
        whileTap={{ scale: 0.85 }}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${btn} grid place-items-center rounded-full text-olive transition-colors hover:bg-cream-deep disabled:opacity-30`}
        aria-label="Azalt"
        disabled={value <= min}
      >
        <Minus className="size-3.5" strokeWidth={2.5} />
      </motion.button>
      <span className="relative w-6 overflow-hidden text-center text-sm font-semibold tabular-nums">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            className="block"
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <motion.button
        type="button"
        whileTap={{ scale: 0.85 }}
        onClick={() => onChange(value + 1)}
        className={`${btn} grid place-items-center rounded-full text-olive transition-colors hover:bg-cream-deep`}
        aria-label="Artır"
      >
        <Plus className="size-3.5" strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}
