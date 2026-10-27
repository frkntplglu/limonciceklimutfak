"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart-store";
import { categories, type Product } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { flyToCart } from "./FlyToCart";
import { QuantityStepper } from "./ui/QuantityStepper";

export function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[55] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <ModalBody key={product.id} product={product} onClose={onClose} />
        </div>
      )}
    </AnimatePresence>
  );
}

function ModalBody({ product, onClose }: { product: Product; onClose: () => void }) {
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const imgRef = useRef<HTMLDivElement>(null);
  const category = categories.find((c) => c.id === product.category);

  const handleAdd = () => {
    add(product.id, qty);
    flyToCart(imgRef.current, product.image);
    onClose();
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      className="relative grid max-h-[92dvh] w-full max-w-4xl overflow-hidden rounded-t-[2rem] bg-paper shadow-2xl sm:grid-cols-2 sm:rounded-[2rem]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        ref={imgRef}
        layoutId={`img-${product.id}`}
        className="relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-[28rem]"
      >
        <Image src={product.image} alt={product.name} fill sizes="(min-width: 640px) 450px, 100vw" className="object-cover" />
      </motion.div>

      <div className="flex flex-col overflow-y-auto p-7 sm:p-10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-paper/90 text-ink shadow-md backdrop-blur transition-transform hover:rotate-90"
          aria-label="Kapat"
        >
          <X className="size-5" />
        </button>

        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.07, delayChildren: 0.15 }}
          className="flex flex-1 flex-col"
        >
          {[
            <p key="cat" className="text-xs font-bold uppercase tracking-[0.22em] text-leaf">
              {category?.name}
            </p>,
            <h3 key="name" className="mt-3 font-display text-4xl font-light leading-tight tracking-tight">
              {product.name}
            </h3>,
            <p key="desc" className="mt-4 leading-relaxed text-ink-soft">
              {product.description}
            </p>,
            <div key="meta" className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-cream-deep px-3 py-1.5 text-xs font-semibold text-olive">{product.unit}</span>
              {product.tags?.map((t) => (
                <span key={t} className="rounded-full bg-lemon-soft px-3 py-1.5 text-xs font-semibold text-ink">
                  {t}
                </span>
              ))}
            </div>,
          ].map((el, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {el}
            </motion.div>
          ))}

          <div className="mt-auto pt-8">
            <div className="flex items-center justify-between gap-4 border-t border-olive/10 pt-6">
              <QuantityStepper value={qty} onChange={setQty} />
              <p className="font-display text-3xl text-olive">{formatPrice(product.price * qty)}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleAdd}
              className="mt-5 w-full rounded-full bg-olive py-4 font-semibold text-cream transition-colors hover:bg-ink"
            >
              Sepete ekle
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
