import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../ui/utils";

// Jerarquia de botones del sitio:
// - primary: amarillo, el unico CTA primario.
// - secondary: borde blanco (tone="dark", sobre fondo oscuro) o negro (tone="light", sobre fondo claro).
// - whatsapp: verde, solo para acciones de WhatsApp.
const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 border-2 font-semibold uppercase tracking-wider transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-transparent bg-accent text-ink hover:bg-accent-hover",
        secondary: "bg-transparent",
        whatsapp: "border-transparent bg-whatsapp text-white hover:bg-whatsapp-hover",
      },
      tone: {
        dark: "",
        light: "",
      },
      size: {
        md: "px-8 py-4 text-sm",
        sm: "px-4 sm:px-6 py-3 text-sm",
      },
    },
    compoundVariants: [
      {
        variant: "secondary",
        tone: "dark",
        class: "border-white text-white hover:bg-white hover:text-ink",
      },
      {
        variant: "secondary",
        tone: "light",
        class: "border-ink text-ink hover:bg-ink hover:text-white",
      },
    ],
    defaultVariants: { variant: "primary", tone: "dark", size: "md" },
  },
);

type ButtonStyleProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: ReactNode;
};

type AnchorProps = ButtonStyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & { href: string };
type NativeButtonProps = ButtonStyleProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };

export type ButtonProps = AnchorProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  const { variant, tone, size, className, children, ...rest } = props;
  const classes = cn(buttonVariants({ variant, tone, size }), className);

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
