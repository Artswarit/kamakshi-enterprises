import { useState } from "react";
import { Search, ShoppingCart, Flame, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  activeTab: "store" | "about" | "contact" | "orders" | "admin";
  setActiveTab: (tab: "store" | "about" | "contact" | "orders" | "admin") => void;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onRequestQuote: () => void;
}

export function Header({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  searchQuery,
  setSearchQuery,
  onRequestQuote,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "store", label: "Storefront" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact Us" },
    { id: "orders", label: "My Orders" },
    { id: "admin", label: "Admin Panel" },
  ];

  const handleNavClick = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b w-full">
      {/* Full width container, no container mx-auto constraints */}
      <div className="w-full px-6 md:px-12 h-16 md:h-20 flex items-center justify-between gap-4">
        
        {/* Left Column: Logo strictly in the far left corner */}
        <div className="flex justify-start shrink-0">
          <button
            onClick={() => handleNavClick("store")}
            className="flex items-center gap-2.5 hover:opacity-90 transition text-left"
          >
            <div className="h-10 w-10 rounded-md gradient-fire grid place-items-center shadow-glow">
              <Flame className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-base md:text-lg text-navy tracking-tight">KAMAKSHI</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Enterprises</div>
            </div>
          </button>
        </div>

        {/* Center Column: Navigation menu centered with high-end typography */}
        <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id as typeof activeTab)}
              className={`text-[11px] uppercase tracking-[0.22em] font-semibold py-1.5 transition-all relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-brand-orange after:transition-all ${
                activeTab === item.id
                  ? "text-brand-orange after:w-full"
                  : "text-foreground/80 hover:text-brand-orange after:w-0 hover:after:w-full"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Column: Search bar and action buttons aligned to the right corner */}
        <div className="flex items-center justify-end gap-3.5 shrink-0">
          {/* Search bar (Desktop) */}
          <div className="hidden md:flex relative flex-1 max-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search safety gear..."
              value={searchQuery}
              onChange={(e) => {
                setActiveTab("store");
                setSearchQuery(e.target.value);
              }}
              className="w-full h-9 pl-9 pr-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-xs transition"
            />
          </div>

          <Button
            onClick={onRequestQuote}
            className="hidden sm:inline-flex bg-navy hover:bg-navy/90 text-white text-xs font-semibold h-9 px-4 rounded-md"
          >
            Request RFQ
          </Button>

          <Button
            onClick={onOpenCart}
            variant="ghost"
            size="icon"
            aria-label="Cart"
            className="relative border bg-muted/20 hover:bg-muted shrink-0"
          >
            <ShoppingCart className="h-5 w-5 text-navy" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-5 w-5 text-[10px] font-bold rounded-full bg-brand-orange text-white grid place-items-center ring-2 ring-background animate-bounce">
                {cartCount}
              </span>
            )}
          </Button>

          {/* Mobile menu trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden border bg-muted/20 shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5 text-navy" /> : <Menu className="h-5 w-5 text-navy" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-card border-b shadow-2xl p-6 space-y-5 animate-slide-down">
          {/* Mobile search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search safety gear..."
              value={searchQuery}
              onChange={(e) => {
                setActiveTab("store");
                setSearchQuery(e.target.value);
              }}
              className="w-full h-10 pl-10 pr-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
            />
          </div>

          <div className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as typeof activeTab)}
                className={`py-2 text-left font-semibold text-sm transition border-b pb-2 ${
                  activeTab === item.id ? "text-primary" : "text-foreground/80 hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <Button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onRequestQuote();
            }}
            className="w-full gradient-fire border-0 text-white font-bold h-11"
          >
            Request B2B RFQ
          </Button>
        </div>
      )}
    </header>
  );
}
