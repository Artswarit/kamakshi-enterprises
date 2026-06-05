import { ShieldCheck, Award, Heart } from "lucide-react";

export function AboutUs() {
  const stats = [
    { label: "Years of Safety Experience", val: "18+" },
    { label: "Factories and Homes Equipped", val: "2,800+" },
    { label: "Safety Audits Handled", val: "1,200+" },
    { label: "Active Families and Workers Protected", val: "3,00,000+" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Protecting Lives First",
      desc: "Workplace and home safety is not a statistic: it is a mother returning to her children, a father arriving home safely. We never cut corners because lives depend on our gear.",
    },
    {
      icon: ShieldCheck,
      title: "Strict Standards Compliance",
      desc: "All products undergo pressure, heat and impact resistance testing. We supply only ISI, BIS and EN-certified gear to guarantee safety in critical operations.",
    },
    {
      icon: Award,
      title: "Direct B2B and Home Pricing",
      desc: "Safety should not be cost-prohibitive. By manufacturing and sourcing directly, we offer transparent GST invoicing and affordable pricing to protect your family and your budget.",
    },
  ];

  return (
    <div className="text-foreground animate-fade-in">
      {/* Hero Header */}
      <section className="relative py-20 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="container mx-auto px-6 relative text-center max-w-3xl">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-brand-orange">About Kamakshi Enterprises</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">Safeguarding India's Homes and Workplaces Since 2008</h2>
          <p className="mt-5 text-white/70 text-lg leading-relaxed text-balance">
            We are more than a protective equipment supplier. We are safety consultants, logistics partners and guardians of the families and workers building India's future.
          </p>
        </div>
      </section>

      {/* Narrative & Statistics */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-navy leading-tight">Our Core Purpose</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Whether it is a chemical refinery in Gujarat, a construction site in New Delhi or a domestic kitchen in a quiet neighborhood, safety hazards are real and present.
              </p>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                At <strong className="font-bold text-navy">Kamakshi Enterprises</strong>, we believe no accident is inevitable. With the right awareness and premium certified protective equipment, environments can reach zero-fatality standards. We source materials that resist extreme impacts, fire and heat to ensure absolute defense.
              </p>
            </div>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="p-5 rounded-xl border bg-card text-center hover:shadow-elegant transition duration-300">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy mb-1">{s.val}</div>
                  <div className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wide leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 bg-muted/40 border-t border-b">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Our Core Values</span>
            <h3 className="text-3xl font-extrabold text-navy mt-3">What drives our operations daily</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="p-7 rounded-xl border bg-card hover:-translate-y-1 transition duration-300 flex flex-col justify-between">
                  <div>
                    <div className="h-11 w-11 rounded-lg bg-navy/5 grid place-items-center text-brand-orange mb-5">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-lg text-navy mb-3">{v.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Safety Compliance Certifications */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h3 className="text-3xl font-extrabold text-navy">Certified and Compliant Gear</h3>
            <p className="text-sm text-muted-foreground mt-2">
              We test all products in certified laboratories to meet national and international regulations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            <div className="p-5 rounded-lg border bg-card flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-navy tracking-tight block">ISI</span>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">IS 15683 / IS 2925</span>
            </div>
            <div className="p-5 rounded-lg border bg-card flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-navy tracking-tight block">BIS</span>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">National Standards</span>
            </div>
            <div className="p-5 rounded-lg border bg-card flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-navy tracking-tight block">EN ISO</span>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">EN ISO 20471 (Hi-Vis)</span>
            </div>
            <div className="p-5 rounded-lg border bg-card flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-navy tracking-tight block">CE</span>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">European Conformity</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
