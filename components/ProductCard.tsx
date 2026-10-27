"use client";

import { Check, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useCart } from "@/lib/cart-store";
import type { Product } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { flyToCart } from "./FlyToCart";

export function ProductCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  const add = useCart((s) => s.add);
  const imgRef = useRef<HTMLDivElement>(null);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product.id);
    flyToCart(imgRef.current, product.image);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="group">
      <motion.div
        ref={imgRef}
        layoutId={`img-${product.id}`}
        className="relative aspect-[4/3.4] cursor-pointer overflow-hidden rounded-[1.75rem] bg-cream-deep"
        onClick={onOpen}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {product.tags?.[0] && (
          <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-olive backdrop-blur">
            {product.tags[0]}
          </span>
        )}
        <span className="absolute bottom-4 left-4 translate-y-3 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-semibold text-ink opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          Detayları gör
        </span>

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            handleAdd();
          }}
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.08 }}
          className={`absolute bottom-4 right-4 grid size-12 place-items-center rounded-full shadow-lg transition-colors ${
            added ? "bg-leaf text-cream" : "bg-lemon text-ink"
          }`}
          aria-label={`${product.name} sepete ekle`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={added ? "ok" : "plus"}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {added ? <Check className="size-5" strokeWidth={2.6} /> : <Plus className="size-5" strokeWidth={2.6} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </motion.div>

      <div className="mt-4 flex items-start justify-between gap-4 px-1">
        <div className="min-w-0">
          <h3 className="cursor-pointer font-display text-xl leading-tight tracking-tight" onClick={onOpen}>
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-ink-soft">{product.unit}</p>
        </div>
        <p className="shrink-0 font-display text-xl text-olive">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
