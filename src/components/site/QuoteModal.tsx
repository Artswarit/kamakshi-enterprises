import { useState } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export function QuoteModal({ isOpen, onClose, defaultProduct }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    product: defaultProduct || "",
    quantity: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contactName || !formData.email || !formData.phone || !formData.quantity) {
      toast.error("Please fill in all required fields.");
      return;
    }

    toast.success("Quote request submitted successfully! Our sales team will respond within 4 hours.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-card border shadow-2xl p-6 md:p-8 animate-scale-up text-foreground">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition rounded-full p-1 hover:bg-muted"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="text-2xl font-bold text-navy mb-1">Request a Bulk Quote</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Provide your project requirements for wholesale pricing, GST invoicing, and dispatch estimates.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Company Name
              </label>
              <input
                type="text"
                placeholder="e.g. ABC Projects Pvt Ltd"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full h-10 px-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Contact Name <span className="text-brand-red">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Your full name"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full h-10 px-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Email Address <span className="text-brand-red">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-10 px-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Mobile Number <span className="text-brand-red">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full h-10 px-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Product / Requirement
              </label>
              <input
                type="text"
                placeholder="Product or Category"
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                className="w-full h-10 px-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Target Quantity <span className="text-brand-red">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder="Minimum order units"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full h-10 px-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Additional Requirements
            </label>
            <textarea
              rows={3}
              placeholder="List specific sizes, certifications (ISI/CE), customization, or shipping constraints..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition resize-none"
            />
          </div>

          <Button type="submit" className="w-full gradient-fire border-0 text-white font-semibold h-11">
            <Send className="mr-2 h-4 w-4" /> Send Request
          </Button>
        </form>
      </div>
    </div>
  );
}
