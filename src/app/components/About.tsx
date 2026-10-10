import { motion } from 'motion/react';
import { Image as ImageIcon } from 'lucide-react';
import hanomagLogo from '../../imports/hanomag/hanomag.png';
import michiganLogo from '../../imports/michigan/michigan.png';
import { useEntrance } from "../lib/motion";
import { SectionHeader } from './shared/SectionHeader';

const stats = [
  { number: '50+', label: 'Años en el mercado' },
  { number: '10+', label: 'Marcas distribuidas' },
];

export function About() {
  const { reveal } = useEntrance();
  return (
    <section id="nosotros" className="bg-ink py-20">
      <div className="w-full lg:max-w-[1024px]   xl:max-w-[1280px]  2xl:max-w-[1536px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 items-start">
          {/* Content */}
          <motion.div
            {...reveal(0)}
          >
            <SectionHeader
              className="mb-6"
              eyebrow="Quiénes somos"
              title="Potencia y solidez en el campo"
            />
            <p className="text-lg text-white/80 leading-relaxed mb-4">
             Somos distribuidores oficiales de Hanomag y Michigan, y trabajamos junto a las marcas líderes del agro argentino.
            </p>
            <p className="text-base text-text-muted-on-dark leading-relaxed mb-8">
             Nuestro equipo conoce el campo de verdad, porque forma parte de él. Por eso ofrecemos asesoramiento claro, atención postventa y repuestos disponibles para que nunca te detengas.
            </p>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4 pt-6 border-t border-white/10">
              <div className="h-10 flex items-center gap-3">
                <img loading="lazy" decoding="async"
                  src={hanomagLogo}
                  alt=""
                  className="h-8 object-contain"
                />
                <img loading="lazy" decoding="async"
                  src={michiganLogo}
                  alt=""
                  className="h-8 object-contain"
                />
              </div>
              <span className="text-xs font-bold tracking-wide uppercase text-text-muted-on-dark">
                Distribuidor oficial Hanomag · Michigan
              </span>
            </div>
          </motion.div>

          {/* Datos + foto */}
          <div className="flex flex-col gap-4">
            <motion.div
              {...reveal(2)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.number}
                  {...reveal(index + 3)}
                  className="bg-surface-2 border border-white/10 border-l-4 border-l-accent p-6 hover:-translate-y-1 transition-transform"
                >
                  <div className="font-black text-2xl text-white mb-2 leading-none">
                    {stat.number}
                  </div>
                  <div className="text-xs font-bold tracking-wider uppercase text-text-muted-on-dark">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* TODO: reemplazar el placeholder por una foto real del local o del equipo
                (agregar el archivo en src/imports y mostrarlo con <img> + alt descriptivo). */}
            <div
              role="img"
              aria-label="Espacio reservado para una foto del local o del equipo"
              className="aspect-[4/3] w-full border-2 border-dashed border-white/20 bg-surface-2 flex flex-col items-center justify-center gap-2 text-text-muted-on-dark"
            >
              <ImageIcon className="w-10 h-10" aria-hidden="true" />
              <span className="text-xs font-bold tracking-wider uppercase">
                Foto del local o del equipo
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
