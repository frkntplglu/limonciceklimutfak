"use client";

import { ArrowDown, Truck } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { business } from "@/lib/data";
import { whatsappLink } from "@/lib/whatsapp";
import { Leaf, Lemon, LemonBlossom, WhatsAppIcon } from "./icons/LemonBlossom";
import { SplitWords } from "./ui/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const ySmall = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section ref={ref} className="relative overflow-hidden pb-16 pt-28 sm:pt-36 lg:pb-28">
      {/* Arka plan yumuşak lekeleri */}
      <div className="pointer-events-none absolute -right-40 -top-40 size-[38rem] rounded-full bg-lemon-soft/70 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-1/2 size-[30rem] rounded-full bg-leaf-soft/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-olive/15 bg-paper/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-olive backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-leaf opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-leaf" />
            </span>
            Ön siparişler açık
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-light leading-[0.98] tracking-[-0.03em] text-ink">
            <SplitWords text="Ev yapımı" delay={0.15} />
            <br />
            <SplitWords text="lezzetler," delay={0.3} className="italic text-olive" />
            <br />
            <SplitWords text="kapınıza kadar." delay={0.45} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft"
          >
            Çağlayan&apos;daki mutfağımızdan; börekler, sarmalar, pastalar ve buzluk hazırlıkları. Her şey
            sipariş üzerine, teslim günü taze hazırlanır.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <motion.a
              href="#menu"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 rounded-full bg-olive py-3.5 pl-6 pr-3.5 font-semibold text-cream shadow-[0_14px_30px_-12px_rgba(62,77,51,0.7)]"
            >
              Menüyü keşfet
              <span className="grid size-8 place-items-center rounded-full bg-lemon text-ink transition-transform duration-500 group-hover:rotate-[-90deg]">
                <ArrowDown className="size-4" />
              </span>
            </motion.a>
            <motion.a
              href={whatsappLink("Merhaba, sipariş vermek istiyorum 🍋")}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-olive/20 bg-paper/60 px-5 py-3.5 font-semibold text-olive backdrop-blur transition-colors hover:bg-paper"
            >
              <WhatsAppIcon className="size-5 text-[#25D366]" />
              WhatsApp&apos;tan yaz
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-10 flex items-center gap-3 text-sm text-ink-soft"
          >
            <Truck className="size-4 text-leaf" />
            {business.deliveryArea} · En erken ertesi gün teslim
          </motion.div>
        </div>

        {/* Kolaj */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[30rem] lg:max-w-none">
          <motion.div
            style={{ y: yBack }}
            initial={{ opacity: 0, scale: 0.92, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
            className="absolute right-0 top-0 h-[78%] w-[74%] overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-30px_rgba(43,51,38,0.45)]"
          >
            <Image
              src="/images/limonlu-tart.jpg"
              alt="Limonlu beze tart"
              fill
              priority
              sizes="(min-width: 1024px) 36vw, 70vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            style={{ y: yFront }}
            initial={{ opacity: 0, y: 60, rotate: 8 }}
            animate={{ opacity: 1, y: 0, rotate: 5 }}
            transition={{ duration: 1.2, delay: 0.45, ease }}
            className="absolute bottom-0 left-0 h-[52%] w-[52%] overflow-hidden rounded-[2rem] border-[6px] border-paper shadow-[0_30px_60px_-25px_rgba(43,51,38,0.5)]"
          >
            <Image
              src="/images/zeytinyagli-sarma.jpg"
              alt="Zeytinyağlı yaprak sarma"
              fill
              sizes="(min-width: 1024px) 26vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            style={{ y: ySmall }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7, ease }}
            className="absolute bottom-[30%] right-[-4%] h-[26%] w-[30%] overflow-hidden rounded-full border-[6px] border-paper shadow-xl"
          >
            <Image src="/images/su-boregi.jpg" alt="Su böreği" fill sizes="200px" className="object-cover" />
          </motion.div>

          {/* Dönen rozet */}
          <motion.div
            style={{ rotate }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 1, ease }}
            className="absolute -left-2 top-[8%] size-28 sm:size-32"
          >
            <div className="relative size-full rounded-full bg-lemon shadow-lg">
              <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
                <defs>
                  <path id="circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                </defs>
                <text className="fill-ink font-sans text-[9.5px] font-bold uppercase tracking-[0.22em]">
                  <textPath href="#circle">Ev yapımı • Taze • Sevgiyle •</textPath>
                </text>
              </svg>
              <LemonBlossom className="absolute inset-0 m-auto size-11" />
            </div>
          </motion.div>

          {/* Yüzen süslemeler */}
          <Lemon className="absolute -bottom-6 right-[18%] w-20 animate-float drop-shadow-md" />
          <Leaf className="absolute right-[-6%] top-[-4%] w-14 animate-float [animation-delay:-3s]" />
          <LemonBlossom className="absolute left-[46%] top-[-5%] w-10 animate-float [animation-delay:-1.5s]" />
        </div>
      </div>
    </section>
  );
}
