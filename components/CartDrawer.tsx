"use client";

import { ArrowLeft, ArrowRight, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { selectItems, selectTotal, useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { CheckoutForm } from "./CheckoutForm";
import { LemonBlossom } from "./icons/LemonBlossom";
import { QuantityStepper } from "./ui/QuantityStepper";

type Step = "cart" | "checkout" | "done";

const ease = [0.22, 1, 0.36, 1] as const;

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const items = selectItems(lines);
  const total = selectTotal(lines);
  const [step, setStep] = useState<Step>("cart");

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const handleClose = () => {
    close();
    if (step === "done") setTimeout(() => setStep("cart"), 400);
  };

  const title = step === "checkout" ? "Teslimat bilgileri" : step === "done" ? "Teşekkürler!" : "Sepetiniz";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[58]">
          <motion.div
            className="absolute inset-0 bg-ink/45 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl sm:m-3 sm:rounded-[2rem]"
            initial={{ x: "105%" }}
            animate={{ x: 0 }}
            exit={{ x: "105%" }}
            transition={{ duration: 0.55, ease }}
          >
            <header className="flex items-center justify-between gap-3 border-b border-olive/10 px-6 py-5">
              <div className="flex items-center gap-2">
                {step === "checkout" && (
                  <button
                    onClick={() => setStep("cart")}
                    className="grid size-9 place-items-center rounded-full hover:bg-cream-deep"
                    aria-label="Sepete dön"
                  >
                    <ArrowLeft className="size-4" />
                  </button>
                )}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.h2
                    key={title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="font-display text-2xl tracking-tight"
                  >
                    {title}
                  </motion.h2>
                </AnimatePresence>
              </div>
              <button
                onClick={handleClose}
                className="grid size-10 place-items-center rounded-full bg-paper transition-transform hover:rotate-90"
                aria-label="Kapat"
              >
                <X className="size-5" />
              </button>
            </header>

            <AnimatePresence mode="wait" initial={false}>
              {step === "cart" && (
                <motion.div
                  key="cart"
                  className="flex min-h-0 flex-1 flex-col"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3, ease }}
                >
                  {items.length === 0 ? (
                    <EmptyCart onBrowse={handleClose} />
                  ) : (
                    <>
                      <ul className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                        <AnimatePresence initial={false}>
                          {items.map(({ product, qty }) => (
                            <motion.li
                              key={product.id}
                              layout
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0, transition: { duration: 0.25 } }}
                              className="overflow-hidden"
                            >
                              <div className="flex gap-4 rounded-2xl bg-paper p-3">
                                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                                  <Image src={product.image} alt="" fill sizes="80px" className="object-cover" />
                                </div>
                                <div className="flex min-w-0 flex-1 flex-col">
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                      <p className="truncate font-semibold">{product.name}</p>
                                      <p className="text-xs text-ink-soft">{product.unit}</p>
                                    </div>
                                    <button
                                      onClick={() => remove(product.id)}
                                      className="grid size-8 shrink-0 place-items-center rounded-full text-ink-soft hover:bg-cream-deep hover:text-clay"
                                      aria-label={`${product.name} sil`}
                                    >
                                      <Trash2 className="size-4" />
                                    </button>
                                  </div>
                                  <div className="mt-auto flex items-center justify-between pt-2">
                                    <QuantityStepper size="sm" value={qty} onChange={(n) => setQty(product.id, n)} />
                                    <p className="font-display text-lg text-olive">{formatPrice(product.price * qty)}</p>
                                  </div>
                                </div>
                              </div>
                            </motion.li>
                          ))}
                        </AnimatePresence>
                      </ul>

                      <footer className="border-t border-olive/10 px-6 py-5">
                        <div className="flex items-baseline justify-between">
                          <span className="text-sm text-ink-soft">Ara toplam</span>
                          <span className="font-display text-3xl text-ink">{formatPrice(total)}</span>
                        </div>
                        <p className="mt-1 text-xs text-ink-soft">Teslimat ücreti adrese göre WhatsApp&apos;ta bildirilir.</p>
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setStep("checkout")}
                          className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-olive py-4 font-semibold text-cream transition-colors hover:bg-ink"
                        >
                          Devam et
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </motion.button>
                      </footer>
                    </>
                  )}
                </motion.div>
              )}

              {step === "checkout" && (
                <motion.div
                  key="checkout"
                  className="flex min-h-0 flex-1 flex-col"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <CheckoutForm
                    items={items}
                    total={total}
                    onSent={() => {
                      clear();
                      setStep("done");
                    }}
                  />
                </motion.div>
              )}

              {step === "done" && (
                <motion.div
                  key="done"
                  className="flex flex-1 flex-col items-center justify-center px-8 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <BlossomBurst />
                  <h3 className="mt-8 font-display text-3xl tracking-tight">Siparişiniz WhatsApp&apos;ta hazır!</h3>
                  <p className="mt-3 text-ink-soft">
                    Açılan sohbette mesajı göndermeniz yeterli. En kısa sürede onaylayıp size döneceğiz.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-8 rounded-full bg-olive px-8 py-3.5 font-semibold text-cream hover:bg-ink"
                  >
                    Alışverişe dön
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

function EmptyCart({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <motion.div
        animate={{ rotate: [0, -8, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="grid size-24 place-items-center rounded-full bg-cream-deep"
      >
        <ShoppingBag className="size-10 text-olive" strokeWidth={1.4} />
      </motion.div>
      <p className="mt-6 font-display text-2xl">Sepetiniz boş</p>
      <p className="mt-2 text-sm text-ink-soft">Menüye göz atın, ev yapımı lezzetler sizi bekliyor.</p>
      <a
        href="#menu"
        onClick={onBrowse}
        className="mt-6 rounded-full bg-olive px-7 py-3 text-sm font-semibold text-cream hover:bg-ink"
      >
        Menüye git
      </a>
    </div>
  );
}

const burst = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2;
  return { x: Math.cos(angle) * 110, y: Math.sin(angle) * 110, rotate: i * 47, size: 18 + (i % 3) * 8 };
});

function BlossomBurst() {
  return (
    <div className="relative grid size-28 place-items-center">
      {burst.map((b, i) => (
        <motion.span
          key={i}
          className="absolute"
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{ x: b.x, y: b.y, scale: 1, opacity: 0, rotate: b.rotate }}
          transition={{ duration: 1.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <LemonBlossom style={{ width: b.size, height: b.size }} />
        </motion.span>
      ))}
      <motion.div
        initial={{ scale: 0, rotate: -120 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 12 }}
        className="grid size-28 place-items-center rounded-full bg-lemon"
      >
        <LemonBlossom className="size-16" />
      </motion.div>
    </div>
  );
}
