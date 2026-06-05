import { Search, ShoppingCart, Heart, User, Menu, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const nav = ["Home", "Products", "Categories", "Industries", "About", "Contact"];
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
      <div className="container mx-auto px-6 h-16 md:h-20 flex items-center gap-6">
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="h-10 w-10 rounded-md gradient-fire grid place-items-center shadow-glow">
            <Flame className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-base md:text-lg text-navy">KAMAKSHI</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Enterprises</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-7 ml-4">
          {nav.map((n) => (
            <a key={n} href="#" className="text-sm font-medium text-foreground/80 hover:text-primary transition">{n}</a>
          ))}
        </nav>

        <div className="hidden md:flex flex-1 max-w-md ml-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search helmets, extinguishers, PPE…"
            className="w-full h-10 pl-10 pr-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
          />
        </div>

        <div className="flex items-center gap-1 ml-auto md:ml-0">
          <Button variant="ghost" size="icon" aria-label="Wishlist"><Heart className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" aria-label="Account"><User className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-4 w-4 text-[10px] font-bold rounded-full bg-primary text-primary-foreground grid place-items-center">2</span>
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden"><Menu className="h-5 w-5" /></Button>
        </div>
      </div>
    </header>
  );
}
