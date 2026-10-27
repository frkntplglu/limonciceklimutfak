"use client";

import { CalendarDays, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { WhatsAppIcon } from "./icons/LemonBlossom";
import { Reveal, SplitWords } from "./ui/Reveal";

const steps = [
  {
    icon: ShoppingBag,
    title: "Sepetini oluştur",
    text: "Menüden canının çektiklerini seç, adetleri ayarla. Sepetin tarayıcında saklanır.",
  },
  {
    icon: CalendarDays,
    title: "Gün ve adres seç",
    text: "Teslim gününü, saat aralığını ve adresini gir. Ev yapımı olduğu için en erken ertesi gün.",
  },
  {
    icon: WhatsAppIcon,
    title: "WhatsApp'tan onayla",
    text: "Siparişin hazır bir mesaj olarak WhatsApp'ta açılır. Gönder; onay ve ödeme detayları için size dönelim.",
  },
];

export function HowItWorks() {
  return (
    <section id="nasil" className="relative overflow-hidden bg-cream-deep/60 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-leaf">Nasıl çalışır</Reveal>
          <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-[1.05] tracking-[-0.02em]">
            <SplitWords text="Üç adımda" inView /> <SplitWords text="sofranda." inView delay={0.1} className="italic text-olive" />
          </h2>
        </div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          {/* Adımları bağlayan çizgi */}
          <svg className="absolute left-0 top-12 hidden h-8 w-full md:block" viewBox="0 0 1000 30" preserveAspectRatio="none" aria-hidden>
            <motion.path
              d="M120 15 C 300 -5, 380 35, 500 15 S 760 -5, 880 15"
              fill="none"
              stroke="var(--color-olive)"
              strokeOpacity=".25"
              strokeWidth="2"
              strokeDasharray="6 8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </svg>

          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.15} className="relative">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="h-full rounded-[2rem] border border-olive/10 bg-paper p-8 shadow-[0_20px_50px_-30px_rgba(43,51,38,0.35)]"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl bg-lemon text-ink">
                    <s.icon className="size-6" strokeWidth={1.8} />
                  </span>
                  <span className="font-display text-6xl font-light italic text-olive/15">0{i + 1}</span>
                </div>
                <h3 className="mt-8 font-display text-2xl tracking-tight">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
