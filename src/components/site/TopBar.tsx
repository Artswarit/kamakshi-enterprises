import { Phone, Mail, Truck, ShieldCheck } from "lucide-react";

export function TopBar() {
  return (
    <div className="hidden md:block bg-navy text-navy-foreground text-xs">
      <div className="container mx-auto px-6 flex items-center justify-between h-9">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-brand-orange" /> ISO 9001 Certified Supplier</span>
          <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-brand-orange" /> Pan-India Delivery</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="tel:+919999999999" className="flex items-center gap-1.5 hover:text-brand-orange transition"><Phone className="h-3.5 w-3.5" /> +91 99999 99999</a>
          <a href="mailto:sales@kamakshi.in" className="flex items-center gap-1.5 hover:text-brand-orange transition"><Mail className="h-3.5 w-3.5" /> sales@kamakshi.in</a>
        </div>
      </div>
    </div>
  );
}
