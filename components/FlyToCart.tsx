"use client";

import { AnimatePresence, motion } from "motion/react";
import { create } from "zustand";

type Flyer = { key: number; src: string; from: DOMRect; to: { x: number; y: number } };

const useFlyers = create<{ flyers: Flyer[]; push: (f: Flyer) => void; done: (key: number) => void }>(
  (set) => ({
    flyers: [],
    push: (f) => set((s) => ({ flyers: [...s.flyers, f] })),
    done: (key) => set((s) => ({ flyers: s.flyers.filter((f) => f.key !== key) })),
  }),
);

let seq = 0;

/** Ürün görselini, görünür sepet hedefine doğru uçurur */
export function flyToCart(source: HTMLElement | null, src: string) {
  if (!source || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const target = [...document.querySelectorAll<HTMLElement>("[data-cart-target]")]
    .map((el) => el.getBoundingClientRect())
    .find((r) => r.width > 0 && r.bottom > 0 && r.top < window.innerHeight);
  if (!target) return;
  useFlyers.getState().push({
    key: ++seq,
    src,
    from: source.getBoundingClientRect(),
    to: { x: target.left + target.width / 2, y: target.top + target.height / 2 },
  });
}

export function FlyToCartLayer() {
  const { flyers, done } = useFlyers();

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]">
      <AnimatePresence>
        {flyers.map((f) => {
          const size = Math.min(f.from.width, f.from.height, 160);
          const startX = f.from.left + f.from.width / 2 - size / 2;
          const startY = f.from.top + f.from.height / 2 - size / 2;
          return (
            <motion.img
              key={f.key}
              src={f.src}
              alt=""
              className="absolute left-0 top-0 rounded-full object-cover shadow-2xl ring-4 ring-paper"
              style={{ width: size, height: size }}
              initial={{ x: startX, y: startY, scale: 1, opacity: 1 }}
              animate={{
                x: [startX, (startX + f.to.x) / 2, f.to.x - size / 2],
                y: [startY, Math.min(startY, f.to.y) - 120, f.to.y - size / 2],
                scale: [1, 0.7, 0.12],
                opacity: [1, 1, 0.6],
              }}
              transition={{ duration: 0.85, ease: [0.5, 0, 0.2, 1] }}
              onAnimationComplete={() => done(f.key)}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
