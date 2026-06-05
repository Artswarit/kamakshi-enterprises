import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import workers from "@/assets/hero-workers.jpg";
import fire from "@/assets/hero-fire.jpg";
import industries from "@/assets/hero-industries.jpg";
import bulk from "@/assets/hero-bulk.jpg";

const slides = [
  {
    img: fire,
    eyebrow: "LPG Gas Leaks | Home Safety First",
    title: "A Split-Second Alert Saves Indian Families.",
    sub: "LPG cylinder leaks cause thousands of domestic fire tragedies in India. A simple kitchen gas detector warned Savita Devi's family in Delhi just in time. Protect your home and loved ones.",
    primary: "Explore Gas Detectors",
    secondary: "Home Safety Guide",
  },
  {
    img: bulk,
    eyebrow: "Kitchen and Electrical Safeguards",
    title: "Every Indian Home Needs a First Line of Defense.",
    sub: "Most domestic fires start in kitchens or due to electrical short circuits. Compact, easy-to-use home fire extinguishers can stop a minor flame from becoming a major tragedy.",
    primary: "Browse Home Extinguishers",
    secondary: "Request B2B Quote",
  },
  {
    img: workers,
    eyebrow: "Workplace Safety and Compliance",
    title: "Ensuring Every Worker Returns Home Safely.",
    sub: "Over 1,400 industrial accidents occur on Indian sites annually. Guarding workforce health with compliant safety helmets, shoes and jackets is our absolute commitment.",
    primary: "Explore Safety Range",
    secondary: "Safety Audit Inquiry",
  },
  {
    img: industries,
    eyebrow: "Bulk Safety Supply and GST Invoicing",
    title: "Volume Safety Supply for Factory Officers.",
    sub: "Get volume pricing, clear GST invoicing and quick dispatch across India to maintain compliant, safe operations for your factory and warehouse teams.",
    primary: "Contact Sales Team",
    secondary: "Download Catalogue",
  },
];

export function HeroSlider({ onRequestQuote }: { onRequestQuote: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const handleActionClick = (buttonText: string) => {
    if (
      buttonText.toLowerCase().includes("quote") ||
      buttonText.toLowerCase().includes("inquiry") ||
      buttonText.toLowerCase().includes("audit") ||
      buttonText.toLowerCase().includes("contact") ||
      buttonText.toLowerCase().includes("guide")
    ) {
      onRequestQuote();
    }
  };

  return (
    <section id="home" className="relative h-[78vh] min-h-[560px] max-h-[820px] overflow-hidden bg-navy group">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <img src={s.img} alt="" className="absolute inset-0 h-full w-full object-cover animate-scale-slow" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative h-full container mx-auto px-6 flex items-center">
            <div className={`max-w-2xl text-white pl-2 md:pl-10 ${idx === i ? "animate-slide-fade" : ""}`}>
              <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-brand-orange mb-5">
                {s.eyebrow}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 text-balance tracking-tight">
                {s.title}
              </h1>
              <p className="text-base md:text-xl text-white/85 mb-8 max-w-xl text-balance leading-relaxed">{s.sub}</p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="gradient-fire border-0 text-white font-semibold hover:opacity-95 h-12 px-7 transition shadow-lg"
                  onClick={() => handleActionClick(s.primary)}
                >
                  {s.primary} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white hover:text-navy h-12 px-7 transition shadow-md"
                  onClick={() => handleActionClick(s.secondary)}
                >
                  {s.secondary}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows visible only on slider hover */}
      <button
        onClick={() => setI((i - 1 + slides.length) % slides.length)}
        className="hidden md:grid absolute left-6 top-1/2 -translate-y-1/2 h-12 w-12 place-items-center rounded-full bg-white/10 hover:bg-white/30 backdrop-blur text-white transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 hover:scale-105"
        aria-label="Previous"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => setI((i + 1) % slides.length)}
        className="hidden md:grid absolute right-6 top-1/2 -translate-y-1/2 h-12 w-12 place-items-center rounded-full bg-white/10 hover:bg-white/30 backdrop-blur text-white transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 hover:scale-105"
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
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
