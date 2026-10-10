import { motion } from "motion/react";
import { ArrowDown, ExternalLink } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { FiltroCatalogo, MARCAS_OFICIALES, MarcaOficial } from "../data/marcas";

const whatsappUrl = (marca: MarcaOficial) =>
  `https://wa.me/5492923431570?text=${encodeURIComponent(
    `Hola, quiero consultar por productos ${marca.nombre}`,
  )}`;

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
          <h3 className="font-normal text-xl text-ink leading-tight">
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
                <a
                  key={linea.label}
                  href={linea.url}
                  {...externalProps}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wide rounded-full border transition-colors ${marca.estilos.chipTarjeta}`}
                >
                  {linea.label}
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
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
            <motion.article
              key={marca.nombre}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col bg-surface-2 border border-white/10 rounded-lg p-6 md:p-8"
            >
              <img
                src={marca.logo}
                alt={marca.nombre}
                className="h-12 w-auto object-contain self-start mb-5"
              />
              <p className="text-white/70 mb-6">{marca.descripcion}</p>

              <div className="text-xs font-bold tracking-[0.2em] uppercase text-text-muted-on-dark mb-3">
                Líneas de productos
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {marca.lineas.map((linea) => {
                  const chipClass =
                    "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border cursor-pointer transition-colors";
                  const { filtro } = linea;
                  return filtro ? (
                    <button
                      key={linea.label}
                      type="button"
                      onClick={() =>
                        onVerEnCatalogo({ ...filtro, marca: marca.nombre })
                      }
                      title={`Ver ${linea.label} en nuestro catálogo`}
                      className={`${chipClass} ${marca.estilos.chipCatalogo}`}
                    >
                      {linea.label}
                      <ArrowDown className="w-3 h-3" aria-hidden="true" />
                    </button>
                  ) : (
                    <a
                      key={linea.label}
                      href={linea.url}
                      {...externalProps}
                      title={`Ver ${linea.label} en ${marca.dominio} (se abre en una pestaña nueva)`}
                      className={`${chipClass} border-white/20 text-white/80 hover:border-white hover:text-white`}
                    >
                      {linea.label}
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>

              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <a
                  href={marca.url}
                  {...externalProps}
                  className={`flex-1 inline-flex items-center justify-center gap-2 border-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase transition-colors ${marca.estilos.botonWeb}`}
                >
                  Ver catálogo completo
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={whatsappUrl(marca)}
                  {...externalProps}
                  className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-transparent bg-whatsapp text-white px-6 py-3.5 text-xs font-semibold tracking-wider uppercase transition-colors hover:bg-whatsapp-hover"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Consultar
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
