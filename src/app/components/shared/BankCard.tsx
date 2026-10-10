import { motion } from "motion/react";
import { useEntrance } from "../../lib/motion";

// Promocion con vigencia: se muestra solo hasta el final del dia `validUntil` (AAAA-MM-DD, hora local).
// Cuando vence deja de mostrarse sola y la tarjeta queda con su texto general.
export interface BankPromo {
  text: string;
  validUntil: string;
}

export interface BankOption {
  name: string;
  logo: string;
  // Maximo ~120 caracteres, sin tasas ni fechas: eso va en `promo`.
  desc: string;
  href: string;
  promo?: BankPromo;
}

export function isPromoActive(promo: BankPromo | undefined, now = new Date()) {
  if (!promo) return false;
  const [year, month, day] = promo.validUntil.split("-").map(Number);
  const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);
  return now.getTime() <= endOfDay.getTime();
}

export function BankCard({ bank, index }: { bank: BankOption; index: number }) {
  const { reveal } = useEntrance();

  return (
    <motion.div
      {...reveal(index)}
      className="flex h-full flex-col rounded-lg border border-white/10 bg-white/5 p-7 transition-all hover:border-accent/40 hover:bg-white/10"
    >
      {/* Logo en blanco, misma altura optica en todas las tarjetas */}
      <div className="mb-4 flex h-8 items-center">
        <img loading="lazy" decoding="async"
          src={bank.logo}
          alt={bank.name}
          className="h-6 w-auto max-w-[12rem] object-contain object-left brightness-0 invert"
        />
      </div>
      <p className="mb-4 leading-relaxed text-text-muted-on-dark">{bank.desc}</p>
      {isPromoActive(bank.promo) && (
        <p className="mb-4 rounded-md border border-accent/30 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent">
          {bank.promo!.text}
        </p>
      )}
      <a
        href={bank.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto pt-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
      >
        Más información<span className="sr-only"> sobre {bank.name}</span> →
      </a>
    </motion.div>
  );
}
