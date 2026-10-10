import { useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Trash2, X } from 'lucide-react';
import { Product } from '../data/catalog';
import { ModalSheet } from './ModalSheet';

interface CompareDrawerProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (product: Product) => void;
  onClearAll: () => void;
}

export function CompareDrawer({ products, isOpen, onClose, onRemove, onClearAll }: CompareDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalSheet onClose={onClose} maxWidthClass="md:max-w-[80rem]" panelClassName="p-4">
          <CompareContent
            products={products}
            onClose={onClose}
            onRemove={onRemove}
            onClearAll={onClearAll}
          />
        </ModalSheet>
      )}
    </AnimatePresence>
  );
}

function CompareContent({
  products,
  onClose,
  onRemove,
  onClearAll,
}: Omit<CompareDrawerProps, 'isOpen'>) {
  const specs = [
    { label: 'Marca',    key: 'marca' },
    { label: 'Potencia', key: 'hp' },
    { label: 'Peso',     key: 'peso' },
    { label: 'Cabina',   key: 'cabina' },
    { label: 'Origen',   key: 'origen' },
    { label: 'Estado',   key: 'estado' },
  ];

  const getValue = (product: Product, key: string) =>
    key === 'estado'
      ? product.estado === 'nuevo' ? 'Nuevo' : 'Usado'
      : (product[key as keyof Product] as string) || '—';

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
        <h3 className="font-bold text-xl md:text-2xl tracking-tight text-ink">
          Comparar Productos
        </h3>
        <div className="flex items-center gap-6">
          <button
            onClick={() => { onClearAll(); onClose(); }}
            className="text-sm font-semibold text-zinc-500 hover:text-ink transition-colors cursor-pointer flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Limpiar todo
          </button>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center hover:bg-accent hover:text-ink transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">

        {/* ── MOBILE: tarjetas apiladas ── */}
        <div className="md:hidden space-y-4 py-4">
          {products.map((product) => (
            <div key={product.id} className="border border-zinc-200 rounded-xl overflow-hidden">
              {/* Card header */}
              <div className="flex items-start justify-between bg-ink text-white px-4 py-3">
                <div>
                  <div className="font-black text-base leading-tight">{product.nombre}</div>
                  <div className="text-xs text-zinc-400 mt-0.5">{product.marca}</div>
                </div>
                <button
                  onClick={() => onRemove(product)}
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer mt-0.5"
                  aria-label="Quitar producto"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Spec rows */}
              {specs.map((spec, i) => (
                <div
                  key={spec.key}
                  className={`flex items-center justify-between px-4 py-2.5 ${i % 2 === 0 ? 'bg-zinc-50' : 'bg-white'}`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    {spec.label}
                  </span>
                  <span className="text-sm font-medium text-zinc-800">
                    {getValue(product, spec.key)}
                  </span>
                </div>
              ))}

              {/* Description */}
              <div className="px-4 py-3 border-t border-zinc-100">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Descripción
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {product.descripcion}
                </p>
              </div>

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="px-4 pb-4 flex flex-wrap gap-1.5">
                  {product.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-white text-zinc-600 text-xs font-semibold rounded border border-zinc-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── DESKTOP: tabla original ── */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="p-4 text-left font-bold text-sm tracking-wider uppercase text-zinc-500 sticky left-0 bg-white z-10">
                  Característica
                </th>
                {products.map((product) => (
                  <th key={product.id} className="p-4 min-w-[250px]">
                    <div className="relative">
                      <button
                        onClick={() => onRemove(product)}
                        className="absolute top-1 right-8 text-zinc-500 flex items-center justify-center hover:text-ink transition-colors z-10 cursor-pointer"
                        aria-label="Remover"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                      <div className="font-black text-lg text-ink text-left">
                        {product.nombre}
                      </div>
                      <div className="text-xs text-zinc-500 text-left mt-1">
                        {product.marca}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map((spec, index) => (
                <tr
                  key={spec.key}
                  className={index % 2 === 0 ? 'bg-zinc-50' : 'bg-white'}
                >
                  <td className="p-4 font-bold text-sm text-zinc-700 sticky left-0 bg-inherit z-10">
                    {spec.label}
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-sm text-zinc-600">
                      {getValue(product, spec.key)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-4 font-bold text-sm text-zinc-700 sticky left-0 bg-white z-10">
                  Descripción
                </td>
                {products.map((product) => (
                  <td key={product.id} className="p-4 text-sm text-zinc-600 align-top">
                    {product.descripcion}
                  </td>
                ))}
              </tr>
              <tr className="bg-zinc-50">
                <td className="p-4 font-bold text-sm text-zinc-700 sticky left-0 bg-zinc-50 z-10">
                  Características
                </td>
                {products.map((product) => (
                  <td key={product.id} className="p-4">
                    <div className="flex flex-wrap gap-1.5">
                      {product.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-white text-zinc-600 text-xs font-semibold rounded border border-zinc-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}
