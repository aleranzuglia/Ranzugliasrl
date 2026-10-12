import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./shared/Button";
import { BankCard, type BankOption } from "./shared/BankCard";
import { Calculator } from "lucide-react";
import logoNacion from "../../imports/bancos/Banco_Naci_n.svg?url";
import logoProvincia from "../../imports/bancos/Banco_Provincia__Bs.As.__2021_.svg?url";
import logoPampa from "../../imports/bancos/banco_pampa.svg?url";
import logoGalicia from "../../imports/bancos/Logo_Banco_Galicia.svg?url";
import logoMacro from "../../imports/bancos/Logo_Banco_Macro.svg?url";
import logoBice from "../../imports/bancos/Bice-logo.svg?url";
import logoCredicoop from "../../imports/bancos/banco_credicoop.svg?url";
import logoTecnocar from "../../imports/marcas/tecnocar.png";
import logoSyl from "../../imports/marcas/syl.webp";
import { useEntrance } from "../lib/motion";
import { SectionHeader } from "./shared/SectionHeader";

// Textos generales, sin tasas ni fechas. Una promo con vigencia se carga en `promo`
// ({ text, validUntil: "AAAA-MM-DD" }) y se oculta sola cuando vence.
const bankOptions: BankOption[] = [
  {
    name: "Banco Nación",
    desc: "Crédito prendario para maquinaria agrícola, en pesos o dólares. Consultá las condiciones vigentes.",
    logo: logoNacion,
    href: "https://www.bna.com.ar/Empresas/AgroNegocios/Creditos",
  },
  {
    name: "Banco Provincia",
    desc: "Línea de crédito para maquinaria agrícola. Financiamiento a medida del productor bonaerense.",
    logo: logoProvincia,
    href: "https://www.bancoprovincia.com.ar/agro/agro_capitaltrabajo",
  },
  {
    name: "Banco Macro",
    desc: "Créditos prendarios y líneas agro. Cuotas fijas en pesos o dólares.",
    logo: logoMacro,
    href: "https://www.macro.com.ar/agro/financiaciones/credito-al-instante",
  },
  {
    name: "Banco Galicia",
    desc: "Línea de crédito para maquinaria y equipamiento agrícola.",
    logo: logoGalicia,
    href: "https://www.galicia.ar/empresas/financiaciones/compra-insumos-agro",
  },
  {
    name: "Banco de La Pampa",
    desc: "Financiamiento regional para productores del sudoeste bonaerense. Cercanía y conocimiento del campo.",
    logo: logoPampa,
    href: "https://www.bancodelapampa.com.ar/agro",
  },
  {
    name: "BICE",
    desc: "Banco de Inversión y Comercio Exterior. Líneas especiales para inversión en maquinaria.",
    logo: logoBice,
    href: "https://www.bice.com.ar/productos/inversion/creditosagro2026/",
  },
  {
    name: "Banco Credicoop",
    desc: "Financiamiento para implementos DEMS. Consultá plazos y condiciones vigentes.",
    logo: logoCredicoop,
    href: "https://www.bancocredicoop.coop/",
  },
];

const paymentConditions = [
  { label: "12 valores neto", discount: null },
  { label: "Pago 0 a 150 días", sub: "6 valores", discount: "5%" },
  { label: "Pago 0 a 90 días", sub: "4 valores", discount: "10%" },
  { label: "Pago contado", sub: "1 valor", discount: "10+5%" },
];

const factoryOptions = [
  {
    logo: logoTecnocar,
    name: "Tecnocar",
    logoClass: "brightness-0 invert",
    href: null,
    desc: null,
  },
  {
    logo: logoSyl,
    name: "SYL",
    logoClass: "brightness-0 invert",
    href: null,
    desc: null,
  },
];

export function Financing() {
  const { reveal, enter } = useEntrance();
  const [tab, setTab] = useState<"banks" | "factory">("banks");
  const [amount, setAmount] = useState(50000000);
  const [months, setMonths] = useState(36);
  const [rate, setRate] = useState(30);

  const monthlyPayment =
    (amount * (rate / 100 / 12)) /
    (1 - Math.pow(1 + rate / 100 / 12, -months));
  const totalAmount = monthlyPayment * months;
  const totalInterest = totalAmount - amount;

  return (
    <section
      id="financiamiento"
      className="bg-surface-2 py-20 border-y border-white/5"
    >
      <div className="w-full lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-6">
        {/* Header */}
        <SectionHeader
          align="center"
          className="mb-10"
          eyebrow="Financiamiento"
          title="OPCIONES DE PAGO Y CRÉDITO"
          description="Facilitamos el acceso a tu maquinaria con múltiples alternativas de financiamiento."
        />

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white/5 border border-white/10 rounded-lg p-1 gap-1">
            <button
              onClick={() => setTab("banks")}
              className={`px-6 py-2.5 rounded-md text-sm font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                tab === "banks"
                  ? "bg-accent text-ink"
                  : "text-text-muted-on-dark hover:text-white"
              }`}
            >
              Bancos y crédito
            </button>
            <button
              onClick={() => setTab("factory")}
              className={`px-6 py-2.5 rounded-md text-sm font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                tab === "factory"
                  ? "bg-accent text-ink"
                  : "text-text-muted-on-dark hover:text-white"
              }`}
            >
              Financiación directa
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {tab === "banks" ? (
            <motion.div
              key="banks"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* Bank Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16">
                {bankOptions.map((bank, index) => (
                  <BankCard key={bank.name} bank={bank} index={index} />
                ))}

                {/* CTA Card */}
                <motion.div
                  {...reveal(5)}
                  className="bg-accent text-ink rounded-lg p-7 flex flex-col justify-center items-start"
                >
                  <h3 className="font-bold text-xl mb-3">
                    ¿No sabés cuál te conviene?
                  </h3>
                  <p className="mb-6 leading-relaxed opacity-80 text-base">
                    Te asesoramos sin compromiso. Analizamos tu situación y te
                    recomendamos la mejor opción.
                  </p>
                  <a
                    href="https://wa.me/5492923431570?text=Hola%2C%20quiero%20consultar%20opciones%20de%20financiamiento"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-ink text-white px-6 py-3 font-semibold text-sm hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    Hablar con un asesor
                  </a>
                </motion.div>
              </div>

              {/* Calculator */}
              <div className="bg-ink border border-accent/30 rounded-xl p-8 max-w-4xl mx-auto">
                <div className="flex flex-col items-start mb-6 gap-2">
                  <Calculator className="w-6 h-6 text-accent" />
                  <h3 className="font-bold text-xl text-white">
                    Calculadora estimada de Cuotas
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-white mb-2">
                        Monto a financiar
                      </label>
                      <input
                        type="range"
                        min="5000000"
                        max="500000000"
                        step="5000000"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                      <div className="text-2xl font-black text-accent mt-2">
                        ${amount.toLocaleString("es-AR")}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-white mb-2">
                        Plazo (meses)
                      </label>
                      <input
                        type="range"
                        min="6"
                        max="84"
                        step="6"
                        value={months}
                        onChange={(e) => setMonths(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                      <div className="text-2xl font-black text-accent mt-2">
                        {months} meses
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-white mb-2">
                        Tasa anual estimada (%)
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="80"
                        step="1"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                      <div className="text-2xl font-black text-accent mt-2">
                        {rate}%
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6 flex flex-col justify-center space-y-4">
                    <div className="text-center pb-4 border-b border-white/10">
                      <div className="text-sm text-text-muted-on-dark mb-1">
                        Cuota mensual estimada
                      </div>
                      <div className="text-2xl font-black text-accent">
                        ${Math.round(monthlyPayment).toLocaleString("es-AR")}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 text-center">
                      <div>
                        <div className="text-xs text-text-muted-on-dark mb-1">
                          Total a pagar
                        </div>
                        <div className="text-lg font-bold text-white">
                          ${Math.round(totalAmount).toLocaleString("es-AR")}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-text-muted-on-dark mb-1">
                          Interés total
                        </div>
                        <div className="text-lg font-bold text-white">
                          ${Math.round(totalInterest).toLocaleString("es-AR")}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-text-muted-on-dark text-center pt-4 border-t border-white/10">
                      * Valores estimados. Consultá condiciones reales con un
                      asesor.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="factory"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* Factory financing intro */}
              <p className="text-center text-text-muted-on-dark text-sm mb-8 mx-auto">
                Financiación directa sin banco intermediario. Condiciones
                propias de cada fabricante.
              </p>

              <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
                {factoryOptions.map((brand, index) => (
                  <motion.div
                    key={brand.name}
                    {...enter(index)}
                    className="w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                  >
                    {/* Card header */}
                    <div className="bg-white/8 border-b border-white/10 px-7 py-5 flex items-center justify-between">
                      <img loading="lazy" decoding="async"
                        src={brand.logo}
                        alt={brand.name}
                        className={`h-7 w-auto object-contain ${brand.logoClass}`}
                      />
                      {!brand.href && (
                        <div className="text-right">
                          <span className="block text-xl font-black text-white leading-none">
                            12
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wider text-accent">
                            cheques sin interés
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content: conditions table or description+link */}
                    <div className="px-7 py-5">
                      {brand.href ? (
                        <div className="flex flex-col gap-4">
                          <p className="text-text-muted-on-dark text-sm leading-relaxed">
                            {brand.desc}
                          </p>
                          <a
                            href={brand.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
                          >
                            Ver Plan Rino →
                          </a>
                        </div>
                      ) : (
                        <>
                          <p className="text-xs font-bold tracking-[0.15em] uppercase text-text-muted-on-dark mb-4">
                            Condiciones de pago
                          </p>
                          <div className="space-y-2">
                            {paymentConditions.map((cond) => (
                              <div
                                key={cond.label}
                                className="flex items-center justify-between py-2.5 border-b border-white/8 last:border-0"
                              >
                                <div>
                                  <span className="text-white/80 text-sm font-medium">
                                    {cond.label}
                                  </span>
                                  {cond.sub && (
                                    <span className="text-text-muted-on-dark text-xs ml-2">
                                      ({cond.sub})
                                    </span>
                                  )}
                                </div>
                                {cond.discount ? (
                                  <span className="bg-accent/15 border border-accent/30 text-accent text-sm font-black px-3 py-1 rounded-md">
                                    {cond.discount} dto.
                                  </span>
                                ) : (
                                  <span className="text-text-muted-on-dark text-xs uppercase tracking-wide">
                                    precio lista
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA: mismo ancho que ocupan las dos cards de arriba (dos de las tres columnas) */}
              <div className="max-w-7xl mx-auto">
              <motion.div
                {...enter(3)}
                className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-accent/10 border border-accent/30 rounded-xl px-8 py-6 w-full lg:w-[calc((100%-3rem)*2/3+1.5rem)] mx-auto"
              >
                <div>
                  <p className="text-white font-semibold text-lg leading-snug">
                    ¿Querés saber el precio con descuento?
                  </p>
                  <p className="text-text-muted-on-dark text-sm mt-1">
                    Consultanos y te pasamos los valores actualizados.
                  </p>
                </div>
                <Button
                  href="https://wa.me/5492923431570?text=Hola%2C%20quiero%20consultar%20financiaci%C3%B3n%20directa%20Tecnocar%2FSYL"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  className="shrink-0"
                >
                  Consultar precio →
                </Button>
              </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
