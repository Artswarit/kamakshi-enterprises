import { useState } from "react";
import { Package, ShieldAlert, Plus, Edit2, Trash2, CheckCircle2, ChevronRight, X, Image as ImageIcon } from "lucide-react";
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

interface Product {
  img: string;
  name: string;
  tag: string;
  price: number;
  desc: string;
  rating: number;
}

interface AdminDashboardProps {
  orders: Order[];
  products: Product[];
  onUpdateOrderStatus: (orderId: string, status: Order["status"]) => void;
  onAddProduct: (p: Product) => void;
  onEditProduct: (originalName: string, updatedP: Product) => void;
  onDeleteProduct: (pName: string) => void;
  onLogout: () => void;
}

export function AdminDashboard({
  orders,
  products,
  onUpdateOrderStatus,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onLogout,
}: AdminDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<"orders" | "products">("orders");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [originalName, setOriginalName] = useState<string>("");
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Form states for adding/editing product
  const [productForm, setProductForm] = useState<Product>({
    img: "",
    name: "",
    tag: "",
    price: 0,
    desc: "",
    rating: 4.5,
  });

  const handleOpenAdd = () => {
    setProductForm({
      img: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=500&auto=format&fit=crop", // Default placeholder Unsplash image
      name: "",
      tag: "ISI Marked",
      price: 150,
      desc: "",
      rating: 4.8,
    });
    setIsAddingProduct(true);
  };

  const handleOpenEdit = (p: Product) => {
    setProductForm({ ...p });
    setOriginalName(p.name);
    setEditingProduct(p);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price || !productForm.desc) {
      toast.error("Please fill in Name, Price, and Description.");
      return;
    }

    if (isAddingProduct) {
      onAddProduct(productForm);
      toast.success(`Product "${productForm.name}" added to catalog.`);
      setIsAddingProduct(false);
    } else if (editingProduct) {
      onEditProduct(originalName, productForm);
      toast.success(`Product "${productForm.name}" updated successfully.`);
      setEditingProduct(null);
    }
  };

  const handleDelete = (pName: string) => {
    if (confirm(`Are you sure you want to delete "${pName}"?`)) {
      onDeleteProduct(pName);
      toast.info(`Deleted "${pName}" from catalog.`);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 min-h-[85vh] text-foreground">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-navy">Kamakshi Admin Workspace</h2>
          <p className="text-muted-foreground text-sm">
            Control center to process wholesale orders, audit GSTINs, and manage safety products.
          </p>
        </div>

        {/* Workspace switch buttons & Logout */}
        <div className="flex items-center gap-3 self-start md:self-center">
          <div className="flex bg-muted p-1 rounded-lg">
            <button
              onClick={() => setActiveSubTab("orders")}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition ${
                activeSubTab === "orders" ? "bg-white text-navy shadow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveSubTab("products")}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition ${
                activeSubTab === "products" ? "bg-white text-navy shadow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Catalog ({products.length})
            </button>
          </div>
          <Button
            variant="outline"
            onClick={onLogout}
            className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-semibold text-xs h-9 px-3.5"
          >
            Log Out
          </Button>
        </div>
      </div>

      {activeSubTab === "orders" ? (
        /* Orders Management Panel */
        <div>
          {orders.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 border border-dashed rounded-xl">
              <ShieldAlert className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-bold text-navy">No Orders Recieved</h3>
              <p className="text-sm text-muted-foreground mt-1">Pending inquiries will appear here for processing.</p>
            </div>
          ) : (
            <div className="bg-card border rounded-xl overflow-x-auto shadow-sm">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b">
                    <th className="px-6 py-4">Order ID & Date</th>
                    <th className="px-6 py-4">B2B Company Info</th>
                    <th className="px-6 py-4">Ordered Items</th>
                    <th className="px-6 py-4">Grand Total (Incl. GST)</th>
                    <th className="px-6 py-4">Process Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {orders.map((o) => {
                    const subtotal = o.items.reduce((s, i) => s + i.price * i.qty, 0);
                    const gst = subtotal * 0.18;
                    const grandTotal = subtotal + gst;

                    return (
                      <tr key={o.id} className="hover:bg-muted/10 transition">
                        <td className="px-6 py-4 align-top">
                          <span className="font-bold text-navy block">{o.id}</span>
                          <span className="text-xs text-muted-foreground">{o.date}</span>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <div className="font-semibold text-navy">{o.companyName}</div>
                          <div className="text-xs text-muted-foreground">GSTIN: {o.gstin || "N/A"}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Contact: {o.contactName} ({o.phone})
                          </div>
                        </td>
                        <td className="px-6 py-4 align-top max-w-xs">
                          <div className="space-y-1 text-xs">
                            {o.items.map((item) => (
                              <div key={item.name} className="truncate">
                                <span className="font-semibold text-navy">{item.qty}x</span> {item.name}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 align-top font-bold text-navy">
                          ₹{grandTotal.toLocaleString("en-IN")}
                        </td>
                        <td className="px-6 py-4 align-top">
                          <select
                            value={o.status}
                            onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as Order["status"])}
                            className="bg-muted border border-muted-foreground/20 rounded px-2.5 py-1.5 text-xs font-semibold text-navy focus:border-primary focus:bg-background outline-none transition cursor-pointer"
                          >
                            <option value="Pending">Pending Review</option>
                            <option value="Approved">GST Approved</option>
                            <option value="Processing">Packing Gear</option>
                            <option value="Shipped">Dispatched</option>
                            <option value="Delivered">Completed</option>
                          </select>
                          <div className="mt-2.5 text-[10px] text-muted-foreground flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Auto-updates tracking
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* Products Catalog Management Panel */
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-navy text-lg">Product Inventory ({products.length} items)</h3>
            <Button onClick={handleOpenAdd} className="gradient-fire border-0 text-white font-semibold text-xs h-9">
              <Plus className="h-4 w-4 mr-1.5" /> Add New Product
            </Button>
          </div>

          <div className="bg-card border rounded-xl overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b">
                  <th className="px-6 py-4">Image & Name</th>
                  <th className="px-6 py-4">Standard Tag</th>
                  <th className="px-6 py-4">Price (Excl. GST)</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {products.map((p) => (
                  <tr key={p.name} className="hover:bg-muted/10 transition">
                    <td className="px-6 py-4 align-middle font-medium max-w-[220px]">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-white border rounded p-1 flex items-center justify-center shrink-0">
                          <img src={p.img} alt={p.name} className="max-h-full object-contain" />
                        </div>
                        <span className="font-bold text-navy truncate block" title={p.name}>
                          {p.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-middle">
                      <span className="text-[10px] font-bold bg-navy text-white px-2 py-0.5 rounded tracking-wide uppercase">
                        {p.tag}
                      </span>
                    </td>
                    <td className="px-6 py-4 align-middle font-bold text-navy">
                      ₹{p.price.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 align-middle text-amber-500 font-semibold">{p.rating} ★</td>
                    <td className="px-6 py-4 align-middle text-xs text-muted-foreground max-w-xs truncate" title={p.desc}>
                      {p.desc}
                    </td>
                    <td className="px-6 py-4 align-middle text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="h-8 w-8 rounded-full hover:bg-muted grid place-items-center text-muted-foreground hover:text-navy transition"
                          title="Edit"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.name)}
                          className="h-8 w-8 rounded-full hover:bg-muted grid place-items-center text-muted-foreground hover:text-brand-red transition"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal overlay for Add / Edit Product */}
      {(isAddingProduct || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-card border shadow-2xl p-6 md:p-8 text-foreground">
            <button
              onClick={() => {
                setIsAddingProduct(false);
                setEditingProduct(null);
              }}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition rounded-full p-1"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold text-navy mb-5">
              {isAddingProduct ? "Add Safety Product" : "Edit Product Details"}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Premium Safety Goggles"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Price (INR ex-GST) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="Price per unit"
                    value={productForm.price || ""}
                    onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full h-10 px-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Standard Tag *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ISI Marked, EN 166"
                    value={productForm.tag}
                    onChange={(e) => setProductForm({ ...productForm, tag: e.target.value })}
                    className="w-full h-10 px-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  placeholder="Unsplash / local image path"
                  value={productForm.img}
                  onChange={(e) => setProductForm({ ...productForm, img: e.target.value })}
                  className="w-full h-10 px-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Product Description *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Summarize product components, certifications, and target safety applications..."
                  value={productForm.desc}
                  onChange={(e) => setProductForm({ ...productForm, desc: e.target.value })}
                  className="w-full p-3 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition resize-none"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddingProduct(false);
                    setEditingProduct(null);
                  }}
                  className="flex-1 border-muted-foreground/30 hover:bg-muted text-foreground text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 gradient-fire border-0 text-white font-semibold text-xs h-10"
                >
                  Save Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
