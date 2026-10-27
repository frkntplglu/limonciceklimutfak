import Image from "next/image";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { LemonBlossom } from "./icons/LemonBlossom";

const featured = products.filter((p) => p.featured);

export function FeaturedMarquee() {
  const row = [...featured, ...featured];

  return (
    <section aria-label="Haftanın lezzetleri" className="relative border-y border-olive/10 bg-olive py-6 text-cream">
      <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <ul className="flex shrink-0 animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
          {row.map((p, i) => (
            <li key={`${p.id}-${i}`} className="flex shrink-0 items-center gap-4" aria-hidden={i >= featured.length}>
              <span className="relative size-14 overflow-hidden rounded-full ring-2 ring-lemon/60">
                <Image src={p.image} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <span className="font-display text-2xl italic">{p.name}</span>
              <span className="text-sm font-semibold text-lemon">{formatPrice(p.price)}</span>
              <LemonBlossom className="ml-6 size-7 opacity-90" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
