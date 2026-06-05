import { Package, MapPin, Calendar, Clock, ShieldCheck, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface OrderItem {
  name: string;
  price: number;
  qty: number;
}

interface Order {
  id: string;
  date: string;
  companyName: string;
  gstin: string;
  contactName: string;
  phone: string;
  email: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: "Pending" | "Approved" | "Processing" | "Shipped" | "Delivered";
}

interface OrderTrackingProps {
  orders: Order[];
}

export function OrderTracking({ orders }: OrderTrackingProps) {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Approved":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Processing":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "Shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getStatusStep = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return 1;
      case "Approved":
        return 2;
      case "Processing":
        return 3;
      case "Shipped":
        return 4;
      case "Delivered":
        return 5;
      default:
        return 1;
    }
  };

  const handlePrint = (orderId: string) => {
    toast.info(`Generating receipt for ${orderId}...`);
    setTimeout(() => {
      window.print();
    }, 500);
  };

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="h-16 w-16 bg-muted rounded-full grid place-items-center mb-4 text-muted-foreground">
          <Package className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold text-navy mb-1">No Orders Placed Yet</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Place your first B2B safety equipment inquiry using the storefront catalog.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10 min-h-[80vh] text-foreground">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-navy mb-2">My B2B Orders</h2>
        <p className="text-muted-foreground text-sm mb-8">
          Track the validation, dispatch, and delivery stages of your industrial safety orders.
        </p>

        <div className="space-y-8">
          {orders.map((o) => {
            const step = getStatusStep(o.status);
            const subtotal = o.items.reduce((s, item) => s + item.price * item.qty, 0);
            const gst = subtotal * 0.18;
            const grandTotal = subtotal + gst;

            return (
              <div key={o.id} className="bg-card border rounded-xl shadow-product overflow-hidden">
                {/* Order Meta Header */}
                <div className="bg-muted/30 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Order ID</span>
                    <h3 className="font-bold text-navy text-lg">{o.id}</h3>
                  </div>
                  <div className="flex gap-4">
                    <div className="space-y-1 text-left sm:text-right">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Order Date</span>
                      <p className="text-sm font-medium flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {o.date}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Status</span>
                      <div>
                        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${getStatusColor(o.status)}`}>
                          {o.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar timeline */}
                <div className="p-6 border-b bg-card">
                  <div className="relative flex justify-between items-center max-w-2xl mx-auto mt-2 mb-6">
                    {/* Connecting line */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-muted w-full -z-10" />
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-orange -z-10 transition-all duration-500"
                      style={{ width: `${((step - 1) / 4) * 100}%` }}
                    />

                    {/* Timeline nodes */}
                    {[
                      { s: "Pending", label: "Inquiry Submitted" },
                      { s: "Approved", label: "GST Verified" },
                      { s: "Processing", label: "Packing Gear" },
                      { s: "Shipped", label: "Dispatched" },
                      { s: "Delivered", label: "Completed" },
                    ].map((node, i) => {
                      const active = i + 1 <= step;
                      return (
                        <div key={node.s} className="flex flex-col items-center">
                          <div
                            className={`h-7 w-7 rounded-full grid place-items-center text-xs font-bold transition-all duration-300 ${
                              active ? "bg-brand-orange text-white ring-4 ring-brand-orange/20" : "bg-muted text-muted-foreground border"
                            }`}
                          >
                            {i + 1}
                          </div>
                          <span
                            className={`text-[10px] font-semibold mt-2 text-center hidden md:block ${
                              active ? "text-navy" : "text-muted-foreground"
                            }`}
                          >
                            {node.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Main details & items list */}
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  {/* Left Column: B2B billing and Shipping details */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-2 flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-brand-orange" /> B2B Registration
                      </h4>
                      <div className="text-sm space-y-1">
                        <p className="font-bold text-navy">{o.companyName}</p>
                        {o.gstin ? (
                          <p className="text-xs text-muted-foreground">GSTIN: <span className="font-semibold text-foreground">{o.gstin}</span></p>
                        ) : (
                          <p className="text-xs text-muted-foreground">GSTIN: Not Provided</p>
                        )}
                        <p className="text-xs text-muted-foreground">Invoiced to: {o.contactName} ({o.email})</p>
                        <p className="text-xs text-muted-foreground">Phone: {o.phone}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-2 flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-brand-orange" /> Delivery Address
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed bg-muted/40 p-3 rounded-md border border-dashed">
                        {o.address}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Ordered Items Table & Print invoice button */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-3 flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-brand-orange" /> Order Summary
                      </h4>
                      <div className="divide-y text-sm">
                        {o.items.map((item) => (
                          <div key={item.name} className="flex justify-between py-2 items-center">
                            <div className="min-w-0 flex-1 pr-3">
                              <p className="font-semibold text-navy truncate text-xs">{item.name}</p>
                              <p className="text-[10px] text-muted-foreground">Qty: {item.qty} × ₹{item.price.toLocaleString("en-IN")}</p>
                            </div>
                            <span className="font-semibold text-navy text-xs">₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-3 mt-3 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal:</span>
                          <span className="font-medium text-navy">₹{subtotal.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">GST (18%):</span>
                          <span className="font-medium text-navy">₹{gst.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold border-t pt-1.5">
                          <span className="text-navy">Grand Total:</span>
                          <span className="text-navy">₹{grandTotal.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        variant="outline"
                        onClick={() => handlePrint(o.id)}
                        className="w-full border-navy text-navy hover:bg-navy hover:text-white font-semibold h-10"
                      >
                        <Printer className="h-4 w-4 mr-2" /> Print B2B Order Receipt
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
