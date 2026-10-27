"use client";

import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import { Reveal, SplitWords } from "./ui/Reveal";

export function Testimonials() {
  const row = [...testimonials, ...testimonials];

  return (
    <section id="yorumlar" className="overflow-hidden bg-olive py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-lemon">Memnuniyet</Reveal>
        <h2 className="max-w-2xl font-display text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-[1.05] tracking-[-0.02em]">
          <SplitWords text="Sofralarından" inView />{" "}
          <SplitWords text="güzel sözler." inView delay={0.1} className="italic text-lemon" />
        </h2>
      </div>

      <div className="group mt-14 flex [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <ul className="flex shrink-0 animate-marquee gap-6 pr-6 [animation-duration:60s] group-hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <li
              key={i}
              aria-hidden={i >= testimonials.length}
              className="w-[20rem] shrink-0 rounded-[2rem] border border-cream/10 bg-cream/[0.06] p-8 backdrop-blur sm:w-[24rem]"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5 text-lemon">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4 fill-current" />
                  ))}
                </div>
                <Quote className="size-8 text-cream/15" />
              </div>
              <p className="mt-5 font-display text-xl font-light leading-snug">{t.text}</p>
              <p className="mt-6 text-sm font-semibold">
                {t.name} <span className="font-normal text-cream/60">· {t.location}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
