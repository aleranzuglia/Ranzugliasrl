import { motion } from "motion/react";
import { Plus, Check, ImageOff } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { Product } from "../data/catalog";
import { Tooltip } from "./Tooltip";

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
  index: number;
  onViewDetails: () => void;
  onToggleCompare: () => void;
  isInCompare: boolean;
}

export function ProductCard({
  product,
  viewMode,
  index,
  onViewDetails,
  onToggleCompare,
  isInCompare,
}: ProductCardProps) {
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = encodeURIComponent(
      `Hola, quiero consultar sobre el modelo ${product.nombre}`,
    );
    window.open(
      `https://wa.me/5492923431570?text=${msg}`,
      "_blank",
      "noopener",
    );
  };

  const getBrandColor = (marca: string) => {
    return "bg-accent";
  };

  if (viewMode === "list") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ delay: Math.min(index * 0.05, 0.3) }}
        onClick={onViewDetails}
        className="group bg-white rounded-lg p-6 transition-all cursor-pointer hover:shadow-xl"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div
            className={
              product.fotoCompleta
                ? "rounded-lg overflow-hidden md:w-48 h-48 flex-shrink-0"
                : `${getBrandColor(product.marca)} rounded-lg flex items-center justify-center p-4 md:w-48 h-auto flex-shrink-0`
            }
          >
            {product.imagen ? (
              <img
                src={product.imagen}
                alt={product.nombre}
                className={product.fotoCompleta ? "w-full h-full object-cover" : "w-full h-auto"}
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-white">
                <ImageOff className="w-10 h-10" />
                <span className="text-xs font-semibold tracking-wider uppercase">Sin imagen</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="text-sm font-bold tracking-wider uppercase text-zinc-400 mb-1">
                  {product.marca}
                </div>
                <h3 className="font-normal text-2xl text-ink mb-2">
                  {product.nombre}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-zinc-100 text-zinc-600 text-xs font-normal rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-zinc-600 line-clamp-2">
                  {product.descripcion}
                </p>
              </div>

              {/* Badge */}
              <span
                className={`px-3 py-1 text-xs font-normal tracking-wider uppercase rounded ${
                  product.estado === "nuevo"
                    ? "bg-ink text-accent"
                    : "bg-zinc-500 text-white"
                }`}
              >
                {product.estado === "nuevo" ? "Nuevo" : "Usado"}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleWhatsApp}
                aria-label="Consultar por WhatsApp"
                className="flex items-center justify-center self-stretch bg-whatsapp text-white px-4 hover:bg-whatsapp-hover transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare();
                }}
                className={`flex items-center gap-2 px-4 py-2 font-semibold text-sm border-2 transition-all cursor-pointer ${
                  isInCompare
                    ? "bg-accent border-accent text-ink"
                    : "bg-transparent border-ink text-ink hover:bg-ink hover:text-white"
                }`}
              >
                {isInCompare ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {isInCompare ? "En comparación" : "Comparar"}
              </button>
              <button className="text-xs font-semibold tracking-wider uppercase text-ink hover:text-accent transition-colors flex items-center gap-1 cursor-pointer">
                Ver ficha →
              </button>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // Grid View
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: Math.min(index * 0.05, 0.3) }}
      onClick={onViewDetails}
      className="group bg-white rounded-lg overflow-hidden transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1 flex flex-col"
    >
      {/* Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className={`px-3 py-1 text-xs font-normal tracking-wider uppercase rounded ${
            product.estado === "nuevo"
              ? "bg-ink text-accent"
              : "bg-zinc-500 text-white"
          }`}
        >
          {product.estado === "nuevo" ? "Nuevo" : "Usado"}
        </span>
      </div>

      {/* Image */}
      <div
        className={
          product.fotoCompleta
            ? "h-48 flex-shrink-0 relative overflow-hidden"
            : `${getBrandColor(product.marca)} h-48 flex-shrink-0 flex items-center justify-center p-4 relative`
        }
      >
        {product.imagen ? (
          <img
            src={product.imagen}
            alt={product.nombre}
            className={product.fotoCompleta ? "w-full h-full object-cover" : "w-full h-full object-contain"}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-white">
            <ImageOff className="w-12 h-12" />
            <span className="text-xs font-semibold tracking-wider uppercase">Sin imagen</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="text-sm font-bold tracking-wider uppercase text-zinc-400 mb-1">
          {product.marca}
        </div>
        <h3 className="font-normal text-xl text-ink mb-2">
          {product.nombre}
        </h3>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-zinc-100 text-zinc-600 text-xs font-normal rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-zinc-600 line-clamp-2 mb-4">
          {product.descripcion}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 mt-auto">
          <button className="text-xs font-semibold tracking-wider uppercase text-ink hover:text-accent transition-colors flex items-center gap-1 cursor-pointer">
            Ver ficha →
          </button>
          <div className="flex items-center gap-2">
            <Tooltip text="Consultar por WhatsApp">
              <button
                onClick={handleWhatsApp}
                className="w-9 h-9 rounded-full bg-whatsapp text-white flex items-center justify-center hover:bg-whatsapp-hover hover:scale-110 transition-all cursor-pointer"
                aria-label="Consultar por WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </button>
            </Tooltip>
            <Tooltip text={isInCompare ? "Quitar de comparación" : "Agregar a comparación"}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare();
                }}
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
                  isInCompare
                    ? "bg-accent border-accent text-ink"
                    : "border-ink text-ink hover:bg-ink hover:text-white"
                }`}
                aria-label={isInCompare ? "Quitar de comparación" : "Agregar a comparación"}
              >
                {isInCompare ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </motion.article>
  );
}