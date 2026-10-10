import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./shared/Button";
import bgHero from "../../imports/bg-hero.avif";

// Tractor del hero: PNG recortado (fondo transparente) en src/imports/hanomag/hero-tractor.png (o .webp).
// Mientras el archivo no exista, el hero se muestra sin tractor.
const heroTractorImages = import.meta.glob("../../imports/hanomag/hero-tractor.{png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const tractorImage = Object.values(heroTractorImages)[0];

// Ficha técnica del tractor del hero (datos de hanomag.com.ar/producto/47).
interface HeroTractorSpec {
  value: string;
  unit?: string;
  label: string;
}
interface HeroTractor {
  name: string;
  ref: string;
  specs: HeroTractorSpec[];
  detail: string;
}
const HERO_TRACTOR: HeroTractor = {
  name: "Hanomag Stark 1400/4CA",
  ref: "1400/4CA",
  specs: [
    { value: "140", unit: "HP", label: "Potencia" },
    { value: "4,66", unit: "T", label: "Peso" },
    { value: "140", unit: "L", label: "Tanque" },
    { value: "16+8", label: "Velocidades" },
  ],
  detail: "Motor Yuchai 4 cil. · Cabina con aire acondicionado",
};

export function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-start md:items-center overflow-x-hidden md:overflow-hidden bg-ink"
    >
      {/* Campo Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgHero})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-ink/90 to-black/95" />

      {/* Additional vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(250, 204, 21, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(250, 204, 21, 0.5) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Container with max-width 1800px */}
      <div className="w-full max-w-[1800px] mx-auto px-6 relative z-10 pt-28 pb-32 md:pt-0 md:pb-0">
        <div className="relative min-h-0 md:min-h-[calc(100vh-180px)] flex items-center">
          {/* Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20 max-w-full md:max-w-[32rem] pr-8 xl:max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-0.5 w-12 bg-accent" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-accent">
                Coronel Pringles · Buenos Aires
              </span>
            </div>

            <h1 className="text-display mb-8">
              <span className="text-white font-[Anton]">
                La potencia
              </span>
              <br />
              <span className="text-white font-[Anton]">
                que necesita
              </span>
              <br />
              <span className="text-accent mt-3 inline-block font-[Anton]">
                tu campo
              </span>
            </h1>

            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-2xl">
              Tractores Hanomag, maquinaria Michigan, sembradoras, acoplados e implementos.
              <span className="block mt-2 text-accent font-semibold">
                + de 50 años de trayectoria en el agro argentino.
              </span>
            </p>

            <div className="flex flex-wrap gap-4">
              <Button onClick={() => scrollToSection("catalogo")}>
                Ver catálogo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="secondary"
                tone="dark"
                onClick={() => scrollToSection("contacto")}
              >
                Pedir presupuesto
              </Button>
            </div>
          </motion.div>

          {/* Tractor Image - Right Side - MASSIVE with Floating Animation */}
          {tractorImage && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: 1,
                x: 0,
                y: [0, -20, 0],
              }}
              transition={{
                opacity: { duration: 1, delay: 0.2 },
                x: { duration: 1, delay: 0.2 },
                y: {
                  duration: 5,
                  delay: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute -right-16 xl:-right-8 2xl:right-0 top-[52%] -translate-y-1/2 w-[62%] 2xl:w-[58%] max-w-[1250px] h-[88vh] hidden md:flex items-center justify-center pointer-events-none z-10"
              style={{
                filter:
                  "drop-shadow(0 40px 120px rgba(220, 38, 38, 0.45)) drop-shadow(0 0 60px rgba(239, 68, 68, 0.3))",
              }}
            >
              <img
                src={tractorImage}
                alt={HERO_TRACTOR.name}
                className="w-full h-full object-contain"
              />
            </motion.div>
          )}

          {/* Floating Technical Panel - Overlaying the tractor */}
          <motion.aside
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
              ease: "easeOut",
            }}
            className="absolute bottom-8 right-8 w-120 bg-ink/70 backdrop-blur-md border border-white/15 p-7 shadow-[0_25px_70px_rgba(0,0,0,0.7)] hidden lg:block z-40"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-bold tracking-[0.28em] text-accent">
                FICHA TÉCNICA
              </span>
              <span className="text-xs tabular-nums text-text-muted-on-dark">
                REF. {HERO_TRACTOR.ref}
              </span>
            </div>

            <div className="h-px bg-white/15 mb-5" />

            <div className="grid grid-cols-4 gap-4 mb-4">
              {HERO_TRACTOR.specs.map((spec) => (
                <div key={spec.label}>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-black text-2xl text-white">
                      {spec.value}
                    </span>
                    {spec.unit && (
                      <span className="text-xs text-white/60 tracking-wider font-bold">
                        {spec.unit}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-text-muted-on-dark tracking-wide uppercase">
                    {spec.label}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-text-muted-on-dark">
              {HERO_TRACTOR.detail}
            </p>
          </motion.aside>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-ink/60 backdrop-blur-md z-20"
      >
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs tabular-nums tracking-wider">
            <div className="text-accent font-bold">
              EST. 1973 · + DE 50 AÑOS DE TRAYECTORIA
            </div>
            <div className="text-text-muted-on-dark">
              Distribuidor oficial Hanomag · Michigan
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}