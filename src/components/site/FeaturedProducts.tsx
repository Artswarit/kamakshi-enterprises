import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ext from "@/assets/prod-extinguisher.jpg";
import hel from "@/assets/prod-helmet.jpg";
import jac from "@/assets/prod-jacket.jpg";
import boo from "@/assets/prod-boots.jpg";
import glo from "@/assets/prod-gloves.jpg";
import alm from "@/assets/prod-alarm.jpg";

const products = [
  { img: ext, name: "ABC Dry Powder Fire Extinguisher 6kg", tag: "ISI Marked", price: 2450, desc: "Multi-purpose extinguisher for Class A, B & C fires. Pressure-tested cylinder." , rating: 4.8 },
  { img: hel, name: "Industrial Safety Helmet (HDPE)", tag: "IS 2925", price: 285, desc: "Ratchet-style harness, UV-resistant shell, ventilated comfort liner.", rating: 4.7 },
  { img: jac, name: "Hi-Vis Reflective Safety Jacket", tag: "EN ISO 20471", price: 320, desc: "5cm tape, breathable polyester mesh, suitable for road & site work.", rating: 4.9 },
  { img: boo, name: "Steel-Toe Safety Boots", tag: "IS 15298", price: 1890, desc: "200J impact rated, oil & slip resistant sole, anti-static lining.", rating: 4.6 },
  { img: glo, name: "Cut-Resistant Industrial Gloves", tag: "EN 388 Level 5", price: 245, desc: "HPPE shell, nitrile palm coating, excellent grip in oily conditions.", rating: 4.8 },
  { img: alm, name: "Photoelectric Smoke Detector", tag: "BIS Certified", price: 1450, desc: "10-year battery, 85dB alarm, low-current standby, wall/ceiling mount.", rating: 4.7 },
];

export function FeaturedProducts() {
  return (
    <section className="py-20 md:py-28 bg-muted/40">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary">Featured Products</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-navy">Best sellers, ready to ship.</h2>
          </div>
          <a href="#" className="text-sm font-semibold text-primary hover:underline">Shop all products →</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {products.map((p) => (
            <article key={p.name} className="group bg-card rounded-xl border overflow-hidden hover:shadow-elegant transition-all duration-300">
              <div className="relative aspect-square bg-white overflow-hidden">
                <img src={p.img} alt={p.name} loading="lazy" width={800} height={800} className="h-full w-full object-contain p-6 group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase bg-navy text-white px-2.5 py-1 rounded">{p.tag}</span>
                <button className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 hover:bg-primary hover:text-white grid place-items-center shadow transition" aria-label="Wishlist">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 text-amber-500 text-xs mb-2">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span className="font-semibold">{p.rating}</span>
                  <span className="text-muted-foreground ml-1">(120+ reviews)</span>
                </div>
                <h3 className="font-semibold text-navy leading-snug group-hover:text-primary transition line-clamp-2">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Starting at</div>
                    <div className="text-xl font-bold text-navy">₹{p.price.toLocaleString("en-IN")}</div>
                  </div>
                  <Button size="sm" className="gradient-fire border-0 text-white">
                    <ShoppingCart className="h-4 w-4 mr-1.5" /> Add
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
