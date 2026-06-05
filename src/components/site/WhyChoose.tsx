import { BadgeCheck, Package, Tag, Truck, Headphones, Wrench } from "lucide-react";

const items = [
  { icon: BadgeCheck, title: "Certified Products", desc: "ISI, BIS, EN & CE compliant inventory across every category." },
  { icon: Package, title: "Bulk Supply Capability", desc: "Stocked warehouses ready for high-volume B2B orders." },
  { icon: Tag, title: "Competitive Pricing", desc: "Direct-from-manufacturer pricing with transparent GST invoicing." },
  { icon: Truck, title: "Fast Pan-India Delivery", desc: "48-72 hour dispatch with logistics partners across India." },
  { icon: Headphones, title: "Expert Support", desc: "Dedicated safety consultants for product selection & audits." },
  { icon: Wrench, title: "Custom Solutions", desc: "Tailored safety programs for unique industrial environments." },
];

export function WhyChoose() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary">Why Kamakshi</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-navy">A safety partner, not just a supplier.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((i) => {
            const Icon = i.icon;
            return (
              <div key={i.title} className="p-7 rounded-xl border bg-card hover:border-primary/40 hover:shadow-product transition-all duration-300 group">
                <div className="h-12 w-12 rounded-lg gradient-fire grid place-items-center text-white mb-5 group-hover:scale-110 transition">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-navy mb-1.5">{i.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{i.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
