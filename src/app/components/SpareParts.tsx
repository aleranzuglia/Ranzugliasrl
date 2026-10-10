import { motion } from "motion/react";
import { Droplets, Wrench, Disc3 } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

const categories = [
  {
    icon: Droplets,
    tag: "Aceites & lubricantes",
    brand: "Valvoline",
    headline: "Lubricantes para toda la flota",
    description:
      "Distribuidores autorizados de aceites y lubricantes Valvoline. Productos específicos para tractores, implementos y vehículos de trabajo agrícola, con formulaciones aprobadas por los principales fabricantes.",
    highlights: [
      "Motor diésel",
      "Transmisiones",
      "Sistemas hidráulicos",
      "Engrases",
    ],
    paymentDays: null,
  },
  {
    icon: Wrench,
    tag: "Repuestos originales",
    brand: "Todas las marcas",
    headline: "Piezas certificadas, siempre disponibles",
    description:
      "Stock de repuestos originales para todas las marcas que comercializamos. Cada pieza está certificada de fábrica para garantizar el rendimiento y la vida útil de tu maquinaria.",
    highlights: ["Hanomag", "Michigan", "Pauny", "Gravo", "Gherardi", "Pampero", "SYL", "Belén"],
    paymentDays: null,
  },
  {
    icon: Disc3,
    tag: "Discos y cuchillas",
    brand: "Ingersoll",
    headline: "Herramientas de corte de alta resistencia",
    description:
      "Discos y cuchillas Ingersoll, referencia en durabilidad para labores de siembra y labranza. Fabricadas con acero de alta resistencia para el agro argentino.",
    highlights: [],
    paymentDays: ["0", "30", "60", "90"],
  },
];

export function SpareParts() {
  return (
    <section
      id="repuestos"
      className="bg-paper py-20"
    >
      <div className="w-full lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-8 bg-zinc-500" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500">
              Repuestos
            </span>
            <div className="h-0.5 w-8 bg-zinc-500" />
          </div>
          <h2 className="font-normal text-2xl md:text-4xl text-ink mb-4">
            REPUESTOS Y SUMINISTROS
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Todo lo que tu maquinaria necesita para seguir trabajando, con
            repuestos originales y productos de las mejores marcas del agro.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.12 }}
                className="relative rounded-xl p-8 flex flex-col gap-5 transition-all bg-white border border-zinc-200 hover:border-zinc-400 hover:shadow-lg"
              >
                {/* Tag + Icon */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold tracking-[0.18em] uppercase text-zinc-500">
                      {cat.tag}
                    </span>
                    <h3 className="text-xl font-bold text-ink mt-1">
                      {cat.brand}
                    </h3>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-100">
                    <Icon className="w-5 h-5 text-zinc-600" />
                  </div>
                </div>

                {/* Headline + Description */}
                <div>
                  <p className="font-semibold text-ink mb-2 leading-snug">
                    {cat.headline}
                  </p>
                  <p className="text-zinc-600 text-base leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Highlights list */}
                {cat.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {cat.highlights.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}

                {/* Payment terms — Ingersoll only */}
                {cat.paymentDays && (
                  <div className="mt-auto pt-4 border-t border-zinc-200">
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-zinc-500 mb-3">
                      Financiación propia
                    </p>
                    <div className="flex gap-2">
                      {cat.paymentDays.map((d) => (
                        <div
                          key={d}
                          className="flex-1 text-center py-2.5 rounded-lg bg-zinc-100 border border-zinc-200 border-b-4 border-b-accent"
                        >
                          <span className="block text-lg font-black text-ink leading-none">
                            {d}
                          </span>
                          <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wide">
                            días
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white border border-zinc-200 rounded-xl px-8 py-6"
        >
          <div>
            <p className="text-ink font-semibold text-lg md:text-xl leading-snug">
              ¿Necesitás un repuesto o querés saber disponibilidad?
            </p>
            <p className="text-zinc-600 text-base md:text-lg mt-1">
              Consultanos por WhatsApp y te respondemos a la brevedad.
            </p>
          </div>
          <a
            href="https://wa.me/5492923515685?text=Hola%2C%20quiero%20consultar%20sobre%20repuestos%20y%20suministros"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2.5 bg-whatsapp text-white px-6 py-3 font-semibold text-sm hover:bg-whatsapp-hover transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Consultar disponibilidad
          </a>
        </motion.div>
      </div>
    </section>
  );
}
