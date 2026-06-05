import { HardHat, Factory, Warehouse, Fuel, Stethoscope, Hotel, GraduationCap, Building2 } from "lucide-react";

const items = [
  { name: "Construction", icon: HardHat },
  { name: "Manufacturing", icon: Factory },
  { name: "Warehousing", icon: Warehouse },
  { name: "Oil & Gas", icon: Fuel },
  { name: "Healthcare", icon: Stethoscope },
  { name: "Hospitality", icon: Hotel },
  { name: "Education", icon: GraduationCap },
  { name: "Commercial", icon: Building2 },
];

export function Industries() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden gradient-navy text-white">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-brand-orange">Industries We Serve</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold">Built for every workplace in India.</h2>
          <p className="mt-4 text-white/70 text-lg">From single-site contractors to multi-plant procurement teams — we tailor safety supply to your operations.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {items.map((i) => {
            const Icon = i.icon;
            return (
              <a key={i.name} href="#" className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-orange/50 transition-all duration-300">
                <div className="h-12 w-12 rounded-lg bg-white/10 grid place-items-center mb-4 group-hover:bg-brand-orange transition">
                  <Icon className="h-6 w-6 text-brand-orange group-hover:text-white transition" />
                </div>
                <h3 className="font-semibold text-lg">{i.name}</h3>
                <p className="text-sm text-white/60 mt-1">Custom safety solutions</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
