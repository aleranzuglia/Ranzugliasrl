import { motion } from "motion/react";
import { ArrowDown, ExternalLink } from "lucide-react";
import { WhatsAppIcon } from "../WhatsAppIcon";
import { Button } from "./Button";
import { Chip } from "./Chip";
import type { FiltroCatalogo, MarcaOficial } from "../../data/marcas";
import { useEntrance } from "../../lib/motion";

const externalProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

const whatsappUrl = (marca: MarcaOficial) =>
  `https://wa.me/5492923431570?text=${encodeURIComponent(
    `Hola, quiero consultar por productos ${marca.nombre}`,
  )}`;

// Tarjeta de una marca con representacion oficial. Todas las tarjetas comparten estructura y
// estilos: lo unico que las diferencia es el logo.
export function BrandCard({
  marca,
  index,
  onVerEnCatalogo,
}: {
  marca: MarcaOficial;
  index: number;
  onVerEnCatalogo: (filtro: Omit<FiltroCatalogo, "id">) => void;
}) {
  const { reveal } = useEntrance();

  return (
    <motion.article
      {...reveal(index)}
      className="flex flex-col bg-surface-2 border border-white/10 rounded-lg p-6 md:p-8"
    >
      <img loading="lazy" decoding="async"
        src={marca.logo}
        alt={marca.nombre}
        className="h-12 w-auto object-contain self-start mb-5"
      />
      <p className="text-white/70 mb-6">{marca.descripcion}</p>

      <div className="text-xs font-bold tracking-[0.2em] uppercase text-text-muted-on-dark mb-3">
        Líneas de productos
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {marca.lineas.map((linea) =>
          linea.filtro ? (
            <Chip
              key={linea.label}
              tone="dark"
              onClick={() => onVerEnCatalogo({ ...linea.filtro!, marca: marca.nombre })}
              title={`Ver ${linea.label} en nuestro catálogo`}
            >
              {linea.label}
              <ArrowDown className="w-3 h-3" aria-hidden="true" />
            </Chip>
          ) : (
            <Chip
              key={linea.label}
              tone="dark"
              href={linea.url}
              {...externalProps}
              title={`Ver ${linea.label} en ${marca.dominio} (se abre en una pestaña nueva)`}
            >
              {linea.label}
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </Chip>
          ),
        )}
      </div>

      <div className="mt-auto flex flex-col gap-3 xl:flex-row">
        <Button
          variant="secondary"
          tone="dark"
          size="sm"
          href={marca.url}
          className="w-full whitespace-nowrap xl:flex-[3] xl:px-4 xl:text-xs"
          {...externalProps}
        >
          Ver catálogo completo
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </Button>
        <Button
          variant="whatsapp"
          size="sm"
          href={whatsappUrl(marca)}
          className="w-full whitespace-nowrap xl:flex-[2] xl:px-4 xl:text-xs"
          {...externalProps}
        >
          <WhatsAppIcon className="w-4 h-4" />
          Consultar
        </Button>
      </div>
    </motion.article>
  );
}
