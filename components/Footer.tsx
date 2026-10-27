import { Clock, MapPin, Phone } from "lucide-react";
import { business, credits } from "@/lib/data";
import { whatsappLink } from "@/lib/whatsapp";
import { InstagramIcon, LemonBlossom, WhatsAppIcon } from "./icons/LemonBlossom";
import { Reveal } from "./ui/Reveal";

export function Footer() {
  return (
    <footer id="iletisim" className="relative overflow-hidden pb-28 pt-24 sm:pt-32 md:pb-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-lemon px-7 py-14 sm:px-14 sm:py-20">
          <LemonBlossom className="absolute -right-10 -top-10 size-56 animate-spin-slow opacity-40" />
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-olive">Bir mesaj uzağınızdayız</p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-light leading-[1.02] tracking-[-0.02em]">
            Aklınızda özel bir lezzet mi var?
          </h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={whatsappLink("Merhaba 🍋")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-cream transition-transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="size-5" /> WhatsApp
            </a>
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 font-semibold transition-colors hover:bg-ink/5"
            >
              <InstagramIcon className="size-5" /> {business.instagramHandle}
            </a>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <LemonBlossom className="size-10" />
              <span className="font-display text-xl leading-none">
                {business.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {business.tagline}. Sevgiyle, ev mutfağında, sipariş üzerine hazırlanır.
            </p>
          </div>

          <FooterCol icon={<Phone className="size-4" />} title="Telefon">
            <a href={business.phoneHref} className="hover:text-ink">
              {business.phoneDisplay}
            </a>
          </FooterCol>

          <FooterCol icon={<MapPin className="size-4" />} title="Konum">
            {business.location}
            <br />
            {business.deliveryArea}
          </FooterCol>

          <FooterCol icon={<Clock className="size-4" />} title="Sipariş saatleri">
            {business.hours.map((h) => (
              <span key={h.label} className="block">
                {h.label}: {h.value}
              </span>
            ))}
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-olive/10 pt-8 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {business.name}. Tüm hakları saklıdır.</p>
          <p className="max-w-xl sm:text-right">{credits}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-leaf">
        {icon}
        {title}
      </p>
      <div className="mt-4 text-sm leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}
