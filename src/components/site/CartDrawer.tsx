import { useState } from "react";
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CartItem {
  img: string;
  name: string;
  price: number;
  qty: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (name: string, qty: number) => void;
  onRemoveItem: (name: string) => void;
  onClearCart: () => void;
  onPlaceOrder: (orderDetails: {
    companyName: string;
    gstin: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
  }) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    gstin: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
  });

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = total * 0.18; // Standard 18% GST for industrial safety goods
  const grandTotal = total + gst;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone || !formData.address) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Optional GST validation (simple format check for demo)
    if (formData.gstin && formData.gstin.length !== 15) {
      toast.error("GSTIN must be a 15-character alphanumeric code.");
      return;
    }

    onPlaceOrder(formData);
    toast.success("Order request created! View details in 'My Orders'.");
    onClearCart();
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-card border-l flex flex-col text-foreground shadow-2xl animate-slide-in">
          {/* Header */}
          <div className="px-6 py-5 border-b flex items-center justify-between">
            {isCheckingOut ? (
              <button
                onClick={() => setIsCheckingOut(false)}
                className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition"
              >
                <ChevronLeft className="h-4 w-4" /> Back to Cart
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-brand-orange" />
                <h3 className="text-lg font-bold text-navy">Inquiry Basket</h3>
              </div>
            )}
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition rounded-full p-1">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="h-20 w-20 rounded-full bg-muted grid place-items-center mb-4">
                  <ShoppingBag className="h-9 w-9 text-muted-foreground" />
                </div>
                <h4 className="font-bold text-navy text-lg mb-1">Your basket is empty</h4>
                <p className="text-sm text-muted-foreground max-w-[240px]">
                  Explore industrial products and add them here to request quotes.
                </p>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form */
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4 py-2">
                <h4 className="font-bold text-navy text-base mb-2">B2B Company Details</h4>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Company Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kamakshi Steel Works"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full h-10 px-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    GSTIN Number (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="15-digit GST Registration"
                    maxLength={15}
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                    className="w-full h-10 px-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
                  />
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">
                    Required for claiming Input Tax Credit (ITC).
                  </span>
                </div>

                <hr className="border-muted" />
                <h4 className="font-bold text-navy text-base mb-2">Delivery & Contact</h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contact name"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full h-10 px-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="99999 99999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-10 px-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Email Address *
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Shipping & Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Complete delivery address, city, state & pincode..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition resize-none"
                  />
                </div>
              </form>
            ) : (
              /* Item List */
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.name} className="flex gap-4 border-b pb-4">
                    <div className="h-16 w-16 bg-white p-2 border rounded-md shrink-0 flex items-center justify-center">
                      <img src={item.img} alt={item.name} className="max-h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-navy truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">₹{item.price.toLocaleString("en-IN")} / unit</p>
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => onUpdateQty(item.name, Math.max(1, item.qty - 1))}
                            className="px-2.5 py-1 text-sm bg-muted hover:bg-muted/80 transition"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-semibold select-none">{item.qty}</span>
                          <button
                            onClick={() => onUpdateQty(item.name, item.qty + 1)}
                            className="px-2.5 py-1 text-sm bg-muted hover:bg-muted/80 transition"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.name)}
                          className="text-muted-foreground hover:text-brand-red p-1 transition"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Panel */}
          {cart.length > 0 && (
            <div className="px-6 py-5 border-t bg-muted/30">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items Subtotal:</span>
                  <span className="font-semibold text-navy">₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated GST (18%):</span>
                  <span className="font-semibold text-navy">₹{gst.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-base border-t pt-2 mt-2">
                  <span className="font-bold text-navy">Grand Total (Incl. GST):</span>
                  <span className="font-extrabold text-navy text-lg">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {isCheckingOut ? (
                <Button
                  type="submit"
                  form="checkout-form"
                  className="w-full gradient-fire border-0 text-white font-bold h-12 rounded-lg"
                >
                  <ShieldCheck className="h-5 w-5 mr-2" /> Confirm B2B Order
                </Button>
              ) : (
                <Button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full gradient-fire border-0 text-white font-bold h-12 rounded-lg flex items-center justify-center"
                >
                  Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
