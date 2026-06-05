import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { TopBar } from "@/components/site/TopBar";
import { Header } from "@/components/site/Header";
import { HeroSlider } from "@/components/site/HeroSlider";
import { Stats } from "@/components/site/Stats";
import { Categories } from "@/components/site/Categories";
import { FeaturedProducts } from "@/components/site/FeaturedProducts";
import { Industries } from "@/components/site/Industries";
import { WhyChoose } from "@/components/site/WhyChoose";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";

import { CartDrawer } from "@/components/site/CartDrawer";
import { ProductDetailModal } from "@/components/site/ProductDetailModal";
import { QuoteModal } from "@/components/site/QuoteModal";
import { OrderTracking } from "@/components/site/OrderTracking";
import { AdminDashboard } from "@/components/site/AdminDashboard";
import { AdminLogin } from "@/components/site/AdminLogin";
import { AboutUs } from "@/components/site/AboutUs";
import { ContactUs } from "@/components/site/ContactUs";
import { StorySection } from "@/components/site/StorySection";
import { toast } from "sonner";

// Import product images
import ext from "@/assets/prod-extinguisher.jpg";
import hel from "@/assets/prod-helmet.jpg";
import jac from "@/assets/prod-jacket.jpg";
import boo from "@/assets/prod-boots.jpg";
import glo from "@/assets/prod-gloves.jpg";
import alm from "@/assets/prod-alarm.jpg";
import escapeImg from "@/assets/real-escape-ladder.jpg";

interface Product {
  img: string;
  name: string;
  tag: string;
  price: number;
  desc: string;
  rating: number;
}

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

const defaultProducts: Product[] = [
  { img: escapeImg, name: "Emergency Fire Escape Ladder 5m", tag: "Home Safety", price: 2850, desc: "Tangle-free roll-out escape ladder for rapid two-story window escapes. Features solid steel rungs and weather-resistant nylon webbing.", rating: 4.8 },
  { img: ext, name: "Home Powder Fire Extinguisher 2kg", tag: "Home Safety", price: 980, desc: "Compact fire extinguisher designed for kitchen, car and home electrical fires. Includes quick mounting bracket.", rating: 4.8 },
  { img: alm, name: "LPG Gas Leak Alarm with Voice Warning", tag: "Kitchen Safety", price: 1450, desc: "Highly sensitive gas detector that sounds an 85dB alarm and voice alert when LPG or PNG leaks occur in domestic kitchens.", rating: 4.9 },
  { img: ext, name: "ABC Dry Powder Fire Extinguisher 6kg", tag: "ISI Marked", price: 2450, desc: "Multi-purpose industrial extinguisher for Class A, B and C fires. Solid pressure-tested steel cylinder.", rating: 4.8 },
  { img: hel, name: "Industrial Safety Helmet (HDPE)", tag: "IS 2925", price: 285, desc: "Heavy-duty ratchet suspension, shock-absorbent shell and ventilated comfort liner for site workers.", rating: 4.7 },
  { img: jac, name: "Hi-Vis Reflective Safety Jacket", tag: "EN ISO 20471", price: 320, desc: "Breathable polyester mesh with high-visibility reflective bands for road and construction site labor.", rating: 4.9 },
  { img: boo, name: "Steel-Toe Safety Boots", tag: "IS 15298", price: 1890, desc: "Genuine leather boots featuring 200J steel toe impact protection, anti-slip soles and sweat-absorbent lining.", rating: 4.6 },
  { img: glo, name: "Cut-Resistant Industrial Gloves", tag: "EN 388 Level 5", price: 245, desc: "Flexible HPPE fibers with a sandy nitrile grip coating to prevent cuts and scrapes in factory settings.", rating: 4.8 },
  { img: alm, name: "Kitchen Smoke and Heat Alarm", tag: "BIS Certified", price: 850, desc: "Dual smoke and temperature rise sensor designed to alert households before kitchen flames spread.", rating: 4.7 },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kamakshi Enterprises | Safety & Fire Protection Equipment India" },
      { name: "description", content: "Trusted manufacturer and supplier of safety equipment, fire extinguishers, LPG alarms, helmets, jackets and fire warning detectors across India." },
      { property: "og:title", content: "Kamakshi Enterprises | Safety & Fire Protection" },
      { property: "og:description", content: "Trusted safety supplies for Indian homes, factories, warehouses and commercial offices. Certified protection." },
    ],
  }),
  component: Home,
});

function Home() {
  const [activeTab, setActiveTab] = useState<"store" | "about" | "contact" | "orders" | "admin">("store");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<{ img: string; name: string; price: number; qty: number }[]>([]);

  // Modals / Drawer state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteDefaultProduct, setQuoteDefaultProduct] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("ke_products");
    if (savedProducts) {
      const parsed: Product[] = JSON.parse(savedProducts);
      // Ensure all standard product images are resolved to local assets if localstorage already exists
      const updated = parsed.map(p => {
        const name = p.name.toLowerCase();
        if (name.includes("ladder")) return { ...p, img: escapeImg };
        if (name.includes("extinguisher")) return { ...p, img: ext };
        if (name.includes("lpg gas leak") || name.includes("smoke and heat") || name.includes("alarm") || name.includes("detector")) {
          return { ...p, img: alm };
        }
        if (name.includes("helmet")) return { ...p, img: hel };
        if (name.includes("jacket")) return { ...p, img: jac };
        if (name.includes("boots") || name.includes("shoes")) return { ...p, img: boo };
        if (name.includes("gloves")) return { ...p, img: glo };
        return p;
      });
      setProducts(updated);
      localStorage.setItem("ke_products", JSON.stringify(updated));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem("ke_products", JSON.stringify(defaultProducts));
    }

    const savedOrders = localStorage.getItem("ke_orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    const savedCart = localStorage.getItem("ke_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedAdminAuth = localStorage.getItem("ke_admin_auth");
    if (savedAdminAuth === "true") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Sync state modifications to localStorage
  const syncProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem("ke_products", JSON.stringify(updatedProducts));
  };

  const syncOrders = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    localStorage.setItem("ke_orders", JSON.stringify(updatedOrders));
  };

  const syncCart = (updatedCart: typeof cart) => {
    setCart(updatedCart);
    localStorage.setItem("ke_cart", JSON.stringify(updatedCart));
  };

  // Cart operations
  const handleAddToCart = (p: Product) => {
    const existing = cart.find((item) => item.name === p.name);
    let newCart;
    if (existing) {
      newCart = cart.map((item) =>
        item.name === p.name ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      newCart = [...cart, { img: p.img, name: p.name, price: p.price, qty: 1 }];
    }
    syncCart(newCart);
  };

  const handleUpdateQty = (name: string, qty: number) => {
    const newCart = cart.map((item) =>
      item.name === name ? { ...item, qty } : item
    );
    syncCart(newCart);
  };

  const handleRemoveCartItem = (name: string) => {
    const newCart = cart.filter((item) => item.name !== name);
    syncCart(newCart);
  };

  const handleClearCart = () => {
    syncCart([]);
  };

  // Order placement
  const handlePlaceOrder = (details: {
    companyName: string;
    gstin: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
  }) => {
    const orderItems: OrderItem[] = cart.map((item) => ({
      name: item.name,
      price: item.price,
      qty: item.qty,
    }));

    const newOrder: Order = {
      id: `KE-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      companyName: details.companyName,
      gstin: details.gstin,
      contactName: details.contactName,
      phone: details.phone,
      email: details.email,
      address: details.address,
      items: orderItems,
      total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      status: "Pending",
    };

    const newOrders = [newOrder, ...orders];
    syncOrders(newOrders);
    setActiveTab("orders"); // Auto-redirect to tracking
  };

  // Admin callbacks
  const handleUpdateOrderStatus = (orderId: string, status: Order["status"]) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    syncOrders(updated);
  };

  const handleAddProduct = (p: Product) => {
    const updated = [p, ...products];
    syncProducts(updated);
  };

  const handleEditProduct = (originalName: string, updatedP: Product) => {
    const updated = products.map((p) => (p.name === originalName ? updatedP : p));
    syncProducts(updated);
  };

  const handleDeleteProduct = (pName: string) => {
    const updated = products.filter((p) => p.name !== pName);
    syncProducts(updated);
  };

  // Auth processing
  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem("ke_admin_auth", "true");
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("ke_admin_auth");
    setActiveTab("store");
    toast.info("Logged out from admin session.");
  };

  // Modals triggers
  const handleOpenRFQ = (productName = "") => {
    setQuoteDefaultProduct(productName);
    setIsQuoteOpen(true);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveCategory("");
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onRequestQuote={() => handleOpenRFQ()}
      />

      <main>
        {activeTab === "store" && (
          <>
            <HeroSlider onRequestQuote={() => handleOpenRFQ()} />
            <Stats />
            
            {/* Relocated Incident safety awareness story section with local real escape ladder photo */}
            <StorySection
              onProductClick={() => {
                const ladder = products.find((p) => p.name.toLowerCase().includes("ladder"));
                if (ladder) {
                  setSelectedProduct(ladder);
                } else {
                  handleClearFilters();
                  setSearchQuery("Ladder");
                }
              }}
            />

            <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <FeaturedProducts
              products={products}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onAddToCart={handleAddToCart}
              onProductClick={(p) => setSelectedProduct(p)}
              onClearFilters={handleClearFilters}
            />
            <Industries />
            <WhyChoose />
            <CtaBanner onRequestQuote={() => handleOpenRFQ()} />
          </>
        )}

        {activeTab === "about" && <AboutUs />}

        {activeTab === "contact" && <ContactUs />}

        {activeTab === "orders" && <OrderTracking orders={orders} />}

        {activeTab === "admin" && (
          isAdminLoggedIn ? (
            <AdminDashboard
              orders={orders}
              products={products}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onAddProduct={handleAddProduct}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
              onLogout={handleAdminLogout}
            />
          ) : (
            <AdminLogin onLoginSuccess={handleAdminLogin} />
          )
        )}
      </main>

      <Footer />
      <WhatsAppFab />

      {/* Floating Drawers & Overlays */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
      />

      <ProductDetailModal
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p) => {
          handleAddToCart(p);
          setSelectedProduct(null);
        }}
        onRequestQuote={(pName) => handleOpenRFQ(pName)}
      />

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultProduct={quoteDefaultProduct}
      />
    </div>
  );
}
