import { useEffect, useRef, useState } from "react";
import { Flame, HardHat, Users, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Flame, value: 48000, suffix: "+", label: "Fire incidents reported in India annually", color: "text-brand-red" },
  { icon: HardHat, value: 1400, suffix: "+", label: "Industrial accidents recorded every year", color: "text-brand-orange" },
  { icon: Users, value: 250000, suffix: "+", label: "Workers protected through our equipment", color: "text-navy" },
  { icon: ShieldCheck, value: 99, suffix: "%", label: "Compliance success across client audits", color: "text-brand-red" },
];

function useCount(target: number, start: boolean, duration = 1800) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setN(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return n;
}

function StatCard({ s, visible }: { s: (typeof stats)[number]; visible: boolean }) {
  const n = useCount(s.value, visible);
  const Icon = s.icon;
  return (
    <div className="relative p-7 rounded-xl bg-card border shadow-product hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 group">
      <div className={`h-12 w-12 rounded-lg bg-muted grid place-items-center mb-5 ${s.color} group-hover:scale-110 transition`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-navy tabular-nums">
        {n.toLocaleString("en-IN")}
        <span className="text-primary">{s.suffix}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-snug">{s.label}</p>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-muted/40">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary">Safety By The Numbers</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-navy">Why workplace safety can't wait.</h2>
          <p className="mt-4 text-muted-foreground text-lg">Every statistic represents a worker, a family, and a business. Equipping your site is the first line of defense.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s) => <StatCard key={s.label} s={s} visible={visible} />)}
        </div>
      </div>
    </section>
  );
}
