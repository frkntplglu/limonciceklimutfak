"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { products, type Product } from "./data";

type CartLine = { id: string; qty: number };

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  /** Sepet ikonunun "zıplaması" için her eklemede artar */
  bump: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      bump: 0,
      add: (id, qty = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => l.id === id);
          const lines = existing
            ? s.lines.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
            : [...s.lines, { id, qty }];
          return { lines, bump: s.bump + 1 };
        }),
      setQty: (id, qty) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => l.id !== id)
              : s.lines.map((l) => (l.id === id ? { ...l, qty } : l)),
        })),
      remove: (id) => set((s) => ({ lines: s.lines.filter((l) => l.id !== id) })),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: "lcm-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ lines: s.lines }),
      skipHydration: true,
    },
  ),
);

export type CartItem = { product: Product; qty: number };

const productMap = new Map(products.map((p) => [p.id, p]));

export function selectItems(lines: CartLine[]): CartItem[] {
  return lines.flatMap((l) => {
    const product = productMap.get(l.id);
    return product ? [{ product, qty: l.qty }] : [];
  });
}

export const selectCount = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty, 0);

export const selectTotal = (lines: CartLine[]) =>
  selectItems(lines).reduce((sum, i) => sum + i.product.price * i.qty, 0);
