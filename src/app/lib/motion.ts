import { useReducedMotion } from "motion/react";

// Animaciones de entrada del sitio: ~300 ms por elemento, escalonadas de a 50 ms.
// El escalonado se corta en MAX_STEPS para que ninguna card tarde en verse con la seccion ya visible.
export const ENTRANCE = {
  duration: 0.3,
  stagger: 0.05,
  maxSteps: 6,
  distance: 16,
} as const;

const delayFor = (index: number) =>
  Math.min(Math.max(index, 0), ENTRANCE.maxSteps) * ENTRANCE.stagger;

type Offset = { x?: number; y?: number; scale?: number };

// Hook con las props de entrada para componentes `motion.*`.
// Con `prefers-reduced-motion: reduce` devuelven {} (el elemento se muestra sin animar).
//   reveal(i): aparece al entrar en pantalla (secciones, cards).
//   enter(i):  aparece al montarse (listas filtradas, contenido que cambia).
export function useEntrance() {
  const reduced = useReducedMotion() ?? false;

  const hidden = (from: Offset = {}) => ({
    opacity: 0,
    y: from.y ?? (from.x !== undefined || from.scale !== undefined ? 0 : ENTRANCE.distance),
    ...(from.x !== undefined && { x: from.x }),
    ...(from.scale !== undefined && { scale: from.scale }),
  });
  const shown = (from: Offset = {}) => ({
    opacity: 1,
    y: 0,
    ...(from.x !== undefined && { x: 0 }),
    ...(from.scale !== undefined && { scale: 1 }),
  });
  const transition = (index: number) => ({
    duration: ENTRANCE.duration,
    delay: delayFor(index),
    ease: "easeOut" as const,
  });

  return {
    reduced,
    reveal: (index = 0, from?: Offset) =>
      reduced
        ? {}
        : {
            initial: hidden(from),
            whileInView: shown(from),
            // Sin margen negativo: el elemento anima apenas asoma, nunca queda a medias.
            viewport: { once: true, amount: "some" as const },
            transition: transition(index),
          },
    enter: (index = 0, from?: Offset) =>
      reduced
        ? {}
        : {
            initial: hidden(from),
            animate: shown(from),
            transition: transition(index),
          },
  };
}

// Comportamiento de scroll: sin animacion si la persona pidio menos movimiento.
export function scrollBehavior(): ScrollBehavior {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}
