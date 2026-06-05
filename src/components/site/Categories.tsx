import { Flame, HardHat, Shirt, Hand, Footprints, BellRing, Siren, Heart, LifeBuoy, Signpost, Wind, ArrowUpRight } from "lucide-react";

const cats = [
  { name: "Fire Extinguishers", icon: Flame, count: 42, color: "from-brand-red to-brand-orange" },
  { name: "Safety Helmets", icon: HardHat, count: 28, color: "from-brand-orange to-yellow-500" },
  { name: "Reflective Jackets", icon: Shirt, count: 36, color: "from-brand-orange to-brand-red" },
  { name: "Safety Gloves", icon: Hand, count: 54, color: "from-navy to-blue-700" },
  { name: "Safety Shoes", icon: Footprints, count: 31, color: "from-charcoal to-navy" },
  { name: "Fire Alarm Systems", icon: BellRing, count: 19, color: "from-brand-red to-pink-600" },
  { name: "Smoke Detectors", icon: Siren, count: 24, color: "from-navy to-brand-red" },
  { name: "First Aid Kits", icon: Heart, count: 22, color: "from-brand-red to-rose-500" },
  { name: "Fall Protection", icon: LifeBuoy, count: 17, color: "from-brand-orange to-amber-600" },
  { name: "Safety Sign Boards", icon: Signpost, count: 64, color: "from-yellow-500 to-brand-orange" },
  { name: "Respiratory Equipment", icon: Wind, count: 29, color: "from-navy to-cyan-700" },
];

export function Categories() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary">Shop By Category</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-navy">Complete safety gear, one trusted source.</h2>
          </div>
          <a href="#" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
            View all categories <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {cats.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.name}
                href="#"
                className="group relative rounded-xl border bg-card p-6 hover:border-primary/50 hover:shadow-elegant transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${c.color} opacity-10 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500`} />
                <div className={`relative h-12 w-12 rounded-lg bg-gradient-to-br ${c.color} grid place-items-center text-white mb-4 group-hover:scale-110 transition`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="relative font-semibold text-navy group-hover:text-primary transition">{c.name}</h3>
                <p className="relative text-xs text-muted-foreground mt-1">{c.count} products</p>
                <ArrowUpRight className="absolute top-5 right-5 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
