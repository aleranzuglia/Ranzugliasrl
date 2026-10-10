import { motion } from 'motion/react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useEntrance } from "../lib/motion";

export function WhatsAppFloat() {
  const { enter, reduced } = useEntrance();
  return (
    <motion.a
      href="https://wa.me/5492923431570?text=Hola%2C%20quiero%20consultar%20sobre%20maquinaria%20agr%C3%ADcola"
      target="_blank"
      rel="noopener noreferrer"
      {...enter(6, { scale: 0.8 })}
      whileHover={reduced ? undefined : { scale: 1.05 }}
      whileTap={reduced ? undefined : { scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center bg-whatsapp text-white p-4 rounded-full shadow-lg hover:shadow-whatsapp/30 hover:shadow-2xl transition-all group"
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
    </motion.a>
  );
}
