import type { ReactNode } from "react";
import { cn } from "../ui/utils";

// Encabezado de seccion: eyebrow, titulo (h2, Anton) y bajada opcional.
// tone: "dark" (fondo oscuro), "light" (fondo claro) o "accent" (fondo amarillo).
const TONES = {
  dark: {
    eyebrow: "text-accent",
    title: "text-white",
    description: "text-text-muted-on-dark",
  },
  light: {
    eyebrow: "text-zinc-500",
    title: "text-ink",
    description: "text-zinc-600",
  },
  accent: {
    eyebrow: "text-ink/80",
    title: "text-ink",
    description: "text-ink/80",
  },
} as const;

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  tone?: keyof typeof TONES;
  align?: "left" | "center";
  className?: string;
  descriptionClassName?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "left",
  className,
  descriptionClassName,
}: SectionHeaderProps) {
  const colors = TONES[tone];
  const centered = align === "center";

  return (
    <div className={cn(centered && "text-center", className)}>
      <span
        className={cn(
          "mb-4 block text-xs font-bold uppercase tracking-[0.2em]",
          colors.eyebrow,
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          "font-normal text-2xl md:text-4xl",
          colors.title,
          description && "mb-4",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base leading-relaxed md:text-lg",
            colors.description,
            centered ? "mx-auto max-w-2xl" : "max-w-3xl",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
