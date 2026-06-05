import { Flame, MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const cols = [
    { title: "Shop", links: ["Fire Extinguishers", "Safety Helmets", "Reflective Jackets", "Safety Shoes", "First Aid Kits", "All Categories"] },
    { title: "Company", links: ["About Us", "Mission & Vision", "Certifications", "Careers", "Blog", "Contact"] },
    { title: "Support", links: ["Bulk Inquiries", "Order Tracking", "Returns Policy", "GST Invoice", "FAQs", "Safety Audit"] },
  ];
  return (
    <footer className="bg-charcoal text-white pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] gap-10 pb-14 border-b border-white/10">
          <div>
            <a href="/" className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-md gradient-fire grid place-items-center">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-lg">KAMAKSHI</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">Enterprises</div>
              </div>
            </a>
            <p className="mt-5 text-sm text-white/65 leading-relaxed max-w-sm">India's trusted supplier of industrial safety, fire protection and PPE solutions. Protecting lives across factories, sites and workplaces since 2008.</p>
            <div className="mt-6 space-y-2.5 text-sm text-white/75">
              <p className="flex items-start gap-2.5"><MapPin className="h-4 w-4 mt-0.5 text-brand-orange shrink-0" /> Plot 14, Industrial Area Phase II, New Delhi 110020</p>
              <p className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-brand-orange" /> +91 99999 99999</p>
              <p className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-brand-orange" /> sales@kamakshi.in</p>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white mb-5">{c.title}</h4>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm text-white/65 hover:text-brand-orange transition">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white mb-5">Newsletter</h4>
            <p className="text-sm text-white/65 mb-4">Safety tips, compliance updates and product launches sent once a month.</p>
            <form className="space-y-3">
              <input type="email" required placeholder="your@email.com" className="w-full h-11 px-4 rounded-md bg-white/10 border border-white/15 placeholder:text-white/40 focus:border-brand-orange outline-none text-sm" />
              <Button type="submit" className="w-full gradient-fire border-0 text-white font-semibold h-11">Subscribe</Button>
            </form>
            <div className="mt-6 flex gap-2">
              {[Facebook, Instagram, Linkedin, Twitter].map((I, i) => (
                <a key={i} href="#" className="h-9 w-9 rounded-md bg-white/10 hover:bg-brand-orange grid place-items-center transition" aria-label="Social">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Kamakshi Enterprises. All rights reserved. GSTIN: 07AAACK0000A1Z5</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-brand-orange">Privacy</a>
            <a href="#" className="hover:text-brand-orange">Terms</a>
            <a href="#" className="hover:text-brand-orange">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
