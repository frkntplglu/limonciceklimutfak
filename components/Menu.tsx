"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useCallback, useState } from "react";
import { categories, products, type CategoryId, type Product } from "@/lib/data";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { Reveal, SplitWords } from "./ui/Reveal";

type Filter = CategoryId | "all";

export function Menu() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);

  const visible = filter === "all" ? products : products.filter((p) => p.category === filter);
  const tabs: { id: Filter; name: string }[] = [{ id: "all", name: "Tümü" }, ...categories];

  return (
    <section id="menu" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-leaf">Menü</Reveal>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-light leading-[1.02] tracking-[-0.02em]">
              <SplitWords text="Mutfağımızdan" inView />{" "}
              <SplitWords text="sofranıza" inView delay={0.12} className="italic text-olive" />
            </h2>
          </div>
          <Reveal delay={0.15} className="max-w-sm text-ink-soft">
            Fiyatlara ambalaj dahildir. Teslimat ücreti mahalleye göre WhatsApp üzerinden bildirilir.
          </Reveal>
        </div>

        {/* Kategori sekmeleri */}
        <div className="sticky top-[4.5rem] z-30 -mx-4 mt-12 px-4 py-3 sm:-mx-6 sm:px-6">
          <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto rounded-full border border-olive/10 bg-paper/80 p-1.5 shadow-[0_10px_30px_-18px_rgba(43,51,38,0.35)] backdrop-blur-xl">
            <LayoutGroup id="tabs">
              {tabs.map((t) => {
                const active = filter === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setFilter(t.id)}
                    className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      active ? "text-cream" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="tab-pill"
                        className="absolute inset-0 rounded-full bg-olive"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{t.name}</span>
                  </button>
                );
              })}
            </LayoutGroup>
          </div>
        </div>

        <motion.ul layout className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                transition={{ duration: 0.6, delay: Math.min(i, 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={p} onOpen={() => setSelected(p)} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <ProductModal product={selected} onClose={closeModal} />
    </section>
  );
}
