"use client";

import { motion } from "motion/react";
import { useState } from "react";
import type { CartItem } from "@/lib/cart-store";
import { business } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { buildOrderMessage, whatsappLink, type CheckoutInfo } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons/LemonBlossom";

const slots = ["10:00 – 13:00", "13:00 – 16:00", "16:00 – 19:00"];

const toIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function earliestDate() {
  const d = new Date();
  d.setDate(d.getDate() + business.leadDays);
  return toIso(d);
}

type Errors = Partial<Record<keyof CheckoutInfo, string>>;

function validate(info: CheckoutInfo, minDate: string): Errors {
  const errors: Errors = {};
  if (info.name.trim().length < 2) errors.name = "Adınızı yazın";
  if (info.phone.replace(/\D/g, "").length < 10) errors.phone = "Geçerli bir telefon girin";
  if (!info.district.trim()) errors.district = "Mahalle gerekli";
  if (info.address.trim().length < 8) errors.address = "Açık adres gerekli";
  if (!info.date || info.date < minDate) errors.date = "En erken yarın için sipariş alınır";
  return errors;
}

export function CheckoutForm({ items, total, onSent }: { items: CartItem[]; total: number; onSent: () => void }) {
  const [minDate] = useState(earliestDate);
  const [info, setInfo] = useState<CheckoutInfo>({
    name: "",
    phone: "",
    district: "",
    address: "",
    date: minDate,
    slot: slots[1],
    note: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const set = <K extends keyof CheckoutInfo>(key: K, value: CheckoutInfo[K]) => {
    setInfo((s) => ({ ...s, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(info, minDate);
    setErrors(found);
    if (Object.keys(found).length) return;
    window.open(whatsappLink(buildOrderMessage(items, info)), "_blank", "noopener,noreferrer");
    onSent();
  };

  return (
    <form onSubmit={submit} noValidate className="flex min-h-0 flex-1 flex-col">
      <motion.div
        className="flex-1 space-y-4 overflow-y-auto px-6 py-5"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.04 }}
      >
        <Field label="Ad Soyad" error={errors.name}>
          <input
            className={inputCls(errors.name)}
            value={info.name}
            onChange={(e) => set("name", e.target.value)}
            autoComplete="name"
            placeholder="Ayşe Yılmaz"
          />
        </Field>
        <Field label="Telefon" error={errors.phone}>
          <input
            className={inputCls(errors.phone)}
            value={info.phone}
            onChange={(e) => set("phone", e.target.value)}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="05xx xxx xx xx"
          />
        </Field>
        <Field label="Mahalle / İlçe" error={errors.district}>
          <input
            className={inputCls(errors.district)}
            value={info.district}
            onChange={(e) => set("district", e.target.value)}
            placeholder="Çağlayan, Muratpaşa"
          />
        </Field>
        <Field label="Açık adres" error={errors.address}>
          <textarea
            className={`${inputCls(errors.address)} min-h-20 resize-none`}
            value={info.address}
            onChange={(e) => set("address", e.target.value)}
            autoComplete="street-address"
            placeholder="Sokak, bina no, daire, tarif"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Teslim günü" error={errors.date}>
            <input
              type="date"
              className={inputCls(errors.date)}
              min={minDate}
              value={info.date}
              onChange={(e) => set("date", e.target.value)}
            />
          </Field>
          <Field label="Saat aralığı">
            <select className={inputCls()} value={info.slot} onChange={(e) => set("slot", e.target.value)}>
              {slots.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Not (isteğe bağlı)">
          <textarea
            className={`${inputCls()} min-h-16 resize-none`}
            value={info.note}
            onChange={(e) => set("note", e.target.value)}
            placeholder="Alerji, pasta üstü yazı, kapı kodu…"
          />
        </Field>
      </motion.div>

      <footer className="border-t border-olive/10 px-6 py-5">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-ink-soft">
            {items.reduce((n, i) => n + i.qty, 0)} ürün · toplam
          </span>
          <span className="font-display text-3xl">{formatPrice(total)}</span>
        </div>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] py-4 font-semibold text-white shadow-[0_14px_30px_-14px_rgba(37,211,102,0.9)] transition-colors hover:bg-[#1fb857]"
        >
          <WhatsAppIcon className="size-5" />
          WhatsApp ile sipariş ver
        </motion.button>
      </footer>
    </form>
  );
}

const inputCls = (error?: string) =>
  `w-full rounded-2xl border bg-paper px-4 py-3 text-[15px] outline-none transition-all placeholder:text-ink-soft/50 focus:border-olive focus:ring-4 focus:ring-olive/10 ${
    error ? "border-clay" : "border-olive/15"
  }`;

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <motion.label
      className="block"
      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
    >
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">{label}</span>
      {children}
      {error && (
        <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 block text-xs font-semibold text-clay">
          {error}
        </motion.span>
      )}
    </motion.label>
  );
}
