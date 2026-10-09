import { motion } from 'motion/react';
import { WhatsAppIcon } from './WhatsAppIcon';

export function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/5492923431570?text=Hola%2C%20quiero%20consultar%20sobre%20maquinaria%20agr%C3%ADcola"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-[#25D366]/30 hover:shadow-2xl transition-all group"
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
    </motion.a>
  );
}
