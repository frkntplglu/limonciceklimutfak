"use client";

import { ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { selectCount, selectTotal, useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";

export function MobileCartBar() {
  const count = useCart((s) => selectCount(s.lines));
  const total = useCart((s) => selectTotal(s.lines));
  const open = useCart((s) => s.open);
  const isOpen = useCart((s) => s.isOpen);

  return (
    <AnimatePresence>
      {count > 0 && !isOpen && (
        <motion.div
          className="fixed inset-x-4 bottom-4 z-40 md:hidden"
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          exit={{ y: 120 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
        >
          <button
            onClick={open}
            className="flex w-full items-center justify-between rounded-full bg-olive py-2.5 pl-2.5 pr-6 text-cream shadow-[0_20px_40px_-15px_rgba(43,51,38,0.7)]"
          >
            <span className="flex items-center gap-3">
              <span data-cart-target className="relative grid size-11 place-items-center rounded-full bg-lemon text-ink">
                <ShoppingBag className="size-5" />
                <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-paper px-1 text-[11px] font-bold leading-5 text-ink">
                  {count}
                </span>
              </span>
              <span className="font-semibold">Sepeti gör</span>
            </span>
            <span className="font-display text-xl">{formatPrice(total)}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
