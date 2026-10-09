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
    featured: false,
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
    featured: false,
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
    featured: true,
    paymentDays: ["0", "30", "60", "90"],
  },
];

export function SpareParts() {
  return (
    <section
      id="repuestos"
      className="bg-zinc-950 py-20 border-y border-white/5"
    >
      <div className="w-full lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-8 bg-yellow-400" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-yellow-400">
              Repuestos
            </span>
            <div className="h-0.5 w-8 bg-yellow-400" />
          </div>
          <h2 className="font-normal text-4xl md:text-5xl text-white mb-4">
            REPUESTOS Y SUMINISTROS
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
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
                className={`
                  relative rounded-xl p-8 flex flex-col gap-5 transition-all
                  ${
                    cat.featured
                      ? "bg-yellow-400/10 border border-yellow-400/40 hover:border-yellow-400/70"
                      : "bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20"
                  }
                `}
              >
                {/* Tag + Icon */}
                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className={`text-xs font-bold tracking-[0.18em] uppercase ${
                        cat.featured ? "text-yellow-400" : "text-white/40"
                      }`}
                    >
                      {cat.tag}
                    </span>
                    <h3 className="text-2xl font-normal text-white mt-1">
                      {cat.brand}
                    </h3>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      cat.featured
                        ? "bg-yellow-400/20"
                        : "bg-white/8"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        cat.featured ? "text-yellow-400" : "text-white/60"
                      }`}
                    />
                  </div>
                </div>

                {/* Headline + Description */}
                <div>
                  <p className="font-semibold text-white/90 mb-2 leading-snug">
                    {cat.headline}
                  </p>
                  <p className="text-white/55 text-[15px] leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Highlights list */}
                {cat.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {cat.highlights.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2.5 py-1 rounded-full bg-white/8 border border-white/10 text-white/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}

                {/* Payment terms — Ingersoll only */}
                {cat.paymentDays && (
                  <div className="mt-auto pt-4 border-t border-yellow-400/20">
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-yellow-400/70 mb-3">
                      Financiación propia
                    </p>
                    <div className="flex gap-2">
                      {cat.paymentDays.map((d) => (
                        <div
                          key={d}
                          className="flex-1 text-center py-2.5 rounded-lg bg-yellow-400/15 border border-yellow-400/30"
                        >
                          <span className="block text-lg font-black text-yellow-400 leading-none">
                            {d}
                          </span>
                          <span className="text-[10px] text-yellow-400/60 font-semibold uppercase tracking-wide">
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
          className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/5 border border-white/10 rounded-xl px-8 py-6"
        >
          <div>
            <p className="text-white font-semibold text-lg md:text-2xl leading-snug">
              ¿Necesitás un repuesto o querés saber disponibilidad?
            </p>
            <p className="text-white/50 text-md md:text-lg mt-1">
              Consultanos por WhatsApp y te respondemos a la brevedad.
            </p>
          </div>
          <a
            href="https://wa.me/5492923515685?text=Hola%2C%20quiero%20consultar%20sobre%20repuestos%20y%20suministros"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2.5 bg-[#25D366] text-white px-6 py-3 font-semibold text-sm hover:bg-[#20ba57] transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Consultar disponibilidad
          </a>
        </motion.div>
      </div>
    </section>
  );
}
