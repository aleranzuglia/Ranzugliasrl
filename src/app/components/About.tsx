import { motion } from 'motion/react';
import hanomagLogo from '../../imports/hanomag/hanomag.png';
import michiganLogo from '../../imports/michigan/michigan.png';

const stats = [
  { number: '50+', label: 'Años en el mercado' },
  { number: '10+', label: 'Marcas distribuidas' },
  { number: 'Hanomag', label: 'Distribuidor oficial' },
  { number: 'Michigan', label: 'Distribuidor oficial' },
];

export function About() {
  return (
    <section id="nosotros" className="bg-zinc-50 py-20">
      <div className="w-full lg:max-w-[1024px]   xl:max-w-[1280px]  2xl:max-w-[1536px] mx-auto px-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-0.5 w-8 bg-zinc-500" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500">
            Quiénes somos
          </span>
        </div>

        <div className="grid lg:grid-cols-[1.4fr,1fr] gap-16 items-start">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <h2 className="font-normal text-2xl md:text-4xl text-ink mb-6 leading-none">
              Potencia y solidez en el campo
            </h2>
            <p className="text-lg text-zinc-700 leading-relaxed mb-4">
             Somos distribuidores oficiales de Hanomag y Michigan, y trabajamos junto a las marcas líderes del agro argentino.
            </p>
            <p className="text-base text-zinc-600 leading-relaxed mb-8">
             Nuestro equipo conoce el campo de verdad, porque forma parte de él. Por eso ofrecemos asesoramiento claro, atención postventa y repuestos disponibles para que nunca te detengas.
            </p>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4 pt-6 border-t border-zinc-200">
              <div className="h-10 flex items-center gap-3">
                <img
                  src={hanomagLogo}
                  alt="Hanomag"
                  className="h-8 object-contain"
                />
                <img
                  src={michiganLogo}
                  alt="Michigan"
                  className="h-8 object-contain"
                />
              </div>
              <span className="text-xs font-bold tracking-wide uppercase text-zinc-500">
                Distribuidor oficial Hanomag · Michigan
              </span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.number}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white border border-zinc-200 border-l-4 border-l-yellow-400 p-6 hover:-translate-y-1 transition-transform"
              >
                <div className="font-black text-2xl text-ink mb-2 leading-none">
                  {stat.number}
                </div>
                <div className="text-xs font-bold tracking-wider uppercase text-zinc-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
