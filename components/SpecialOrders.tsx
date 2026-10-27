"use client";

import { ArrowUpRight, Snowflake, Users } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { whatsappLink } from "@/lib/whatsapp";
import { LemonBlossom } from "./icons/LemonBlossom";
import { Reveal, SplitWords } from "./ui/Reveal";

const cards = [
  {
    icon: Users,
    title: "Davet & Büfe",
    text: "Doğum günü, kabul günü, ofis toplantısı… Kişi sayına göre börek, meze ve tatlıdan oluşan büfe menüsü hazırlayalım.",
    image: "/images/sofra.jpg",
    message: "Merhaba, bir davet için büfe menüsü hakkında bilgi almak istiyorum 🍋",
  },
  {
    icon: Snowflake,
    title: "Buzluk Hazırlığı",
    text: "Mantı, içli köfte, sigara böreği… Yoğun haftalar için dondurulmuş, pişirmeye hazır paketler.",
    image: "/images/manti.jpg",
    message: "Merhaba, buzluk hazırlığı paketleri hakkında bilgi almak istiyorum ❄️",
  },
];

export function SpecialOrders() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="ozel" ref={ref} className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-leaf">Özel sipariş</Reveal>
            <h2 className="max-w-xl font-display text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-[1.05] tracking-[-0.02em]">
              <SplitWords text="Kalabalık sofralar," inView />{" "}
              <SplitWords text="dolu buzluklar." inView delay={0.12} className="italic text-olive" />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <LemonBlossom className="size-16 animate-spin-slow" />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.12}>
              <motion.a
                href={whatsappLink(c.message)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover="hover"
                className="group relative block aspect-[5/4] overflow-hidden rounded-[2.25rem] text-cream sm:aspect-[16/11]"
              >
                <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
                  <motion.div
                    className="relative size-full"
                    variants={{ hover: { scale: 1.06 } }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 560px, 92vw" className="object-cover" />
                  </motion.div>
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 sm:p-9">
                  <div>
                    <span className="mb-4 inline-grid size-12 place-items-center rounded-2xl bg-lemon text-ink">
                      <c.icon className="size-5" />
                    </span>
                    <h3 className="font-display text-3xl tracking-tight sm:text-4xl">{c.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/80 sm:text-base">{c.text}</p>
                  </div>
                  <motion.span
                    variants={{ hover: { rotate: 45, scale: 1.1 } }}
                    className="grid size-14 shrink-0 place-items-center rounded-full bg-paper text-ink"
                  >
                    <ArrowUpRight className="size-6" />
                  </motion.span>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
