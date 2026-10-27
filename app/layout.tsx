import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  axes: ["SOFT", "opsz"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Limon Çiçekli Mutfak — Ev Yapımı Lezzetler · Antalya",
  description:
    "Börek, sarma, pasta, meze ve buzluk hazırlıkları. Antalya içi adrese teslim, ev yapımı lezzetler. Sepetini oluştur, WhatsApp'tan sipariş ver.",
  openGraph: {
    title: "Limon Çiçekli Mutfak",
    description: "Ev yapımı lezzetler, Antalya içi adrese teslim.",
    locale: "tr_TR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf7ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${fraunces.variable} ${manrope.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
