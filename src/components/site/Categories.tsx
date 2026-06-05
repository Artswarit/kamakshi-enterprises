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

interface CategoriesProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export function Categories({ activeCategory, setActiveCategory }: CategoriesProps) {
  const handleCategoryClick = (catName: string) => {
    const nextCat = activeCategory === catName ? "" : catName;
    setActiveCategory(nextCat);
    
    // Smooth scroll down to products catalog to show filtered results
    setTimeout(() => {
      const el = document.getElementById("products");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <section id="categories" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary">Shop By Category</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-navy">Complete safety gear, one trusted source.</h2>
          </div>
          <button
            onClick={() => handleCategoryClick("")}
            className={`text-sm font-semibold hover:underline flex items-center gap-1 ${activeCategory ? "text-brand-orange font-bold animate-pulse" : "text-primary"}`}
          >
            {activeCategory ? `Clear Filter ("${activeCategory}")` : "View all categories"} <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {cats.map((c) => {
            const Icon = c.icon;
            const isSelected = activeCategory === c.name;
            return (
              <button
                key={c.name}
                onClick={() => handleCategoryClick(c.name)}
                className={`group relative rounded-xl border p-6 text-left hover:shadow-elegant transition-all duration-300 overflow-hidden w-full ${
                  isSelected ? "border-brand-orange bg-brand-orange/5 ring-2 ring-brand-orange/20" : "bg-card border-border"
                }`}
              >
                <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${c.color} ${isSelected ? "opacity-20 scale-110" : "opacity-10 group-hover:opacity-20 group-hover:scale-125"} transition-all duration-500`} />
                <div className={`relative h-12 w-12 rounded-lg bg-gradient-to-br ${c.color} grid place-items-center text-white mb-4 ${isSelected ? "scale-105" : "group-hover:scale-110"} transition`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="relative font-semibold text-navy group-hover:text-primary transition text-sm sm:text-base">{c.name}</h3>
                <p className="relative text-xs text-muted-foreground mt-1">{c.count} products</p>
                <ArrowUpRight className="absolute top-5 right-5 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
