import { business } from "./data";
import type { CartItem } from "./cart-store";
import { formatPrice } from "./format";

export type CheckoutInfo = {
  name: string;
  phone: string;
  district: string;
  address: string;
  date: string; // YYYY-MM-DD
  slot: string;
  note: string;
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${business.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(y, m - 1, d));
};

export function buildOrderMessage(items: CartItem[], info: CheckoutInfo) {
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const lines = items.map(
    (i) => `• ${i.qty} × ${i.product.name} (${i.product.unit}) — ${formatPrice(i.product.price * i.qty)}`,
  );

  return [
    `🍋 *${business.name} — Yeni Sipariş*`,
    "",
    "*Sipariş*",
    ...lines,
    "",
    `*Toplam:* ${formatPrice(total)}`,
    "",
    "*Teslimat*",
    `📅 ${formatDate(info.date)} · ${info.slot}`,
    `📍 ${info.district} — ${info.address}`,
    "",
    "*Müşteri*",
    `👤 ${info.name}`,
    `📞 ${info.phone}`,
    ...(info.note.trim() ? ["", `📝 Not: ${info.note.trim()}`] : []),
  ].join("\n");
}
