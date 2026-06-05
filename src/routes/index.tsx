import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/site/TopBar";
import { Header } from "@/components/site/Header";
import { HeroSlider } from "@/components/site/HeroSlider";
import { Stats } from "@/components/site/Stats";
import { Categories } from "@/components/site/Categories";
import { FeaturedProducts } from "@/components/site/FeaturedProducts";
import { Industries } from "@/components/site/Industries";
import { WhyChoose } from "@/components/site/WhyChoose";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kamakshi Enterprises — Industrial Safety & Fire Protection Equipment India" },
      { name: "description", content: "Manufacturer & supplier of industrial safety equipment, fire extinguishers, PPE, helmets, reflective jackets, and fire alarm systems across India. Bulk supply, GST invoicing, pan-India delivery." },
      { property: "og:title", content: "Kamakshi Enterprises — Industrial Safety & Fire Protection" },
      { property: "og:description", content: "Trusted B2B safety supply for factories, sites, warehouses and offices. Certified PPE, fire safety and workplace protection." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main>
        <HeroSlider />
        <Stats />
        <Categories />
        <FeaturedProducts />
        <Industries />
        <WhyChoose />
        <CtaBanner />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
