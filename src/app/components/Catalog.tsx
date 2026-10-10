import { useState, useMemo, useEffect } from "react";
import {
  Search,
  Grid3x3,
  List,
  X,
  Plus,
  Check,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  CATALOG,
  CATEGORY_LABELS,
  OFFICIAL_BRANDS,
  Product,
  brandOf,
  sortBrands,
} from "../data/catalog";
import { FiltroCatalogo, MARCAS_OFICIALES } from "../data/marcas";
import { BrandMoreInfo } from "./OfficialBrands";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { CompareDrawer } from "./CompareDrawer";
import { Tooltip } from "./Tooltip";
import sinResultados from "../../imports/no-se-encuentra.svg?url";

interface CatalogProps {
  compareProducts: Product[];
  setCompareProducts: (products: Product[]) => void;
  // Filtro pedido desde otra sección (ej: links de la sección Representación oficial)
  filtroExterno?: FiltroCatalogo | null;
}

export function Catalog({
  compareProducts,
  setCompareProducts,
  filtroExterno,
}: CatalogProps) {
  const [activeTab, setActiveTab] = useState<"nuevo" | "usado">("nuevo");
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const [activeBrand, setActiveBrand] = useState<string>("todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [compareDrawerOpen, setCompareDrawerOpen] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(12);

  const filteredProducts = useMemo(() => {
    return CATALOG.filter((product) => {
      // Filter by tab
      if (product.estado !== activeTab) return false;

      // Filter by category
      if (activeCategory !== "todos" && product.categoria !== activeCategory)
        return false;

      // Filter by brand (second level, within the category)
      if (activeBrand !== "todas" && brandOf(product) !== activeBrand)
        return false;

      // Filter by search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          product.nombre.toLowerCase().includes(query) ||
          product.marca.toLowerCase().includes(query) ||
          product.descripcion.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [activeTab, activeCategory, activeBrand, searchQuery]);

  // Aplica un filtro pedido desde otra sección y lleva a la vista al catálogo
  useEffect(() => {
    if (!filtroExterno) return;
    setActiveTab("nuevo");
    setActiveCategory(filtroExterno.categoria);
    setActiveBrand(filtroExterno.marca);
    setSearchQuery(filtroExterno.busqueda ?? "");
    const timer = setTimeout(() => {
      const el = document.getElementById("catalogo");
      if (el) {
        window.scrollTo({ top: el.offsetTop - 90, behavior: "smooth" });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [filtroExterno]);

  // Reset items to show when filters change
  useEffect(() => {
    setItemsToShow(12);
  }, [activeTab, activeCategory, activeBrand, searchQuery]);

  const visibleProducts = filteredProducts.slice(0, itemsToShow);
  const hasMore = filteredProducts.length > itemsToShow;
  const nextBatch = Math.min(itemsToShow + 12, filteredProducts.length);

  // First level: categories (by machine type) that have products in the active tab
  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    CATALOG.filter((p) => p.estado === activeTab).forEach((p) =>
      counts.set(p.categoria, (counts.get(p.categoria) ?? 0) + 1),
    );
    return counts;
  }, [activeTab]);

  const categories = useMemo(
    () =>
      Object.keys(CATEGORY_LABELS).filter((cat) => categoryCounts.has(cat)),
    [categoryCounts],
  );

  const tabTotal = useMemo(
    () => Array.from(categoryCounts.values()).reduce((a, b) => a + b, 0),
    [categoryCounts],
  );

  // Second level: brands within the selected category
  const brandCounts = useMemo(() => {
    const counts = new Map<string, number>();
    if (activeCategory === "todos") return counts;
    CATALOG.filter(
      (p) => p.estado === activeTab && p.categoria === activeCategory,
    ).forEach((p) => {
      const brand = brandOf(p);
      counts.set(brand, (counts.get(brand) ?? 0) + 1);
    });
    return counts;
  }, [activeTab, activeCategory]);

  const brands = useMemo(() => sortBrands(brandCounts), [brandCounts]);

  const selectCategory = (cat: string) => {
    setActiveCategory(cat);
    setActiveBrand("todas");
  };

  const toggleCompare = (product: Product) => {
    if (compareProducts.find((p) => p.id === product.id)) {
      setCompareProducts(compareProducts.filter((p) => p.id !== product.id));
      toast.success("Producto removido de la comparación");
    } else {
      if (compareProducts.length >= 3) {
        toast.error("Máximo 3 productos para comparar");
        return;
      }
      setCompareProducts([...compareProducts, product]);
      toast.success("Producto agregado a la comparación");
    }
  };

  return (
    <section id="catalogo" className="bg-[#f7f7f7] py-20">
      <div className="w-full lg:max-w-[1024px]   xl:max-w-[1280px]  2xl:max-w-[1536px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-0.5 w-8 bg-zinc-500" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500">
                Catálogo completo
              </span>
            </div>
            <h2 className="font-normal text-2xl md:text-4xl text-ink">
              MAQUINARIAS AGRÍCOLAS
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex border-2 border-ink">
            <button
              onClick={() => {
                setActiveTab("nuevo");
                selectCategory("todos");
                setSearchQuery("");
              }}
              className={`px-8 py-3 text-sm font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                activeTab === "nuevo"
                  ? "bg-ink text-white"
                  : "bg-transparent text-ink hover:bg-zinc-100"
              }`}
            >
              Nuevos
            </button>
            <button
              onClick={() => {
                setActiveTab("usado");
                selectCategory("todos");
                setSearchQuery("");
              }}
              className={`px-8 py-3 text-sm font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                activeTab === "usado"
                  ? "bg-ink text-white"
                  : "bg-transparent text-ink hover:bg-zinc-100"
              }`}
            >
              Usados
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar por modelo, marca, potencia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-zinc-300 rounded-lg focus:border-ink focus:outline-none transition-colors text-sm text-ink"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-ink cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Filters and View Mode */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => selectCategory("todos")}
                className={`px-3 py-2 text-xs font-semibold tracking-wide uppercase rounded-full border-2 transition-all cursor-pointer ${
                  activeCategory === "todos"
                    ? "bg-ink text-white border-ink"
                    : "bg-white text-ink border-ink hover:bg-zinc-100"
                }`}
              >
                Todos <span className="opacity-60">({tabTotal})</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => selectCategory(cat)}
                  className={`px-3 py-2 text-xs font-semibold tracking-wide uppercase rounded-full border-2 transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-ink text-white border-ink"
                      : "bg-white text-ink border-ink hover:bg-zinc-100"
                  }`}
                >
                  {CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS]}{" "}
                  <span className="opacity-60">({categoryCounts.get(cat)})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brand filter (second level, within the selected category) */}
          {brands.length > 1 && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap items-center gap-2"
            >
              {["todas", ...brands].map((brand) => {
                const isActive = activeBrand === brand;
                const isOfficial = OFFICIAL_BRANDS.includes(brand);
                const count =
                  brand === "todas"
                    ? Array.from(brandCounts.values()).reduce((a, b) => a + b, 0)
                    : brandCounts.get(brand);
                return (
                  <button
                    key={brand}
                    onClick={() => setActiveBrand(brand)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wide rounded-full border transition-all cursor-pointer ${
                      isActive
                        ? "bg-accent text-ink border-accent shadow-sm"
                        : "bg-white text-zinc-700 border-zinc-200 hover:border-ink"
                    }`}
                  >
                    {brand === "todas" ? "Todas las marcas" : brand}
                    <span className="opacity-60">({count})</span>
                    {isOfficial && (
                      <span
                        className="rounded-sm bg-ink px-1.5 py-0.5 text-xs font-black tracking-wider uppercase text-accent"
                      >
                        Oficial
                      </span>
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}

          {/* Más modelos de la marca oficial elegida (enlace a su web) */}
          {MARCAS_OFICIALES[activeBrand] && (
            <BrandMoreInfo
              key={activeBrand}
              marca={MARCAS_OFICIALES[activeBrand]}
            />
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-zinc-500">
            Mostrando {visibleProducts.length} de {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "producto" : "productos"}
          </p>

          {/* View Mode Toggle */}
          <div className="gap-2 bg-white border border-zinc-300 rounded-lg p-1 hidden md:flex">
            <Tooltip text="Vista en cuadrícula" position="bottom">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-colors cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-ink text-white"
                    : "text-zinc-400 hover:text-ink"
                }`}
                aria-label="Vista en cuadrícula"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
            </Tooltip>
            <Tooltip text="Vista en lista" position="bottom">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-colors cursor-pointer ${
                  viewMode === "list"
                    ? "bg-ink text-white"
                    : "text-zinc-400 hover:text-ink"
                }`}
                aria-label="Vista en lista"
              >
                <List className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            
            <img
              src={sinResultados}
              alt=""
              className="h-auto w-150 object-contain mx-auto mb-8"
            />
            <h3 className="font-normal text-2xl text-ink mb-2">
              No se encontraron productos
            </h3>
            <p className="text-zinc-500 mb-6">
              Intentá con otros filtros o contactanos para consultar
              disponibilidad
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                selectCategory("todos");
                setActiveTab("nuevo");
              }}
              className="bg-ink text-white px-6 py-3 font-semibold text-sm hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {visibleProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                index={index}
                onViewDetails={() => setSelectedProduct(product)}
                onToggleCompare={() => toggleCompare(product)}
                isInCompare={compareProducts.some((p) => p.id === product.id)}
              />
            ))}
          </div>
        )}

        {/* Load More Section */}
        {filteredProducts.length > 0 && hasMore && (
          <div className="mt-16 max-w-2xl mx-auto">
            {/* Progress Text */}
            <p className="text-center text-sm font-semibold text-zinc-700 mb-4">
              {visibleProducts.length} productos vistos de{" "}
              {filteredProducts.length}
            </p>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-zinc-300 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-ink transition-all duration-500"
                style={{
                  width: `${(visibleProducts.length / filteredProducts.length) * 100}%`,
                }}
              />
            </div>

            {/* Load More Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setItemsToShow((prev) => prev + 12)}
                className="bg-transparent text-ink px-8 py-3 font-semibold text-sm tracking-wide border-2 border-ink transition-all hover:bg-ink hover:text-white cursor-pointer"
              >
                Ver los siguientes productos
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Floating Compare Button */}
      {compareProducts.length > 0 && (
        <div className="fixed bottom-8 right-8 z-50 flex items-stretch shadow-2xl">
          <button
            onClick={() => setCompareDrawerOpen(true)}
            className="flex items-center gap-3 bg-ink text-white px-6 py-4 font-semibold text-base transition-all hover:bg-zinc-800 cursor-pointer border-2 border-r-0 border-accent"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent text-ink flex items-center justify-center font-black text-sm">
                {compareProducts.length}
              </div>
              <span>Comparar productos</span>
            </div>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCompareProducts([])}
            className="bg-accent text-ink px-3 flex items-center justify-center hover:bg-accent-hover transition-colors cursor-pointer border-2 border-accent"
            aria-label="Limpiar comparación"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Compare Drawer */}
      <CompareDrawer
        products={compareProducts}
        isOpen={compareDrawerOpen}
        onClose={() => setCompareDrawerOpen(false)}
        onRemove={(product) =>
          setCompareProducts(compareProducts.filter((p) => p.id !== product.id))
        }
        onClearAll={() => setCompareProducts([])}
      />
    </section>
  );
}
