import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../ui/utils";

// Etiqueta neutra: no cambia de color segun la marca. tone="dark" va sobre fondo oscuro,
// tone="light" sobre fondo claro.
const chipVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
  {
    variants: {
      tone: {
        dark: "border-white/20 text-white/80",
        light: "border-zinc-300 bg-zinc-100 text-zinc-700",
      },
      interactive: {
        true: "cursor-pointer",
        false: "",
      },
    },
    compoundVariants: [
      { tone: "dark", interactive: true, class: "hover:border-white hover:text-white" },
      { tone: "light", interactive: true, class: "hover:border-ink hover:text-ink" },
    ],
    defaultVariants: { tone: "dark", interactive: false },
  },
);

type ChipStyleProps = Pick<VariantProps<typeof chipVariants>, "tone"> & {
  className?: string;
  children: ReactNode;
};

type ChipProps =
  | (ChipStyleProps &
      Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & { href: string })
  | (ChipStyleProps &
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
        href?: undefined;
        onClick: NonNullable<ButtonHTMLAttributes<HTMLButtonElement>["onClick"]>;
      })
  | (ChipStyleProps & { href?: undefined; onClick?: undefined });

export function Chip(props: ChipProps) {
  const { tone, className, children, ...rest } = props;

  if (rest.href !== undefined) {
    return (
      <a
        className={cn(chipVariants({ tone, interactive: true }), className)}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }
  if (rest.onClick) {
    return (
      <button
        type="button"
        className={cn(chipVariants({ tone, interactive: true }), className)}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
  return <span className={cn(chipVariants({ tone }), className)}>{children}</span>;
}
