import { X, Shield, Star, ShoppingCart, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  img: string;
  name: string;
  tag: string;
  price: number;
  desc: string;
  rating: number;
}

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onRequestQuote: (pName: string) => void;
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onRequestQuote,
}: ProductDetailModalProps) {
  if (!isOpen || !product) return null;

  // Mock specifications based on product category/name
  const getSpecs = (name: string) => {
    if (name.includes("Extinguisher")) {
      return [
        { label: "Capacity", val: "6 kg" },
        { label: "Type", val: "ABC Dry Powder (Stored Pressure)" },
        { label: "Certification", val: "IS 15683 (ISI Marked)" },
        { label: "Fire Rating", val: "3A, 21B" },
        { label: "Working Pressure", val: "15 Bar" },
      ];
    }
    if (name.includes("Helmet")) {
      return [
        { label: "Material", val: "High-Density Polyethylene (HDPE)" },
        { label: "Suspension", val: "6-Point Ratchet Suspension" },
        { label: "Certification", val: "IS 2925 : 1984 Certified" },
        { label: "Weight", val: "380 grams" },
        { label: "Features", val: "Ventilated slot, Chin strap included" },
      ];
    }
    if (name.includes("Jacket")) {
      return [
        { label: "Material", val: "120 GSM Breathable Polyester Mesh" },
        { label: "Reflective Tape", val: "5cm high-visibility glass bead tape" },
        { label: "Certification", val: "EN ISO 20471 Class 2" },
        { label: "Closure", val: "Heavy-duty Velcro / Zipper front" },
        { label: "Pockets", val: "4 functional front pockets" },
      ];
    }
    if (name.includes("Boots")) {
      return [
        { label: "Toe Cap", val: "200J Impact-Resistant Steel Toe" },
        { label: "Upper Material", val: "Genuine Barton Grain Leather" },
        { label: "Sole", val: "Double Density Polyurethane (PU) Sole" },
        { label: "Certification", val: "IS 15298 (Part 2) : 2016" },
        { label: "Protection", val: "Slip-resistant, Oil-resistant, Anti-static" },
      ];
    }
    return [
      { label: "Quality Grade", val: "Industrial / Commercial Grade" },
      { label: "Compliance", val: "BIS Certified Standards" },
      { label: "Bulk Packing", val: "Secure master cartons" },
      { label: "Warranty", val: "1-year manufacturer warranty" },
    ];
  };

  const specs = getSpecs(product.name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-2xl bg-card border shadow-2xl overflow-hidden animate-scale-up text-foreground">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-muted-foreground hover:text-foreground transition rounded-full p-1.5 hover:bg-muted"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Panel */}
          <div className="bg-white p-8 flex items-center justify-center border-r">
            <img
              src={product.img}
              alt={product.name}
              className="max-h-[300px] object-contain hover:scale-105 transition duration-300"
            />
          </div>

          {/* Product Details Panel */}
          <div className="p-6 md:p-8 flex flex-col justify-between h-[450px] md:h-auto overflow-y-auto">
            <div>
              <span className="inline-block text-[10px] font-bold tracking-wider uppercase bg-navy text-white px-2.5 py-1 rounded mb-3">
                {product.tag}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-navy leading-snug">{product.name}</h3>

              <div className="flex items-center gap-1.5 text-amber-500 text-sm mt-2 mb-4">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground ml-1">(120+ Verified Purchases)</span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{product.desc}</p>

              {/* Technical Specifications */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-navy mb-3 flex items-center gap-1.5 border-b pb-1.5">
                  <Shield className="h-4 w-4 text-brand-orange" /> Technical Specifications
                </h4>
                <div className="space-y-2">
                  {specs.map((s) => (
                    <div key={s.label} className="grid grid-cols-2 text-xs">
                      <span className="text-muted-foreground font-medium">{s.label}:</span>
                      <span className="text-navy font-semibold text-right sm:text-left">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-bold text-navy">₹{product.price.toLocaleString("en-IN")}</span>
                <span className="text-xs text-muted-foreground">/ unit (Excl. GST)</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <Button
                  onClick={() => {
                    onAddToCart(product);
                  }}
                  className="flex-1 gradient-fire border-0 text-white font-semibold h-11"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" /> Add to Inquiry
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    onClose();
                    onRequestQuote(product.name);
                  }}
                  className="border-navy text-navy hover:bg-navy hover:text-white font-semibold h-11"
                >
                  <Send className="h-4 w-4 mr-2" /> Get Bulk Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
