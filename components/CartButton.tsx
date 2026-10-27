"use client";

import { ShoppingBag } from "lucide-react";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import { useEffect } from "react";
import { selectCount, useCart } from "@/lib/cart-store";

export function CartButton() {
  const count = useCart((s) => selectCount(s.lines));
  const bump = useCart((s) => s.bump);
  const open = useCart((s) => s.open);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (bump === 0) return;
    // Uçan görsel sepete vardığında zıpla
    animate(scope.current, { scale: [1, 1.22, 0.94, 1], rotate: [0, -8, 6, 0] }, { duration: 0.55, delay: 0.7 });
  }, [bump, animate, scope]);

  return (
    <button
      ref={scope}
      data-cart-target
      onClick={open}
      className="relative grid size-11 place-items-center rounded-full bg-olive text-cream transition-colors hover:bg-ink"
      aria-label={`Sepeti aç, ${count} ürün`}
    >
      <ShoppingBag className="size-5" strokeWidth={1.8} />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key="badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-lemon px-1 text-[11px] font-bold leading-5 text-ink ring-2 ring-cream"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
