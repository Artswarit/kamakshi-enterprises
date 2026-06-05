import { useState, useEffect, useRef } from "react";
import { Heart, ShoppingCart, Star, Eye, Search, X, Loader2, Clock, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  img: string;
  name: string;
  tag: string;
  price: number;
  desc: string;
  rating: number;
}

interface FeaturedProductsProps {
  products: Product[];
  searchQuery: string;
  setSearchQuery?: (q: string) => void;
  activeCategory: string;
  setActiveCategory?: (c: string) => void;
  onAddToCart: (p: Product) => void;
  onProductClick: (p: Product) => void;
  onClearFilters: () => void;
}

const categoryList = [
  "Fire Extinguishers",
  "Safety Helmets",
  "Reflective Jackets",
  "Safety Gloves",
  "Safety Shoes",
  "Fire Alarm Systems",
  "Smoke Detectors",
  "First Aid Kits",
  "Fall Protection",
  "Safety Sign Boards",
  "Respiratory Equipment",
];

const popularTags = ["Home Safety", "Kitchen Safety", "ISI Marked", "IS 2925"];
const popularSearches = [
  "Emergency Fire Escape Ladder",
  "LPG Gas Leak Alarm",
  "ABC Dry Powder Fire Extinguisher",
  "Industrial Safety Helmet",
];

export function FeaturedProducts({
  products,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  onAddToCart,
  onProductClick,
  onClearFilters,
}: FeaturedProductsProps) {
  // Infinite scroll states
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Suggestion UX states
  const [isDropdownFocused, setIsDropdownFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Helper to map active category selection to product characteristics
  const matchesCategory = (product: Product, category: string) => {
    if (!category) return true;
    const name = product.name.toLowerCase();
    const tag = product.tag.toLowerCase();
    const cat = category.toLowerCase();

    if (cat.includes("extinguisher")) return name.includes("extinguisher");
    if (cat.includes("helmet")) return name.includes("helmet") || tag.includes("2925");
    if (cat.includes("jacket")) return name.includes("jacket") || tag.includes("20471");
    if (cat.includes("boots") || cat.includes("shoes")) return name.includes("boots") || name.includes("shoes") || tag.includes("15298");
    if (cat.includes("gloves")) return name.includes("gloves") || tag.includes("388");
    if (cat.includes("detector") || cat.includes("alarm")) return name.includes("detector") || name.includes("alarm");
    if (cat.includes("first aid")) return name.includes("aid") || name.includes("first");
    if (cat.includes("fall")) return name.includes("harness") || name.includes("belt") || name.includes("fall");
    if (cat.includes("sign")) return name.includes("sign") || name.includes("board");
    if (cat.includes("respiratory")) return name.includes("mask") || name.includes("respirator");

    return name.includes(cat) || tag.includes(cat);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tag.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = matchesCategory(p, activeCategory);

    return matchesSearch && matchesCat;
  });

  // Reset infinite scroll pagination when filters change
  useEffect(() => {
    setVisibleCount(6);
  }, [searchQuery, activeCategory]);

  // Click outside suggestion dropdown handler
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownFocused(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observerTarget = loadMoreRef.current;
    if (!observerTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoadingMore && filteredProducts.length > visibleCount) {
          setIsLoadingMore(true);
          // 700ms artificial network load delay for simulated premium infinite scroll
          setTimeout(() => {
            setVisibleCount((prev) => prev + 6);
            setIsLoadingMore(false);
          }, 700);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerTarget);
    return () => observer.disconnect();
  }, [isLoadingMore, filteredProducts.length, visibleCount]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  // Suggestion results calculation
  const getSuggestions = () => {
    if (!searchQuery) {
      return {
        products: products.slice(0, 3),
        categories: categoryList.slice(0, 4),
      };
    }
    const query = searchQuery.toLowerCase();
    const matchedProducts = products.filter((p) => p.name.toLowerCase().includes(query)).slice(0, 4);
    const matchedCategories = categoryList.filter((c) => c.toLowerCase().includes(query)).slice(0, 3);
    return { products: matchedProducts, categories: matchedCategories };
  };

  const suggestions = getSuggestions();

  const handleSuggestionClick = (type: "search" | "category" | "product", value: any) => {
    if (type === "search") {
      setSearchQuery?.(value);
    } else if (type === "category") {
      setActiveCategory?.(value);
    } else if (type === "product") {
      onProductClick(value);
    }
    setIsDropdownFocused(false);
  };

  return (
    <section id="products" className="py-20 md:py-28 bg-muted/40 scroll-mt-24">
      <div className="container mx-auto px-6">
        {/* Title and Controls Header */}
        <div className="flex flex-col gap-8 mb-12 border-b pb-8">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div className="max-w-xl">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary">Safety Catalog</span>
              <h2 className="mt-3 text-3xl md:text-5xl font-bold text-navy">
                {activeCategory ? `${activeCategory}` : "All Safety Products"}
              </h2>
              {(searchQuery || activeCategory) && (
                <p className="text-xs text-muted-foreground mt-2">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              )}
            </div>
            {(searchQuery || activeCategory) && (
              <button
                onClick={onClearFilters}
                className="text-sm font-semibold text-brand-orange hover:underline cursor-pointer flex items-center gap-1"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Interactive Search & Category filters directly in the catalog */}
          <div className="flex flex-col xl:flex-row gap-5 items-stretch xl:items-center justify-between">
            {/* Search Input Box with Autocomplete Suggestion Dropdown */}
            <div className="relative flex-1 max-w-lg z-20" ref={dropdownRef}>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products by name, tag, or standard..."
                  value={searchQuery}
                  onFocus={() => setIsDropdownFocused(true)}
                  onChange={(e) => setSearchQuery?.(e.target.value)}
                  className="w-full h-11 pl-11 pr-10 rounded-lg bg-background border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15 outline-none text-sm transition shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery?.("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-muted p-1 rounded-full transition"
                    aria-label="Clear Search"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>

              {/* Enhanced Autocomplete Suggestions Dropdown */}
              {isDropdownFocused && (
                <div className="absolute left-0 right-0 mt-2 bg-card border rounded-xl shadow-elegant max-h-[380px] overflow-y-auto overflow-hidden animate-slide-fade">
                  {/* Empty query state suggestions */}
                  {!searchQuery ? (
                    <div className="p-4 space-y-4 text-left">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground block mb-2">Popular Searches</span>
                        <div className="space-y-1.5">
                          {popularSearches.map((term) => (
                            <button
                              key={term}
                              onClick={() => handleSuggestionClick("search", term)}
                              className="w-full text-left text-xs text-foreground/80 hover:text-brand-orange hover:bg-muted/50 py-1.5 px-2.5 rounded transition flex items-center gap-2"
                            >
                              <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground block mb-2">Quick Tags</span>
                        <div className="flex flex-wrap gap-1.5">
                          {popularTags.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => handleSuggestionClick("search", tag)}
                              className="text-xs bg-muted hover:bg-brand-orange/10 hover:text-brand-orange px-2.5 py-1 rounded-full border transition flex items-center gap-1 cursor-pointer"
                            >
                              <Sparkles className="h-3 w-3 text-brand-orange shrink-0" />
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Search keyword matching results */
                    <div className="p-3 text-left space-y-3.5">
                      {suggestions.categories.length > 0 && (
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground block px-2 mb-1.5">Suggested Categories</span>
                          <div className="space-y-0.5">
                            {suggestions.categories.map((cat) => (
                              <button
                                key={cat}
                                onClick={() => handleSuggestionClick("category", cat)}
                                className="w-full text-left text-xs font-semibold text-navy hover:text-brand-orange hover:bg-muted/50 py-1.5 px-2.5 rounded transition flex items-center justify-between"
                              >
                                <span>{cat}</span>
                                <ChevronRight className="h-3 w-3 text-muted-foreground" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground block px-2 mb-1.5">Suggested Products</span>
                        {suggestions.products.length > 0 ? (
                          <div className="space-y-0.5">
                            {suggestions.products.map((prod) => (
                              <button
                                key={prod.name}
                                onClick={() => handleSuggestionClick("product", prod)}
                                className="w-full text-left text-xs text-foreground/80 hover:text-brand-orange hover:bg-muted/50 py-2 px-2.5 rounded transition flex items-center justify-between border-b border-border/40 last:border-0"
                              >
                                <div className="flex items-center gap-2.5">
                                  <img src={prod.img} alt="" className="h-7 w-7 rounded bg-white object-contain border p-0.5 shrink-0" />
                                  <span className="font-medium line-clamp-1">{prod.name}</span>
                                </div>
                                <span className="text-[10px] font-bold text-navy bg-muted px-1.5 py-0.5 rounded shrink-0">₹{prod.price}</span>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground px-2 block">No matching products found.</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Category pills row (horizontal scroll on mobile, scrollbar hidden, fading edges) */}
            <div className="relative flex-1 max-w-full xl:max-w-2xl">
              {/* Left/Right fading indicators */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-muted/40 to-transparent pointer-events-none z-10 block xl:hidden" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-muted/40 to-transparent pointer-events-none z-10 block xl:hidden" />

              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none justify-start xl:justify-end -mx-6 px-6 xl:mx-0 xl:px-0">
                <button
                  onClick={() => setActiveCategory?.("")}
                  className={`h-9 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap border cursor-pointer ${
                    !activeCategory
                      ? "bg-navy border-navy text-white shadow-md"
                      : "bg-background border-border text-navy hover:border-brand-orange hover:text-brand-orange"
                  }`}
                >
                  All Products
                </button>
                {categoryList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory?.(cat)}
                    className={`h-9 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap border cursor-pointer ${
                      activeCategory === cat
                        ? "bg-brand-orange border-brand-orange text-white shadow-md"
                        : "bg-background border-border text-navy hover:border-brand-orange hover:text-brand-orange"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-background border rounded-xl shadow-xs">
            <h4 className="font-bold text-navy text-lg mb-1">No products match your criteria</h4>
            <p className="text-sm text-muted-foreground mb-4">Try checking your spelling or clearing filters.</p>
            <Button onClick={onClearFilters} variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              Reset Catalog View
            </Button>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
              {displayedProducts.map((p) => (
                <article
                  key={p.name}
                  className="group bg-card rounded-xl border overflow-hidden hover:shadow-elegant transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image header */}
                  <div
                    onClick={() => onProductClick(p)}
                    className="relative aspect-square bg-white overflow-hidden cursor-pointer"
                  >
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      width={800}
                      height={800}
                      className="h-full w-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase bg-navy text-white px-2.5 py-1 rounded">
                      {p.tag}
                    </span>
                    
                    {/* Hover action overlay */}
                    <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/90 text-navy font-bold text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-3 group-hover:translate-y-0 transition-transform">
                        <Eye className="h-4 w-4" /> Quick View
                      </div>
                    </div>
                  </div>

                  {/* Details body */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-card">
                    <div>
                      <div className="flex items-center gap-1 text-amber-500 text-xs mb-2">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span className="font-semibold">{p.rating}</span>
                        <span className="text-muted-foreground ml-1">(120+ reviews)</span>
                      </div>
                      <h3
                        onClick={() => onProductClick(p)}
                        className="font-semibold text-navy leading-snug group-hover:text-primary transition line-clamp-2 cursor-pointer text-sm sm:text-base"
                      >
                        {p.name}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2">{p.desc}</p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t pt-4">
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Starting at</div>
                        <div className="text-lg sm:text-xl font-bold text-navy">
                          ₹{p.price.toLocaleString("en-IN")}
                        </div>
                      </div>
                      <Button
                        onClick={() => onAddToCart(p)}
                        size="sm"
                        className="gradient-fire border-0 text-white text-xs font-semibold h-9 px-3.5"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1.5" /> Add
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Simulated Infinite Scroll trigger */}
            {filteredProducts.length > visibleCount && (
              <div ref={loadMoreRef} className="py-8 flex flex-col items-center justify-center gap-2">
                {isLoadingMore ? (
                  <div className="flex items-center gap-2 text-navy text-sm font-semibold">
                    <Loader2 className="h-5 w-5 animate-spin text-brand-orange" />
                    <span>Loading more safety products...</span>
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground">
                    Scroll down or swipe to load more products ({filteredProducts.length - visibleCount} remaining)
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
