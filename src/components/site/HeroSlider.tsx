import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import workers from "@/assets/hero-workers.jpg";
import fire from "@/assets/hero-fire.jpg";
import industries from "@/assets/hero-industries.jpg";
import bulk from "@/assets/hero-bulk.jpg";

const slides = [
  {
    img: workers,
    eyebrow: "Industrial Safety · Fire Protection",
    title: "Protect Lives. Prevent Accidents.",
    sub: "Trusted industrial safety & fire protection solutions for India's fastest growing industries.",
    primary: "Explore Products",
    secondary: "Request a Quote",
  },
  {
    img: fire,
    eyebrow: "Awareness · Compliance",
    title: "Workplace Safety Saves Lives.",
    sub: "Over 48,000 fire incidents and 1,400+ industrial accidents reported across India every year. The right gear changes the outcome.",
    primary: "Learn More",
    secondary: "Safety Audit",
  },
  {
    img: industries,
    eyebrow: "Every Sector · Every Site",
    title: "Complete Safety Equipment for Every Industry.",
    sub: "From construction sites to refineries, hospitals to hotels — we equip India's workforce.",
    primary: "Browse Categories",
    secondary: "View Industries",
  },
  {
    img: bulk,
    eyebrow: "B2B · Bulk Supply",
    title: "Bulk Orders & Industrial Safety Solutions.",
    sub: "Volume pricing, GST invoicing and pan-India logistics for procurement teams.",
    primary: "Contact Sales Team",
    secondary: "Download Catalogue",
  },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[78vh] min-h-[560px] max-h-[820px] overflow-hidden bg-navy">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <img src={s.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative h-full container mx-auto px-6 flex items-center">
            <div className={`max-w-2xl text-white ${idx === i ? "animate-slide-fade" : ""}`}>
              <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-brand-orange mb-5">
                {s.eyebrow}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 text-balance">
                {s.title}
              </h1>
              <p className="text-base md:text-xl text-white/85 mb-8 max-w-xl text-balance">{s.sub}</p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="gradient-fire border-0 text-white font-semibold hover:opacity-95 h-12 px-7">
                  {s.primary} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white hover:text-navy h-12 px-7">
                  {s.secondary}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => setI((i - 1 + slides.length) % slides.length)}
        className="hidden md:grid absolute left-5 top-1/2 -translate-y-1/2 h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white transition"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => setI((i + 1) % slides.length)}
        className="hidden md:grid absolute right-5 top-1/2 -translate-y-1/2 h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white transition"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all ${idx === i ? "w-10 bg-brand-orange" : "w-6 bg-white/40"}`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
