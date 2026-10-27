import { CartDrawer } from "@/components/CartDrawer";
import { FeaturedMarquee } from "@/components/FeaturedMarquee";
import { FlyToCartLayer } from "@/components/FlyToCart";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Menu } from "@/components/Menu";
import { MobileCartBar } from "@/components/MobileCartBar";
import { Navbar } from "@/components/Navbar";
import { SpecialOrders } from "@/components/SpecialOrders";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedMarquee />
        <Menu />
        <HowItWorks />
        <SpecialOrders />
        <Testimonials />
      </main>
      <Footer />
      <CartDrawer />
      <MobileCartBar />
      <FlyToCartLayer />
    </>
  );
}
