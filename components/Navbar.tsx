"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { business } from "@/lib/data";
import { CartButton } from "./CartButton";
import { LemonBlossom } from "./icons/LemonBlossom";

const links = [
  { href: "#menu", label: "Menü" },
  { href: "#nasil", label: "Nasıl Çalışır" },
  { href: "#ozel", label: "Özel Sipariş" },
  { href: "#yorumlar", label: "Yorumlar" },
  { href: "#iletisim", label: "İletişim" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -90 : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full py-2 pl-3 pr-2 transition-all duration-500 ${
          scrolled
            ? "border border-olive/10 bg-paper/75 shadow-[0_8px_30px_-12px_rgba(43,51,38,0.25)] backdrop-blur-xl"
            : "border border-transparent"
        }`}
      >
        <a href="#" className="group flex items-center gap-2.5">
          <motion.span whileHover={{ rotate: 72 }} transition={{ type: "spring", stiffness: 200, damping: 12 }}>
            <LemonBlossom className="size-9" />
          </motion.span>
          <span className="font-display text-lg leading-none tracking-tight">
            Limon Çiçekli
            <span className="block text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-ink-soft">
              Mutfak
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-cream-deep hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={business.phoneHref}
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-olive transition-colors hover:bg-cream-deep lg:block"
          >
            {business.phoneDisplay}
          </a>
          <CartButton />
        </div>
      </nav>
    </motion.header>
  );
}
