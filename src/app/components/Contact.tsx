import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./shared/Button";
import { toast } from "sonner";
import {
  Check,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Clock,
} from "lucide-react";
import { CATALOG, CATEGORY_LABELS, brandOf, sortBrands } from "../data/catalog";

export function Contact() {
  const [formState, setFormState] = useState({
    nombre: "",
    tel: "",
    email: "",
    localidad: "",
    tipo: "",
    modelo: "",
    mensaje: "",
    financiamiento: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const buildWhatsAppText = () => {
    const tipoLabels: Record<string, string> = {
      ...CATEGORY_LABELS,
      usado: "Maquinaria usada",
      repuesto: "Repuestos",
      otro: "Otro",
    };
    const lines = [
      `*Nueva consulta desde el sitio web*`,
      ``,
      `*Nombre:* ${formState.nombre}`,
      `*Teléfono:* ${formState.tel}`,
      formState.email ? `*Email:* ${formState.email}` : null,
      formState.localidad ? `*Localidad:* ${formState.localidad}` : null,
      formState.tipo ? `*Categoría:* ${tipoLabels[formState.tipo] ?? formState.tipo}` : null,
      formState.modelo ? `*Modelo:* ${formState.modelo}` : null,
      formState.mensaje ? `*Mensaje:* ${formState.mensaje}` : null,
      formState.financiamiento ? `*Solicita info de financiamiento*` : null,
    ].filter(Boolean);
    return encodeURIComponent(lines.join("\n"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          to: "ranzugliasrl@gmail.com",
          subject: `Consulta de ${formState.nombre} — ${formState.tipo || "sin categoría"}`,
          from_name: "Ranzuglia SRL Web",
          nombre: formState.nombre,
          telefono: formState.tel,
          email: formState.email || "—",
          localidad: formState.localidad || "—",
          categoria: formState.tipo || "—",
          modelo: formState.modelo || "—",
          mensaje: formState.mensaje || "—",
          financiamiento: formState.financiamiento ? "Sí" : "No",
        }),
      });

      if (!res.ok) throw new Error("Error al enviar");

      setIsSuccess(true);
      toast.success("¡Consulta enviada con éxito!");

      window.open(
        `https://wa.me/5492923431570?text=${buildWhatsAppText()}`,
        "_blank"
      );
    } catch {
      toast.error("No se pudo enviar. Intentá de nuevo o escribinos por WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => {
      setIsSuccess(false);
      setFormState({
        nombre: "",
        tel: "",
        email: "",
        localidad: "",
        tipo: "",
        modelo: "",
        mensaje: "",
        financiamiento: false,
      });
    }, 5000);
  };

  const CATALOG_CATEGORIES = Object.keys(CATEGORY_LABELS);

  // Modelos del catálogo para la categoría elegida, agrupados por marca (oficiales primero)
  const modeloGroups = useMemo(() => {
    if (!CATALOG_CATEGORIES.includes(formState.tipo)) return [];
    const byBrand = new Map<string, string[]>();
    CATALOG
      .filter(p => p.categoria === formState.tipo && p.estado === 'nuevo')
      .forEach(p => {
        const brand = brandOf(p);
        byBrand.set(brand, [...(byBrand.get(brand) ?? []), p.nombre]);
      });
    const counts = new Map(Array.from(byBrand, ([brand, nombres]) => [brand, nombres.length] as [string, number]));
    return sortBrands(counts).map(brand => ({ brand, modelos: byBrand.get(brand) ?? [] }));
  }, [formState.tipo]);

  // Categorías sin productos cargados todavía (ej: equipos viales): se pide el equipo en texto libre
  const sinCatalogo = CATALOG_CATEGORIES.includes(formState.tipo) && modeloGroups.length === 0;

  const locales = [
    {
      label: "Ventas",
      phone: "2923 43 1570",
      phoneLink: "https://wa.me/5492923431570",
      address: "Ruta 51 km 616 · Coronel Pringles",
    },
    {
      label: "Repuestos",
      phone: "2923 51 5685",
      phoneLink: "https://wa.me/5492923515685",
      address: "Av. 25 de Mayo 1541 · Coronel Pringles",
    },
  ];

  const contactInfo = [
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Horario",
      value: "Lun–Vie 8 a 12h / 14:30 a 19:30h · Sáb 8 a 12h",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "humbertoranzugliasrl@gmail.com",
      link: "mailto:humbertoranzugliasrl@gmail.com",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      label: "Instagram",
      value: "@humbertoranzugliasrl",
      link: "https://www.instagram.com/humbertoranzugliasrl",
    },
  ];

  return (
    <section id="contacto" className="bg-accent py-20">
      <div className="w-full lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-0.5 w-8 bg-ink/40" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-ink/50">
                Hablemos
              </span>
            </div>

            <h2 className="font-normal text-2xl md:text-4xl text-ink mb-6 leading-none">
              Pedí tu presupuesto
            </h2>

            <p className="text-lg text-ink/80 mb-10 leading-relaxed max-w-md">
             Te respondemos por WhatsApp en el día o te esperamos en nuestro local para asesorarte personalmente.
            </p>

            {/* Locales: Ventas y Repuestos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
              {locales.map((local, index) => (
                <motion.div
                  key={local.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-ink/10 rounded-lg p-4 space-y-2"
                >
                  <div className="text-xs font-black tracking-wider uppercase text-ink/50">
                    {local.label}
                  </div>
                  <a
                    href={local.phoneLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-bold text-ink hover:underline text-sm"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    {local.phone}
                  </a>
                  <div className="flex items-start gap-1.5 text-sm text-ink/70">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                    {local.address}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resto de info */}
            <div className="space-y-0">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                  className="grid grid-cols-[100px,1fr] items-baseline gap-4 py-3 border-b border-ink/10"
                >
                  <div className="flex items-center gap-2 text-sm font-black tracking-wider uppercase text-ink/50">
                    {info.icon}
                    {info.label}
                  </div>
                  {info.link ? (
                    <a
                      href={info.link}
                      target={info.link.startsWith("http") ? "_blank" : undefined}
                      rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="font-semibold text-base text-ink hover:underline"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="font-semibold text-base text-ink">
                      {info.value}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-white p-8"
                >
                  <h3 className="font-bold text-xl text-ink mb-6">
                    Cotizá tu maquinaria
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="nombre"
                        className="block text-xs font-bold tracking-wider uppercase text-ink mb-2"
                      >
                        Nombre
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        value={formState.nombre}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            nombre: e.target.value,
                          })
                        }
                        placeholder="Juan Pérez"
                        required
                        className="w-full px-4 py-3 border-2 border-ink focus:border-ink focus:ring-4 focus:ring-accent/50 outline-none transition-all text-sm bg-white text-ink placeholder:text-zinc-400"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="tel"
                        className="block text-xs font-bold tracking-wider uppercase text-ink mb-2"
                      >
                        Teléfono / WhatsApp
                      </label>
                      <input
                        id="tel"
                        type="tel"
                        value={formState.tel}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            tel: e.target.value,
                          })
                        }
                        placeholder="2923 43 1570"
                        required
                        className="w-full px-4 py-3 border-2 border-ink focus:border-ink focus:ring-4 focus:ring-accent/50 outline-none transition-all text-sm bg-white text-ink placeholder:text-zinc-400"
                      />
                      <p className="text-xs text-zinc-400 mt-1">
                        Te respondemos por WhatsApp.
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="tipo"
                        className="block text-xs font-bold tracking-wider uppercase text-ink mb-2"
                      >
                        Tipo de maquinaria
                      </label>
                      <select
                        id="tipo"
                        value={formState.tipo}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            tipo: e.target.value,
                            modelo: "",
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-ink focus:border-ink focus:ring-4 focus:ring-accent/50 outline-none transition-all text-sm bg-white text-ink font-medium"
                        style={{
                          appearance: "none",
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23000' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                          paddingRight: "36px",
                        }}
                      >
                        <option value="" className="text-zinc-400">
                          — Seleccioná una categoría —
                        </option>
                        {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                          <option key={value} value={value} className="text-ink font-medium">
                            {label}
                          </option>
                        ))}
                        <option value="usado" className="text-ink font-medium">
                          Maquinaria usada
                        </option>
                        <option value="repuesto" className="text-ink font-medium">
                          Repuestos
                        </option>
                        <option value="otro" className="text-ink font-medium">
                          Otro / consultar
                        </option>
                      </select>
                    </div>

                    {modeloGroups.length > 0 && (
                      <div>
                        <label
                          htmlFor="modelo"
                          className="block text-xs font-bold tracking-wider uppercase text-ink mb-2"
                        >
                          Modelo
                        </label>
                        <select
                          id="modelo"
                          value={formState.modelo}
                          onChange={(e) =>
                            setFormState({ ...formState, modelo: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-ink focus:border-ink focus:ring-4 focus:ring-accent/50 outline-none transition-all text-sm bg-white text-ink font-medium"
                          style={{
                            appearance: "none",
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23000' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 12px center",
                            paddingRight: "36px",
                          }}
                        >
                          <option value="" className="text-zinc-400">
                            — Seleccioná un modelo —
                          </option>
                          {modeloGroups.map(({ brand, modelos }) => (
                            <optgroup key={brand} label={brand}>
                              {modelos.map((m) => (
                                <option key={m} value={`${brand} ${m}`} className="text-ink font-medium">
                                  {m}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </div>
                    )}

                    {formState.tipo === "usado" && (
                      <div>
                        <label
                          htmlFor="modelo"
                          className="block text-xs font-bold tracking-wider uppercase text-ink mb-2"
                        >
                          ¿Qué maquinaria buscás?
                        </label>
                        <input
                          id="modelo"
                          type="text"
                          value={formState.modelo}
                          onChange={(e) =>
                            setFormState({ ...formState, modelo: e.target.value })
                          }
                          placeholder="Ej: tractor 100 HP, sembradora directa..."
                          className="w-full px-4 py-3 border-2 border-ink focus:border-ink focus:ring-4 focus:ring-accent/50 outline-none transition-all text-sm bg-white text-ink placeholder:text-zinc-400"
                        />
                      </div>
                    )}

                    {sinCatalogo && (
                      <div>
                        <label
                          htmlFor="modelo"
                          className="block text-xs font-bold tracking-wider uppercase text-ink mb-2"
                        >
                          ¿Qué equipo te interesa?
                        </label>
                        <input
                          id="modelo"
                          type="text"
                          value={formState.modelo}
                          onChange={(e) =>
                            setFormState({ ...formState, modelo: e.target.value })
                          }
                          placeholder="Ej: motoniveladora, excavadora, retropala..."
                          className="w-full px-4 py-3 border-2 border-ink focus:border-ink focus:ring-4 focus:ring-accent/50 outline-none transition-all text-sm bg-white text-ink placeholder:text-zinc-400"
                        />
                      </div>
                    )}

                    {formState.tipo === "repuesto" && (
                      <div>
                        <label
                          htmlFor="modelo"
                          className="block text-xs font-bold tracking-wider uppercase text-ink mb-2"
                        >
                          ¿Para qué equipo?
                        </label>
                        <input
                          id="modelo"
                          type="text"
                          value={formState.modelo}
                          onChange={(e) =>
                            setFormState({ ...formState, modelo: e.target.value })
                          }
                          placeholder="Ej: Hanomag TR 85, Gherardi G-600..."
                          className="w-full px-4 py-3 border-2 border-ink focus:border-ink focus:ring-4 focus:ring-accent/50 outline-none transition-all text-sm bg-white text-ink placeholder:text-zinc-400"
                        />
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold tracking-wider uppercase text-ink mb-2"
                      >
                        Email (opcional)
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formState.email || ""}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            email: e.target.value,
                          })
                        }
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 border-2 border-ink focus:border-ink focus:ring-4 focus:ring-accent/50 outline-none transition-all text-sm bg-white text-ink placeholder:text-zinc-400"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="localidad"
                        className="block text-xs font-bold tracking-wider uppercase text-ink mb-2"
                      >
                        Localidad (opcional)
                      </label>
                      <input
                        id="localidad"
                        type="text"
                        value={formState.localidad || ""}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            localidad: e.target.value,
                          })
                        }
                        placeholder="Ej: Coronel Pringles"
                        className="w-full px-4 py-3 border-2 border-ink focus:border-ink focus:ring-4 focus:ring-accent/50 outline-none transition-all text-sm bg-white text-ink placeholder:text-zinc-400"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="mensaje"
                        className="block text-xs font-bold tracking-wider uppercase text-ink mb-2"
                      >
                        Mensaje
                      </label>
                      <textarea
                        id="mensaje"
                        value={formState.mensaje}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            mensaje: e.target.value,
                          })
                        }
                        placeholder="Contanos el uso que le vas a dar, tamaño del campo, etc."
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-ink focus:border-ink focus:ring-4 focus:ring-accent/50 outline-none transition-all text-sm resize-vertical bg-white text-ink placeholder:text-zinc-400"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formState.financiamiento}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              financiamiento: e.target.checked,
                            })
                          }
                          className="w-5 h-5 accent-ink"
                        />
                        <span className="text-sm text-zinc-600">
                          Quiero información sobre
                          financiamiento
                        </span>
                      </label>
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting
                        ? "Enviando..."
                        : "Enviar consulta"}
                    </Button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-xl p-12 shadow-[8px_8px_0_0_rgba(10,10,10,0.5)] border-2 border-ink text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: 0.2,
                    }}
                    className="w-16 h-16 rounded-full bg-accent border-2 border-ink flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-8 h-8 text-ink" />
                  </motion.div>
                  <h3 className="font-bold text-2xl text-ink mb-3">
                    ¡Consulta enviada!
                  </h3>
                  <p className="text-zinc-600 mb-2">
                    Tu consulta llegó a nuestro email. WhatsApp se abrió automáticamente para confirmar.
                  </p>
                  <p className="text-zinc-400 text-sm mb-6">
                    Si WhatsApp no se abrió,{" "}
                    <a
                      href={`https://wa.me/5492923431570?text=${buildWhatsAppText()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-zinc-600 hover:text-ink"
                    >
                      hacé clic acá
                    </a>.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="bg-transparent border-2 border-ink text-ink px-6 py-3 font-semibold text-sm hover:bg-ink hover:text-white transition-colors"
                  >
                    Enviar otra consulta
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}