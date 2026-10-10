import type { ReactNode } from "react";
import { cn } from "../ui/utils";

// Encabezado de seccion: eyebrow (con linea), titulo (h2, Anton) y bajada opcional.
// tone: "dark" (fondo oscuro), "light" (fondo claro) o "accent" (fondo amarillo).
const TONES = {
  dark: {
    bar: "bg-accent",
    eyebrow: "text-accent",
    title: "text-white",
    description: "text-text-muted-on-dark",
  },
  light: {
    bar: "bg-zinc-500",
    eyebrow: "text-zinc-500",
    title: "text-ink",
    description: "text-zinc-600",
  },
  accent: {
    bar: "bg-ink/80",
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
      <div
        className={cn(
          "mb-4 flex items-center gap-3",
          centered && "justify-center",
        )}
      >
        <div className={cn("h-0.5 w-8", colors.bar)} aria-hidden="true" />
        <span
          className={cn(
            "text-xs font-bold uppercase tracking-[0.2em]",
            colors.eyebrow,
          )}
        >
          {eyebrow}
        </span>
        {centered && (
          <div className={cn("h-0.5 w-8", colors.bar)} aria-hidden="true" />
        )}
      </div>
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
