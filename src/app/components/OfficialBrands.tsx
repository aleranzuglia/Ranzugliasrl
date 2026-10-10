import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { BrandCard } from "./shared/BrandCard";
import { Chip } from "./shared/Chip";
import { FiltroCatalogo, MARCAS_OFICIALES, MarcaOficial } from "../data/marcas";

const externalProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

// Tarjeta que aparece en el catálogo al filtrar por una marca oficial:
// avisa que hay más modelos y enlaza a las líneas que no están cargadas.
export function BrandMoreInfo({ marca }: { marca: MarcaOficial }) {
  const otrasLineas = marca.lineas.filter((linea) => !linea.filtro);

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white border-2 border-ink rounded-lg p-5 md:p-6"
    >
      <div className="flex items-start gap-4">
        <img
          src={marca.logo}
          alt={marca.nombre}
          className="h-8 w-auto object-contain mt-1 shrink-0"
        />
        <div>
          <h3 className="font-bold text-xl text-ink leading-tight">
            Más modelos {marca.nombre}
          </h3>
          <p className="text-sm text-zinc-600 mt-1">
            Acá mostramos una selección. Comercializamos toda la línea{" "}
            {marca.nombre}: consultanos por cualquier modelo.
          </p>
          {otrasLineas.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500">
                También
              </span>
              {otrasLineas.map((linea) => (
                <Chip
                  key={linea.label}
                  tone="light"
                  href={linea.url}
                  {...externalProps}
                >
                  {linea.label}
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </Chip>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Sección de la página: presenta las dos marcas con representación oficial y enlaza a la
// web de cada una (y a cada una de sus líneas de productos).
// Las líneas que ya están cargadas filtran el catálogo de Ranzuglia (onVerEnCatalogo);
// las que no, abren la web de la marca.
export function OfficialBrands({
  onVerEnCatalogo,
}: {
  onVerEnCatalogo: (filtro: Omit<FiltroCatalogo, "id">) => void;
}) {
  const marcas = Object.values(MARCAS_OFICIALES);

  return (
    <section id="representaciones" className="bg-ink py-20">
      <div className="w-full lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-0.5 w-8 bg-accent" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
            Representación oficial
          </span>
        </div>
        <h2 className="font-normal text-2xl md:text-4xl text-white mb-4">
          HANOMAG Y MICHIGAN
        </h2>
        <p className="text-base md:text-lg text-white/70 max-w-3xl mb-12">
          Somos distribuidores oficiales de las dos marcas. En el catálogo
          mostramos una selección de sus máquinas: la línea completa está en la
          web de cada marca, y podés consultarnos por cualquier modelo.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {marcas.map((marca, index) => (
            <BrandCard
              key={marca.nombre}
              marca={marca}
              index={index}
              onVerEnCatalogo={onVerEnCatalogo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
