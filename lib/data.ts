// İşletme bilgileri, kategoriler ve ürünler — siteyi güncellemek için bu dosyayı düzenleyin.

export const business = {
  name: "Limon Çiçekli Mutfak",
  tagline: "Ev Yapımı Lezzetler",
  phoneDisplay: "0501 233 22 89",
  phoneHref: "tel:+905012332289",
  whatsapp: "905012332289",
  instagram: "https://www.instagram.com/limonciceklimutfak",
  instagramHandle: "@limonciceklimutfak",
  location: "Çağlayan Mahallesi, Antalya",
  deliveryArea: "Antalya içi adrese teslimat",
  hours: [
    { label: "Pazartesi – Cumartesi", value: "09:00 – 20:00" },
    { label: "Pazar", value: "Ön siparişle" },
  ],
  // Ev yapımı ürünler için en erken teslim: kaç gün sonrası
  leadDays: 1,
};

export type CategoryId =
  | "kurabiyeler"
  | "borekler"
  | "pasta"
  | "meze-salata"
  | "sarma-dolma"
  | "mayalilar"
  | "yemekler"
  | "buzluk";

export type Category = { id: CategoryId; name: string; emoji: string };

export const categories: Category[] = [
  { id: "borekler", name: "Börekler", emoji: "🥧" },
  { id: "pasta", name: "Pasta & Tatlı", emoji: "🍰" },
  { id: "sarma-dolma", name: "Sarma & Dolma", emoji: "🍃" },
  { id: "meze-salata", name: "Meze & Salata", emoji: "🥗" },
  { id: "kurabiyeler", name: "Kurabiyeler", emoji: "🍪" },
  { id: "mayalilar", name: "Mayalılar", emoji: "🥐" },
  { id: "yemekler", name: "Yemekler", emoji: "🍲" },
  { id: "buzluk", name: "Buzluk Hazırlığı", emoji: "❄️" },
];

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  price: number;
  unit: string;
  image: string;
  tags?: string[];
  featured?: boolean;
};

export const products: Product[] = [
  // Börekler
  {
    id: "su-boregi",
    name: "Su Böreği",
    category: "borekler",
    description: "İncecik açılmış, haşlanmış yufka katları arasında bol beyaz peynir ve maydanoz. Tereyağıyla fırınlanır.",
    price: 950,
    unit: "tepsi · 12 dilim",
    image: "/images/su-boregi.jpg",
    tags: ["Çok satan"],
    featured: true,
  },
  {
    id: "kol-boregi",
    name: "Ispanaklı Kol Böreği",
    category: "borekler",
    description: "El açması yufkadan, ıspanak ve lorlu iç harcıyla sarılıp fırınlanmış çıtır kol böreği.",
    price: 780,
    unit: "tepsi · 10 dilim",
    image: "/images/kol-boregi.jpg",
  },
  {
    id: "sigara-boregi",
    name: "Sigara Böreği",
    category: "borekler",
    description: "Beyaz peynir ve maydanozlu, altın renginde kızarmış klasik çay saati böreği.",
    price: 420,
    unit: "20 adet",
    image: "/images/sigara-boregi.jpg",
  },
  {
    id: "borek-tabagi",
    name: "Karışık Börek Tabağı",
    category: "borekler",
    description: "Davetler için: su böreği, kol böreği, muska ve sigara böreğinden oluşan karışık tabak.",
    price: 1450,
    unit: "8–10 kişilik",
    image: "/images/borek-tabagi.jpg",
    tags: ["Davet"],
  },

  // Pasta & Tatlı
  {
    id: "limonlu-tart",
    name: "Limonlu Beze Tart",
    category: "pasta",
    description: "Tereyağlı tart hamuru, ekşi-tatlı limon kreması ve közlenmiş İtalyan bezesi. Mutfağımızın imzası.",
    price: 890,
    unit: "22 cm · 8 dilim",
    image: "/images/limonlu-tart.jpg",
    tags: ["İmza lezzet"],
    featured: true,
  },
  {
    id: "yaban-mersinli-cheesecake",
    name: "Yaban Mersinli Cheesecake",
    category: "pasta",
    description: "Fırında pişmiş kremamsı New York usulü cheesecake, ev yapımı yaban mersini sosuyla.",
    price: 1150,
    unit: "22 cm · 10 dilim",
    image: "/images/yaban-mersinli-cheesecake.jpg",
    featured: true,
  },
  {
    id: "limonlu-cheesecake",
    name: "Limonlu Cheesecake",
    category: "pasta",
    description: "Limon kabuğu rendesiyle ferahlatılmış, bisküvi tabanlı hafif cheesecake.",
    price: 1050,
    unit: "22 cm · 10 dilim",
    image: "/images/limonlu-cheesecake.jpg",
  },
  {
    id: "chiffon-cake",
    name: "Frambuazlı Chiffon Pasta",
    category: "pasta",
    description: "Pamuk gibi chiffon keki, mascarpone krema ve taze frambuazla katlanmış kutlama pastası.",
    price: 1350,
    unit: "20 cm · 10–12 kişilik",
    image: "/images/chiffon-cake.jpg",
    tags: ["Özel gün"],
  },
  {
    id: "elmali-turta",
    name: "Tarçınlı Elmalı Turta",
    category: "pasta",
    description: "Kafes desenli tereyağlı hamur, tarçın ve esmer şekerle karamelize elma dolgusu.",
    price: 820,
    unit: "24 cm · 8 dilim",
    image: "/images/elmali-turta.jpg",
  },
  {
    id: "frambuazli-tart",
    name: "Meyveli Mini Tartlar",
    category: "pasta",
    description: "Vanilyalı krema ve mevsim meyveleriyle hazırlanan, ikramlık mini tartlar.",
    price: 640,
    unit: "12 adet",
    image: "/images/frambuazli-tart.jpg",
  },

  // Sarma & Dolma
  {
    id: "zeytinyagli-sarma",
    name: "Zeytinyağlı Yaprak Sarma",
    category: "sarma-dolma",
    description: "İncecik sarılmış, kuş üzümü ve dolmalık fıstıklı, limonla servis edilen zeytinyağlı sarma.",
    price: 720,
    unit: "1 kg",
    image: "/images/zeytinyagli-sarma.jpg",
    tags: ["Çok satan"],
    featured: true,
  },
  {
    id: "etli-sarma",
    name: "Etli Yaprak Sarma",
    category: "sarma-dolma",
    description: "Kıymalı pirinç harcıyla sarılıp domates sosunda pişirilir, yanında süzme yoğurtla.",
    price: 890,
    unit: "1 kg",
    image: "/images/etli-sarma.jpg",
  },
  {
    id: "biber-dolmasi",
    name: "Etli Biber Dolması",
    category: "sarma-dolma",
    description: "Taze dolmalık biberler, baharatlı kıymalı pirinç iç harcıyla ağır ateşte pişirilir.",
    price: 760,
    unit: "12 adet",
    image: "/images/biber-dolmasi.jpg",
  },
  {
    id: "lahana-sarmasi",
    name: "Lahana Sarması",
    category: "sarma-dolma",
    description: "Kış klasiği: haşlanmış lahana yapraklarına sarılmış kıymalı-bulgurlu iç, tereyağlı sosla.",
    price: 740,
    unit: "1 kg",
    image: "/images/lahana-sarmasi.jpg",
  },

  // Meze & Salata
  {
    id: "humus",
    name: "Humus",
    category: "meze-salata",
    description: "Bol tahinli, kadifemsi nohut ezmesi. Zeytinyağı, pul biber ve kavrulmuş bademle.",
    price: 260,
    unit: "500 g",
    image: "/images/humus.jpg",
    featured: true,
  },
  {
    id: "haydari",
    name: "Haydari",
    category: "meze-salata",
    description: "Süzme yoğurt, taze nane, dereotu ve sarımsakla hazırlanan serinletici meze.",
    price: 220,
    unit: "500 g",
    image: "/images/haydari.jpg",
  },
  {
    id: "kisir",
    name: "Kısır",
    category: "meze-salata",
    description: "İnce bulgur, nar ekşisi, taze yeşillik ve közlenmiş biber salçasıyla anne usulü kısır.",
    price: 240,
    unit: "1 kg",
    image: "/images/kisir.jpg",
  },
  {
    id: "mevsim-salatasi",
    name: "Mevsim Salatası Tabağı",
    category: "meze-salata",
    description: "Günün en taze yeşillikleri, peynir, ceviz ve limonlu zeytinyağı sosuyla.",
    price: 320,
    unit: "4 kişilik",
    image: "/images/mevsim-salatasi.jpg",
  },

  // Kurabiyeler
  {
    id: "damla-cikolatali-kurabiye",
    name: "Damla Çikolatalı Kurabiye",
    category: "kurabiyeler",
    description: "Dışı çıtır, içi yumuşak; bol Belçika çikolatalı Amerikan usulü kurabiye.",
    price: 480,
    unit: "12 adet",
    image: "/images/damla-cikolatali-kurabiye.jpg",
    featured: true,
  },
  {
    id: "kakaolu-findikli-kurabiye",
    name: "Kakaolu Fındıklı Kurabiye",
    category: "kurabiyeler",
    description: "Giresun fındığı ve kakaolu yoğun aromalı, çay saatinin vazgeçilmezi.",
    price: 450,
    unit: "500 g",
    image: "/images/kakaolu-findikli-kurabiye.jpg",
  },
  {
    id: "brownie",
    name: "Islak Brownie",
    category: "kurabiyeler",
    description: "Yoğun çikolatalı, içi akışkan brownie kareleri. Üzeri hafif pudra şekerli.",
    price: 540,
    unit: "9 kare",
    image: "/images/brownie.jpg",
  },

  // Mayalılar
  {
    id: "peynirli-pogaca",
    name: "Peynirli Poğaça",
    category: "mayalilar",
    description: "Pamuk gibi yumuşak, bol peynirli ve çörek otlu sabah poğaçası.",
    price: 360,
    unit: "12 adet",
    image: "/images/peynirli-pogaca.jpg",
    featured: true,
  },
  {
    id: "ev-ekmegi",
    name: "Ekşi Mayalı Köy Ekmeği",
    category: "mayalilar",
    description: "48 saat fermente edilmiş ekşi maya, çıtır kabuk ve nemli iç dokusu.",
    price: 190,
    unit: "1 adet · ~800 g",
    image: "/images/ev-ekmegi.jpg",
  },
  {
    id: "kruvasan",
    name: "Tereyağlı Kruvasan",
    category: "mayalilar",
    description: "Kat kat açılan hamur, gerçek tereyağı; kahvaltı sofralarının yıldızı.",
    price: 420,
    unit: "6 adet",
    image: "/images/kruvasan.jpg",
  },

  // Yemekler
  {
    id: "pot-pie",
    name: "Tavuklu Pot Pie",
    category: "yemekler",
    description: "Kremalı tavuk ve sebze yahnisinin üzeri tereyağlı hamurla kapatılıp fırınlanır.",
    price: 680,
    unit: "4 kişilik",
    image: "/images/pot-pie.jpg",
  },
  {
    id: "orgulu-turta",
    name: "Kıymalı Örgülü Turta",
    category: "yemekler",
    description: "Kıyma, mantar ve sebzeli doyurucu iç; üzeri örgü hamurla kaplı tuzlu turta.",
    price: 720,
    unit: "6 kişilik",
    image: "/images/orgulu-turta.jpg",
  },
  {
    id: "ev-koftesi",
    name: "Izgara Ev Köftesi",
    category: "yemekler",
    description: "Dana kıymadan, soğan ve taze baharatlarla yoğrulmuş fırın köfte.",
    price: 650,
    unit: "1 kg · ~30 adet",
    image: "/images/ev-koftesi.jpg",
  },

  // Buzluk Hazırlığı
  {
    id: "manti",
    name: "El Yapımı Mantı",
    category: "buzluk",
    description: "Minicik kesilmiş, kıymalı Kayseri usulü mantı. Dondurulmuş paket, 10 dakikada hazır.",
    price: 520,
    unit: "1 kg · dondurulmuş",
    image: "/images/manti.jpg",
    tags: ["Dondurulmuş"],
  },
  {
    id: "icli-kofte",
    name: "İçli Köfte",
    category: "buzluk",
    description: "İnce bulgur kabuk, cevizli kıymalı iç. Kızartmaya veya haşlamaya hazır, dondurulmuş.",
    price: 680,
    unit: "20 adet · dondurulmuş",
    image: "/images/icli-kofte.jpg",
    tags: ["Dondurulmuş"],
  },
  {
    id: "dondurulmus-sigara",
    name: "Sigara Böreği (Pişmemiş)",
    category: "buzluk",
    description: "Buzluğunuzda dursun: misafir geldiğinde direkt kızartın, 5 dakikada çay sofrası hazır.",
    price: 390,
    unit: "30 adet · dondurulmuş",
    image: "/images/dondurulmus-sigara.jpg",
    tags: ["Dondurulmuş"],
  },
];

export const testimonials = [
  {
    name: "Ayşe K.",
    location: "Lara",
    text: "Su böreği tam annemin yaptığı gibi. Misafirlerim tarifini istedi, sadece gülümsedim 🍋",
  },
  {
    name: "Mehmet D.",
    location: "Konyaaltı",
    text: "Buzluk paketinden mantı ve içli köfte aldık; yoğun haftalarda hayat kurtarıyor. Lezzeti ilk günkü gibi.",
  },
  {
    name: "Elif S.",
    location: "Çağlayan",
    text: "Kızımın doğum günü için chiffon pasta yaptırdık. Hem çok şık hem hafif, herkes ikinci dilimi aldı.",
  },
  {
    name: "Zeynep A.",
    location: "Muratpaşa",
    text: "Zeytinyağlı sarmaları incecik, limonu tam kıvamında. Haftalık siparişim artık sabit.",
  },
  {
    name: "Can T.",
    location: "Kepez",
    text: "Ofis toplantımıza karışık börek tabağı ve mini tartlar aldık, sunumu çok özenliydi.",
  },
];

export const credits =
  "Örnek görseller: Unsplash ve Wikimedia Commons (E4024, Garrett Ziegler, Tess Mattew, Petar Milošević, Samizambak, CeeGee — CC BY-SA 4.0 / CC BY 4.0).";
