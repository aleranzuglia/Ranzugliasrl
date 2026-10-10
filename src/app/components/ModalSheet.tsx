import { useState, type ReactNode } from "react";
import { motion, useDragControls } from "motion/react";

// Mismo corte que `md:` de Tailwind (768 px)
const esCelular = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches;

interface ModalSheetProps {
  onClose: () => void;
  // Ancho máximo en pantallas medianas y grandes (ej: "md:max-w-4xl")
  maxWidthClass: string;
  // Clases extra para el panel (ej: padding)
  panelClassName?: string;
  children: ReactNode;
}

// Contenedor común de los modales (detalle de producto y comparador).
// - Celular: panel pegado abajo, del alto de su contenido (hasta 92% de la pantalla), que sube
//   desde abajo, se cierra arrastrándolo hacia abajo y tapa también el menú de arriba.
// - Escritorio: modal centrado, como antes.
// Debe usarse dentro de <AnimatePresence> para que la animación de salida funcione.
export function ModalSheet({
  onClose,
  maxWidthClass,
  panelClassName = "",
  children,
}: ModalSheetProps) {
  // Se calcula al montar (no en un efecto) para que la animación de entrada ya use el modo correcto
  const [isMobile] = useState(esCelular);
  const dragControls = useDragControls();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[110] flex items-end md:items-center justify-center bg-black/70 backdrop-blur-sm md:p-4"
    >
      <motion.div
        initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95 }}
        animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1 }}
        exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95 }}
        transition={
          isMobile ? { type: "spring", damping: 32, stiffness: 320 } : undefined
        }
        drag={isMobile ? "y" : false}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100 || info.velocity.y > 600) onClose();
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        data-surface="light"
        aria-modal="true"
        className={`relative flex flex-col w-full ${maxWidthClass} max-h-[92dvh] md:max-h-[80vh] overflow-hidden bg-white rounded-t-2xl md:rounded-xl border-2 border-b-0 md:border-b-2 border-ink shadow-2xl pb-[env(safe-area-inset-bottom)] md:pb-0 ${panelClassName}`}
      >
        {/* Barra para arrastrar y cerrar (solo celular) */}
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="md:hidden absolute top-0 left-1/2 z-20 flex h-6 w-24 -translate-x-1/2 cursor-grab touch-none justify-center pt-2"
        >
          <span className="h-1.5 w-10 rounded-full bg-surface-2/30" />
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}
