import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Button } from "./shared/Button";
import { X } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { ModalSheet } from "./ModalSheet";
import { Product } from "../data/catalog";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({
  product,
  onClose,
}: ProductModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () =>
      window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <ModalSheet
          key={product.id}
          onClose={onClose}
          maxWidthClass="md:max-w-4xl"
        >
          <ProductDetail product={product} onClose={onClose} />
        </ModalSheet>
      )}
    </AnimatePresence>
  );
}

function ProductDetail({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [activeImage, setActiveImage] = useState<string | undefined>(
    product.imagen,
  );

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hola, quiero consultar sobre el modelo ${product.nombre}`,
    );
    window.open(
      `https://wa.me/5492923431570?text=${msg}`,
      "_blank",
      "noopener",
    );
  };

  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById("contacto");
      if (el) {
        window.scrollTo({
          top: el.offsetTop - 90,
          behavior: "smooth",
        });
      }
    }, 300);
  };

  const getBrandColor = (marca: string) => {
    return "bg-accent";
  };

  const hasGallery = !!product.imagenes && product.imagenes.length > 1;

  return (
    <>
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center hover:bg-accent hover:text-ink transition-colors z-10 cursor-pointer"
        aria-label="Cerrar"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="overflow-y-auto overscroll-contain">
        <div className="grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          {/* Image */}
          <div
            className={`${hasGallery || product.fotoCompleta ? "bg-white" : getBrandColor(product.marca)} flex flex-col min-h-[250px]`}
          >
            <div className={hasGallery ? "h-80 overflow-hidden relative" : product.fotoCompleta ? "flex-1 overflow-hidden" : "flex-1 flex items-center justify-center p-4"}>
              {activeImage ? (
                hasGallery ? (
                  <>
                    <img
                      src={activeImage}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-70"
                    />
                    <img
                      src={activeImage}
                      alt={product.nombre}
                      className="relative w-full h-full object-contain"
                    />
                  </>
                ) : (
                  <img
                    src={activeImage}
                    alt={product.nombre}
                    className={product.fotoCompleta ? "w-full h-full min-h-[250px] object-cover" : "w-full h-full max-h-80 object-contain"}
                  />
                )
              ) : (
                <span className="font-black text-4xl text-white">
                  {product.marca}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.imagenes && product.imagenes.length > 1 && (
              <div className="flex gap-2 px-6 pb-4">
                {product.imagenes.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 flex-shrink-0 transition-colors cursor-pointer ${
                      activeImage === img
                        ? "border-accent"
                        : "border-transparent hover:border-zinc-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.nombre} - foto ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Title below image */}
            <div className="px-6 pb-6">
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-black/60 mb-1">
                {product.marca}
              </div>
              <h2 className="text-xl md:text-2xl text-ink leading-tight font-sans font-bold">
                {product.nombre}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:pt-16 flex flex-col max-h-full overflow-y-auto">
            <p className="text-sm text-zinc-600 leading-relaxed mb-6">
              {product.descripcion}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 pb-6 mb-6 border-t border-b border-zinc-200">
              <div className="pt-6">
                <div className="text-xs font-bold tracking-wider uppercase text-zinc-400 mb-1">
                  Potencia
                </div>
                <div className="font-bold text-sm text-ink">
                  {product.hp || "—"}
                </div>
              </div>
              <div className="pt-6">
                <div className="text-xs font-bold tracking-wider uppercase text-zinc-400 mb-1">
                  Peso
                </div>
                <div className="font-bold text-sm text-ink">
                  {product.peso || "—"}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold tracking-wider uppercase text-zinc-400 mb-1">
                  Cabina
                </div>
                <div className="font-bold text-sm text-ink">
                  {product.cabina || "—"}
                </div>
              </div>
              {product.origen && (
                <div>
                  <div className="text-xs font-bold tracking-wider uppercase text-zinc-400 mb-1">
                    Origen
                  </div>
                  <div className="font-bold text-sm text-ink">
                    {product.origen}
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Ficha técnica completa */}
            {product.specs && product.specs.length > 0 && (
              <details className="group mb-6 border border-zinc-200 rounded-md">
                <summary className="cursor-pointer select-none px-4 py-3 text-xs font-bold tracking-wider uppercase text-ink flex items-center justify-between list-none [&::-webkit-details-marker]:hidden">
                  Ficha técnica completa
                  <span className="text-zinc-400 transition-transform group-open:rotate-180">▾</span>
                </summary>
                <dl className="px-4 pb-4 divide-y divide-zinc-100 text-sm">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="grid grid-cols-[1fr_1.3fr] gap-3 py-2">
                      <dt className="text-xs font-bold tracking-wider uppercase text-zinc-400">
                        {spec.label}
                      </dt>
                      <dd className="font-semibold text-ink">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            )}

            {/* Actions */}
            <div className="mt-auto space-y-3 lg:space-y-0 lg:space-x-3 flex flex-col lg:flex-row">
              <Button onClick={scrollToContact} className="w-full px-4">
                Pedir presupuesto
              </Button>
              <Button variant="whatsapp" onClick={handleWhatsApp} className="w-full px-4">
                <WhatsAppIcon className="w-4 h-4" />
                Consultar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
